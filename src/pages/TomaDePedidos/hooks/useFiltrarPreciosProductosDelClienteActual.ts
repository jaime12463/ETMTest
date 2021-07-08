import {Dispatch, SetStateAction, useCallback} from 'react';
import {
	TPrecioProducto,
	TCliente,
	TInputsFormularioAgregarProducto,
} from 'models';
import {useObtenerPreciosProductosDelClienteActual} from '.';
import {
	useObtenerDatosCliente,
	useObtenerPedidoActual,
	useObtenerClienteActual,
} from 'hooks';

export const useFiltrarPreciosProductosDelClienteActual = (
	preciosProductos: TPrecioProducto[],
	setPreciosProductos: Dispatch<SetStateAction<TPrecioProducto[]>>
) => {
	const obtenerPreciosProductosDelClienteActual = useObtenerPreciosProductosDelClienteActual();
	const pedidoActual = useObtenerPedidoActual();
	const clienteActual = useObtenerClienteActual();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);

	const filtrarPreciosProductosDelClienteActual = useCallback(
		({productoABuscar}: TInputsFormularioAgregarProducto) => {
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

			if (!datosCliente) return;

			const fechaEntrega: string = pedidoActual.fechaEntrega;

			if (!fechaEntrega) return;

			const preciosProductosDelCliente: TPrecioProducto[] = obtenerPreciosProductosDelClienteActual(
				datosCliente,
				fechaEntrega
			);

			setPreciosProductos(preciosProductosDelCliente);
		},
		[
			preciosProductos,
			datosCliente,
			obtenerPreciosProductosDelClienteActual,
			pedidoActual,
		]
	);
	return filtrarPreciosProductosDelClienteActual;
};
