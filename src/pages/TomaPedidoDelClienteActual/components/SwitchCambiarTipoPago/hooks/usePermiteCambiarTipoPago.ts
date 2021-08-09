import {
	useCalcularTotalPedido,
	useObtenerCreditoDisponible,
	useObtenerDatosCliente,
	useObtenerPedidosClienteMismaFechaEntrega,
} from 'hooks';
import {
	TCliente,
	TClienteActual,
	TPedidoActual,
	TTotalPedido,
} from 'models';
import {useCallback} from 'react';
import {
	useObtenerClienteActual,
	useObtenerPedidoActual,
} from 'redux/hooks';
import {validarTotalConMontoMaximo} from 'utils/validaciones';

export const usePermiteCambiarTipoPago = () => {
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const totalPedidoActual: TTotalPedido = useCalcularTotalPedido();
	const pedidoActual: TPedidoActual = useObtenerPedidoActual();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const { creditoDisponible } = useObtenerCreditoDisponible();
	const {pedidosClienteMismaFechaEntrega} = useObtenerPedidosClienteMismaFechaEntrega();

	const validarPermiteCambiarTipoPago = useCallback(() => {
		let permiteCambiarTipoPago: boolean = false;
					
		if (!datosCliente) return permiteCambiarTipoPago;
			
		const { configuracionPedido }: TCliente = datosCliente;
		
		const esMenorAlMontoMaximo: boolean = validarTotalConMontoMaximo(
			totalPedidoActual.totalContado.totalPrecio,
			pedidosClienteMismaFechaEntrega,
			configuracionPedido.ventaContadoMaxima.montoVentaContadoMaxima
		);

		const hayCreditoDisponible = creditoDisponible > 0;

		const esCondicionCredito = clienteActual.condicion === 'creditoInformal';

		if (esCondicionCredito && esMenorAlMontoMaximo && hayCreditoDisponible)
			permiteCambiarTipoPago = true;

		return permiteCambiarTipoPago;
	}, [
		pedidosClienteMismaFechaEntrega,
		clienteActual,
		totalPedidoActual,
		pedidoActual,
		datosCliente,
		creditoDisponible
	]);

	const permiteCambiarTipoPago: boolean = validarPermiteCambiarTipoPago();

	return permiteCambiarTipoPago;
};
