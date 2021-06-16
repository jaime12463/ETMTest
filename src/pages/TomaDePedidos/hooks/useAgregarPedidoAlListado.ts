import {useCalcularTotalPedido} from 'hooks';
import {TPedidoCliente, TTotalPedido} from 'models';
import {Dispatch, SetStateAction, useCallback} from 'react';
import {selectPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {agregarPedidoCliente} from 'redux/features/pedidosClientes/pedidosClientesSlice';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {validarMontoMinimoPedido} from 'utils/validaciones';
import {useObtenerClienteActual} from '.';
import {Props as PropsDialogo} from 'components/Dialogo';
import {useTranslation} from 'react-i18next';

export const useAgregarPedidoAlListado = (
	setMostarDialogo: Dispatch<SetStateAction<boolean>>,
	setParametrosDialogo: Dispatch<SetStateAction<PropsDialogo>>
) => {
	const dispatch = useAppDispatch();
	const totalPedido: TTotalPedido = useCalcularTotalPedido();
	const pedidoActual: TPedidoCliente = useAppSelector(selectPedidoActual);
	const {t} = useTranslation();
	const obtenerClienteActual = useObtenerClienteActual();
	const clienteActual = obtenerClienteActual(pedidoActual.codigoCliente);
	const agregarPedidoAlListado = useCallback(() => {
		if (
			validarMontoMinimoPedido(
				totalPedido.totalPrecio,
				clienteActual.configuracionPedido
			)
		) {
			dispatch(
				agregarPedidoCliente({
					codigoCliente: pedidoActual.codigoCliente,
					productoPedido: pedidoActual.productosPedido,
				})
			);
			//TODO: aca se tiene que resetear todo para iniciar otro pedido
		} else {
			setParametrosDialogo({
				mensaje: t('advertencias.montoMinimo'),
				manejadorClick: () => setMostarDialogo(false),
				conBotonCancelar: false,
			});
			setMostarDialogo(true);
		}
	}, [pedidoActual, totalPedido, clienteActual, t]);
	return agregarPedidoAlListado;
};
