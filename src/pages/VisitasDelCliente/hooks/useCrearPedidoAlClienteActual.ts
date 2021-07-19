import {TFunctionMostarAvertenciaPorDialogo} from 'models';
import {useCallback} from 'react';
import {useRouteMatch, useHistory} from 'react-router-dom';
import {inicializarPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {useAppDispatch} from 'redux/hooks';
import nombresRutas from 'routes/nombresRutas';
import {v4 as uuidv4} from 'uuid';
import {useValidarCrearPedidoAlClienteActual} from '.';

export const useCrearPedidoAlClienteActual = (
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo
) => {
	const {path} = useRouteMatch();
	const history = useHistory();
	const dispatch = useAppDispatch();
	const validarCrearPedidoAlClienteActual = useValidarCrearPedidoAlClienteActual(
		mostrarAdvertenciaEnDialogo
	);
	const crearPedidoAlClienteActual = useCallback(() => {
		const {
			esValidoCrearPedidoAlClienteActual,
			fechaEntrega,
		} = validarCrearPedidoAlClienteActual();
		if (!esValidoCrearPedidoAlClienteActual) return;
		dispatch(
			inicializarPedidoActual({
				fechaEntrega: fechaEntrega,
				codigoPedido: uuidv4(),
			})
		);
		history.push(`${path}${nombresRutas.ingresarpedido}`);
	}, [dispatch, path, history]);

	return crearPedidoAlClienteActual;
};
