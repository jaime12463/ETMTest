import {TCliente} from 'models';
import {useCallback} from 'react';
import {useAppSelector} from 'redux/hooks';
import {selectDatos} from 'redux/features/datos/datosSlice';

export const useObtenerDatosCliente = (
	codigoCliente?: string
): {
	datosCliente: TCliente | undefined;
	obtenerDatosCliente: (codigoClienteEntrante: string) => TCliente | undefined;
} => {
	const {datos} = useAppSelector(selectDatos);

	const obtenerDatosCliente = useCallback(
		(codigoClienteEntrante: string) => {
			const clienteEncontrado: TCliente | undefined =
				datos.clientes[codigoClienteEntrante];
			return clienteEncontrado;
		},
		[datos]
	);

	const datosCliente = obtenerDatosCliente(codigoCliente ?? '');

	return {datosCliente, obtenerDatosCliente};
};
