import {
	useObtenerDatosCliente,
	useObtenerPreciosProductosDelCliente,
	useObtenerPedidosClienteMismaFechaEntrega,
} from 'hooks';
import {useObtenerClienteActual, useObtenerPedidoActual} from 'redux/hooks';
import {TClienteActual, TPrecioProducto, TCliente} from 'models';
import {validarUnidadesDisponibles} from 'utils/validaciones';
import {obtenerUnidadesMismoProducto} from 'utils/methods';

export const useObtenerPromoPushDelCliente = () => {
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const pedidoActual = useObtenerPedidoActual();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const datosCliente: TCliente | undefined = obtenerDatosCliente(
		clienteActual.codigoCliente
	);
	const {
		obtenerPedidosClienteMismaFechaEntrega,
	} = useObtenerPedidosClienteMismaFechaEntrega(clienteActual.codigoCliente);
	const pedidosCliente = obtenerPedidosClienteMismaFechaEntrega(
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
		preciosProductosDelCliente.filter(
			(producto: any) =>
				producto.promoPush &&
				validarUnidadesDisponibles(pedidosCliente, 0, producto) === -1
		);

	promoPushFiltradas.map(
		(producto: any, i: number) =>
			(producto.unidadesDisponibles =
				producto.unidadesDisponibles -
				obtenerUnidadesMismoProducto(pedidosCliente, producto.codigoProducto))
	);

	return promoPushFiltradas.sort((a: any, b: any) => {
		if (a.codigoProducto < b.codigoProducto) {
			return 1;
		} else {
			return -1;
		}
	});
};
