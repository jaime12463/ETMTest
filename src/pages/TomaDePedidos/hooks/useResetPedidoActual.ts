import {Dispatch, SetStateAction, useCallback} from 'react';
import {resetearPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {useAppDispatch} from 'redux/hooks';
import {TPrecioProducto} from 'models';

export const useResetPedidoActual = (
	setPreciosProductos: Dispatch<SetStateAction<TPrecioProducto[]>>,
	setRazonSocial: Dispatch<SetStateAction<string>>,
	resetLineaActual: () => void
) => {
	const dispatch = useAppDispatch();
	const resetPedidoActual = useCallback(() => {
		resetLineaActual();
		setRazonSocial('');
		setPreciosProductos([]);
		dispatch(resetearPedidoActual());
	}, []);
	return resetPedidoActual;
};
