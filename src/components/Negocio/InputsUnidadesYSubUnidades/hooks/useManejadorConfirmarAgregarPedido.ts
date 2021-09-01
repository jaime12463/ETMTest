import {
	TFormTomaDePedido,
	TPrecioProducto,
	TClienteActual,
	TStateInputFocus,
} from 'models';
import {useCallback} from 'react';
import {UseFormGetValues} from 'react-hook-form';
import {editarProductoDelPedidoActual} from 'redux/features/visitaActual/visitaActualSlice';
import {useAppDispatch} from 'redux/hooks';

export const useManejadorConfirmarAgregarPedido = (
	productoActual: TPrecioProducto | null,
	clienteActual: TClienteActual,
	getValues: UseFormGetValues<TFormTomaDePedido>,
	stateInputFocus: TStateInputFocus,
	resetLineaActual: () => void
) => {
	const dispatch = useAppDispatch();

	const manejadorConfirmarAgregarPedido = useCallback(
		(oprimioBotonAceptar: boolean) => {
			if (oprimioBotonAceptar) {
				const {setInputFocus} = stateInputFocus;

				const {unidades, subUnidades} = getValues();

				const unidadesParseado: number =
					unidades !== '' ? parseInt(unidades) : 0;

				const subUnidadesParseado: number =
					subUnidades !== '' ? parseInt(subUnidades) : 0;

				if (!productoActual) return;

				dispatch(
					editarProductoDelPedidoActual({
						productoPedido: {
							...productoActual,
							unidades: unidadesParseado,
							subUnidades: subUnidadesParseado,
							total:
								productoActual.precioConImpuestoUnidad * unidadesParseado +
								productoActual.precioConImpuestoSubunidad * subUnidadesParseado,
							tipoPago: clienteActual.tipoPagoActual,
						},
					})
				);

				setInputFocus('productoABuscar');

				resetLineaActual();
			}
		},
		[productoActual]
	);
	return manejadorConfirmarAgregarPedido;
};
