import {useCallback} from 'react';
import {useAppSelector} from 'redux/hooks';
import {selectDatos} from 'redux/features/datos/datosSlice';
import {selectPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {TPreciosProductos, TCliente} from 'models';
import {validarFechaVigenciaProducto} from 'utils/validaciones';

export const useObtenerPreciosProductosDelCliente = () => {
	const {datos} = useAppSelector(selectDatos);
	const pedidoActual = useAppSelector(selectPedidoActual);

	const obtenerPreciosProductosDelCliente = useCallback(
		(clienteEncontrado: TCliente, fechaEntrega: string): TPreciosProductos => {
			const preciosProductosDelCliente: TPreciosProductos = clienteEncontrado.portafolio
				.filter((producto) => {
					if (validarFechaVigenciaProducto(producto.precios, fechaEntrega))
						return producto;
				})
				.map((productoFiltrado) => {
					return {
						...productoFiltrado,
						nombre: datos.productos[productoFiltrado.codigoProducto].nombre,
						presentacion:
							datos.productos[productoFiltrado.codigoProducto].presentacion,
					};
				});
			return preciosProductosDelCliente;
		},
		[datos, pedidoActual]
	);
	return obtenerPreciosProductosDelCliente;
};
