import {Dispatch, SetStateAction, useCallback, useEffect} from 'react';
import {TPrecioProducto, TCliente} from 'models';
import {useObtenerPreciosProductosDelCliente} from '.';
import {useObtenerClienteActual, useObtenerPedidoActual} from 'hooks';

export const useInicializarPreciosProductosDelCliente = (
	setPreciosProductos: Dispatch<SetStateAction<TPrecioProducto[]>>
) => {
	const obtenerClienteActual = useObtenerClienteActual();
	const obtenerPreciosProductosDelCliente = useObtenerPreciosProductosDelCliente();
	const pedidoActual = useObtenerPedidoActual();
	const {codigoCliente, fechaEntrega} = pedidoActual;
	const clienteEncontrado: TCliente | undefined = obtenerClienteActual(
		codigoCliente
	);
	const inicializarPreciosProductosDelCliente = useCallback(() => {
		const preciosProductosDelCliente: TPrecioProducto[] = obtenerPreciosProductosDelCliente(
			clienteEncontrado,
			fechaEntrega
		);
		setPreciosProductos(preciosProductosDelCliente);
	}, [clienteEncontrado, fechaEntrega, obtenerPreciosProductosDelCliente]);
	return useEffect(() => {
		inicializarPreciosProductosDelCliente();
	}, []);
};
