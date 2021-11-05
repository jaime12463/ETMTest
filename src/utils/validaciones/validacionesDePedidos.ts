import i18n from 'i18next';
import {
	TCliente,
	TRetornoValidacion,
	TIniciativasCliente,
	TPedidos,
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

export const validarProductosIniciativas = (
	iniciativas: TIniciativasCliente[],
	pedidos: TPedidos
): TRetornoValidacion => {
	const {venta} = pedidos;

	const productosDeIniciativaEnPedido = venta.productos.filter((producto) => {
		const productoEnIniciativa = iniciativas.find(
			(iniciativa) => iniciativa.codigoProducto === producto.codigoProducto
		);
		if (productoEnIniciativa?.codigoProducto === producto.codigoProducto)
			return true;

		return false;
	});

	const iniciativasVerificadas: TIniciativasCliente[] = iniciativas.map(
		(iniciativa: TIniciativasCliente) => {
			const producto = productosDeIniciativaEnPedido.find(
				(producto) => producto.codigoProducto === iniciativa.codigoProducto
			);
			if (!producto) return iniciativa;
			if (
				producto?.unidades >= iniciativa.unidades &&
				producto?.subUnidades >= iniciativa.subUnidades
			) {
				return {...iniciativa, estado: 'ejecutada'};
			} else {
				if (iniciativa.estado === 'ejecutada') {
					return {...iniciativa, estado: 'pendiente'};
				} else {
					return iniciativa;
				}
			}
		}
	);

	return {esValido: true, propsAdvertencia: null, iniciativasVerificadas};
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
			(montoVentaMaxima === 0 ? true : false) ||
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
