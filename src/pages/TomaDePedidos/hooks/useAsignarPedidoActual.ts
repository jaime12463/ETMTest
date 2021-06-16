import {Dispatch, SetStateAction, useCallback} from 'react';
import {useAppDispatch} from 'redux/hooks';

import {
	cambiarClienteActual,
	cambiarFechaEntrega,
} from 'redux/features/pedidoActual/pedidoActualSlice';
import {
	TCliente,
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
				setExisteCliente(true);
				dispatch(cambiarClienteActual({codigoCliente: codigoCliente}));
				dispatch(
					cambiarFechaEntrega({
						fechaEntrega: establecerFechaEntrega(
							clienteEncontrado.fechasEntrega
						),
					})
				);

				const preciosProductosDelCliente: TPreciosProductos = obtenerPreciosProductosDelCliente(
					clienteEncontrado
				);
				setRazonSocial(clienteEncontrado.detalles.nombreComercial);
				setPreciosProductos(preciosProductosDelCliente);
			} else {
				setExisteCliente(false);
				dispatch(cambiarClienteActual({codigoCliente: ''}));
				dispatch(cambiarFechaEntrega({fechaEntrega: ''}));

				setRazonSocial('');
				setPreciosProductos([]);
			}
		},
		[obtenerPreciosProductosDelCliente, obtenerClienteActual]
	);
	return asignarPedidoActual;
};
