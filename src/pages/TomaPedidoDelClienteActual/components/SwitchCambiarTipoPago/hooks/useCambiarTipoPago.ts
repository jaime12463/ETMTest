import {ETiposDePago, TClienteActual, TProductoPedido} from 'models';
import {useCallback} from 'react';
import {cambiarTipoPagoActual} from 'redux/features/clienteActual/clienteActualSlice';
import {
	cambiarTipoPagoPoducto,
	cambiarTipoPagoPoductosDelPedido,
} from 'redux/features/pedidoActual/pedidoActualSlice';
import {useAppDispatch, useObtenerClienteActual} from 'redux/hooks';

export const useCambiarTipoPago = () => {
	const dispatch = useAppDispatch();
	const clienteActual: TClienteActual = useObtenerClienteActual();

	const cambiarTipoPago = useCallback(
		(producto?: TProductoPedido) => {
			if (producto) {
				const tipoPago =
					producto.tipoPago === ETiposDePago.Contado
						? ETiposDePago.Credito
						: ETiposDePago.Contado;

				const {codigoProducto} = producto;

				dispatch(cambiarTipoPagoPoducto({codigoProducto, tipoPago}));
				return;
			}

			const tipoPago =
				clienteActual.tipoPagoActual === ETiposDePago.Contado
					? ETiposDePago.Credito
					: ETiposDePago.Contado;

			dispatch(cambiarTipoPagoPoductosDelPedido({tipoPago}));

			dispatch(cambiarTipoPagoActual({tipoPagoActual: tipoPago}));
		},
		[clienteActual, dispatch]
	);

	return cambiarTipoPago;
};
