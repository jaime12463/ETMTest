import {TFechaEntrega, TPedidoClienteParaEnviar, TPrecio} from 'models';

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

export const obtenerFechaEntrega = (fechasEntrega: TFechaEntrega[]): string => {
	const fechaEncontrada: TFechaEntrega | undefined = fechasEntrega.find(
		({fechaVisita}) =>
			new Date(fechaVisita).toISOString().split('T')[0] === fechaDispositivo()
	);

	return fechaEncontrada ? fechaEncontrada.fechaEntrega : ''; //TODO: Nunca llegaria al casa de que no se esncuentre por donde se usa, pero arreglar.
};

export const obtenerTotalesPedidosCliente = (
	pedidosClienteMismaFechaEntrega: TPedidoClienteParaEnviar[]
): number => {
	let totalPedidosMismaFecha = 0;
	if (pedidosClienteMismaFechaEntrega.length !== 0) {
		totalPedidosMismaFecha = pedidosClienteMismaFechaEntrega.reduce(
			(acum: any, pedido: any) => {
				for (let valor of pedido.productosPedido) {
					acum += valor.total;
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

/* 0:
enviado: false
fechaEntrega: "2021-06-12"
productosPedido: Array(1)
0:
codigoProducto: 1860
nombreProducto: "YOLI LIMON BOT 600L NR 12PK"
subUnidades: 0
total: 1050
unidades: 10 */
