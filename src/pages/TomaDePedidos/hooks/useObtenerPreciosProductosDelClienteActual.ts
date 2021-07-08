import {useCallback} from 'react';
import {useAppSelector} from 'redux/hooks';
import {selectDatos} from 'redux/features/datos/datosSlice';
import {selectPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {TPrecioProducto, TCliente} from 'models';
import {validarFechaVigenciaProducto} from 'utils/validaciones';

export const useObtenerPreciosProductosDelClienteActual = () => {
	const {datos} = useAppSelector(selectDatos);
	const pedidoActual = useAppSelector(selectPedidoActual);

	const obtenerPreciosProductosDelClienteActual = useCallback(
		(clienteEncontrado: TCliente, fechaEntrega: string): TPrecioProducto[] => {
			const preciosProductosDelCliente: TPrecioProducto[] = clienteEncontrado.portafolio
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
	return obtenerPreciosProductosDelClienteActual;
};
