import {useCallback} from 'react';
import {TPedido} from 'models';
import {
	borrarProductosDeVisitaActual,
	borrarProductoDelPedidoActual,
} from 'redux/features/visitaActual/visitaActualSlice';
import {useAppDispatch, useObtenerVisitaActual} from 'redux/hooks';

export const useManejadorConfirmarEliminarPedidosNoMandatorios = (
	noMandatorios: TPedido[],
	codigoProductoActual: number | undefined
) => {
	//if (!codigoProductoActual) return;
	const dispatch = useAppDispatch();

	console.log('entro1')

	const manejadorConfirmarEliminarPedidosNoMandatorios = useCallback(
		(oprimioBotonAceptar: boolean) => {
			if (oprimioBotonAceptar && codigoProductoActual) {
				noMandatorios.forEach((pedido: TPedido) => {
					dispatch(
						borrarProductosDeVisitaActual({
							tipoPedidoActual: pedido.tipoPedido,
						})
					);
				});

				dispatch(
					borrarProductoDelPedidoActual({codigoProducto: codigoProductoActual})
				);
			}
		},
		[noMandatorios, codigoProductoActual]
	);

	return manejadorConfirmarEliminarPedidosNoMandatorios;
};
