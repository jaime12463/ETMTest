import {Dispatch, SetStateAction, useCallback} from 'react';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {
	cambiarClienteActual,
	cambiarFechaEntrega,
} from 'redux/features/pedidoActual/pedidoActualSlice';
import {
	TCliente,
	TConfiguracion,
	TFunctionMostarAvertenciaPorDialogo,
	TInputsFormularioAgregarProducto,
	TPrecioProducto,
	TValidacionFechaEntrega,
	TValidacionFechaVisita,
} from 'models';
import {useObtenerClienteActual, useObtenerPreciosProductosDelCliente} from '.';
import {selectPedidosClientes} from 'redux/features/pedidosClientes/pedidosClientesSlice';
import {useObtenerConfiguracionActual} from './useObtenerConfiguracionActual';
import {
	validarObtenerFechaEntrega,
	validarObtenerVisitaPlanificada,
	validarObtenerVisitaPlanificadaPosterior,
} from 'utils/validaciones';
import {useTranslation} from 'react-i18next';

export const useAsignarPedidoActual = (
	setRazonSocial: Dispatch<SetStateAction<string>>,
	setPreciosProductos: Dispatch<SetStateAction<TPrecioProducto[]>>,
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo,
	resetPedidoActual: () => void
) => {
	const dispatch = useAppDispatch();
	const obtenerPreciosProductosDelCliente = useObtenerPreciosProductosDelCliente();
	const obtenerClienteActual = useObtenerClienteActual();
	const configuracionActual = useObtenerConfiguracionActual();
	const pedidosClientes = useAppSelector(selectPedidosClientes);
	const {t} = useTranslation();
	const asignarPedidoActual = useCallback(
		({codigoCliente}: TInputsFormularioAgregarProducto) => {
			const clienteEncontrado: TCliente | undefined = obtenerClienteActual(
				codigoCliente
			);
			const {esFrecuenciaAbierta}: TConfiguracion = configuracionActual;
			if (!clienteEncontrado) {
				resetPedidoActual();
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

			const {
				esValidaVisitaPlanificada,
				fechaVisitaPlanificada,
			} = visitaPlanificada;

			if (!esValidaVisitaPlanificada && esFrecuenciaAbierta) {
				resetPedidoActual();
				mostrarAdvertenciaEnDialogo(
					t('advertencias.fueraDeFrecuencia'),
					'fuera-frecuencia'
				);
				return;
			}

			if (!esValidaVisitaPlanificada) {
				resetPedidoActual();
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
				clienteEncontrado.fechasEntrega
			);

			if (!esValidaFechaEntrega) {
				resetPedidoActual();
				mostrarAdvertenciaEnDialogo(
					t('advertencias.noFechaProgramada'),
					'no-fecha-programada'
				);
				return;
			}

			const preciosProductosDelCliente: TPrecioProducto[] = obtenerPreciosProductosDelCliente(
				clienteEncontrado,
				fechaEntrega
			);
			setRazonSocial(clienteEncontrado.detalles.nombreComercial);
			dispatch(cambiarClienteActual(codigoCliente));
			dispatch(cambiarFechaEntrega(fechaEntrega));
			setPreciosProductos(preciosProductosDelCliente);
		},
		[
			obtenerPreciosProductosDelCliente,
			obtenerClienteActual,
			mostrarAdvertenciaEnDialogo,
			dispatch,
			configuracionActual,
			pedidosClientes,
		]
	);
	return asignarPedidoActual;
};
