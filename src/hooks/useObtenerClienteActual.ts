import {TCliente} from 'models';
import {useCallback} from 'react';
import {useAppSelector} from 'redux/hooks';
import {selectDatos} from 'redux/features/datos/datosSlice';

export const useObtenerClienteActual = () => {
	const {datos} = useAppSelector(selectDatos);
	const obtenerClienteActual = useCallback(
		(codigoCliente: string) => {
			const clienteEncontrado: TCliente | undefined =
				datos.clientes[codigoCliente];
			return clienteEncontrado;
		},
		[datos]
	);
	return obtenerClienteActual;
};
