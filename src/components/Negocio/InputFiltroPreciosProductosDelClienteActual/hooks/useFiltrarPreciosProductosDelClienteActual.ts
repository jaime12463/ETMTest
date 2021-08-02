import {useCallback} from 'react';
import {
	TInputFiltrarPreciosProductos,
	TPrecioProducto,
	TStatePreciosProductos,
} from 'models';
import {
	useObtenerDatosCliente,
	useObtenerPreciosProductosDelCliente,
} from 'hooks';
import {useObtenerPedidoActual, useObtenerClienteActual} from 'redux/hooks';

export const useFiltrarPreciosProductosDelClienteActual = (
	statePreciosProductos: TStatePreciosProductos
) => {
	const {preciosProductos, setPreciosProductos} = statePreciosProductos;

	const obtenerPreciosProductosDelCliente = useObtenerPreciosProductosDelCliente();

	const pedidoActual = useObtenerPedidoActual();

	const clienteActual = useObtenerClienteActual();

	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);

	const filtrarPreciosProductosDelClienteActual = useCallback(
		({productoABuscar}: TInputFiltrarPreciosProductos) => {
			if (!datosCliente) return;

			const fechaEntrega: string = pedidoActual.fechaEntrega;

			if (!fechaEntrega) return;

			const preciosProductosDelCliente: TPrecioProducto[] = obtenerPreciosProductosDelCliente(
				datosCliente,
				fechaEntrega
			);

			const preciosProductosFiltrados: TPrecioProducto[] = preciosProductosDelCliente.filter(
				(precioProducto: TPrecioProducto) =>
					precioProducto.codigoProducto.toString().includes(productoABuscar) ||
					precioProducto.nombreProducto
						.toLowerCase()
						.includes(productoABuscar.toLowerCase())
			);

			if (productoABuscar == '') {
				setPreciosProductos(preciosProductosDelCliente);
				return;
			}

			setPreciosProductos(preciosProductosFiltrados);
		},
		[
			preciosProductos,
			datosCliente,
			obtenerPreciosProductosDelCliente,
			pedidoActual,
		]
	);
	return filtrarPreciosProductosDelClienteActual;
};
