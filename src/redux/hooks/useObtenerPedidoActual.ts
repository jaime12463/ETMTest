import {TPedido} from 'models';
import {useAppSelector} from 'redux/hooks';
import {selectVisitaActual} from 'redux/features/visitaActual/visitaActualSlice';

export const useObtenerPedidoActual = (): TPedido => {
	const {pedidos, tipoPedidoActual} = useAppSelector(selectVisitaActual);
	const pedidoActual = pedidos[tipoPedidoActual];
	return pedidoActual;
};
