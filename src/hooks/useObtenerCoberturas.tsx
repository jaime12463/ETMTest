import {useObtenerDatosCliente} from 'hooks';
import {TCoberturas, TPedidosClientes} from 'models';
import {useObtenerClienteActual, useObtenerPedidosClientes} from 'redux/hooks';

export const useObtenerCoberturas = (): TCoberturas[] => {
	const clienteActual = useObtenerClienteActual();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const pedidosClientes: TPedidosClientes = useObtenerPedidosClientes();
	const coberturas = datosCliente?.coberturas ?? [];
	const coberturasCumplidas =
		pedidosClientes[clienteActual.codigoCliente]?.coberturas ?? [];

	const coberturasHabilitadas = coberturas.filter(
		(cobertura) =>
			!coberturasCumplidas.find(
				(coberturaCumplida) =>
					coberturaCumplida.idGrupoCobertura === cobertura.grupoCobertura
			)
	);

	return coberturasHabilitadas.sort(
		(a, b) => a.secuenciaGrupoCobertura - b.secuenciaGrupoCobertura
	);
};
