import {
	useObtenerDatosCliente,
	useObtenerPreciosProductosDelCliente,
	useObtenerPedidosClienteMismaFechaEntrega,
} from 'hooks';
import {useObtenerClienteActual, useObtenerPedidoActual} from 'redux/hooks';
import {TClienteActual, TPrecioProducto, TCliente} from 'models';
import {validarUnidadesDisponibles} from 'utils/validaciones';
import {
	obtenerUnidadesMismoProducto,
	obtenerUnidadesProductoVisitaActual,
} from 'utils/methods';

export const useObtenerPromoPushDelCliente = (): TPrecioProducto[] => {
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const pedidoActual = useObtenerPedidoActual();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const datosCliente: TCliente | undefined = obtenerDatosCliente(
		clienteActual.codigoCliente
	);
	const {obtenerPedidosClienteMismaFechaEntrega} =
		useObtenerPedidosClienteMismaFechaEntrega(clienteActual.codigoCliente);
	const pedidosCliente = obtenerPedidosClienteMismaFechaEntrega(
		clienteActual.codigoCliente
	);

	const fechaEntrega: string = pedidoActual.fechaEntrega;
	const obtenerPreciosProductosDelCliente =
		useObtenerPreciosProductosDelCliente();

	if (!datosCliente) return [];

	const preciosProductosDelCliente = obtenerPreciosProductosDelCliente(
		datosCliente,
		fechaEntrega
	);

	const promoPushFiltradas =
		preciosProductosDelCliente &&
		preciosProductosDelCliente.filter(
			(producto) =>
				producto.promoPush &&
				validarUnidadesDisponibles(pedidosCliente, 0, producto) === -1
		);

	promoPushFiltradas.map(
		(producto: any, i: number) =>
			(producto.unidadesRestantes =
				producto.unidadesDisponibles -
				obtenerUnidadesProductoVisitaActual(
					pedidoActual.productos,
					producto.codigoProducto
				) -
				obtenerUnidadesMismoProducto(pedidosCliente, producto.codigoProducto))
	);

	return promoPushFiltradas.sort((a, b) =>
		a.codigoProducto > b.codigoProducto ? 1 : -1
	);
};
