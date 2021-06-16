import {Dispatch, SetStateAction, useCallback} from 'react';
import {useAppDispatch, useAppSelector} from 'redux/hooks';

import {
	cambiarClienteActual,
	cambiarFechaEntrega,
} from 'redux/features/pedidoActual/pedidoActualSlice';
import {
	TCliente,
	TConfiguracion,
	TFechaEntrega,
	TInputsFormularioAgregarProducto,
	TPreciosProductos,
} from 'models';
import {useObtenerClienteActual, useObtenerPreciosProductosDelCliente} from '.';
import {establecerFechaEntrega, verificarFrecuencia} from 'utils/methods';
import {selectDatos} from 'redux/features/configuracion/configuracionSlice';
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
	const {datos} = useAppSelector(selectDatos);

	const asignarPedidoActual = useCallback(
		({codigoCliente}: TInputsFormularioAgregarProducto) => {
			console.log(datos);
			const clienteEncontrado: TCliente | undefined = obtenerClienteActual(
				codigoCliente
			);
			const configuracionActual:
				| TConfiguracion
				| undefined = obtenerConfiguracionActual();

			// TODO: metodo para validar frecuencia
			const value = verificarFrecuencia(clienteEncontrado, configuracionActual);
			console.log(value);
			if (clienteEncontrado) {
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
