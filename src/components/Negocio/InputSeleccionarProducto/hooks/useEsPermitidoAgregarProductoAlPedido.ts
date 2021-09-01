import {
	useCalcularTotalPedido,
	useObtenerDatosCliente,
	useObtenerPedidosClienteMismaFechaEntrega,
} from 'hooks';
import {TCliente, TClienteActual, TTotalPedido} from 'models';
import {useCallback} from 'react';
import {useObtenerClienteActual} from 'redux/hooks';
import {validarTotalConMontoMaximoContado} from 'utils/validaciones';

export const useEsPermitidoAgregarProductoAlPedido = () => {
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const calcularTotalPedido: () => TTotalPedido = useCalcularTotalPedido();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
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

		//aca validamos si tiene mas pedidos, o si tiene pedido mandatorio

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
