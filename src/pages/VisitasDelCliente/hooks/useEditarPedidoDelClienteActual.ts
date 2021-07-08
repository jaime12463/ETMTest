import {useObtenerClienteActual} from 'hooks';
import {TClienteActual, TPedidoClienteParaEnviar} from 'models';
import {useCallback} from 'react';
import {useRouteMatch, useHistory} from 'react-router-dom';
import {inicializarPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {useAppDispatch} from 'redux/hooks';
import nombresRutas from 'routes/nombresRutas';
import {useObtenerPedidoRealizadoDelClienteActual} from '.';

export const useEditarPedidoDelClienteActual = () => {
	const {path} = useRouteMatch();
	const history = useHistory();
	const dispatch = useAppDispatch();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const obtenerPedidoRealizadoDelClienteActual = useObtenerPedidoRealizadoDelClienteActual();
	const editarPedidoDelClienteActual = useCallback(
		(codigoPedido: string) => {
			const pedidoRealizadoDelClienteActual:
				| TPedidoClienteParaEnviar
				| undefined = obtenerPedidoRealizadoDelClienteActual(codigoPedido);
			if (pedidoRealizadoDelClienteActual) {
				const {
					fechaEntrega,
					estado,
					productosPedido,
				} = pedidoRealizadoDelClienteActual;
				dispatch(
					inicializarPedidoActual({
						fechaEntrega,
						codigoPedido,
						estado,
						productosPedido,
					})
				);
				history.push(`${path}${nombresRutas.ingresarpedido}`);
			}
		},
		[dispatch, path, history]
	);

	return editarPedidoDelClienteActual;
};
