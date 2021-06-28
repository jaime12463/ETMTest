import {useCalcularTotalPedido} from 'hooks';
import {
	TFunctionMostarAvertenciaPorDialogo,
	TPedidoCliente,
	TTotalPedido,
} from 'models';
import {Dispatch, SetStateAction, useCallback} from 'react';
import {selectPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {selectPedidosClientes} from 'redux/features/pedidosClientes/pedidosClientesSlice';
import {agregarPedidoCliente} from 'redux/features/pedidosClientes/pedidosClientesSlice';

import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {
	validarMontoMinimoPedido,
	validarEsMasDelTotalMontoMaximo,
} from 'utils/validaciones';
import {useObtenerClienteActual} from '.';
import {useTranslation} from 'react-i18next';

export const useAgregarPedidoAlListado = (
	setAvisoPedidoGuardadoExitoso: Dispatch<SetStateAction<boolean>>,
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo,
	resetPedidoActual: any
) => {
	const dispatch = useAppDispatch();
	const totalPedido: TTotalPedido = useCalcularTotalPedido();
	const pedidoActual: TPedidoCliente = useAppSelector(selectPedidoActual);
	const PedidosClientes = useAppSelector(selectPedidosClientes);
	const {t} = useTranslation();
	const obtenerClienteActual = useObtenerClienteActual();
	const agregarPedidoAlListado = useCallback(() => {
		const clienteActual = obtenerClienteActual(pedidoActual.codigoCliente);
		const esValidoMontoMinidoPedido: boolean = validarMontoMinimoPedido(
			totalPedido.totalPrecio,
			clienteActual.configuracionPedido
		);
		const esMasDelTotalMontoMaximo: boolean = validarEsMasDelTotalMontoMaximo(
			pedidoActual.fechaEntrega,
			totalPedido.totalPrecio,
			PedidosClientes[pedidoActual.codigoCliente],
			clienteActual.configuracionPedido.montoVentaMaxima
		);

		if (!esValidoMontoMinidoPedido) {
			mostrarAdvertenciaEnDialogo(
				t('advertencias.pedidoMinimo', {
					monto: clienteActual.configuracionPedido.montoVentaMinima,
				}),
				'pedido-minimo'
			);
			return;
		}

		if (esMasDelTotalMontoMaximo) {
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
