import {useCalcularTotalPedido} from 'hooks';
import {
	TFunctionMostarAvertenciaPorDialogo,
	TPedidoCliente,
	TPedidoClienteParaEnviar,
	TTotalPedido,
} from 'models';
import {Dispatch, SetStateAction, useCallback} from 'react';
import {selectPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {selectPedidosClientes} from 'redux/features/pedidosClientes/pedidosClientesSlice';
import {agregarPedidoCliente} from 'redux/features/pedidosClientes/pedidosClientesSlice';

import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {
	validarMontoMinimoPedido,
	validarTotalConMontoMaximo,
} from 'utils/validaciones';
import {useObtenerClienteActual} from '.';
import {useTranslation} from 'react-i18next';

export const useAgregarPedidoAlListado = (
	setAvisoPedidoGuardadoExitoso: Dispatch<SetStateAction<boolean>>,
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo,
	resetPedidoActual: () => void
) => {
	const dispatch = useAppDispatch();
	const totalPedido: TTotalPedido = useCalcularTotalPedido();
	const pedidoActual: TPedidoCliente = useAppSelector(selectPedidoActual);
	const PedidosClientes = useAppSelector(selectPedidosClientes);
	const {t} = useTranslation();
	const obtenerClienteActual = useObtenerClienteActual();
	const agregarPedidoAlListado = useCallback(() => {
		const clienteActual = obtenerClienteActual(pedidoActual.codigoCliente);
		const pedidosCliente: TPedidoClienteParaEnviar[] | undefined =
			PedidosClientes[pedidoActual.codigoCliente];
		const esValidoMontoMinidoPedido: boolean = validarMontoMinimoPedido(
			totalPedido.totalPrecio,
			clienteActual.configuracionPedido
		);

		let pedidosClienteMismaFechaEntrega: TPedidoClienteParaEnviar[] = [];
		if (pedidosCliente) {
			pedidosClienteMismaFechaEntrega = pedidosCliente.filter(
				(pedidoCliente: TPedidoClienteParaEnviar) =>
					pedidoCliente.fechaEntrega === pedidoActual.fechaEntrega
			);
		}

		const esMenorAlMontoMaximo: boolean = validarTotalConMontoMaximo(
			totalPedido.totalPrecio,
			pedidosClienteMismaFechaEntrega,
			clienteActual.configuracionPedido.montoVentaMaxima
		);

		if (
			!esValidoMontoMinidoPedido &&
			pedidosClienteMismaFechaEntrega.length === 0
		) {
			mostrarAdvertenciaEnDialogo(
				t('advertencias.pedidoMinimo', {
					monto: clienteActual.configuracionPedido.montoVentaMinima,
				}),
				'pedido-minimo'
			);
			return;
		}

		if (!esMenorAlMontoMaximo) {
			mostrarAdvertenciaEnDialogo(
				t('advertencias.masDelMontoMaximo', {
					fechaDeEntrega: pedidoActual.fechaEntrega,
					montoVentaMaxima: clienteActual.configuracionPedido.montoVentaMaxima,
				}),
				'monto-maximo'
			);
			return;
		}

		dispatch(agregarPedidoCliente(pedidoActual));
		setAvisoPedidoGuardadoExitoso(true);
		resetPedidoActual();
	}, [pedidoActual, totalPedido, t, mostrarAdvertenciaEnDialogo]);
	return agregarPedidoAlListado;
};
