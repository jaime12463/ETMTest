import {
	TPedidoClienteParaEnviar,
	EEstadosDeUnPedido,
	ETiposDePago,
} from 'models/redux';

export const transformDate = (date: string): string =>
	`${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}`;

export const darFormatoFecha = (fecha: string): string => {
	const arregloFecha: string[] = fecha.split('-');
	const stringFecha: string = `${arregloFecha[2]}/${arregloFecha[1]}/${arregloFecha[0]}`;
	return stringFecha;
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

export const buscarPedidosParaElMismoDia = (
	pedidosCliente: any,
	fechaEntrega: string | undefined
) => {
	const resultado =
		pedidosCliente &&
		pedidosCliente.reduce(
			(acum: [string], pedido: TPedidoClienteParaEnviar) => {
				if (
					pedido.estado === EEstadosDeUnPedido.Activo &&
					pedido.fechaEntrega === fechaEntrega
				) {
					acum.push(pedido.codigoPedido);
				}
				return acum;
			},
			[]
		);

	return resultado;
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