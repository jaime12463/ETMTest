import {ETiposDePago, TProductoPedido} from 'models';
import {cambiarTipoPagoPoducto} from 'redux/features/pedidoActual/pedidoActualSlice';
import {useAppDispatch} from 'redux/hooks';

export const useCambiarTipoPago = () => {
	const dispatch = useAppDispatch();
	const cambiarTipoPago = (producto?: TProductoPedido) => {
		//se debe tener algo que general indique en que esta el swicht principal,
		//asi tambien los nuevos productos respetan eso
		if (producto) {
			const tipoPago =
				producto.tipoPago === ETiposDePago.Contado
					? ETiposDePago.Credito
					: ETiposDePago.Contado;

			const {codigoProducto} = producto;

			dispatch(cambiarTipoPagoPoducto({codigoProducto, tipoPago}));
			return;
		}
	};
	return cambiarTipoPago;
};
