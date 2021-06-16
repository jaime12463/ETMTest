import {Dispatch, SetStateAction, useCallback} from 'react';
import {useAppDispatch} from 'redux/hooks';
import {cambiarClienteActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {
	TCliente,
	TInputsFormularioAgregarProducto,
	TPreciosProductos,
} from 'models';
import {useObtenerClienteActual, useObtenerPreciosProductosDelCliente} from '.';

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
				const preciosProductosDelCliente: TPreciosProductos = obtenerPreciosProductosDelCliente(
					clienteEncontrado
				);
				setRazonSocial(clienteEncontrado.detalles.nombreComercial);
				setPreciosProductos(preciosProductosDelCliente);
			} else {
				setExisteCliente(false);
				dispatch(cambiarClienteActual({codigoCliente: ''}));
				setRazonSocial('');
				setPreciosProductos([]);
			}
		},
		[obtenerPreciosProductosDelCliente, obtenerClienteActual]
	);
	return asignarPedidoActual;
};
