import {useObtenerDatosCliente} from 'hooks';
import {useObtenerClienteActual} from 'redux/hooks';
import {TClienteActual, TCliente} from 'models';

export const useObtenerDeudasDelClienteActual = () => {
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const datosCliente: TCliente | undefined = obtenerDatosCliente(
		clienteActual.codigoCliente
	);
	const documentosClienteActual =
		datosCliente?.informacionCrediticia?.documentos;

	return documentosClienteActual;
};
