import {Dispatch, SetStateAction, useCallback, useEffect} from 'react';
import {TPrecioProducto, TCliente, TPedidoActual, TClienteActual} from 'models';
import {useObtenerPreciosProductosDelClienteActual} from '.';
import {
	useObtenerClienteActual,
	useObtenerDatosCliente,
	useObtenerPedidoActual,
} from 'hooks';

export const useInicializarPreciosProductosDelClienteActual = (
	setPreciosProductos: Dispatch<SetStateAction<TPrecioProducto[]>>
) => {
	const obtenerPreciosProductosDelClienteActual = useObtenerPreciosProductosDelClienteActual();
	const pedidoActual: TPedidoActual = useObtenerPedidoActual();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);

	const inicializarPreciosProductosDelClienteActual = useCallback(() => {
		let preciosProductosDelCliente: TPrecioProducto[] = [];
		if (datosCliente) {
			preciosProductosDelCliente = obtenerPreciosProductosDelClienteActual(
				datosCliente,
				pedidoActual.fechaEntrega
			);
		}
		setPreciosProductos(preciosProductosDelCliente);
	}, [datosCliente, pedidoActual, obtenerPreciosProductosDelClienteActual]);

	return useEffect(() => {
		inicializarPreciosProductosDelClienteActual();
	}, []);
};
