import {
	useObtenerDatosCliente,
	useObtenerPreciosProductosDelCliente,
} from 'hooks';
import {useObtenerClienteActual, useObtenerPedidoActual} from 'redux/hooks';
import {TClienteActual, TPrecioProducto, TCliente} from 'models';

;
export const useObtenerPromoPushDelCliente = () => {
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const pedidoActual = useObtenerPedidoActual();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const datosCliente: TCliente | undefined = obtenerDatosCliente(
		clienteActual.codigoCliente
	);
	const fechaEntrega: string = pedidoActual.fechaEntrega;
	const obtenerPreciosProductosDelCliente = useObtenerPreciosProductosDelCliente();
	if (!datosCliente) return;
	const preciosProductosDelCliente: any = obtenerPreciosProductosDelCliente(
		datosCliente,
		fechaEntrega
	);
	const promoPushFiltradas =
		preciosProductosDelCliente &&
		preciosProductosDelCliente.filter((producto: any) => producto.promoPush);

	return promoPushFiltradas;
};
