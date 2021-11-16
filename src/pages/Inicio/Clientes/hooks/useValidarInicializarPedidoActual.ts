import {useCallback} from 'react';
import {useAppDispatch} from 'redux/hooks';
import {
	TConfiguracion,
	TFunctionMostarAvertenciaPorDialogo,
	TValidacionFechaEntrega,
	TValidacionFechaVisita,
	TCliente,
	TPrecioProducto,
} from 'models';
import {useMostrarAviso, useObtenerPreciosProductosDelCliente} from 'hooks';
import {useObtenerConfiguracion} from 'redux/hooks';
import {
	validarObtenerFechaEntrega,
	validarObtenerVisitaPlanificada,
	validarObtenerVisitaPlanificadaPosterior,
} from 'utils/validaciones';
import {useTranslation} from 'react-i18next';

export const useValidarInicializarPedidoActual = (
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo
) => {
	const dispatch = useAppDispatch();

	const configuracion = useObtenerConfiguracion();

	const obtenerPreciosProductosDelCliente =
		useObtenerPreciosProductosDelCliente();

	const {t} = useTranslation();

	const mostrarAviso = useMostrarAviso();

	const validarInicializarPedidoActual = useCallback(
		(
			datosCliente: TCliente
		): {
			esValidoInicializarPedidoActual: boolean;
			fechaEntrega: string;
			fechaVisitaPlanificada: string;
		} => {
			let estadoValidacion = {
				esValidoInicializarPedidoActual: false,
				fechaEntrega: '',
				fechaVisitaPlanificada: '',
			};

			const {esFrecuenciaAbierta}: TConfiguracion = configuracion;

			if (!datosCliente) {
				// mostrarAdvertenciaEnDialogo(
				// 	t('advertencias.no-datos-cliente'),
				// 	'no-datos-cliente'
				// );
				mostrarAviso(
					'error',
					t('advertencias.no-datos-cliente'),
					'no-datos-cliente'
				);
				return estadoValidacion;
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

			const {esValidaVisitaPlanificada, fechaVisitaPlanificada} =
				visitaPlanificada;

			if (!esValidaVisitaPlanificada && esFrecuenciaAbierta) {
				// mostrarAdvertenciaEnDialogo(
				// 	t('advertencias.noVisitaPlanificada'),
				// 	'fuera-frecuencia'
				// );
				mostrarAviso(
					'error',
					t('advertencias.noVisitaPlanificada'),
					'fuera-frecuencia'
				);
				return estadoValidacion;
			}
			if (!esValidaVisitaPlanificada) {
				// mostrarAdvertenciaEnDialogo(
				// 	t('advertencias.fueraDeFrecuencia'),
				// 	'fuera-frecuencia'
				// );
				mostrarAviso(
					'error',
					t('advertencias.fueraDeFrecuencia'),
					'fuera-frecuencia'
				);
				return estadoValidacion;
			}

			const {esValidaFechaEntrega, fechaEntrega}: TValidacionFechaEntrega =
				validarObtenerFechaEntrega(datosCliente.fechasEntrega);

			if (!esValidaFechaEntrega) {
				// mostrarAdvertenciaEnDialogo(
				// 	t('advertencias.noFechaEntregaInformada'),
				// 	'no-fecha-informada'
				// );
				mostrarAviso(
					'error',
					t('advertencias.noFechaEntregaInformada'),
					undefined,
					undefined,
					'no-fecha-informada'
				);
				return estadoValidacion;
			}

			const preciosProductosDelCliente: TPrecioProducto[] =
				obtenerPreciosProductosDelCliente(datosCliente, fechaEntrega);

			const esPortafolioPreciosProductosMayorCero: boolean =
				preciosProductosDelCliente.length > 0;

			if (!esPortafolioPreciosProductosMayorCero) {
				// mostrarAdvertenciaEnDialogo(
				// 	t('advertencias.noPortafolioPrecios'),
				// 	'no-portafolio-precios'
				// );
				mostrarAviso(
					'error',
					t('advertencias.noPortafolioPrecios'),
					undefined,
					undefined,
					'no-portafolio-precios'
				);
				return estadoValidacion;
			}

			estadoValidacion = {
				esValidoInicializarPedidoActual: true,
				fechaEntrega,
				fechaVisitaPlanificada,
			};
			return estadoValidacion;
		},
		[
			mostrarAdvertenciaEnDialogo,
			dispatch,
			configuracion,
			obtenerPreciosProductosDelCliente,
		]
	);
	return validarInicializarPedidoActual;
};
