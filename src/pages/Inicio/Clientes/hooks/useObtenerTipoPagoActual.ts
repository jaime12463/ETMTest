import {ETiposDePago, TCliente, TRetornoValidacion} from 'models';
import {
	useObtenerCreditoDisponible,
	useObtenerDatosCliente,
	useObtenerPedidosClienteMismaFechaEntrega,
} from 'hooks';
import {calcularTotalPedidosClienteValorizadosPorTipoPago} from 'utils/methods';
import {useCallback} from 'react';
import {validarSiExcedeAlMaximoContado} from 'utils/validaciones/validacionesDePedidos';
import {
	useObtenerClienteActual,
	useObtenerConfiguracion,
	useObtenerVisitaActual,
} from 'redux/hooks';

export const useObtenerTipoPagoActual = () => {
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const {obtenerCreditoDisponible} = useObtenerCreditoDisponible();
	const {obtenerPedidosClienteMismaFechaEntrega} =
		useObtenerPedidosClienteMismaFechaEntrega();
	const {tipoPedidos} = useObtenerConfiguracion();

	const clienteActual = useObtenerClienteActual();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const visitaActual = useObtenerVisitaActual();

	const montoConsumidoPorFecha =
		datosCliente?.configuracionPedido.ventaContadoMaxima?.consumidoPorFecha.find(
			(fecha) => fecha.fechaEntrega === visitaActual.fechaEntrega
		)?.consumido || 0;

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

			const pedidosClienteMismaFechaEntrega =
				obtenerPedidosClienteMismaFechaEntrega(codigoCliente);

			if (!datosCliente) return tipoPagoActual;

			const {configuracionPedido}: TCliente = datosCliente;

			const {esCreditoBloqueado} = datosCliente.informacionCrediticia;

			const totalContadoPedidosClienteMismaFechaEntrega =
				calcularTotalPedidosClienteValorizadosPorTipoPago({
					pedidosClienteMismaFechaEntrega,
					tipoPedidos,
					tipoPago: ETiposDePago.Contado,
				});

			const retornoSiExcedeAlMaximoContado: TRetornoValidacion =
				validarSiExcedeAlMaximoContado(
					configuracionPedido.ventaContadoMaxima?.montoVentaContadoMaxima ?? 0,
					montoConsumidoPorFecha,
					totalContadoPedidosClienteMismaFechaEntrega
				);

			tipoPagoActual = ETiposDePago.Credito;

			if (
				retornoSiExcedeAlMaximoContado.esValido &&
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
