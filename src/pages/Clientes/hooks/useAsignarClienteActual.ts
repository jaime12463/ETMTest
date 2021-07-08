import {useCallback} from 'react';
import {useAppDispatch} from 'redux/hooks';
import {
	TConfiguracion,
	TFunctionMostarAvertenciaPorDialogo,
	TValidacionFechaEntrega,
	TValidacionFechaVisita,
	TInputsCodigoCliente,
	TCliente,
} from 'models';
import {useObtenerConfiguracion, useObtenerDatosCliente} from 'hooks';
import {
	validarObtenerFechaEntrega,
	validarObtenerVisitaPlanificada,
	validarObtenerVisitaPlanificadaPosterior,
} from 'utils/validaciones';
import {useTranslation} from 'react-i18next';
import {useRouteMatch, useHistory} from 'react-router-dom';
import nombresRutas from 'routes/nombresRutas';
import {inicializarClienteActual} from 'redux/features/clienteActual/clienteActualSlice';

export const useAsignarClienteActual = (
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo
) => {
	const {path} = useRouteMatch();
	const dispatch = useAppDispatch();
	const configuracion = useObtenerConfiguracion();
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const {t} = useTranslation();
	const history = useHistory();
	const asignarClienteActual = useCallback(
		({codigoCliente}: TInputsCodigoCliente) => {
			const {esFrecuenciaAbierta}: TConfiguracion = configuracion;
			const datosCliente: TCliente | undefined = obtenerDatosCliente(
				codigoCliente
			);
			if (!datosCliente) {
				mostrarAdvertenciaEnDialogo(
					t('advertencias.clienteNoPortafolio'),
					'clienteNoPortafolio'
				);
				return;
			}

			let visitaPlanificada: TValidacionFechaVisita;

			if (esFrecuenciaAbierta) {
				visitaPlanificada = validarObtenerVisitaPlanificadaPosterior(
					datosCliente.visitasPlanificadas
				);
			} else {
				visitaPlanificada = validarObtenerVisitaPlanificada(
					datosCliente.visitasPlanificadas
				);
			}

			const {
				esValidaVisitaPlanificada,
				fechaVisitaPlanificada,
			} = visitaPlanificada;

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

			const {
				esValidaFechaEntrega,
				fechaEntrega,
			}: TValidacionFechaEntrega = validarObtenerFechaEntrega(
				fechaVisitaPlanificada,
				datosCliente.fechasEntrega
			);

			if (!esValidaFechaEntrega) {
				mostrarAdvertenciaEnDialogo(
					t('advertencias.noFechaProgramada'),
					'no-fecha-programada'
				);
				return;
			}

			dispatch(
				inicializarClienteActual({
					codigoCliente,
					fechaEntrega,
					razonSocial: datosCliente.detalles[0].nombreComercial,
				})
			);
			history.push(`${path}${nombresRutas.visitaClientes}`);
		},
		[mostrarAdvertenciaEnDialogo, dispatch, configuracion]
	);
	return asignarClienteActual;
};
