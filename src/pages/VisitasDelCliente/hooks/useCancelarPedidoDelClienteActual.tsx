import {
	TClienteActual,
	TFunctionMostarAvertenciaPorDialogo,
	TPedidoClienteParaEnviar,
} from 'models';
import {buscarPedidosParaElMismoDia} from 'utils/methods';
import {useCalcularTotalPedidos, useObtenerDatosCliente} from 'hooks';
import {useObtenerClienteActual} from 'redux/hooks';
import {useObtenerPedidoRealizadoDelClienteActual} from '.';
import {useAppDispatch} from 'redux/hooks';
import {validarMontoMinimoPedido} from 'utils/validaciones';
import {cancelarPedidoDelCliente} from 'redux/features/pedidosClientes/pedidosClientesSlice';
import {useTranslation} from 'react-i18next';
import {EstadosDeUnPedido} from 'utils/constants';

export const useCancelarPedidoDelClienteActual = () => {
	const dispatch = useAppDispatch();
	const {t} = useTranslation();
	const clienteActual: TClienteActual = useObtenerClienteActual();

	const obtenerPedidoRealizadoDelClienteActual = useObtenerPedidoRealizadoDelClienteActual();
	const calcularTotalPedido = useCalcularTotalPedidos();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);

	const CancelarPedido = (
		codigoPedido: string,
		pedidosCliente: any,
		mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo
	) => {
		const pedidoActual:
			| TPedidoClienteParaEnviar
			| undefined = obtenerPedidoRealizadoDelClienteActual(codigoPedido);
		const totalPedido = (productos: any) =>
			calcularTotalPedido(productos).totalPrecio;

		const montoMinimoPedido =
			datosCliente &&
			pedidoActual &&
			validarMontoMinimoPedido(
				totalPedido(pedidoActual.productosPedido),
				datosCliente.configuracionPedido
			);

		const pedidosParaElMismoDia = buscarPedidosParaElMismoDia(
			pedidosCliente,
			pedidoActual?.fechaEntrega
		);

		const buscarPedidoConMontoMinimoParaElMismoDia = () => {
			const resultado =
				pedidosCliente &&
				pedidosCliente.find(
					(pedido: TPedidoClienteParaEnviar, i: number) =>
						pedido.codigoPedido !== codigoPedido &&
						pedido.estado === EstadosDeUnPedido.Activo &&
						pedido.fechaEntrega === pedidoActual?.fechaEntrega &&
						datosCliente &&
						validarMontoMinimoPedido(
							totalPedido(pedido.productosPedido),
							datosCliente.configuracionPedido
						)
				);

			return resultado ? true : false;
		};

		const tienePedidoAptoParaElMismoDia = buscarPedidoConMontoMinimoParaElMismoDia();

		const manejadorCancelarUnPedido = (respuesta: boolean) => {
			if (respuesta) {
				dispatch(
					cancelarPedidoDelCliente({
						codigoPedido,
						codigoCliente: clienteActual.codigoCliente,
					})
				);
			}
		};
		const manejadorCancelarPedidos = (respuesta: boolean) => {
			if (respuesta) {
				for (let pedido of pedidosParaElMismoDia) {
					dispatch(
						cancelarPedidoDelCliente({
							codigoPedido: pedido,
							codigoCliente: clienteActual.codigoCliente,
						})
					);
				}
			}
		};

		if (pedidoActual?.estado !== EstadosDeUnPedido.Activo) {
			return;
		}

		if (
			!montoMinimoPedido ||
			(montoMinimoPedido && tienePedidoAptoParaElMismoDia)
		) {
			mostrarAdvertenciaEnDialogo(
				t('advertencias.cancelarPedido'),
				'cancelar-pedido',
				manejadorCancelarUnPedido,
				{
					aceptar: t('general.si'),
					cancelar: t('general.no'),
				}
			);
		}
		if (montoMinimoPedido && !tienePedidoAptoParaElMismoDia) {
			mostrarAdvertenciaEnDialogo(
				t('advertencias.cancelarTodosLosPedido', {
					fechaDeEntrega: pedidoActual?.fechaEntrega,
				}),
				'cancelar-pedido',
				manejadorCancelarPedidos,
				{
					aceptar: t('general.si'),
					cancelar: t('general.no'),
				}
			);
		}
	};

	return CancelarPedido;
};
