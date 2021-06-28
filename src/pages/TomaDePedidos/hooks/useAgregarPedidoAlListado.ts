import {useCalcularTotalPedido} from 'hooks';
import {
	TFunctionMostarAvertenciaPorDialogo,
	TInputsFormularioAgregarProducto,
	TPedidoCliente,
	TTotalPedido,
} from 'models';
import {Dispatch, SetStateAction, useCallback} from 'react';
import {
	selectPedidoActual,
	resetearPedidoActual,
} from 'redux/features/pedidoActual/pedidoActualSlice';
import {agregarPedidoCliente} from 'redux/features/pedidosClientes/pedidosClientesSlice';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {validarMontoMinimoPedido} from 'utils/validaciones';
import {useObtenerClienteActual} from '.';
import {useTranslation} from 'react-i18next';
import {UseFormSetValue} from 'react-hook-form';

export const useAgregarPedidoAlListado = (
	setExisteCliente: Dispatch<SetStateAction<boolean | null>>,
	setValue: UseFormSetValue<TInputsFormularioAgregarProducto>,
	setAvisoPedidoGuardadoExitoso: Dispatch<SetStateAction<boolean>>,
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo
) => {
	const dispatch = useAppDispatch();
	const totalPedido: TTotalPedido = useCalcularTotalPedido();
	const pedidoActual: TPedidoCliente = useAppSelector(selectPedidoActual);
	const {t} = useTranslation();
	const obtenerClienteActual = useObtenerClienteActual();
	const agregarPedidoAlListado = useCallback(() => {
		const clienteActual = obtenerClienteActual(pedidoActual.codigoCliente);
		const esValidoMontoMinidoPedido: boolean = validarMontoMinimoPedido(
			totalPedido.totalPrecio,
			clienteActual.configuracionPedido
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
		dispatch(agregarPedidoCliente(pedidoActual));
		dispatch(resetearPedidoActual());
		setExisteCliente(null);
		setValue('codigoCliente', '');
		setAvisoPedidoGuardadoExitoso(true);
		//TODO: Mirar si es necesario resetear productoActual
	}, [pedidoActual, totalPedido, t, mostrarAdvertenciaEnDialogo]);
	return agregarPedidoAlListado;
};
