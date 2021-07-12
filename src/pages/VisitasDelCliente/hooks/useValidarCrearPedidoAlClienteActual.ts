import {useCallback} from 'react';
import {useAppDispatch} from 'redux/hooks';
import {
	TConfiguracion,
	TFunctionMostarAvertenciaPorDialogo,
	TValidacionFechaEntrega,
	TValidacionFechaVisita,
	TCliente,
	TClienteActual,
} from 'models';
import {
	useObtenerClienteActual,
	useObtenerConfiguracion,
	useObtenerDatosCliente,
} from 'hooks';
import {
	validarObtenerFechaEntrega,
	validarObtenerVisitaPlanificada,
	validarObtenerVisitaPlanificadaPosterior,
} from 'utils/validaciones';
import {useTranslation} from 'react-i18next';

export const useValidarCrearPedidoAlClienteActual = (
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo
) => {
	const dispatch = useAppDispatch();
	const configuracion = useObtenerConfiguracion();
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {t} = useTranslation();

	const validarCrearPedidoAlClienteActual = useCallback((): {
		esValidoCrearPedidoAlClienteActual: boolean;
		fechaEntrega: string;
	} => {
		let estadoValidacion = {
			esValidoCrearPedidoAlClienteActual: false,
			fechaEntrega: '',
		};
		const {esFrecuenciaAbierta}: TConfiguracion = configuracion;
		const datosCliente: TCliente | undefined = obtenerDatosCliente(
			clienteActual.codigoCliente
		);
		if (!datosCliente) return estadoValidacion;

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
			return estadoValidacion;
		}

		if (!esValidaVisitaPlanificada) {
			mostrarAdvertenciaEnDialogo(
				t('advertencias.fueraDeFrecuencia'),
				'fuera-frecuencia'
			);
			return estadoValidacion;
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
			return estadoValidacion;
		}
		estadoValidacion = {
			esValidoCrearPedidoAlClienteActual: true,
			fechaEntrega,
		};
		return estadoValidacion;
	}, [mostrarAdvertenciaEnDialogo, dispatch, configuracion]);
	return validarCrearPedidoAlClienteActual;
};
