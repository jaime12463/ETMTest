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
} from 'models';
import {useCallback} from 'react';
import {
	useObtenerClienteActual,
	useObtenerConfiguracion,
	useObtenerPedidosClientes,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {validarTotalConMontoMaximoContado} from 'utils/validaciones';

export const useEsPermitidoAgregarProductoAlPedido = () => {
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const calcularTotalPedido: () => TTotalPedido = useCalcularTotalPedido();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const configuracion = useObtenerConfiguracion();
	const pedidosClientes = useObtenerPedidosClientes();
	const visitaActual = useObtenerVisitaActual();
	const obtenerDatosTipoPedido = useObtenerDatosTipoPedido();
	const {
		pedidosClienteMismaFechaEntrega,
	} = useObtenerPedidosClienteMismaFechaEntrega();
	const validarEsPermitidoAgregarProductoAlPedido = useCallback((): boolean => {
		let esPermitidoAgregarProductoAlPedido: boolean = true;

		if (!datosCliente) return !esPermitidoAgregarProductoAlPedido;

		const {esCreditoBloqueado} = datosCliente.informacionCrediticia;

		const totalPedidoActual = calcularTotalPedido();

		const esCreditoFormal = clienteActual.condicion === 'creditoFormal';
		const esCreditoInformal = clienteActual.condicion === 'creditoInformal';

		if (esCreditoFormal && esCreditoBloqueado)
			return !esPermitidoAgregarProductoAlPedido;

		const {configuracionPedido}: TCliente = datosCliente;

		const esMenorAlMontoMaximoContado: boolean = validarTotalConMontoMaximoContado(
			totalPedidoActual.totalContado.totalPrecio,
			pedidosClienteMismaFechaEntrega,
			configuracionPedido.ventaContadoMaxima?.montoVentaContadoMaxima ?? 0
		);

		if (esCreditoInformal && !esMenorAlMontoMaximoContado && esCreditoBloqueado)
			return !esPermitidoAgregarProductoAlPedido;

		if (!esMenorAlMontoMaximoContado)
			return !esPermitidoAgregarProductoAlPedido;

		const HayPedidosMandatoriosRegistrados: boolean = pedidosClientes[
			clienteActual.codigoCliente
		]?.pedidos.some((pedido) => {
			const datosTipoPedido:
				| TTipoPedido
				| undefined = configuracion.tipoPedidos.find(
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
			const datosTipoPedido:
				| TTipoPedido
				| undefined = configuracion.tipoPedidos.find(
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
		if (
			!HayPedidosMandatoriosRegistrados &&
			!HayPedidosMandatoriosEnCurso &&
			!datosTipoPedidoActual?.esValorizado
		)
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
