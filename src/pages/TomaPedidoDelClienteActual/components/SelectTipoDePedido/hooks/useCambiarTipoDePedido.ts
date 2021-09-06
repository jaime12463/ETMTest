import {ChangeEvent, useCallback} from 'react';
import {cambiarTipoPedidoActual} from 'redux/features/visitaActual/visitaActualSlice';
import {useAppDispatch} from 'redux/hooks';

export const useCambiarTipoDePedido = () => {
	const dispatch = useAppDispatch();
	const cambiarTipoDePedido = useCallback((e: ChangeEvent<any>) => {
		//TODO: Tipar y mejorar esto
		dispatch(cambiarTipoPedidoActual({tipoPedido: parseInt(e.target.value)}));
	}, []);
	return cambiarTipoDePedido;
};
