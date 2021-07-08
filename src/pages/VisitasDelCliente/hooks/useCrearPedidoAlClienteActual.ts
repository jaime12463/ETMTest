import {useObtenerClienteActual} from 'hooks';
import {TClienteActual} from 'models';
import {useCallback} from 'react';
import {useRouteMatch, useHistory} from 'react-router-dom';
import {inicializarPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {useAppDispatch} from 'redux/hooks';
import nombresRutas from 'routes/nombresRutas';
import {v4 as uuidv4} from 'uuid';

export const useCrearPedidoAlClienteActual = () => {
	const {path} = useRouteMatch();
	const history = useHistory();
	const dispatch = useAppDispatch();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const crearPedidoAlClienteActual = useCallback(() => {
		dispatch(
			inicializarPedidoActual({
				fechaEntrega: clienteActual.fechaEntrega,
				codigoPedido: uuidv4(),
			})
		);
		history.push(`${path}${nombresRutas.ingresarpedido}`);
	}, [dispatch, path, history]);

	return crearPedidoAlClienteActual;
};
