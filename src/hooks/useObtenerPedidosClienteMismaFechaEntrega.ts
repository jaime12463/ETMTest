import {
	useObtenerClienteActual,
	useObtenerPedidosClientes,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {
	EEstadosDeUnPedido,
	TClienteActual,
	TPedidoClienteParaEnviar,
	TPedidosClientes,
	TVisita,
} from 'models';
import {useCallback} from 'react';

export const useObtenerPedidosClienteMismaFechaEntrega = (
	codigoCliente?: string
) => {
	const clienteActual: TClienteActual = useObtenerClienteActual();

	const pedidosClientes: TPedidosClientes = useObtenerPedidosClientes();

	const visitaActual: TVisita = useObtenerVisitaActual();

	const obtenerPedidosClienteMismaFechaEntrega = useCallback(
		(codigoClienteEntrante: string, fechaEntrega?: string) => {
			const pedidosCliente: TPedidoClienteParaEnviar[] =
				pedidosClientes[codigoClienteEntrante]?.pedidos;

			let pedidosClienteMismaFechaEntrega: TPedidoClienteParaEnviar[] = [];

			if (pedidosCliente) {
				pedidosClienteMismaFechaEntrega = pedidosCliente.filter(
					(pedidoCliente: TPedidoClienteParaEnviar) =>
						pedidoCliente.fechaEntrega ===
							(fechaEntrega ?? visitaActual.fechaEntrega) &&
						pedidoCliente.estado === EEstadosDeUnPedido.Activo
				);
			}

			return pedidosClienteMismaFechaEntrega;
		},
		[pedidosClientes, visitaActual, clienteActual]
	);

	const pedidosClienteMismaFechaEntrega = obtenerPedidosClienteMismaFechaEntrega(
		codigoCliente ?? clienteActual.codigoCliente
	);

	return {
		pedidosClienteMismaFechaEntrega,
		obtenerPedidosClienteMismaFechaEntrega,
	};
};
