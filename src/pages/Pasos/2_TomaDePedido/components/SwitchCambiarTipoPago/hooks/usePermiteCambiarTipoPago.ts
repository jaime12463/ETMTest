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
	TRetornoValidacion,
	ETiposDePago,
} from 'models';
import {useCallback, useEffect, useState} from 'react';
import {
	useObtenerClienteActual,
	useObtenerConfiguracion,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {calcularTotalPedidosClienteValorizadosPorTipoPago} from 'utils/methods';
import {validarSiExcedeAlMaximoContado} from 'utils/validaciones/validacionesDePedidos';

export const usePermiteCambiarTipoPago = () => {
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const calcularTotalPedido: () => TTotalPedido = useCalcularTotalPedido();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const {creditoDisponible} = useObtenerCreditoDisponible();
	const {pedidosClienteMismaFechaEntrega} =
		useObtenerPedidosClienteMismaFechaEntrega();
	const visitaActual = useObtenerVisitaActual();

	const [permiteCambiarTipoPago, setPermiteCambiarTipoPago] =
		useState<boolean>(false);
	const {tipoPedidos} = useObtenerConfiguracion();
	const validarPermiteCambiarTipoPago = useCallback(() => {
		if (!datosCliente) return;

		const totalPedidoActual = calcularTotalPedido();

		const {esCreditoBloqueado} = datosCliente.informacionCrediticia;

		const {configuracionPedido}: TCliente = datosCliente;

		const totalContadoPedidosClienteMismaFechaEntrega =
			calcularTotalPedidosClienteValorizadosPorTipoPago({
				pedidosClienteMismaFechaEntrega,
				tipoPedidos,
				tipoPago: ETiposDePago.Contado,
			});

		const montoConsumidoPorFecha =
			datosCliente?.configuracionPedido.ventaContadoMaxima?.consumidoPorFecha.find(
				(fecha) => fecha.fechaEntrega === visitaActual.fechaEntrega
			)?.consumido || 0;

		const retornoSiExcedeAlMaximoContado: TRetornoValidacion =
			validarSiExcedeAlMaximoContado(
				configuracionPedido.ventaContadoMaxima?.montoVentaContadoMaxima ?? 0,
				totalPedidoActual.totalContado.totalPrecio + montoConsumidoPorFecha,
				totalContadoPedidosClienteMismaFechaEntrega
			);

		const hayCreditoDisponible = creditoDisponible > 0;

		const esCondicionCreditoInformal =
			clienteActual.condicion === 'creditoInformal';

		if (
			esCondicionCreditoInformal &&
			retornoSiExcedeAlMaximoContado.esValido &&
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
