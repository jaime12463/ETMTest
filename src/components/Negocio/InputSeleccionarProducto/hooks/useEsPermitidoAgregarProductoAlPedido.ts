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
	const [
		esPermitidoAgregarProductoAlPedido,
		setEsPermitidoAgregarProductoAlPedido,
	] = useState(true);
	const validarEsPermitidoAgregarProductoAlPedido = useCallback(() => {
		if (!datosCliente) return;
		const {configuracionPedido}: TCliente = datosCliente;
		const esMenorAlMontoMaximoContado: boolean = validarTotalConMontoMaximoContado(
			totalPedidoActual.totalContado.totalPrecio,
			pedidosClienteMismaFechaEntrega,
			configuracionPedido.ventaContadoMaxima?.montoVentaContadoMaxima ?? 0
		);
		console.log(esMenorAlMontoMaximoContado);
		if (!esMenorAlMontoMaximoContado)
			setEsPermitidoAgregarProductoAlPedido(false);
		setEsPermitidoAgregarProductoAlPedido(true);
	}, [
		clienteActual,
		totalPedidoActual,
		datosCliente,
		pedidosClienteMismaFechaEntrega,
	]);

	useEffect(() => {
		validarEsPermitidoAgregarProductoAlPedido();
	});

	return {
		esPermitidoAgregarProductoAlPedido,
		validarEsPermitidoAgregarProductoAlPedido,
	};
};
