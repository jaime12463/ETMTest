import {useCallback, useEffect} from 'react';
import {
	TPrecioProducto,
	TStatePreciosProductos,
	TDatosClientesProductos,
} from 'models';
import {
	useObtenerDatosCliente,
	useObtenerPreciosProductosDelCliente,
	useObtenerDatosTipoPedido,
	useObtenerPresupuestosTipoPedidoActual,
} from 'hooks';
import {
	useObtenerPedidoActual,
	useObtenerClienteActual,
	useObtenerDatos,
} from 'redux/hooks';

import {obtenerProductosHabilitados} from 'utils/methods';

export const useFiltrarPreciosProductosDelClienteActual = (
	statePreciosProductos: TStatePreciosProductos
):TPrecioProducto[] | undefined => {
	const {preciosProductos, setPreciosProductos} = statePreciosProductos;
	const obtenerPresupuestoPedidoActual =
		useObtenerPresupuestosTipoPedidoActual();
	const presupuestoPedidoActual = obtenerPresupuestoPedidoActual();
	const datos: TDatosClientesProductos = useObtenerDatos();
	const obtenerDatosTipoPedido = useObtenerDatosTipoPedido();
	const datosTipoPedidoActual = obtenerDatosTipoPedido();
	const obtenerPreciosProductosDelCliente =
		useObtenerPreciosProductosDelCliente();

	const pedidoActual = useObtenerPedidoActual();

	const clienteActual = useObtenerClienteActual();

	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	if (!datosCliente) return;

	const fechaEntrega: string = pedidoActual.fechaEntrega;

	if (!fechaEntrega) return;

	let preciosProductosDelCliente: TPrecioProducto[] = [];

	preciosProductosDelCliente =
		obtenerPreciosProductosDelCliente(datosCliente, fechaEntrega).filter(
			(producto) =>
				datosTipoPedidoActual?.tipoProductosHabilitados.includes(
					producto.tipoProducto
				)
		);

	if (
		presupuestoPedidoActual?.tieneProductosHabilitados &&
		datosTipoPedidoActual?.validaPresupuesto
	) {
		preciosProductosDelCliente = obtenerProductosHabilitados(
			preciosProductosDelCliente,
			datos.presupuestoTipoPedido,
			datosTipoPedidoActual.codigo
		);
		console.log(datosTipoPedidoActual?.codigo);
	}

	useEffect(() => {
		setPreciosProductos(preciosProductosDelCliente);
	}, []);

	const filtrarPreciosProductosDelClienteActual = ({buscador}: any) => {
		if (buscador == '') {
			setPreciosProductos(preciosProductosDelCliente);
			return;
		}

		const preciosProductosFiltrados: TPrecioProducto[] =
			preciosProductosDelCliente.filter(
				(precioProducto: TPrecioProducto) =>
					precioProducto.codigoProducto.toString().includes(buscador) ||
					precioProducto.nombreProducto
						.toLowerCase()
						.includes(buscador.toLowerCase())
			);

		setPreciosProductos(preciosProductosFiltrados);
	};

	return preciosProductosDelCliente;
};
