import {TPedidoClienteParaEnviar, TPrecio} from 'models';

export const transformDate = (date: string): string =>
	`${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}`;

export const darFormatoFecha = (fecha: string): string => {
	const arregloFecha: string[] = fecha.split('-');
	const stringFecha: string = `${arregloFecha[2]}/${arregloFecha[1]}/${arregloFecha[0]}`;
	return stringFecha;
};

export const fechaDispositivo = (): string => {
	let fechaDispositivo: string | null = localStorage.getItem('fechaDipostivo');

	const fecha: string = fechaDispositivo
		? new Date(fechaDispositivo).toISOString().split('T')[0]
		: new Date().toISOString().split('T')[0];

	return fecha;
};

export const obtenerTotalesPedidosCliente = (
	pedidosClienteMismaFechaEntrega: TPedidoClienteParaEnviar[]
): number => {
	let totalPedidosMismaFecha = 0;
	if (pedidosClienteMismaFechaEntrega.length !== 0) {
		totalPedidosMismaFecha = pedidosClienteMismaFechaEntrega.reduce(
			(acum: any, pedido: any) => {
				if (pedido.estado === 'A') {
					for (let valor of pedido.productosPedido) {
						acum += valor.total;
					}
				}
				return acum;
			},
			0
		);
	}

	return totalPedidosMismaFecha;
};

export const obtenerPrecioConImpuestoUnidad = (
	preciosProductos: TPrecio[],
	fechaEntrega: string
) => {
	const resultado = preciosProductos.find(
		(precio) =>
			new Date(precio['vigenciaInicioPrecio']) <= new Date(fechaEntrega) &&
			new Date(precio['vigenciaFinPrecio']) >= new Date(fechaEntrega)
	);

	return resultado;
};

export const buscarPedidosParaElMismoDia = (
	pedidosCliente: any,
	fechaEntrega: string | undefined
) => {
	const resultado =
		pedidosCliente &&
		pedidosCliente.reduce(
			(acum: [string], pedido: TPedidoClienteParaEnviar) => {
				if (pedido.estado === 'A' && pedido.fechaEntrega === fechaEntrega) {
					acum.push(pedido.codigoPedido);
				}
				return acum;
			},
			[]
		);

	return resultado;
};
