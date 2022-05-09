import i18n from 'i18next';

import {
	TCliente,
	TRetornoValidacion,
	TIniciativasCliente,
	TPedidos,
	TCoberturas,
	TCoberturasEjecutadas,
	TCoberturasCliente,
	EUnidadMedida,
} from 'models';
export const validarDatosCliente = (
	cliente: TCliente | undefined
): TRetornoValidacion => {
	const retornoValidacion: TRetornoValidacion = {
		esValido: !(cliente === undefined),
		propsAdvertencia: {
			dataCy: 'no-datos-cliente',
			mensaje: i18n.t('No se encontro datos del cliente'),
		},
	};

	return retornoValidacion;
};

export const validarCoberturas = (
	coberturas: TCoberturas[],
	pedidos: TPedidos
) => {
	const {venta} = pedidos;
	const coberturasCumplidas: TCoberturasCliente[] = coberturas.map(
		(cobertura) => {
			let coberturaCumplida = false;
			cobertura.productosGrupoCobertura.forEach((productoCobertura) => {
				const productoExiste = venta.productos.find(
					(producto) => producto.codigoProducto === productoCobertura
				);
				if (productoExiste) coberturaCumplida = true;
			});

			return {
				idGrupoCobertura: cobertura.grupoCobertura,
				cumplida: coberturaCumplida,
			};
		}
	);

	return coberturasCumplidas;
};

export const validarProductosIniciativas = (
	iniciativas: TIniciativasCliente[],
	pedidos: TPedidos
) => {
	const {venta} = pedidos;

	const iniciativasVerificadas: TIniciativasCliente[] = iniciativas.map(
		(iniciativa) => {
			const productosEnVenta = venta.productos.filter((producto) =>
				iniciativa.materialesIniciativa.includes(producto.codigoProducto)
			);

			if (!productosEnVenta.length && iniciativa.estado === 'ejecutada') {
				return {...iniciativa, estado: 'pendiente'};
			}

			const [unidadesTotales, subUnidadesTotales] = productosEnVenta.reduce(
				(total, producto) => {
					return [
						total[0] + producto.unidades,
						total[1] + producto.subUnidades,
					];
				},
				[0, 0]
			);

			if (
				iniciativa.unidadMedida === EUnidadMedida.Unidad &&
				unidadesTotales >= iniciativa.cantidad &&
				(iniciativa.estado === 'pendiente' || iniciativa.estado === 'cancelada')
			) {
				return {...iniciativa, estado: 'ejecutada'};
			}

			if (
				iniciativa.unidadMedida === EUnidadMedida.Unidad &&
				unidadesTotales < iniciativa.cantidad &&
				iniciativa.estado === 'ejecutada'
			) {
				return {...iniciativa, estado: 'pendiente'};
			}

			if (
				iniciativa.unidadMedida === EUnidadMedida.SubUnidad &&
				subUnidadesTotales >= iniciativa.cantidad &&
				(iniciativa.estado === 'pendiente' || iniciativa.estado === 'cancelada')
			) {
				return {...iniciativa, estado: 'ejecutada'};
			}

			if (
				iniciativa.unidadMedida === EUnidadMedida.SubUnidad &&
				subUnidadesTotales < iniciativa.cantidad &&
				iniciativa.estado === 'ejecutada'
			) {
				return {...iniciativa, estado: 'pendiente'};
			}

			return iniciativa;
		}
	);

	return iniciativasVerificadas;
};

export const validarSiExcedeElMontoMinimo = (
	cliente: TCliente | undefined,
	totalPedidos: number
): TRetornoValidacion => {
	const montoVentaMinima =
		cliente?.configuracionPedido.ventaMinima?.montoVentaMinima;
	return {
		esValido: montoVentaMinima ? totalPedidos >= montoVentaMinima : true,
		propsAdvertencia: {
			dataCy: 'pedido-minimo',
			mensaje: i18n.t('advertencias.pedidoMinimo', {
				monto: montoVentaMinima,
			}),
		},
	};
};

export const validarSiExcedeAlMaximoContado = (
	montoVentaMaxima: number,
	totalVisita: number,
	totalContadoPedidosClienteMismaFechaEntrega: number
): TRetornoValidacion => {
	return {
		esValido:
			montoVentaMaxima === 0 ||
			totalVisita + totalContadoPedidosClienteMismaFechaEntrega <=
				montoVentaMaxima,
		propsAdvertencia: {
			dataCy: 'monto-maximo',
			mensaje: i18n.t('advertencias.masDelMontoMaximo', {
				montoVentaMaxima: montoVentaMaxima,
			}),
		},
	};
};

export const validarSiExcedeAlMaximoDeCredito = (
	condicionDeCreditoDelCliente: string,
	creditoDisponible: number,
	montoTotalACredito: number
): TRetornoValidacion => {
	return {
		esValido:
			condicionDeCreditoDelCliente === 'creditoInformal'
				? montoTotalACredito <= creditoDisponible
				: true,
		propsAdvertencia: {
			dataCy: 'credito-maximo',
			mensaje: i18n.t('advertencias.excedeCreditoDsiponible'),
		},
	};
};
