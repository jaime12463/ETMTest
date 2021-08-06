import {ETiposDePago, TProductoPedido} from 'models';
import {agregarProductoAlPedidoDelCliente} from 'redux/features/pedidoActual/pedidoActualSlice';
import {useAppDispatch} from 'redux/hooks';

export const useCambiarTipoPago = () => {
	const dispatch = useAppDispatch();
	const cambiarTipoPago = (producto?: TProductoPedido) => {
		if (producto) {
			const productoActual = {...producto};

			const tipoDePagoCambio =
				productoActual.tipoPago === ETiposDePago.Contado
					? ETiposDePago.Credito
					: ETiposDePago.Contado;
			productoActual.tipoPago = tipoDePagoCambio;

			dispatch(agregarProductoAlPedidoDelCliente(productoActual));
			return;
		}
	};
	return cambiarTipoPago;
};
