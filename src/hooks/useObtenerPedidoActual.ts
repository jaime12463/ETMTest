import {TPedidoCliente} from 'models';
import {useAppSelector} from 'redux/hooks';
import {selectPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';

export const useObtenerPedidoActual = () => {
	const pedidoActual: TPedidoCliente = useAppSelector(selectPedidoActual);
	return pedidoActual;
};
