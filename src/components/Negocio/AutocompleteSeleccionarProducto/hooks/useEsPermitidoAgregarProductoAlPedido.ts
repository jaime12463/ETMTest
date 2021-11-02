import {
	useCalcularTotalPedido,
	useObtenerDatosCliente,
	useObtenerDatosTipoPedido,
	useObtenerPedidosClienteMismaFechaEntrega,
} from 'hooks';
import {
	TCliente,
	TClienteActual,
	TPedido,
	TTipoPedido,
	TTotalPedido,
	TRetornoValidacion,
	ETiposDePago,
} from 'models';
import {useCallback} from 'react';
import {
	useObtenerClienteActual,
	useObtenerConfiguracion,
	useObtenerPedidosClientes,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {calcularTotalPedidosClienteValorizadosPorTipoPago} from 'utils/methods';
import {validarSiExcedeAlMaximoContado} from 'utils/validaciones/validacionesDePedidos';

export const useEsPermitidoAgregarProductoAlPedido = () => {
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const calcularTotalPedido: () => TTotalPedido = useCalcularTotalPedido();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const configuracion = useObtenerConfiguracion();
	const pedidosClientes = useObtenerPedidosClientes();
	const visitaActual = useObtenerVisitaActual();
	const obtenerDatosTipoPedido = useObtenerDatosTipoPedido();
	const {tipoPedidos} = useObtenerConfiguracion();
	const {pedidosClienteMismaFechaEntrega} =
		useObtenerPedidosClienteMismaFechaEntrega();
	const validarEsPermitidoAgregarProductoAlPedido = useCallback((): boolean => {
		let esPermitidoAgregarProductoAlPedido: boolean = true;

		if (!datosCliente) return !esPermitidoAgregarProductoAlPedido;

		const {esCreditoBloqueado} = datosCliente.informacionCrediticia;

		const esCreditoFormal = clienteActual.condicion === 'creditoFormal';
		const esCreditoInformal = clienteActual.condicion === 'creditoInformal';

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
				totalContadoVisitaActual,
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

		const HayPedidosMandatoriosRegistrados: boolean = pedidosClientes[
			clienteActual.codigoCliente
		]?.pedidos.some((pedido) => {
			const datosTipoPedido: TTipoPedido | undefined =
				configuracion.tipoPedidos.find(
					(tipoPedido) => tipoPedido.codigo === pedido.tipoPedido
				);
			if (!datosTipoPedido) return false;
			return (
				datosTipoPedido.esMandatorio &&
				pedido.fechaEntrega === visitaActual.fechaEntrega
			);
		});

		const HayPedidosMandatoriosEnCurso: boolean = Object.values(
			visitaActual.pedidos
		).some((pedido: TPedido) => {
			const datosTipoPedido: TTipoPedido | undefined =
				configuracion.tipoPedidos.find(
					(tipoPedido) => tipoPedido.codigo === pedido.tipoPedido
				);

			if (!datosTipoPedido) return false;
			return (
				datosTipoPedido.esMandatorio &&
				pedido.fechaEntrega === visitaActual.fechaEntrega &&
				pedido.productos.length !== 0
			);
		});

		const datosTipoPedidoActual = obtenerDatosTipoPedido();
		/* 		if (
			!HayPedidosMandatoriosRegistrados &&
			!HayPedidosMandatoriosEnCurso &&
			!datosTipoPedidoActual?.esValorizado
		)
			return !esPermitidoAgregarProductoAlPedido; */

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
