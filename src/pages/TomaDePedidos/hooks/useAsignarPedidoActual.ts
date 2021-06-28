import {Dispatch, SetStateAction, useCallback} from 'react';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {
	cambiarClienteActual,
	cambiarFechaEntrega,
} from 'redux/features/pedidoActual/pedidoActualSlice';
import {
	TCliente,
	TConfiguracion,
	TInputsFormularioAgregarProducto,
	TPrecioProducto,
} from 'models';
import {useObtenerClienteActual, useObtenerPreciosProductosDelCliente} from '.';
import {selectPedidosClientes} from 'redux/features/pedidosClientes/pedidosClientesSlice';
import {useObtenerConfiguracionActual} from './useObtenerConfiguracionActual';
import {validarFechaVisita} from 'utils/validaciones';
import {obtenerFechaEntrega} from 'utils/methods';
import {Props as PropsDialogo} from 'components/Dialogo';
import {useTranslation} from 'react-i18next';

export const useAsignarPedidoActual = (
	setExisteCliente: Dispatch<SetStateAction<boolean | null>>,
	setRazonSocial: Dispatch<SetStateAction<string>>,
	setPreciosProductos: Dispatch<SetStateAction<TPrecioProducto[]>>,
	setParametrosDialogo: Dispatch<SetStateAction<PropsDialogo>>,
	setMostarDialogo: Dispatch<SetStateAction<boolean>>
) => {
	const dispatch = useAppDispatch();
	const obtenerPreciosProductosDelCliente = useObtenerPreciosProductosDelCliente();
	const obtenerClienteActual = useObtenerClienteActual();
	const obtenerConfiguracionActual = useObtenerConfiguracionActual();
	const pedidosClientes = useAppSelector(selectPedidosClientes);
	const {t} = useTranslation();
	const asignarPedidoActual = useCallback(
		({codigoCliente}: TInputsFormularioAgregarProducto) => {
			const clienteEncontrado: TCliente | undefined = obtenerClienteActual(
				codigoCliente
			);
			const configuracionActual:
				| TConfiguracion
				| undefined = obtenerConfiguracionActual();
			//TODO: Que deberia pasar si configuracionActual es undefined?
			const {esFrecuenciaAbierta}: TConfiguracion = configuracionActual;
			if (!clienteEncontrado) {
				setParametrosDialogo({
					mensaje: t('advertencias.clienteNoPortafolio'),
					manejadorClick: () => setMostarDialogo(false),
					conBotonCancelar: false,
					dataCy: 'clienteNoPortafolio',
				});
				setMostarDialogo(true);
				dispatch(cambiarClienteActual(''));
				dispatch(cambiarFechaEntrega(''));
				setRazonSocial('');
				setPreciosProductos([]);
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
				dispatch(cambiarClienteActual(''));
				dispatch(cambiarFechaEntrega(''));
				setRazonSocial('');
				setPreciosProductos([]);
				if (!esFrecuenciaAbierta) {
					setParametrosDialogo({
						mensaje: 'El cliente está fuera de frecuencia',
						manejadorClick: () => setMostarDialogo(false),
						conBotonCancelar: false,
						dataCy: 'fuera-frecuencia',
					});
					setMostarDialogo(true);
					return;
				}
				setParametrosDialogo({
					mensaje: t('advertencias.noFechaProgramada'),
					manejadorClick: () => setMostarDialogo(false),
					conBotonCancelar: false,
					dataCy: 'no-fecha-programada',
				});
				setMostarDialogo(true);
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
			obtenerConfiguracionActual,
			dispatch,
			pedidosClientes,
		]
	);
	return asignarPedidoActual;
};
