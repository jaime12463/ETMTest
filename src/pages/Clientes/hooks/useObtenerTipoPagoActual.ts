import {ETiposDePago, TCliente, TTotalPedido} from 'models';
import {
	useCalcularTotalPedido,
	useObtenerCreditoDisponible,
	useObtenerDatosCliente,
	useObtenerPedidosClienteMismaFechaEntrega,
} from 'hooks';
import {useCallback} from 'react';
import {validarTotalConMontoMaximoContado} from 'utils/validaciones';

export const useObtenerTipoPagoActual = () => {
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const {obtenerCreditoDisponible} = useObtenerCreditoDisponible();
	const {
		obtenerPedidosClienteMismaFechaEntrega,
	} = useObtenerPedidosClienteMismaFechaEntrega();

	const obtenerTipoPagoActual = useCallback(
		(codigoCliente: string): ETiposDePago => {
			const datosCliente = obtenerDatosCliente(codigoCliente);

			let tipoPagoActual: ETiposDePago = ETiposDePago.Contado;

			if (datosCliente?.informacionCrediticia.condicion === 'contado') {
				tipoPagoActual = ETiposDePago.Contado;
				return tipoPagoActual;
			}

			if (datosCliente?.informacionCrediticia.condicion === 'creditoFormal') {
				tipoPagoActual = ETiposDePago.Credito;
				return tipoPagoActual;
			}

			const creditoDisponible = obtenerCreditoDisponible(codigoCliente);

			const hayCreditoDisponible = creditoDisponible > 0;

			const pedidosClienteMismaFechaEntrega = obtenerPedidosClienteMismaFechaEntrega(
				codigoCliente
			);

			if (!datosCliente) return tipoPagoActual;

			const {configuracionPedido}: TCliente = datosCliente;

			const {esCreditoBloqueado} = datosCliente.informacionCrediticia;

			const esMenorAlMontoMaximoContado: boolean = validarTotalConMontoMaximoContado(
				0,
				pedidosClienteMismaFechaEntrega,
				configuracionPedido.ventaContadoMaxima?.montoVentaContadoMaxima ?? 0
			);

			tipoPagoActual = ETiposDePago.Credito;

			if (
				esMenorAlMontoMaximoContado &&
				(!hayCreditoDisponible || esCreditoBloqueado)
			)
				tipoPagoActual = ETiposDePago.Contado;

			return tipoPagoActual;
		},
		[
			obtenerDatosCliente,
			obtenerCreditoDisponible,
			obtenerPedidosClienteMismaFechaEntrega,
		]
	);

	return {obtenerTipoPagoActual};
};
