import {Dispatch, SetStateAction, useCallback} from 'react';
import {
	TPreciosProductos,
	TCliente,
	TInputsFormularioAgregarProducto,
	TPrecioProducto,
} from 'models';
import {useObtenerClienteActual, useObtenerPreciosProductosDelCliente} from '.';
import {establecerFechaEntrega} from 'utils/methods';

export const useBuscarPreciosProductos = (
	preciosProductos: TPreciosProductos,
	setPreciosProductos: Dispatch<SetStateAction<TPreciosProductos>>
) => {
	const obtenerPreciosProductosDelCliente = useObtenerPreciosProductosDelCliente();
	const obtenerClienteActual = useObtenerClienteActual();
	const buscarPreciosProductos = useCallback(
		({codigoCliente, productoABuscar}: TInputsFormularioAgregarProducto) => {
			const preciosProductosFiltrados: TPreciosProductos = preciosProductos.filter(
				(precioProducto: TPrecioProducto) =>
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
					const fechaEntrega: string | undefined = establecerFechaEntrega(
						clienteEncontrado.fechasEntrega
					);
					if (fechaEntrega) {
						const preciosProductosDelCliente: TPreciosProductos = obtenerPreciosProductosDelCliente(
							clienteEncontrado,
							fechaEntrega
						);
						setPreciosProductos(preciosProductosDelCliente);
					}
				}
			} else setPreciosProductos(preciosProductosFiltrados);
		},
		[preciosProductos, obtenerPreciosProductosDelCliente, obtenerClienteActual]
	);
	return buscarPreciosProductos;
};
