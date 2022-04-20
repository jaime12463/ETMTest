import {
	useCalcularTotalPedido,
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
import {useCallback} from 'react';
import {
	useObtenerClienteActual,
	useObtenerConfiguracion,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {calcularTotalPedidosClienteValorizadosPorTipoPago} from 'utils/methods';
import {validarSiExcedeAlMaximoContado} from 'utils/validaciones/validacionesDePedidos';

export const useEsPermitidoAgregarProductoAlPedido = () => {
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const calcularTotalPedido: () => TTotalPedido = useCalcularTotalPedido();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const visitaActual = useObtenerVisitaActual();
	const {tipoPedidos} = useObtenerConfiguracion();
	const {pedidosClienteMismaFechaEntrega} =
		useObtenerPedidosClienteMismaFechaEntrega();
	const validarEsPermitidoAgregarProductoAlPedido = useCallback((): boolean => {
		let esPermitidoAgregarProductoAlPedido: boolean = true;

		if (!datosCliente) return !esPermitidoAgregarProductoAlPedido;

		const {esCreditoBloqueado} = datosCliente.informacionCrediticia;

		const esCreditoFormal = clienteActual.condicion === 'creditoFormal';
		const esCreditoInformal = clienteActual.condicion === 'creditoInformal';

		const montoConsumidoPorFecha =
			datosCliente?.configuracionPedido.ventaContadoMaxima?.consumidoPorFecha.find(
				(fecha) => fecha.fechaEntrega === visitaActual.fechaEntrega
			)?.consumido || 0;

		if (esCreditoFormal && esCreditoBloqueado)
			return !esPermitidoAgregarProductoAlPedido;

		const {configuracionPedido}: TCliente = datosCliente;

		const totalContadoPedidosClienteMismaFechaEntrega =
			calcularTotalPedidosClienteValorizadosPorTipoPago({
				pedidosClienteMismaFechaEntrega,
				tipoPedidos,
				tipoPago: ETiposDePago.Contado,
			});

		let totalContadoVisitaActual = 0;

		Object.values(visitaActual.pedidos).forEach((pedido) => {
			pedido.productos.forEach((producto) => {
				if (
					producto.tipoPago === ETiposDePago.Contado &&
					tipoPedidos.find(
						(tipoPedido) => tipoPedido.codigo == pedido.tipoPedido
					)?.esValorizado
				) {
					totalContadoVisitaActual += producto.total;
				}
			});
		});

		const retornoSiExcedeAlMaximoContado: TRetornoValidacion =
			validarSiExcedeAlMaximoContado(
				configuracionPedido.ventaContadoMaxima?.montoVentaContadoMaxima ?? 0,
				totalContadoVisitaActual + montoConsumidoPorFecha,
				totalContadoPedidosClienteMismaFechaEntrega
			);

		if (
			esCreditoInformal &&
			!retornoSiExcedeAlMaximoContado.esValido &&
			esCreditoBloqueado
		)
			return !esPermitidoAgregarProductoAlPedido;

		if (!retornoSiExcedeAlMaximoContado.esValido)
			return !esPermitidoAgregarProductoAlPedido;

		return esPermitidoAgregarProductoAlPedido;
	}, [
		clienteActual,
		calcularTotalPedido,
		datosCliente,
		pedidosClienteMismaFechaEntrega,
	]);

	return {
		validarEsPermitidoAgregarProductoAlPedido,
	};
};
