import {
	useCalcularTotalPedido,
	useObtenerCreditoDisponible,
	useObtenerDatosCliente,
} from 'hooks';
import {
	EEstadosDeUnPedido,
	TCliente,
	TClienteActual,
	TPedidoActual,
	TPedidoClienteParaEnviar,
	TPedidosClientes,
	TTotalPedido,
} from 'models';
import {useCallback} from 'react';
import {
	useObtenerClienteActual,
	useObtenerPedidoActual,
	useObtenerPedidosClientes,
} from 'redux/hooks';
import {validarTotalConMontoMaximo} from 'utils/validaciones';

export const usePermiteCambiarTipoPago = () => {
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const totalPedidoActual: TTotalPedido = useCalcularTotalPedido();
	const pedidosClientes: TPedidosClientes = useObtenerPedidosClientes();
	const pedidoActual: TPedidoActual = useObtenerPedidoActual();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const obtenerCreditoDisponible = useObtenerCreditoDisponible();

	const validarPermiteCambiarTipoPago = useCallback(() => {
		let permiteCambiarTipoPago: boolean = false;
		const {condicion} = clienteActual;

		const pedidosCliente: TPedidoClienteParaEnviar[] | undefined =
			pedidosClientes[clienteActual.codigoCliente];

		let pedidosClienteMismaFechaEntrega: TPedidoClienteParaEnviar[] = [];

		if (!datosCliente) return permiteCambiarTipoPago;

		const {configuracionPedido}: TCliente = datosCliente;

		if (pedidosCliente) {
			pedidosClienteMismaFechaEntrega = pedidosCliente.filter(
				(pedidoCliente: TPedidoClienteParaEnviar) =>
					pedidoCliente.fechaEntrega === pedidoActual.fechaEntrega &&
					pedidoCliente.codigoPedido !== pedidoActual.codigoPedido &&
					pedidoCliente.estado === EEstadosDeUnPedido.Activo
			);
		}

		const esMenorAlMontoMaximo: boolean = validarTotalConMontoMaximo(
			totalPedidoActual.totalPrecio,
			pedidosClienteMismaFechaEntrega,
			configuracionPedido.ventaContadoMaxima.montoVentaContadoMaxima
		);

		const creditoDisponible: number = obtenerCreditoDisponible();
		const hayCreditoDisponible = creditoDisponible > 0;

		if (condicion && esMenorAlMontoMaximo && hayCreditoDisponible)
			permiteCambiarTipoPago = true;

		return permiteCambiarTipoPago;
	}, [
		clienteActual,
		totalPedidoActual,
		pedidosClientes,
		pedidoActual,
		datosCliente,
	]);

	const permiteCambiarTipoPago: boolean = validarPermiteCambiarTipoPago();

	return permiteCambiarTipoPago;
};
