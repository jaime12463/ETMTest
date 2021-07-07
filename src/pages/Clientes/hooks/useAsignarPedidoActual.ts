import {useCallback} from 'react';
import {useAppDispatch} from 'redux/hooks';
import {inicializarPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {
	TCliente,
	TConfiguracion,
	TFunctionMostarAvertenciaPorDialogo,
	TValidacionFechaEntrega,
	TValidacionFechaVisita,
	TInputsCodigoCliente,
} from 'models';
import {useObtenerClienteActual, useObtenerConfiguracionActual} from 'hooks';
import {
	validarObtenerFechaEntrega,
	validarObtenerVisitaPlanificada,
	validarObtenerVisitaPlanificadaPosterior,
} from 'utils/validaciones';
import {useTranslation} from 'react-i18next';
import {useRouteMatch, useHistory} from 'react-router-dom';
import nombresRutas from 'routes/nombresRutas';

export const useAsignarPedidoActual = (
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo
) => {
	const {path} = useRouteMatch();
	const dispatch = useAppDispatch();
	const obtenerClienteActual = useObtenerClienteActual();
	const configuracionActual = useObtenerConfiguracionActual();
	const {t} = useTranslation();
	const history = useHistory();
	const asignarPedidoActual = useCallback(
		({codigoCliente}: TInputsCodigoCliente) => {
			const clienteEncontrado: TCliente | undefined =
				obtenerClienteActual(codigoCliente);
			const {esFrecuenciaAbierta}: TConfiguracion = configuracionActual;

			if (!clienteEncontrado) {
				mostrarAdvertenciaEnDialogo(
					t('advertencias.clienteNoPortafolio'),
					'clienteNoPortafolio'
				);
				return;
			}

			let visitaPlanificada: TValidacionFechaVisita;

			if (esFrecuenciaAbierta) {
				visitaPlanificada = validarObtenerVisitaPlanificadaPosterior(
					clienteEncontrado.visitasPlanificadas
				);
			} else {
				visitaPlanificada = validarObtenerVisitaPlanificada(
					clienteEncontrado.visitasPlanificadas
				);
			}

			const {esValidaVisitaPlanificada, fechaVisitaPlanificada} =
				visitaPlanificada;

			if (!esValidaVisitaPlanificada && esFrecuenciaAbierta) {
				mostrarAdvertenciaEnDialogo(
					t('advertencias.fueraDeFrecuencia'),
					'fuera-frecuencia'
				);
				return;
			}

			if (!esValidaVisitaPlanificada) {
				mostrarAdvertenciaEnDialogo(
					t('advertencias.fueraDeFrecuencia'),
					'fuera-frecuencia'
				);
				return;
			}

			const {esValidaFechaEntrega, fechaEntrega}: TValidacionFechaEntrega =
				validarObtenerFechaEntrega(
					fechaVisitaPlanificada,
					clienteEncontrado.fechasEntrega
				);

			if (!esValidaFechaEntrega) {
				mostrarAdvertenciaEnDialogo(
					t('advertencias.noFechaProgramada'),
					'no-fecha-programada'
				);
				return;
			}

			dispatch(
				inicializarPedidoActual({
					codigoCliente,
					fechaEntrega,
					razonSocial: clienteEncontrado.detalles[0].nombreComercial,
				})
			);
			history.push(`${path}${nombresRutas.visitaClientes}`);
		},
		[
			obtenerClienteActual,
			mostrarAdvertenciaEnDialogo,
			dispatch,
			configuracionActual,
		]
	);
	return asignarPedidoActual;
};
