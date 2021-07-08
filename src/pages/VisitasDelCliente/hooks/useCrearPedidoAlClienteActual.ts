import {useObtenerClienteActual} from 'hooks';
import {TClienteActual} from 'models';
import {useCallback} from 'react';
import {useRouteMatch, useHistory} from 'react-router-dom';
import {inicializarPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {useAppDispatch} from 'redux/hooks';
import nombresRutas from 'routes/nombresRutas';

export const useCrearPedidoAlClienteActual = () => {
	const {path} = useRouteMatch();
	const history = useHistory();
	const dispatch = useAppDispatch();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const crearPedidoAlClienteActual = useCallback(() => {
		dispatch(
			inicializarPedidoActual({
				fechaEntrega: clienteActual.fechaEntrega,
				codigoPedido: new Date().toString(),
			})
		);
		history.push(`${path}${nombresRutas.ingresarpedido}`);
	}, [dispatch, path, history]);

	return crearPedidoAlClienteActual;
};
