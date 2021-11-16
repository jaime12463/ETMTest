import {ETiposDePago, TClienteActual, TProductoPedido} from 'models';
import {useCallback} from 'react';
import {cambiarTipoPagoActual} from 'redux/features/clienteActual/clienteActualSlice';
import {
	cambiarTipoPagoPoductoDelPedidoActual,
	cambiarTipoPagoPoductosDelPedidoActual,
} from 'redux/features/visitaActual/visitaActualSlice';
import {useAppDispatch, useObtenerClienteActual} from 'redux/hooks';

export const useCambiarTipoPago = () => {
	const dispatch = useAppDispatch();
	const clienteActual: TClienteActual = useObtenerClienteActual();

	const cambiarTipoPago = useCallback(
		(
			producto?: TProductoPedido,
			setPromoPushTemporal?: React.Dispatch<React.SetStateAction<ETiposDePago>>
		) => {
			if (producto) {
				const tipoPago =
					producto.tipoPago === ETiposDePago.Contado
						? ETiposDePago.Credito
						: ETiposDePago.Contado;

				const {codigoProducto} = producto;

				dispatch(
					cambiarTipoPagoPoductoDelPedidoActual({codigoProducto, tipoPago})
				);
				return;
			} else if (setPromoPushTemporal && !producto) {
				setPromoPushTemporal((prevPromo) =>
					prevPromo === ETiposDePago.Contado
						? ETiposDePago.Credito
						: ETiposDePago.Contado
				);
				return;
			}
			const tipoPago =
				clienteActual.tipoPagoActual === ETiposDePago.Contado
					? ETiposDePago.Credito
					: ETiposDePago.Contado;

			dispatch(cambiarTipoPagoPoductosDelPedidoActual({tipoPago}));

			dispatch(cambiarTipoPagoActual({tipoPagoActual: tipoPago}));
		},
		[clienteActual, dispatch]
	);

	return cambiarTipoPago;
};
