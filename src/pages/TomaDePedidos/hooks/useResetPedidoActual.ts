import {Dispatch, SetStateAction, useCallback} from 'react';
import {resetearPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {useAppDispatch} from 'redux/hooks';
import {TPrecioProducto} from 'models';

export const useResetPedidoActual = (
	setPreciosProductos: Dispatch<SetStateAction<TPrecioProducto[]>>,
	resetLineaActual: () => void,
	setPedidosClientes: Dispatch<SetStateAction<number>>
) => {
	const dispatch = useAppDispatch();
	const resetPedidoActual = useCallback(() => {
		resetLineaActual();
		setPreciosProductos([]);
		dispatch(resetearPedidoActual());
		setPedidosClientes(0);
	}, []);
	return resetPedidoActual;
};
