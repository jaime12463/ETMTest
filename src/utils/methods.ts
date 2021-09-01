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
): string => {
	let numeroString;

	if (t('simbolos.conDecimales') == 'true')
		numeroString = numero.toFixed(2).toString();
	else numeroString = Math.trunc(numero).toString();

	const arrayNumero = numeroString.split('.');

	let parteEntera = arrayNumero[0];

	var regx = /(\d+)(\d{3})/;

	while (regx.test(parteEntera)) {
		parteEntera = parteEntera.replace(regx, '$1' + t('simbolos.miles') + '$2');
	}

	let parteDecimal = arrayNumero[1];

	if (parteDecimal) parteDecimal = t('simbolos.decimal') + parteDecimal;

	const numeroFormateado: string = parteEntera + (parteDecimal ?? '');

	return `${t('simbolos.moneda')} ${numeroFormateado}`;
};

export const formatearFecha = (
	fecha: string, //Formato fecha recibida: AAAA-DD-MMM
	t: TFunction<'translation'>
): string => {
	const arregloFecha: string[] = fecha.split('-');
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

			for (let producto of pedido.productos) {
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
