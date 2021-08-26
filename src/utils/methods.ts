import {
	TPedidoClienteParaEnviar,
	EEstadosDeUnPedido,
	ETiposDePago,
	TCompromisoDeCobro,
} from 'models/redux';
import {TFunction} from 'react-i18next';

export const formatearNumero = (
	numero: number,
	t: TFunction<'translation'>
) => {
	//TODO: aca de acuerdo a la configuracion regional debe cambiar decimales y puntos
	if (t('simbolos.conDecimales'))
		return `${t('simbolos.moneda')} ${numero.toFixed(2)}`;
	else return `${t('simbolos.moneda')} ${numero}`;
};

export const formatearFecha = (
	fecha: string, //Formato fecha recibida: AAAA-DD-MMM
	t: TFunction<'translation'>
): string => {
	const arregloFecha: string[] = fecha.split('-');
	let stringFecha: string;
	if (t('simbolos.formatoFechaAmericano') === 'true')
		return `${arregloFecha[2]}-${arregloFecha[1]}-${arregloFecha[0]}`;
	else return `${arregloFecha[1]}-${arregloFecha[2]}-${arregloFecha[0]}`;
};

export const fechaDispositivo = (): string => {
	let fechaDispositivo: string | null = window.localStorage.getItem(
		'fechaDipostivo'
	);

	const fecha: string = fechaDispositivo
		? new Date(fechaDispositivo).toISOString().split('T')[0]
		: new Date().toISOString().split('T')[0];

	return fecha;
};

export const obtenerTotalContadoPedidosCliente = (
	pedidosClienteMismaFechaEntrega: TPedidoClienteParaEnviar[]
): number => {
	let totalPedidosMismaFecha = 0;

	if (pedidosClienteMismaFechaEntrega.length === 0)
		return totalPedidosMismaFecha;

	totalPedidosMismaFecha = pedidosClienteMismaFechaEntrega.reduce(
		(total: number, pedido: TPedidoClienteParaEnviar) => {
			if (pedido.estado !== EEstadosDeUnPedido.Activo) return total;

			for (let producto of pedido.productosPedido) {
				if (producto.tipoPago === ETiposDePago.Contado) total += producto.total;
			}

			return total;
		},
		0
	);

	return totalPedidosMismaFecha;
};

export const obtenerTotalesPedidosCliente = (
	pedidosClienteMismaFechaEntrega: TPedidoClienteParaEnviar[]
): number => {
	let totalPedidosMismaFecha = 0;
	if (pedidosClienteMismaFechaEntrega.length !== 0) {
		totalPedidosMismaFecha = pedidosClienteMismaFechaEntrega.reduce(
			(acum: any, pedidos: any) => {
				if (pedidos.estado === EEstadosDeUnPedido.Activo) {
					for (let pedido of pedidos.productosPedido) {
						acum += pedido.total;
					}
				}
				return acum;
			},
			0
		);
	}

	return totalPedidosMismaFecha;
};

export const obtenerTotalesContadoPedidosCliente = (
	pedidosClienteMismaFechaEntrega: TPedidoClienteParaEnviar[]
): number => {
	let totalPedidosMismaFecha = 0;
	if (pedidosClienteMismaFechaEntrega.length !== 0) {
		totalPedidosMismaFecha = pedidosClienteMismaFechaEntrega.reduce(
			(acum: any, pedidos: any) => {
				if (pedidos.estado === EEstadosDeUnPedido.Activo) {
					for (let pedido of pedidos.productosPedido) {
						if (pedido.tipoPago === ETiposDePago.Contado) acum += pedido.total;
					}
				}
				return acum;
			},
			0
		);
	}

	return totalPedidosMismaFecha;
};

export const obtenerTotalesCompromisoDeCobroCliente = (
	compromisosDeCobroMismaFechaEntrega: TCompromisoDeCobro[]
): number => {
	let totalCompromisosDeCobroMismaFecha = 0;
	if (compromisosDeCobroMismaFechaEntrega.length !== 0) {
		totalCompromisosDeCobroMismaFecha = compromisosDeCobroMismaFechaEntrega.reduce(
			(acum: any, el: any) => {
				acum += el.monto;
				return acum;
			},
			0
		);
	}

	return totalCompromisosDeCobroMismaFecha;
};

export const obtenerUnidadesMismoProducto = (
	pedidosCliente: TPedidoClienteParaEnviar[],
	codigoProducto: number
): number => {
	let totalUnidadesMismoProducto = 0;
	if (pedidosCliente.length !== 0) {
		totalUnidadesMismoProducto = pedidosCliente.reduce(
			(acum: any, pedidos: any) => {
				for (let pedido of pedidos.productosPedido) {
					if (pedido.codigoProducto === codigoProducto) acum += pedido.unidades;
				}
				return acum;
			},
			0
		);
	}

	return totalUnidadesMismoProducto;
};
