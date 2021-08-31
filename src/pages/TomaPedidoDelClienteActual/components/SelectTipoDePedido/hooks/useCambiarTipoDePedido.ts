import {ChangeEvent, useCallback} from 'react';
import {cambiarTipoPedido} from 'redux/features/pedidoActual/pedidoActualSlice';
import {useAppDispatch} from 'redux/hooks';

export const useCambiarTipoDePedido = () => {
	const dispatch = useAppDispatch();
	const cambiarTipoDePedido = useCallback((e: ChangeEvent<any>) => {
		dispatch(cambiarTipoPedido({tipoPedido: parseInt(e.target.value)}));
	}, []);
	return cambiarTipoDePedido;
};
