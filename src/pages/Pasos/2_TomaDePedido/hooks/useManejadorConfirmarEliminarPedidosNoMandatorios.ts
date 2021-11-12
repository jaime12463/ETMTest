import {useCallback} from 'react';
import {TPedido, TProductoPedido} from 'models';
import {
	borrarProductosDeVisitaActual,
	borrarProductoDelPedidoActual,
} from 'redux/features/visitaActual/visitaActualSlice';
import {useAppDispatch, useObtenerVisitaActual} from 'redux/hooks';

export const useManejadorConfirmarEliminarPedidosNoMandatorios = (
	noMandatorios: TPedido[],
	codigoProductoActual?: number | undefined,
	productos?: TProductoPedido[]
) => {
	const dispatch = useAppDispatch();

	const manejadorConfirmarEliminarPedidosNoMandatorios = useCallback(
		(oprimioBotonAceptar: boolean) => {
			if (oprimioBotonAceptar) {
				noMandatorios.forEach((pedido: TPedido) => {
					dispatch(
						borrarProductosDeVisitaActual({
							tipoPedidoActual: pedido.tipoPedido,
						})
					);
				});
				if (codigoProductoActual !== undefined) {
					dispatch(
						borrarProductoDelPedidoActual({
							codigoProducto: codigoProductoActual,
						})
					);
				}
				if (productos) {
					for (const producto of productos) {
						borrarProductoDelPedidoActual({
							codigoProducto: producto.codigoProducto,
						});
					}
				}
			}
		},
		[noMandatorios, productos, codigoProductoActual]
	);

	return manejadorConfirmarEliminarPedidosNoMandatorios;
};
