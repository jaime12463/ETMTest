import {useCallback} from 'react';
import {
	ETiposDePago,
	TConsolidadoImplicitos,
	TImplicitos,
	TProductoPedido,
	TCliente,
	TClienteActual,
	TPrecioProducto,
	ETipoProducto,
	TCodigoCantidad,
} from 'models';
import {
	useObtenerImplicitosPromoPush,
	useObtenerDatosProducto,
} from '.';
import {
	useObtenerPreciosProductosDelCliente,
	useObtenerDatosCliente,
} from 'hooks';
import {useObtenerClienteActual, useObtenerPedidoActual, useObtenerVisitaActual} from 'redux/hooks';

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
	const visitaActual = useObtenerVisitaActual();

	const obtenerConsolidacionImplicitos = useCallback(
		(productosPedido: TProductoPedido[]) => {
			
			const consolidadoImplicitos:Record<string, TConsolidadoImplicitos> = {};
			let consolidado: TConsolidadoImplicitos[] = []; 
			
			const incrementarImplicitos = (
				implicito: TConsolidadoImplicitos,
			) => {
				const key= `${implicito.tipoPago}-${implicito.codigoImplicito}`;
				if ( consolidadoImplicitos[key])
				{
					consolidadoImplicitos[key].unidades+= implicito.unidades;
					consolidadoImplicitos[key].subUnidades+= implicito.subUnidades;

				}else{
					consolidadoImplicitos[key]={...implicito}
				}
			};

			if (!datosCliente) return consolidado;
			

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

								incrementarImplicitos({
									codigoImplicito: implicito.codigoImplicito,
									nombreImplicito: implicito.nombreImplicito ?? '',
									unidades:unidadesImplicito,
									subUnidades: subUnidadesImplicito,
									tipoPago
								});
							}
						});

						let {codigoProducto, nombre, tipoProducto, presentacion} =
							obtenerDatosProducto(componente.codigoProducto);
						if (tipoProducto === ETipoProducto.Envase)
							incrementarImplicitos({
								codigoImplicito:codigoProducto,
								nombreImplicito:nombre,
								unidades:-unidadesImplicito,
								subUnidades:-subUnidadesImplicito,
								tipoPago
							});
					});
				} else {
					if (typeof pedido.codigoImplicito1 !== 'undefined')
						incrementarImplicitos({
							codigoImplicito:pedido.codigoImplicito1,
							nombreImplicito:pedido.nombreImplicito1 ?? '',
							unidades,
							subUnidades,
							tipoPago
						});

					if (typeof pedido.codigoImplicito2 !== 'undefined')
						incrementarImplicitos({
							codigoImplicito:pedido.codigoImplicito2 ?? 0,
							nombreImplicito:pedido.nombreImplicito2 ?? '',
							unidades,
							subUnidades:0,
							tipoPago
						});
				}
			});
			visitaActual.promosOngoing.forEach((promo) => {
				promo.beneficios.forEach((beneficio) => {
					beneficio.secuencias.forEach( (secuencia) => {
						secuencia.materialesBeneficio.forEach((material)=> { 
							const {codigo, cantidad} = material as TCodigoCantidad;
							const {codigoProducto, nombre, tipoProducto, presentacion} = obtenerDatosProducto(
								Number(codigo)
							);
							if (tipoProducto == ETipoProducto.Envase)
							{
								incrementarImplicitos({
									codigoImplicito:codigoProducto,
									nombreImplicito:nombre,
									unidades: (secuencia.unidadMedida.toLowerCase() == 'unidad' ) ? -cantidad : 0,
									subUnidades:(secuencia.unidadMedida.toLowerCase() == 'subunidad' ) ? -cantidad : 0,
									tipoPago:promo.tipoPago
								});
							}
						} )
					})
				})
			});
			
			const preciosProductosDelCliente = obtenerPreciosProductosDelCliente(
				datosCliente,
				fechaEntrega
			);

			

			consolidado =Object.keys(consolidadoImplicitos).map((key) => {
				const implicito=consolidadoImplicitos[key];
				let {presentacion} = obtenerDatosProducto(implicito.codigoImplicito);
				// ToDo: ver si esta OK, no falta vigencia??
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
