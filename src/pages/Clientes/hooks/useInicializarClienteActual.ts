import {useCallback} from 'react';
import {useAppDispatch} from 'redux/hooks';
import {
	TFunctionMostarAvertenciaPorDialogo,
	TInputsCodigoCliente,
} from 'models';
import {useObtenerConfiguracion} from 'redux/hooks';
import {useRouteMatch, useHistory} from 'react-router-dom';
import nombresRutas from 'routes/nombresRutas';
import {inicializarClienteActual} from 'redux/features/clienteActual/clienteActualSlice';
import {useValidarInicializarClienteActual} from '.';
import {useInicializarPedidoActual} from './useInicializarPedidoActual';
import {useValidarInicializarPedidoActual} from './useValidarInicializarPedidoActual';

export const useInicializarClienteActual = (
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo
) => {
	const {path} = useRouteMatch();

	const dispatch = useAppDispatch();

	const configuracion = useObtenerConfiguracion();

	const validarInicializarClienteActual = useValidarInicializarClienteActual(
		mostrarAdvertenciaEnDialogo
	);

	const inicializarPedidoActual = useInicializarPedidoActual();

	const validarInicializarPedidoActual = useValidarInicializarPedidoActual(
		mostrarAdvertenciaEnDialogo
	);

	const history = useHistory();

	const asignarClienteActual = useCallback(
		({codigoCliente}: TInputsCodigoCliente) => {
			const {
				esValidoInicializarClienteActual,
				datosCliente,
			} = validarInicializarClienteActual(codigoCliente);

			if (!esValidoInicializarClienteActual) return;

			if (!datosCliente) return;

			const {
				esValidoInicializarPedidoActual,
				fechaEntrega,
			} = validarInicializarPedidoActual(datosCliente);

			if (!esValidoInicializarPedidoActual) return;

			dispatch(
				inicializarClienteActual({
					codigoCliente,
					razonSocial: datosCliente.detalles[0].nombreComercial,
				})
			);

			inicializarPedidoActual(fechaEntrega);
			history.push(`${path}${nombresRutas.ingresarpedido}`);
		},
		[mostrarAdvertenciaEnDialogo, dispatch, configuracion]
	);
	return asignarClienteActual;
};
