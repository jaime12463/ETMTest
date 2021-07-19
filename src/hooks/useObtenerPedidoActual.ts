import {TPedidoActual} from 'models';
import {useAppSelector} from 'redux/hooks';
import {selectPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';

export const useObtenerPedidoActual = (): TPedidoActual => {
	const pedidoActual: TPedidoActual = useAppSelector(selectPedidoActual);
	return pedidoActual;
};
