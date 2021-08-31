import {useCallback} from 'react';
import {inicializarPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {useAppDispatch} from 'redux/hooks';
import {v4 as uuidv4} from 'uuid';

export const useInicializarPedidoActual = () => {
	const dispatch = useAppDispatch();
	const useInicializarPedidoActual = useCallback(
		(fechaEntrega: string) => {
			dispatch(
				inicializarPedidoActual({
					fechaEntrega: fechaEntrega,
					codigoPedido: uuidv4(),
					tipoPedido: 1, //TODO: Inicializar tipo pedido
				})
			);
		},
		[dispatch]
	);

	return useInicializarPedidoActual;
};
