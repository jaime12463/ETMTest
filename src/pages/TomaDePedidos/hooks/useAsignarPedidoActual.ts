import {Dispatch, SetStateAction, useCallback} from 'react';
import {useAppDispatch} from 'redux/hooks';

import {
	cambiarClienteActual,
	cambiarFechaEntrega,
} from 'redux/features/pedidoActual/pedidoActualSlice';
import {
	TCliente,
	TFechaEntrega,
	TInputsFormularioAgregarProducto,
	TPreciosProductos,
} from 'models';
import {useObtenerClienteActual, useObtenerPreciosProductosDelCliente} from '.';
import {establecerFechaEntrega} from 'utils/methods';

export const useAsignarPedidoActual = (
	setExisteCliente: Dispatch<SetStateAction<boolean | null>>,
	setRazonSocial: Dispatch<SetStateAction<string>>,
	setPreciosProductos: Dispatch<SetStateAction<TPreciosProductos>>
) => {
	const dispatch = useAppDispatch();
	const obtenerPreciosProductosDelCliente = useObtenerPreciosProductosDelCliente();
	const obtenerClienteActual = useObtenerClienteActual();
	const asignarPedidoActual = useCallback(
		({codigoCliente}: TInputsFormularioAgregarProducto) => {
			const clienteEncontrado: TCliente | undefined = obtenerClienteActual(
				codigoCliente
			);
			if (clienteEncontrado) {
				const fechaEntrega: string | undefined = establecerFechaEntrega(
					clienteEncontrado.fechasEntrega
				);
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
				} else {
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
		[obtenerPreciosProductosDelCliente, obtenerClienteActual, dispatch]
	);
	return asignarPedidoActual;
};
