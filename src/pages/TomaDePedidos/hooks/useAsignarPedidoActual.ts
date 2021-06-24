import {Dispatch, SetStateAction, useCallback} from 'react';
import {useAppDispatch, useAppSelector} from 'redux/hooks';

import {
	agregarProductosAlPedidoDelCliente,
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

export const useAsignarPedidoActual = (
	setExisteCliente: Dispatch<SetStateAction<boolean | null>>,
	setRazonSocial: Dispatch<SetStateAction<string>>,
	setPreciosProductos: Dispatch<SetStateAction<TPrecioProducto[]>>,
	setFrecuenciaValida: Dispatch<SetStateAction<boolean | null>>
) => {
	const dispatch = useAppDispatch();
	const obtenerPreciosProductosDelCliente = useObtenerPreciosProductosDelCliente();
	const obtenerClienteActual = useObtenerClienteActual();
	const obtenerConfiguracionActual = useObtenerConfiguracionActual();
	const pedidosClientes = useAppSelector(selectPedidosClientes);

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
				setExisteCliente(false);
				setFrecuenciaValida(null);
				dispatch(cambiarClienteActual(''));
				dispatch(cambiarFechaEntrega(''));
				setRazonSocial('');
				setPreciosProductos([]);
				return;
			}
			setExisteCliente(true);
			const esFechaVisitaEncontrada: boolean = validarFechaVisita(
				clienteEncontrado,
				esFrecuenciaAbierta
			);
			if (!esFechaVisitaEncontrada) {
				setFrecuenciaValida(esFrecuenciaAbierta);
				dispatch(cambiarClienteActual(''));
				dispatch(cambiarFechaEntrega(''));
				setRazonSocial('');
				setPreciosProductos([]);
				return;
			}
			const fechaEntrega: string = obtenerFechaEntrega(
				clienteEncontrado.fechasEntrega
			);
			const preciosProductosDelCliente: TPrecioProducto[] = obtenerPreciosProductosDelCliente(
				clienteEncontrado,
				fechaEntrega
			);
			setFrecuenciaValida(null);
			setRazonSocial(clienteEncontrado.detalles.nombreComercial);
			dispatch(cambiarClienteActual(codigoCliente));
			dispatch(cambiarFechaEntrega(fechaEntrega));
			setPreciosProductos(preciosProductosDelCliente);
			if (pedidosClientes[codigoCliente]) {
				dispatch(
					agregarProductosAlPedidoDelCliente(pedidosClientes[codigoCliente])
				);
			}
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
