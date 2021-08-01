import {useCallback} from 'react';
import {useAppSelector} from 'redux/hooks';
import {selectDatos} from 'redux/features/datos/datosSlice';
import {selectPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {TPrecioProducto, TCliente} from 'models';
import {validarFechaVigenciaProducto} from 'utils/validaciones';

export const useObtenerPreciosProductosDelCliente = () => {
	const {datos} = useAppSelector(selectDatos);
	const pedidoActual = useAppSelector(selectPedidoActual);

	const obtenerPreciosProductosDelCliente = useCallback(
		(clienteEncontrado: TCliente, fechaEntrega: string): TPrecioProducto[] => {
			let codigoImplicito1, codigoImplicito2:number | undefined;
			let nombreImplicito1, nombreImplicito2:string | undefined;
			const preciosProductosDelCliente: TPrecioProducto[] = clienteEncontrado.portafolio
				.filter((producto) => {
					if (validarFechaVigenciaProducto(producto.precios, fechaEntrega))
						return producto;
				})
				.map((productoFiltrado) => {
					codigoImplicito1= (typeof datos.productos[productoFiltrado.codigoProducto].implicito1 !== 'undefined') 
										? datos.productos[productoFiltrado.codigoProducto].implicito1 
										: undefined;
					nombreImplicito1= codigoImplicito1 != null ? datos.productos[codigoImplicito1].nombre : undefined;
					
					codigoImplicito2= (typeof datos.productos[productoFiltrado.codigoProducto].implicito2 !== 'undefined') 
										? datos.productos[productoFiltrado.codigoProducto].implicito2 
										: undefined;
					nombreImplicito2= codigoImplicito2 != null ? datos.productos[codigoImplicito2].nombre : undefined;

					return {
						...productoFiltrado,
						nombre: datos.productos[productoFiltrado.codigoProducto].nombre,
						presentacion:
							datos.productos[productoFiltrado.codigoProducto].presentacion,
						codigoImplicito1: codigoImplicito1,
						nombreImplicito1: nombreImplicito1,
						codigoImplicito2: codigoImplicito2,
						nombreImplicito2: nombreImplicito2,
					};
				});
			return preciosProductosDelCliente;
		},
		[datos, pedidoActual]
	);
	return obtenerPreciosProductosDelCliente;
};
