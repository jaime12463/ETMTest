import {Dispatch, SetStateAction, useCallback} from 'react';
import {TPrecioProducto, TInputsFormularioAgregarProducto} from 'models';
import {
	useObtenerDatosCliente,
	useObtenerPreciosProductosDelCliente,
} from 'hooks';
import {useObtenerPedidoActual, useObtenerClienteActual} from 'redux/hooks';

export const useFiltrarPreciosProductosDelClienteActual = (
	preciosProductos: TPrecioProducto[],
	setPreciosProductos: Dispatch<SetStateAction<TPrecioProducto[]>>
) => {
	const obtenerPreciosProductosDelCliente = useObtenerPreciosProductosDelCliente();
	const pedidoActual = useObtenerPedidoActual();
	const clienteActual = useObtenerClienteActual();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);

	const filtrarPreciosProductosDelClienteActual = useCallback(
		({productoABuscar}: TInputsFormularioAgregarProducto) => {
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
					precioProducto.nombre
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
