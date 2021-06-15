import {useCallback} from 'react';
import {TPreciosProductos, TCliente} from 'models';
import {useObtenerClienteActual, useObtenerPreciosProductosDelCliente} from '.';

export const useBuscarPreciosProductos = (
	preciosProductos: any,
	setPreciosProductos: any
) => {
	const obtenerPreciosProductosDelCliente = useObtenerPreciosProductosDelCliente();
	const obtenerClienteActual = useObtenerClienteActual();
	const buscarPreciosProductos = useCallback(
		({codigoCliente, productoABuscar}: any) => {
			const preciosProductosFiltrados = preciosProductos.filter(
				(precioProducto: any) =>
					precioProducto.codigoProducto.toString().includes(productoABuscar) ||
					precioProducto.nombre
						.toLowerCase()
						.includes(productoABuscar.toLowerCase())
			);
			if (productoABuscar === '') {
				const clienteEncontrado: TCliente | undefined = obtenerClienteActual(
					codigoCliente
				);
				if (clienteEncontrado) {
					const preciosProductosDelCliente: TPreciosProductos = obtenerPreciosProductosDelCliente(
						clienteEncontrado
					);
					setPreciosProductos(preciosProductosDelCliente);
				}
			} else setPreciosProductos(preciosProductosFiltrados);
		},
		[preciosProductos, obtenerPreciosProductosDelCliente, obtenerClienteActual]
	);
	return buscarPreciosProductos;
};
