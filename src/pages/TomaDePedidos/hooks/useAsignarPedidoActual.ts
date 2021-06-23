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
import {establecerFechaEntrega, verificarFrecuencia} from 'utils/methods';
import {selectPedidosClientes} from 'redux/features/pedidosClientes/pedidosClientesSlice';
import {useObtenerConfiguracionActual} from './useObtenerConfiguracionActual';

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
			if (!clienteEncontrado) {
				setExisteCliente(false);
				setFrecuenciaValida(null);
				dispatch(cambiarClienteActual(''));
				dispatch(cambiarFechaEntrega(''));
				setRazonSocial('');
				setPreciosProductos([]);
				return;
			}
			dispatch(cambiarClienteActual(codigoCliente));
			const frecuenciaValida: boolean = verificarFrecuencia(
				clienteEncontrado,
				configuracionActual
			);
			const fechaEntrega: string | undefined = establecerFechaEntrega(
				clienteEncontrado.fechasEntrega
			);
			if (!frecuenciaValida && !fechaEntrega) {
				setFrecuenciaValida(frecuenciaValida);
				setExisteCliente(null);
				setRazonSocial('');
				setPreciosProductos([]);
				return;
			}
			setFrecuenciaValida(true);
			setExisteCliente(true);
			if (!fechaEntrega) {
				setRazonSocial('');
				setPreciosProductos([]);
				return;
			}
			dispatch(cambiarFechaEntrega(fechaEntrega));
			const preciosProductosDelCliente: TPrecioProducto[] = obtenerPreciosProductosDelCliente(
				clienteEncontrado,
				fechaEntrega
			);
			setRazonSocial(clienteEncontrado.detalles.nombreComercial);
			setPreciosProductos(preciosProductosDelCliente);
			if (pedidosClientes[codigoCliente]) {
				dispatch(
					agregarProductosAlPedidoDelCliente(pedidosClientes[codigoCliente])
				);
			}
			//TODO: Cuando se busque un cliente otra vez debe ir y buscar en la lista y ponerlo en pedido actual
		},
		[
			obtenerPreciosProductosDelCliente,
			obtenerClienteActual,
			obtenerConfiguracionActual,
			dispatch,
		]
	);
	return asignarPedidoActual;
};
