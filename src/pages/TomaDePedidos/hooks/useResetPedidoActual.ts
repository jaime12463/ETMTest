import {Dispatch, SetStateAction, useCallback} from 'react';
import {resetearPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {useAppDispatch} from 'redux/hooks';
import {TInputsFormularioAgregarProducto, TPrecioProducto} from 'models';
import {UseFormSetValue} from 'react-hook-form';

export const useResetPedidoActual = (
	setPreciosProductos: Dispatch<SetStateAction<TPrecioProducto[]>>,
	resetLineaActual: () => void,
	setValue: UseFormSetValue<TInputsFormularioAgregarProducto>
) => {
	const dispatch = useAppDispatch();
	const resetPedidoActual = useCallback(() => {
		resetLineaActual();
		setPreciosProductos([]);
		dispatch(resetearPedidoActual());
		setValue('productoABuscar', '');
	}, []);
	return resetPedidoActual;
};
