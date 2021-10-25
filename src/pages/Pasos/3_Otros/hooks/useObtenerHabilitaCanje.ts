import {TCliente, TClienteActual} from 'models';
import {
	useObtenerCreditoDisponible,
	useObtenerDatosCliente,
	useObtenerPedidosClienteMismaFechaEntrega,
} from 'hooks';
import {
	useObtenerClienteActual,
	useObtenerConfiguracion,
	useObtenerVisitaActual,
	useAppDispatch,
} from 'redux/hooks';

export const useObtenerHabilitaCanje = () => {
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const datosCliente = obtenerDatosCliente(clienteActual.codigoCliente);
	if (!datosCliente) return;
	const {configuracionPedido}: TCliente = datosCliente;

	return configuracionPedido.canjeHabilitado;
};
