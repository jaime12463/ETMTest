import { useCalcularPresupuestoTipoPedido } from 'hooks';
import {ChangeEvent, useCallback} from 'react';
import {
	cambiarMostrarPromoPush,
	cambiarTipoPedidoActual,
	cambiarTipoPagoPoductoDelPedidoActual,
} from 'redux/features/visitaActual/visitaActualSlice';
import {useAppDispatch} from 'redux/hooks';

export const useCambiarTipoDePedido = () => {
	const dispatch = useAppDispatch();
	const calcularPresupuestoTipoPedido = useCalcularPresupuestoTipoPedido();
	const cambiarTipoDePedido = useCallback((e: ChangeEvent<any>) => {
		const tipoPedido=  parseInt(e.target.value)
		const presupuestoTipoPedidoSaldo = calcularPresupuestoTipoPedido(tipoPedido);
		//TODO: Tipar y mejorar esto
		dispatch(cambiarTipoPedidoActual({tipoPedido}));
		dispatch(cambiarTipoPedidoActual({tipoPedido}));
		dispatch(cambiarMostrarPromoPush({mostrarPromoPush: false}));
		

	}, []);
	return cambiarTipoDePedido;
};
