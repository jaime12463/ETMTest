import {Dispatch, SetStateAction, useCallback, useEffect} from 'react';
import {TPrecioProducto, TPedidoActual, TClienteActual} from 'models';
import {useObtenerPreciosProductosDelCliente} from 'hooks';
import {useObtenerDatosCliente} from 'hooks';
import {useObtenerClienteActual, useObtenerPedidoActual} from 'redux/hooks';

export const useInicializarPreciosProductosDelClienteActual = (
	setPreciosProductos: Dispatch<SetStateAction<TPrecioProducto[]>>
) => {
	const obtenerPreciosProductosDelCliente = useObtenerPreciosProductosDelCliente();
	const pedidoActual: TPedidoActual = useObtenerPedidoActual();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);

	const inicializarPreciosProductosDelClienteActual = useCallback(() => {
		let preciosProductosDelCliente: TPrecioProducto[] = [];
		if (datosCliente) {
			preciosProductosDelCliente = obtenerPreciosProductosDelCliente(
				datosCliente,
				pedidoActual.fechaEntrega
			);
		}
		setPreciosProductos(preciosProductosDelCliente);
	}, [datosCliente, pedidoActual, obtenerPreciosProductosDelCliente]);

	return useEffect(() => {
		inicializarPreciosProductosDelClienteActual();
	}, []);
};
