import {
	useObtenerDatosCliente,
	useObtenerPreciosProductosDelCliente,
} from 'hooks';
import {TPrecioProducto} from 'models';
import {useObtenerClienteActual, useObtenerVisitaActual} from 'redux/hooks';

export const useObtenerProductosConDescuentoEscalonado =
	(): TPrecioProducto[] => {
		const clienteActual = useObtenerClienteActual();
		const {
			fechaEntrega,
			pedidos: {venta},
		} = useObtenerVisitaActual();
		const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
		const obtenerProducto = useObtenerPreciosProductosDelCliente();
		const productos = obtenerProducto(datosCliente!, fechaEntrega);

		return productos
			.filter((producto) => {
				const existeEnElPedido = venta.productos.find(
					(p) => p.codigoProducto === producto.codigoProducto
				);

				return !existeEnElPedido && !!producto.descuentoEscalonado;
			})
			.sort((a, b) => (a.codigoProducto > b.codigoProducto ? 1 : -1));
	};
