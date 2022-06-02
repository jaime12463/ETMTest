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
		datosCliente?.informacionCrediticia?.documentos ?? [];

	return [...documentosClienteActual].sort((a, b) => {
		const fechaA = a.vencimiento.split('-');
		const fechaB = b.vencimiento.split('-');

		const fechaAFormateada = new Date(
			Number(fechaA[0]),
			Number(fechaA[1]) - 1,
			Number(fechaA[2])
		);
		const fechaBFormateada = new Date(
			Number(fechaB[0]),
			Number(fechaB[1]) - 1,
			Number(fechaB[2])
		);

		return fechaAFormateada.getTime() - fechaBFormateada.getTime();
	});
};
