import {
	useCalcularTotalPedido,
	useObtenerClienteActual,
	useObtenerDatosCliente,
	useObtenerPedidoActual,
	useObtenerPedidosClientes,
} from 'hooks';
import {
	TCliente,
	TClienteActual,
	TFunctionMostarAvertenciaPorDialogo,
	TPedidoActual,
	TPedidoClienteParaEnviar,
	TPedidosClientes,
	TTotalPedido,
} from 'models';
import {Dispatch, SetStateAction, useCallback} from 'react';
import {
	agregarPedidoCliente,
	modificarPedidoCliente,
} from 'redux/features/pedidosClientes/pedidosClientesSlice';
import {useAppDispatch} from 'redux/hooks';
import {
	validarMontoMinimoPedido,
	validarTotalConMontoMaximo,
} from 'utils/validaciones';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';

export const useAgregarPedidoActualAPedidosClientes = (
	setAvisoPedidoGuardadoExitoso: Dispatch<SetStateAction<boolean>>,
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo,
) => {
	const dispatch = useAppDispatch();
	const totalPedidoActual: TTotalPedido = useCalcularTotalPedido();
	const pedidoActual: TPedidoActual = useObtenerPedidoActual();
	const pedidosClientes: TPedidosClientes = useObtenerPedidosClientes();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const {t} = useTranslation();
	const history = useHistory();
	const fechaEntregaFormateada = new Date(pedidoActual.fechaEntrega); //TODO: Esto esta alterando la fecha real.

	const agregarPedidoActualAPedidosClientes = useCallback(() => {
		const pedidosCliente: TPedidoClienteParaEnviar[] | undefined =
			pedidosClientes[clienteActual.codigoCliente];

		if (!datosCliente) {
			mostrarAdvertenciaEnDialogo(
				t('No se encontro datos del cliente'),
				'no-datos-cliente'
			);
			return;
		}

		const {configuracionPedido}: TCliente = datosCliente;

		const esValidoMontoMinidoPedido: boolean = validarMontoMinimoPedido(
			totalPedidoActual.totalPrecio,
			configuracionPedido
		);

		let pedidosClienteMismaFechaEntrega: TPedidoClienteParaEnviar[] = [];

		if (pedidosCliente) {
			pedidosClienteMismaFechaEntrega = pedidosCliente.filter(
				(pedidoCliente: TPedidoClienteParaEnviar) =>
					pedidoCliente.fechaEntrega === pedidoActual.fechaEntrega &&
					pedidoCliente.codigoPedido !== pedidoActual.codigoPedido
			);
		}

		if (
			!esValidoMontoMinidoPedido &&
			pedidosClienteMismaFechaEntrega.length === 0
		) {
			mostrarAdvertenciaEnDialogo(
				t('advertencias.pedidoMinimo', {
					monto: datosCliente.configuracionPedido.montoVentaMinima,
				}),
				'pedido-minimo'
			);
			return;
		}

		const esMenorAlMontoMaximo: boolean = validarTotalConMontoMaximo(
			totalPedidoActual.totalPrecio,
			pedidosClienteMismaFechaEntrega,
			configuracionPedido.montoVentaMaxima
		);

		if (!esMenorAlMontoMaximo) {
			mostrarAdvertenciaEnDialogo(
				t('advertencias.masDelMontoMaximo', {
					fechaDeEntrega:
						fechaEntregaFormateada.getDate() +
						'-' +
						fechaEntregaFormateada.getMonth() +
						'-' +
						fechaEntregaFormateada.getFullYear(),
					montoVentaMaxima: configuracionPedido.montoVentaMaxima,
				}),
				'monto-maximo'
			);
			return;
		}

		const esPedidoActualExistenteEnPedidosClientes: boolean = pedidosCliente?.some(
			(pedidoCliente) =>
				pedidoCliente.codigoPedido === pedidoActual.codigoPedido
		);

		if (esPedidoActualExistenteEnPedidosClientes)
			dispatch(modificarPedidoCliente({pedidoActual, clienteActual}));
		else dispatch(agregarPedidoCliente({pedidoActual, clienteActual}));

		setAvisoPedidoGuardadoExitoso(true);
		history.goBack();
	}, [
		pedidoActual,
		totalPedidoActual,
		pedidosClientes,
		clienteActual,
		datosCliente,
		mostrarAdvertenciaEnDialogo,
		t,
	]);
	return agregarPedidoActualAPedidosClientes;
};
