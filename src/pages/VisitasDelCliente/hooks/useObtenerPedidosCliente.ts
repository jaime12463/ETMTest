import {useCallback} from 'react';
import {TPedidoClienteParaEnviar, TPedidosClientes} from 'models';
import {useObtenerPedidosClientes} from 'hooks';

export const useObtenerPedidosCliente = (
	codigoCliente: string
): TPedidoClienteParaEnviar[] => {
	const pedidosClientes: TPedidosClientes = useObtenerPedidosClientes();
	const obtenerPedidosCliente = useCallback((): TPedidoClienteParaEnviar[] => {
		let pedidosCliente: TPedidoClienteParaEnviar[] = [];
		if (pedidosClientes[codigoCliente])
			pedidosCliente = pedidosClientes[codigoCliente];
		return pedidosCliente;
	}, [pedidosClientes, codigoCliente]);

	const pedidosCliente = obtenerPedidosCliente();

	return pedidosCliente;
};
