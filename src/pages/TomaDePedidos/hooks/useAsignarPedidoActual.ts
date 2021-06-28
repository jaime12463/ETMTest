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
} from 'models';
import {useObtenerClienteActual, useObtenerPreciosProductosDelCliente} from '.';
import {selectPedidosClientes} from 'redux/features/pedidosClientes/pedidosClientesSlice';
import {useObtenerConfiguracionActual} from './useObtenerConfiguracionActual';
import {validarFechaVisita} from 'utils/validaciones';
import {obtenerFechaEntrega} from 'utils/methods';
import {useTranslation} from 'react-i18next';

export const useAsignarPedidoActual = (
	setExisteCliente: Dispatch<SetStateAction<boolean | null>>,
	setRazonSocial: Dispatch<SetStateAction<string>>,
	setPreciosProductos: Dispatch<SetStateAction<TPrecioProducto[]>>,
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo,
	resetPedidoActual: any
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
			setExisteCliente(true);
			//TODO: Validaciones
			//Validar que exista una fecha de visita planificada (mayor o igual si es frecuencia abierta) igual (frecuencia cerrada) a la fecha del dispositivo
			//obtener fecha de visita
			//Validar que la fecha de visita que encontro exista en fechas de entrega (fecha de visita)
			//obtener fecha entrega
			const esFechaVisitaEncontrada: boolean = validarFechaVisita(
				clienteEncontrado,
				esFrecuenciaAbierta
			);
			if (!esFechaVisitaEncontrada) {
				resetPedidoActual();
				if (!esFrecuenciaAbierta) {
					mostrarAdvertenciaEnDialogo(
						'El cliente está fuera de frecuencia',
						'fuera-frecuencia'
					);
					return;
				}
				mostrarAdvertenciaEnDialogo(
					t('advertencias.noFechaProgramada'),
					'no-fecha-programada'
				);
				return;
			}
			const fechaEntrega: string = obtenerFechaEntrega(
				clienteEncontrado.fechasEntrega
			);
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
