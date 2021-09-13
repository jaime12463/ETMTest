import {useCallback, useEffect} from 'react';
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
	if (!datosCliente) return;

	const fechaEntrega: string = pedidoActual.fechaEntrega;

	if (!fechaEntrega) return;

	const preciosProductosDelCliente: TPrecioProducto[] = obtenerPreciosProductosDelCliente(
		datosCliente,
		fechaEntrega
	);

	useEffect(() => {
		setPreciosProductos(preciosProductosDelCliente);
	}, []);

	const filtrarPreciosProductosDelClienteActual = useCallback(
		({buscador}) => {
			if (buscador == '') {
				setPreciosProductos(preciosProductosDelCliente);
				return;
			}

			const preciosProductosFiltrados: TPrecioProducto[] = preciosProductosDelCliente.filter(
				(precioProducto: TPrecioProducto) =>
					precioProducto.codigoProducto.toString().includes(buscador) ||
					precioProducto.nombreProducto
						.toLowerCase()
						.includes(buscador.toLowerCase())
			);

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
