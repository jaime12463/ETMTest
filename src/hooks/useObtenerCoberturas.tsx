import {useObtenerDatosCliente} from 'hooks';
import {TCoberturas} from 'models';
import {useObtenerClienteActual} from 'redux/hooks';

export const useObtenerCoberturas = (): TCoberturas[] => {
	const clienteActual = useObtenerClienteActual();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);

	return datosCliente?.coberturas ?? [];
};
