import {useCallback} from 'react';
import {
	ETiposDePago,
	TConsolidadoImplicitos,
	TImplicitos,
	TProductoPedido,
	TCliente,
	TClienteActual,
	TPrecioProducto,
} from 'models';
import {
	useObtenerImplicitosPromoPush,
	useObtenerDatosProducto,
} from '.';
import {
	useObtenerPreciosProductosDelCliente,
	useObtenerDatosCliente,
} from 'hooks';
import {useObtenerClienteActual, useObtenerPedidoActual} from 'redux/hooks';

export const useObtenerConsolidacionImplicitos = () => {
	const obtenerImplicitosPromoPush = useObtenerImplicitosPromoPush();
	const obtenerDatosProducto = useObtenerDatosProducto();
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const pedidoActual = useObtenerPedidoActual();
	const representacionUnidades = 'CAJ';
	const representacionSubunidades = 'BOT';
	const datosCliente: TCliente | undefined = obtenerDatosCliente(
		clienteActual.codigoCliente
	);
	const fechaEntrega: string = pedidoActual?.fechaEntrega;

	const obtenerPreciosProductosDelCliente =
		useObtenerPreciosProductosDelCliente();

	const obtenerConsolidacionImplicitos = useCallback(
		(productosPedido: TProductoPedido[]) => {
			const incrementarImplicitos = (
				consolidadoImplicitos: TConsolidadoImplicitos[],
				codigoImplicito: number | undefined,
				nombreImplicito: string | undefined,
				unidades: number,
				subUnidades: number,
				tipoPago: ETiposDePago
			) => {
				let flatAgregado = false;

				consolidadoImplicitos.forEach((consolidado) => {
					if (
						codigoImplicito === consolidado.codigoImplicito &&
							consolidado.tipoPago === tipoPago
					) {
						consolidado.unidades = consolidado.unidades + unidades;
						consolidado.subUnidades = consolidado.subUnidades + subUnidades;
						flatAgregado = true;
						return true;
					}
				});
				if (flatAgregado == false)
					consolidadoImplicitos.push({
						codigoImplicito: codigoImplicito || 0,
						nombreImplicito: nombreImplicito || '',
						unidades: unidades,
						subUnidades: subUnidades,
						tipoPago: tipoPago,
					});
			};

			const consolidadoImplicitos: TConsolidadoImplicitos[] = [];
			let consolidado: TConsolidadoImplicitos[] = [];

			productosPedido.forEach((pedido) => {
				const {unidades, subUnidades, promoPush, tipoPago} = pedido;

				if (promoPush) {
					promoPush.componentes.map((componente) => {
						let implicitosPromoPush: TImplicitos[] = obtenerImplicitosPromoPush(
							componente.codigoProducto
						);
						let unidadesImplicito = 0,
							subUnidadesImplicito = 0;

						if (componente.unidadMedida === representacionUnidades) {
							unidadesImplicito = unidades * componente.cantidad;
							subUnidadesImplicito = 0;
						}

						if (componente.unidadMedida === representacionSubunidades) {
							unidadesImplicito = 0;
							subUnidadesImplicito = unidades * componente.cantidad;
						}

						implicitosPromoPush.map((implicito, posicion) => {
							if (implicito.codigoImplicito) {
								if (posicion === 1) subUnidadesImplicito = 0; //Implicito2

								incrementarImplicitos(
									consolidadoImplicitos,
									implicito.codigoImplicito,
									implicito.nombreImplicito,
									unidadesImplicito,
									subUnidadesImplicito,
									tipoPago
								);
							}
						});

						let {codigoProducto, nombre, tipoProducto, presentacion} =
							obtenerDatosProducto(componente.codigoProducto);
						//TODO: Revisar esto. TipoProducto 5 es Envases
						if (tipoProducto === 5)
							incrementarImplicitos(
								consolidadoImplicitos,
								codigoProducto,
								nombre,
								-unidadesImplicito,
								-subUnidadesImplicito,
								tipoPago
							);
					});
				} else {
					if (typeof pedido.codigoImplicito1 !== 'undefined')
						incrementarImplicitos(
							consolidadoImplicitos,
							pedido.codigoImplicito1,
							pedido.nombreImplicito1,
							unidades,
							subUnidades,
							tipoPago
						);

					if (typeof pedido.codigoImplicito2 !== 'undefined')
						incrementarImplicitos(
							consolidadoImplicitos,
							pedido.codigoImplicito2,
							pedido.nombreImplicito2,
							unidades,
							0,
							tipoPago
						);
				}
			});
			if (!datosCliente) return consolidado;
			const preciosProductosDelCliente = obtenerPreciosProductosDelCliente(
				datosCliente,
				fechaEntrega
			);

			consolidado = consolidadoImplicitos.map((implicito) => {
				let {presentacion} = obtenerDatosProducto(implicito.codigoImplicito);
				let productoImplicito = preciosProductosDelCliente.find(
					(el) => el.codigoProducto === implicito.codigoImplicito
				);

				let unidadesSinExceso = 0,
					subUnidadesSinExceso = 0;

				if (implicito.subUnidades >= presentacion) {
					subUnidadesSinExceso = implicito.subUnidades % presentacion;
					unidadesSinExceso =
						implicito.unidades + ~~(implicito.subUnidades / presentacion);

					return {
						...implicito,
						unidades: unidadesSinExceso,
						subUnidades: subUnidadesSinExceso,
						presentacion,
						precioConImpuestoUnidad: productoImplicito?.precioConImpuestoUnidad,
						precioConImpuestoSubunidad:
							productoImplicito?.precioConImpuestoSubunidad,
					};
				} else
					return {
						...implicito,
						presentacion,
						precioConImpuestoUnidad: productoImplicito?.precioConImpuestoUnidad,
						precioConImpuestoSubunidad:
							productoImplicito?.precioConImpuestoSubunidad,
					};
			});

			return consolidado;
		},
		[]
	);
	return obtenerConsolidacionImplicitos;
};
