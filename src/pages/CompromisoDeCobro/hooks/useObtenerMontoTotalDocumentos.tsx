import {useMemo} from 'react';
import {TCliente, TClienteActual} from 'models';
import {useObtenerDatosCliente} from 'hooks';
import {useObtenerClienteActual} from 'redux/hooks';

export const useObtenerMontoTotalDocumentos = () => {
	const {obtenerDatosCliente} = useObtenerDatosCliente();

	const clienteActual: TClienteActual = useObtenerClienteActual();
	const datosCliente: TCliente | undefined = obtenerDatosCliente(
		clienteActual.codigoCliente
	);

	const resultado = datosCliente?.informacionCrediticia?.documentos?.reduce(
		(total, documento) => (total += documento.monto),
		0
	);

	return resultado !== undefined ? resultado : 0;
};
