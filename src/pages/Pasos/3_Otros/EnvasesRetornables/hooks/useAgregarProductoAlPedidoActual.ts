import {useCallback} from 'react';
import {useAppDispatch} from 'redux/hooks';
import {
	agregarEnvaseDelPedidoActual,
	borrarProductoDelPedidoActual,
} from 'redux/features/visitaActual/visitaActualSlice';
import {TPrecioProducto, ETiposDePago} from 'models';

export const useAgregarProductoAlPedidoActual = () => {
	const dispatch = useAppDispatch();

	const agregarProductoAlPedidoActual = useCallback(
		(
			productoActual: TPrecioProducto | undefined,
			unidades: number,
			subUnidades: number,
			tipoPago: ETiposDePago | undefined,
			codigoTipoPedidoActual: string | undefined
		) => {
			if (!productoActual || tipoPago === undefined || !codigoTipoPedidoActual)
				return;

			dispatch(
				agregarEnvaseDelPedidoActual({
					productoPedido: {
						...productoActual,
						unidades: unidades,
						subUnidades: subUnidades,
						total:
							productoActual.precioConImpuestoUnidad * unidades +
							productoActual.precioConImpuestoSubunidad * subUnidades,
						tipoPago: tipoPago,
						catalogoMotivo: '',
						preciosBase: {
							unidad: productoActual.precioConImpuestoUnidad,
							subUnidad: productoActual.precioConImpuestoSubunidad,
						},
						preciosNeto: {
							unidad: productoActual.precioConImpuestoUnidad,
							subUnidad: productoActual.precioConImpuestoSubunidad,
						},
						preciosPromo: {
							unidad: 0,
							subUnidad: 0,
						},
						descuento: undefined,
					},
					codigoTipoPedidoActual,
				})
			);
		},
		[dispatch]
	);
	return agregarProductoAlPedidoActual;
};
