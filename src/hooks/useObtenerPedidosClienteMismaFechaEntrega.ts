import {
	useObtenerClienteActual,
	useObtenerPedidosClientes,
	useObtenerPedidoActual,
} from 'redux/hooks';
import {
	EEstadosDeUnPedido,
	TClienteActual,
	TPedidoClienteParaEnviar,
	TPedidosClientes,
	TPedidoActual,
} from 'models';
import {useCallback} from 'react';

export const useObtenerPedidosClienteMismaFechaEntrega = (
	codigoCliente?: string
) => {
	const clienteActual: TClienteActual = useObtenerClienteActual();

	const pedidosClientes: TPedidosClientes = useObtenerPedidosClientes();

	const pedidoActual: TPedidoActual = useObtenerPedidoActual();

	const obtenerPedidosClienteMismaFechaEntrega = useCallback(
		(codigoClienteEntrante: string) => {
			const pedidosCliente: TPedidoClienteParaEnviar[] =
				pedidosClientes[codigoClienteEntrante]?.pedidos;

			let pedidosClienteMismaFechaEntrega: TPedidoClienteParaEnviar[] = [];

			if (pedidosCliente) {
				pedidosClienteMismaFechaEntrega = pedidosCliente.filter(
					(pedidoCliente: TPedidoClienteParaEnviar) =>
						pedidoCliente.fechaEntrega === pedidoActual.fechaEntrega &&
						pedidoCliente.codigoPedido !== pedidoActual.codigoPedido &&
						pedidoCliente.estado === EEstadosDeUnPedido.Activo
				);
			}

			return pedidosClienteMismaFechaEntrega;
		},
		[pedidosClientes, pedidoActual, clienteActual]
	);

	const pedidosClienteMismaFechaEntrega = obtenerPedidosClienteMismaFechaEntrega(
		codigoCliente ?? clienteActual.codigoCliente
	);

	return {
		pedidosClienteMismaFechaEntrega,
		obtenerPedidosClienteMismaFechaEntrega,
	};
};
