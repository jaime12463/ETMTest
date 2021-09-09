import {ChangeEvent, useCallback} from 'react';
import {
	cambiarMostrarPromoPush,
	cambiarTipoPedidoActual,
} from 'redux/features/visitaActual/visitaActualSlice';
import {useAppDispatch} from 'redux/hooks';

export const useCambiarTipoDePedido = () => {
	const dispatch = useAppDispatch();
	const cambiarTipoDePedido = useCallback((e: ChangeEvent<any>) => {
		//TODO: Tipar y mejorar esto
		dispatch(cambiarTipoPedidoActual({tipoPedido: parseInt(e.target.value)}));
		dispatch(cambiarMostrarPromoPush({mostrarPromoPush: false}));
	}, []);
	return cambiarTipoDePedido;
};
