import {useCallback} from 'react';
import {useAppDispatch} from 'redux/hooks';
import {
	TFunctionMostarAvertenciaPorDialogo,
	TInputsCodigoCliente,
	TCliente,
} from 'models';
import {useObtenerConfiguracion} from 'hooks';
import {useRouteMatch, useHistory} from 'react-router-dom';
import nombresRutas from 'routes/nombresRutas';
import {inicializarClienteActual} from 'redux/features/clienteActual/clienteActualSlice';
import {useValidarAsignarClienteActual} from '.';

export const useAsignarClienteActual = (
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo
) => {
	const {path} = useRouteMatch();
	const dispatch = useAppDispatch();
	const configuracion = useObtenerConfiguracion();
	const validarAsignarClienteActual = useValidarAsignarClienteActual(
		mostrarAdvertenciaEnDialogo
	);
	const history = useHistory();
	const asignarClienteActual = useCallback(
		({codigoCliente}: TInputsCodigoCliente) => {
			const {
				esValidoAsignarClienteActual,
				datosCliente,
			} = validarAsignarClienteActual(codigoCliente);
			if (!esValidoAsignarClienteActual) return;
			if (!datosCliente) return;
			dispatch(
				inicializarClienteActual({
					codigoCliente,
					razonSocial: datosCliente.detalles[0].nombreComercial,
				})
			);
			history.push(`${path}${nombresRutas.visitaClientes}`);
		},
		[mostrarAdvertenciaEnDialogo, dispatch, configuracion]
	);
	return asignarClienteActual;
};
