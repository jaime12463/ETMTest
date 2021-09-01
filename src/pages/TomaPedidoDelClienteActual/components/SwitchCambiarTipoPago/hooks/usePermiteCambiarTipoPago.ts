import {
	useCalcularTotalPedido,
	useObtenerCreditoDisponible,
	useObtenerDatosCliente,
	useObtenerPedidosClienteMismaFechaEntrega,
} from 'hooks';
import {TCliente, TClienteActual, TTotalPedido} from 'models';
import {useCallback, useEffect, useState} from 'react';
import {useObtenerClienteActual} from 'redux/hooks';
import {validarTotalConMontoMaximoContado} from 'utils/validaciones';

export const usePermiteCambiarTipoPago = () => {
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const calcularTotalPedido: () => TTotalPedido = useCalcularTotalPedido();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const {creditoDisponible} = useObtenerCreditoDisponible();
	const {
		pedidosClienteMismaFechaEntrega,
	} = useObtenerPedidosClienteMismaFechaEntrega();

	const [permiteCambiarTipoPago, setPermiteCambiarTipoPago] = useState<boolean>(
		false
	);

	const validarPermiteCambiarTipoPago = useCallback(() => {
		if (!datosCliente) return;

		const totalPedidoActual = calcularTotalPedido();

		const {esCreditoBloqueado} = datosCliente.informacionCrediticia;

		const {configuracionPedido}: TCliente = datosCliente;

		const esMenorAlMontoMaximoContado: boolean = validarTotalConMontoMaximoContado(
			totalPedidoActual.totalContado.totalPrecio,
			pedidosClienteMismaFechaEntrega,
			configuracionPedido.ventaContadoMaxima?.montoVentaContadoMaxima ?? 0
		);

		const hayCreditoDisponible = creditoDisponible > 0;

		const esCondicionCreditoInformal =
			clienteActual.condicion === 'creditoInformal';

		if (
			esCondicionCreditoInformal &&
			esMenorAlMontoMaximoContado &&
			hayCreditoDisponible &&
			!esCreditoBloqueado
		)
			setPermiteCambiarTipoPago(true);
	}, [
		pedidosClienteMismaFechaEntrega,
		clienteActual,
		calcularTotalPedido,
		datosCliente,
		creditoDisponible,
	]);

	useEffect(() => {
		validarPermiteCambiarTipoPago();
	}, []);

	return permiteCambiarTipoPago;
};
