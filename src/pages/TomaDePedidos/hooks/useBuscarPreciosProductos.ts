import {Dispatch, SetStateAction, useCallback} from 'react';
import {
	TPrecioProducto,
	TCliente,
	TInputsFormularioAgregarProducto,
} from 'models';
import {useObtenerClienteActual, useObtenerPreciosProductosDelCliente} from '.';
import {obtenerFechaEntrega} from 'utils/methods';

export const useBuscarPreciosProductos = (
	preciosProductos: TPrecioProducto[],
	setPreciosProductos: Dispatch<SetStateAction<TPrecioProducto[]>>
) => {
	const obtenerPreciosProductosDelCliente = useObtenerPreciosProductosDelCliente();
	const obtenerClienteActual = useObtenerClienteActual();
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
			const fechaEntrega: string | undefined = obtenerFechaEntrega(
				//TODO: REVISAR
				clienteEncontrado.fechasEntrega
			);
			if (!fechaEntrega) return;
			const preciosProductosDelCliente: TPrecioProducto[] = obtenerPreciosProductosDelCliente(
				clienteEncontrado,
				fechaEntrega
			);
			setPreciosProductos(preciosProductosDelCliente);
		},
		[preciosProductos, obtenerPreciosProductosDelCliente, obtenerClienteActual]
	);
	return buscarPreciosProductos;
};
