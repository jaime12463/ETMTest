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
	TPreciosProductos,
} from 'models';
import {useObtenerClienteActual, useObtenerPreciosProductosDelCliente} from '.';
import {establecerFechaEntrega, verificarFrecuencia} from 'utils/methods';
import {selectPedidosClientes} from 'redux/features/pedidosClientes/pedidosClientesSlice';
import {useObtenerConfiguracionActual} from './useObtenerConfiguracionActual';

export const useAsignarPedidoActual = (
	setExisteCliente: Dispatch<SetStateAction<boolean | null>>,
	setRazonSocial: Dispatch<SetStateAction<string>>,
	setPreciosProductos: Dispatch<SetStateAction<TPreciosProductos>>,
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

			// TODO: metodo para validar frecuencia
			if (clienteEncontrado && configuracionActual) {
				const value = verificarFrecuencia(clienteEncontrado, configuracionActual);
				if (value) {
					const fechaEntrega: string | undefined = establecerFechaEntrega(
						clienteEncontrado.fechasEntrega
					);
					setFrecuenciaValida(true);
					setExisteCliente(true);
					dispatch(cambiarClienteActual({codigoCliente: codigoCliente}));
					dispatch(
						cambiarFechaEntrega({
							fechaEntrega: fechaEntrega,
						})
					);
					if (fechaEntrega) {
						const preciosProductosDelCliente: TPreciosProductos = obtenerPreciosProductosDelCliente(
							clienteEncontrado,
							fechaEntrega
						);
						setRazonSocial(clienteEncontrado.detalles.nombreComercial);
						setPreciosProductos(preciosProductosDelCliente);
						if (pedidosClientes[codigoCliente]) {
							dispatch(
								agregarProductosAlPedidoDelCliente({productosPedido: pedidosClientes[codigoCliente]})
							)
						}
						//TODO: Cuando se busque un cliente otra vez debe ir y buscar en la lista y ponerlo en pedido actual

					} else {
						setRazonSocial('');
						setPreciosProductos([]);
					}
				} else {
					setFrecuenciaValida(false);
					setRazonSocial('');
					setPreciosProductos([]);
				}
			} else {
				setExisteCliente(false);
				dispatch(cambiarClienteActual({codigoCliente: ''}));
				dispatch(cambiarFechaEntrega({fechaEntrega: ''}));
				setRazonSocial('');
				setPreciosProductos([]);
			}
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
