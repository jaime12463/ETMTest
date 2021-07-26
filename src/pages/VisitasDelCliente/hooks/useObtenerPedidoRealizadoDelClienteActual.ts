import {
	TClienteActual,
	TPedidosClientes,
	TPedidoClienteParaEnviar,
} from 'models';
import {useObtenerClienteActual, useObtenerPedidosClientes} from 'redux/hooks';
import {useCallback} from 'react';

export const useObtenerPedidoRealizadoDelClienteActual = (): ((
	codigoPedido: string
) => TPedidoClienteParaEnviar | undefined) => {
	const pedidosClientes: TPedidosClientes = useObtenerPedidosClientes();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const obtenerPedidoRealizadoDelClienteActual = useCallback(
		(codigoPedido: string): TPedidoClienteParaEnviar | undefined => {
			const pedidosClienteActual: TPedidoClienteParaEnviar[] | undefined =
				pedidosClientes[clienteActual.codigoCliente];
			const pedidoClienteActual:
				| TPedidoClienteParaEnviar
				| undefined = pedidosClienteActual?.find(
				(pedidoCliente) => pedidoCliente.codigoPedido === codigoPedido
			);
			return pedidoClienteActual;
		},
		[clienteActual, pedidosClientes]
	);
	return obtenerPedidoRealizadoDelClienteActual;
};
