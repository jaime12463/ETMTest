import {
	useCalcularTotalPedido,
	useObtenerDatosCliente,
	useObtenerPedidosClienteMismaFechaEntrega,
} from 'hooks';
import {TCliente, TClienteActual, TTotalPedido} from 'models';
import {useCallback, useEffect, useState} from 'react';
import {useObtenerClienteActual} from 'redux/hooks';
import {validarTotalConMontoMaximoContado} from 'utils/validaciones';

export const useEsPermitidoAgregarProductoAlPedido = () => {
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const totalPedidoActual: TTotalPedido = useCalcularTotalPedido();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const {
		pedidosClienteMismaFechaEntrega,
	} = useObtenerPedidosClienteMismaFechaEntrega();
	const validarEsPermitidoAgregarProductoAlPedido = useCallback((): boolean => {
		let esPermitidoAgregarProductoAlPedido: boolean = true;

		if (!datosCliente) return !esPermitidoAgregarProductoAlPedido;

		const {esCreditoBloqueado} = datosCliente.informacionCrediticia;

		const esCreditoFormal = clienteActual.condicion === 'creditoFormal';

		if (esCreditoFormal && esCreditoBloqueado)
			return !esPermitidoAgregarProductoAlPedido;

		const {configuracionPedido}: TCliente = datosCliente;

		const esMenorAlMontoMaximoContado: boolean = validarTotalConMontoMaximoContado(
			totalPedidoActual.totalContado.totalPrecio,
			pedidosClienteMismaFechaEntrega,
			configuracionPedido.ventaContadoMaxima?.montoVentaContadoMaxima ?? 0
		);

		if (!esMenorAlMontoMaximoContado)
			return !esPermitidoAgregarProductoAlPedido;

		return esPermitidoAgregarProductoAlPedido;
	}, [
		clienteActual,
		totalPedidoActual,
		datosCliente,
		pedidosClienteMismaFechaEntrega,
	]);

	return {
		validarEsPermitidoAgregarProductoAlPedido,
	};
};
