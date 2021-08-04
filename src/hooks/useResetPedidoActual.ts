import {useCallback} from 'react';
import {resetearPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {useAppDispatch} from 'redux/hooks';

export const useResetPedidoActual = (
) => {
	const dispatch = useAppDispatch();
	const resetPedidoActual = useCallback(() => {
		dispatch(resetearPedidoActual());
	}, []);
	return resetPedidoActual;
};
