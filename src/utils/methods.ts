import {
	TPedidosClientes,
	TPedidoClienteParaEnviar,
	EEstadosDeUnPedido,
	ETiposDePago,
	TCompromisoDeCobro,
	TProductoPedido,
	TPedido,
	TPrecioProducto,
} from 'models/redux';

import { useObtenerPedidosClientes, useObtenerVisitaActual } from 'redux/hooks';

import { TpresupuestoTipoPedido, TTipoPedido } from 'models/server';
import { TFunction } from 'react-i18next';

export const formatoNumeroConDecimales = (
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

	return `${numeroFormateado}`;
};

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

	return `${t('simbolos.moneda')}${numeroFormateado}`;
};

/*  FUNCIONES DE FECHA */

export const formatearFecha = (
	fecha: string, //Formato fecha recibida: AAAA-MM-DD
	t: TFunction<'translation'>
): string => {
	const arregloFecha: string[] = fecha.split('-');
	if (t('simbolos.formatoFechaAmericano') === 'true')
		return `${arregloFecha[1]}-${arregloFecha[2]}-${arregloFecha[0]}`;
	else return `${arregloFecha[2]}-${arregloFecha[1]}-${arregloFecha[0]}`;
};

export const formatearFechaIntl = (
	fecha: string,
	language: string,
): string => {
	let fechaSplit=fecha.split('-');
	let vFecha= new Date(Number(fechaSplit[0]),Number(fechaSplit[1])-1,Number(fechaSplit[2]))
	let fechaConFormato=new Intl.DateTimeFormat(language,{day:'numeric', month:'long', year:'numeric'}).format(vFecha);
	return fechaConFormato.replaceAll('de','-');
}

export const fechaDispositivo = (): string => {
	let fechaDispositivo: string | null =
		window.localStorage.getItem('fechaDipostivo');
	let fecha = fechaDispositivo ? new Date(fechaDispositivo) : new Date();
	const offset = fecha.getTimezoneOffset();
	fecha = new Date(fecha.getTime() - offset * 60 * 1000);

	return fecha.toISOString().split('T')[0];
};

export const fechaDentroDelRango = (
	fecha: string,
	rangoInicial: string,
	rangoFinal: string
): boolean =>
	new Date(rangoInicial) <= new Date(fecha) &&
	new Date(rangoFinal) >= new Date(fecha);

/*  FIN FUNCIONES DE FECHA */
export const calcularTotalPedidosClienteValorizadosPorTipoPago = ({
	pedidosClienteMismaFechaEntrega,
	tipoPedidos,
	tipoPago,
}: {
	pedidosClienteMismaFechaEntrega: TPedidoClienteParaEnviar[];
	tipoPedidos: TTipoPedido[];
	tipoPago: ETiposDePago;
}): number => {
	const totalPedidosMismaFecha = pedidosClienteMismaFechaEntrega.reduce(
		(total: number, pedido: TPedidoClienteParaEnviar) => {
			if (
				pedido.tipoPago === tipoPago &&
				tipoPedidos.find((tipoPedido) => tipoPedido.codigo == pedido.tipoPedido)
					?.esValorizado
			) {
				for (let producto of pedido.productos) {
					if (producto.tipoPago === tipoPago) total += producto.total;
				}
			}
			return total;
		},
		0
	);

	return totalPedidosMismaFecha;
};

export const obtenerTotalesPedidosCliente = ({
	pedidosClienteMismaFechaEntrega,
	tipoPedidos,
}: {
	pedidosClienteMismaFechaEntrega: TPedidoClienteParaEnviar[];
	tipoPedidos: TTipoPedido[];
}): number => {
	let totalPedidosMismaFecha = 0;
	if (pedidosClienteMismaFechaEntrega.length !== 0) {
		totalPedidosMismaFecha = pedidosClienteMismaFechaEntrega.reduce(
			(total: number, pedido: TPedidoClienteParaEnviar) => {
				if (
					tipoPedidos.find(
						(tipoPedido) => tipoPedido.codigo == pedido.tipoPedido
					)?.esValorizado
				) {
					for (let producto of pedido.productos) {
						total += producto.total;
					}
				}
				return total;
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
		totalCompromisosDeCobroMismaFecha =
			compromisosDeCobroMismaFechaEntrega.reduce(
				(total: number, compromiso: TCompromisoDeCobro) => {
					total += compromiso.monto;
					return total;
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
			(total: any, pedido: TPedidoClienteParaEnviar) => {
				for (let producto of pedido.productos) {
					if (producto.codigoProducto === codigoProducto)
						total += producto.unidades;
				}
				return total;
			},
			0
		);
	}

	return totalUnidadesMismoProducto;
};

export const obtenerUnidadesProductoVisitaActual = (
	pedidosCliente: TProductoPedido[],
	codigoProducto: number
): number => {
	let totalUnidadesMismoProducto = 0;
	if (pedidosCliente.length !== 0) {
		totalUnidadesMismoProducto = pedidosCliente.reduce(
			(total: any, pedido: TProductoPedido) => {
				if (pedido.codigoProducto === codigoProducto) total += pedido.unidades;
				return total;
			},
			0
		);
	}

	return totalUnidadesMismoProducto;
};

export const obtenerPresupuestoConfiguradoSegunVigencia = (
	tipoPedido: string,
	presupuestoTipoPedido: TpresupuestoTipoPedido[]
) => {
	const fechaDipostivo = fechaDispositivo();
	return presupuestoTipoPedido?.find(
		(presupuesto: TpresupuestoTipoPedido) =>
			presupuesto?.tipoPedido?.toLowerCase() === tipoPedido &&
			presupuesto?.vigenciaInicioPresupuesto <= fechaDipostivo &&
			fechaDipostivo <= presupuesto?.vigenciaFinPresupuesto
	);
};

export const obtenerProductosHabilitados = (
	preciosProductos: TPrecioProducto[],
	presupuestoTipoPedido: TpresupuestoTipoPedido[],
	tipoPedido: string
) => {
	const fechaDipostivo = fechaDispositivo();

	const presupuestoEnFecha = obtenerPresupuestoConfiguradoSegunVigencia(
		tipoPedido,
		presupuestoTipoPedido
	);

	const preciosProductosFiltrado = preciosProductos.filter(
		(producto: TPrecioProducto) => {
			if (presupuestoEnFecha)
				for (let productoHabilitado of presupuestoEnFecha?.productosHabilitados) {
					if (producto.codigoProducto === productoHabilitado) return producto;
				}
		}
	);

	return preciosProductosFiltrado;
};
