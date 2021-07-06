import {Dispatch, SetStateAction, useCallback} from 'react';
import {
	TPrecioProducto,
	TCliente,
	TInputsFormularioAgregarProducto,
} from 'models';
import {useObtenerClienteActual, useObtenerPreciosProductosDelCliente} from '.';
import {selectPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {useAppSelector} from 'redux/hooks';

export const useBuscarPreciosProductos = (
	preciosProductos: TPrecioProducto[],
	setPreciosProductos: Dispatch<SetStateAction<TPrecioProducto[]>>
) => {
	const obtenerPreciosProductosDelCliente = useObtenerPreciosProductosDelCliente();
	const obtenerClienteActual = useObtenerClienteActual();
	const pedidoActual = useAppSelector(selectPedidoActual);
	const buscarPreciosProductos = useCallback(
		({codigoCliente, productoABuscar}: TInputsFormularioAgregarProducto) => {
			const preciosProductosFiltrados: TPrecioProducto[] = preciosProductos.filter(
				(precioProducto: TPrecioProducto) =>
					precioProducto.codigoProducto.toString().includes(productoABuscar) ||
					precioProducto.nombre
						.toLowerCase()
						.includes(productoABuscar.toLowerCase())
			);
			if (productoABuscar !== '') {
				setPreciosProductos(preciosProductosFiltrados);
				return;
			}
			const clienteEncontrado: TCliente | undefined = obtenerClienteActual(
				codigoCliente
			);
			if (!clienteEncontrado) return;
			const fechaEntrega: string = pedidoActual.fechaEntrega;
			if (!fechaEntrega) return;
			const preciosProductosDelCliente: TPrecioProducto[] = obtenerPreciosProductosDelCliente(
				clienteEncontrado,
				fechaEntrega
			);
			setPreciosProductos(preciosProductosDelCliente);
		},
		[
			preciosProductos,
			obtenerPreciosProductosDelCliente,
			obtenerClienteActual,
			pedidoActual,
		]
	);
	return buscarPreciosProductos;
};
