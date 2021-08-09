import {
	useCalcularTotalPedido,
	useObtenerCreditoDisponible,
	useObtenerDatosCliente,
	useObtenerPedidosClienteMismaFechaEntrega,
} from 'hooks';
import {
	TCliente,
	TClienteActual,
	TTotalPedido,
} from 'models';
import {useCallback, useEffect, useState} from 'react';
import {
	useObtenerClienteActual,
} from 'redux/hooks';
import {validarTotalConMontoMaximoContado} from 'utils/validaciones';

export const usePermiteCambiarTipoPago = () => {
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const totalPedidoActual: TTotalPedido = useCalcularTotalPedido();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const { creditoDisponible } = useObtenerCreditoDisponible();
	const { pedidosClienteMismaFechaEntrega } = useObtenerPedidosClienteMismaFechaEntrega();
	
	const [permiteCambiarTipoPago, setPermiteCambiarTipoPago] = useState<boolean>(false)

	const validarPermiteCambiarTipoPago = useCallback(() => {
					
		if (!datosCliente) return;
			
		const { configuracionPedido }: TCliente = datosCliente;
		
		const esMenorAlMontoMaximoContado: boolean = validarTotalConMontoMaximoContado(
			totalPedidoActual.totalContado.totalPrecio,
			pedidosClienteMismaFechaEntrega,
			configuracionPedido.ventaContadoMaxima.montoVentaContadoMaxima
		);

		const hayCreditoDisponible = creditoDisponible > 0;

		const esCondicionCredito = clienteActual.condicion === 'creditoInformal';

		if (esCondicionCredito && esMenorAlMontoMaximoContado && hayCreditoDisponible)
			setPermiteCambiarTipoPago(true);
	}, [
		pedidosClienteMismaFechaEntrega,
		clienteActual,
		totalPedidoActual,
		datosCliente,
		creditoDisponible
	]);

	useEffect(() => {
		validarPermiteCambiarTipoPago();
	}, [])

	return permiteCambiarTipoPago;
};
