import {
	TClienteActual,
	TPedidosClientes,
	TFunctionMostarAvertenciaPorDialogo,
	TPedidoClienteParaEnviar,
	TCliente,
} from 'models';
import {useCallback} from 'react';
import {
	useObtenerClienteActual,
	useCalcularTotalPedidos,
	useObtenerDatosCliente,
} from 'hooks';
import {useObtenerPedidoRealizadoDelClienteActual} from '.';
import {useAppDispatch} from 'redux/hooks';
import {validarMontoMinimoPedido} from '../../../utils/validaciones';
import {cancelarPedidoDelCliente} from 'redux/features/pedidosClientes/pedidosClientesSlice';
import {useTranslation} from 'react-i18next';

export const useCancelarPedidoDelClienteActual = () => {
	const dispatch = useAppDispatch();
	const {t} = useTranslation();
	const clienteActual: TClienteActual = useObtenerClienteActual();

	const obtenerPedidoRealizadoDelClienteActual =
		useObtenerPedidoRealizadoDelClienteActual();
	const calcularTotalPedido = useCalcularTotalPedidos();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);

	const CancelarPedido = (
		codigoPedido: string,
		pedidosCliente: any,
		mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo
	) => {
		const pedidoActual: TPedidoClienteParaEnviar | undefined =
			obtenerPedidoRealizadoDelClienteActual(codigoPedido);
		const totalPedido = (productos: any) =>
			calcularTotalPedido(productos).totalPrecio;

		const montoMinimoPedido =
			datosCliente &&
			pedidoActual &&
			validarMontoMinimoPedido(
				totalPedido(pedidoActual.productosPedido),
				datosCliente.configuracionPedido
			);

		const manejadorCancelarPedido = (respuesta: boolean) => {
			if (respuesta) {
				dispatch(
					cancelarPedidoDelCliente({
						codigoPedido,
						codigoCliente: clienteActual.codigoCliente,
					})
				);
			}
		};

		console.log(codigoPedido, 'codigopEDIDO');

		const tienePedidoParaElMismoDia = () => {
			const resultado =
				pedidosCliente &&
				pedidosCliente.find(
					(pedido: TPedidoClienteParaEnviar, i: number) =>
						pedido.codigoPedido !== codigoPedido &&
						pedido.estado === 'A' &&
						pedido.fechaEntrega === pedidoActual?.fechaEntrega &&
						datosCliente &&
						validarMontoMinimoPedido(
							totalPedido(pedido.productosPedido),
							datosCliente.configuracionPedido
						)
				);

			return resultado ? true : false;
		};

		console.log(tienePedidoParaElMismoDia(), 'aqui');

		if (pedidoActual?.estado !== 'A') {
			return;
		}

		if (!montoMinimoPedido) {
			mostrarAdvertenciaEnDialogo(
				t('advertencias.cancelarPedido'),
				'cancelar-pedido',
				manejadorCancelarPedido,
				{
					aceptar: t('general.si'),
					cancelar: t('general.no'),
				}
			);
		}
		if (montoMinimoPedido) {
			mostrarAdvertenciaEnDialogo(
				t('advertencias.cancelarPedido'),
				'cancelar-pedido',
				manejadorCancelarPedido,
				{
					aceptar: t('general.si'),
					cancelar: t('general.no'),
				}
			);
		}
	};

	return CancelarPedido;
};
