import {
	useCalcularTotalPedido,
	useObtenerCreditoDisponible,
	useObtenerDatosCliente,
	useObtenerPedidosClienteMismaFechaEntrega,
} from 'hooks';
import {
	useObtenerClienteActual,
	useObtenerPedidoActual,
	useObtenerPedidosClientes,
} from 'redux/hooks';
import {
	TCliente,
	TClienteActual,
	TFunctionMostarAvertenciaPorDialogo,
	TPedidoActual,
	TPedidoClienteParaEnviar,
	TPedidosClientes,
	TTotalPedido,
} from 'models';
import {useCallback} from 'react';
import {
	agregarPedidoCliente,
	modificarPedidoCliente,
} from 'redux/features/pedidosClientes/pedidosClientesSlice';
import {useAppDispatch} from 'redux/hooks';
import {
	validarMontoMinimoPedido,
	validarTotalConMontoMaximoContado,
} from 'utils/validaciones';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';

export const useAgregarPedidoActualAPedidosClientes = (
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo
) => {
	const dispatch = useAppDispatch();
	const totalPedidoActual: TTotalPedido = useCalcularTotalPedido();
	const pedidoActual: TPedidoActual = useObtenerPedidoActual();
	const pedidosClientes: TPedidosClientes = useObtenerPedidosClientes();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const {t} = useTranslation();
	const history = useHistory();
	const {
		pedidosClienteMismaFechaEntrega,
	} = useObtenerPedidosClienteMismaFechaEntrega();
	const {creditoDisponible} = useObtenerCreditoDisponible();

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

		if (
			!esValidoMontoMinidoPedido &&
			pedidosClienteMismaFechaEntrega.length === 0
		) {
			mostrarAdvertenciaEnDialogo(
				t('advertencias.pedidoMinimo', {
					monto: configuracionPedido.ventaMinima?.montoVentaMinima,
				}),
				'pedido-minimo'
			);
			return;
		}

		const esMenorAlMontoMaximoContado: boolean = validarTotalConMontoMaximoContado(
			totalPedidoActual.totalContado.totalPrecio,
			pedidosClienteMismaFechaEntrega,
			configuracionPedido.ventaContadoMaxima?.montoVentaContadoMaxima??0
		);

		if (!esMenorAlMontoMaximoContado) {
			mostrarAdvertenciaEnDialogo(
				t('advertencias.masDelMontoMaximo', {
					montoVentaMaxima:
						configuracionPedido.ventaContadoMaxima?.montoVentaContadoMaxima??'',
				}),
				'monto-maximo'
			);
			return;
		}

		const esPedidoActualExistenteEnPedidosClientes: boolean = pedidosCliente?.some(
			(pedidoCliente) =>
				pedidoCliente.codigoPedido === pedidoActual.codigoPedido
		);

		const esMenorAlMontoMaximoCredito: boolean = totalPedidoActual.totalCredito.totalPrecio < creditoDisponible;

		const esCondicionCreditoInformal =
			clienteActual.condicion === 'creditoInformal';

		if (esCondicionCreditoInformal && !esMenorAlMontoMaximoCredito) {
			mostrarAdvertenciaEnDialogo(
				t('advertencias.excedeCreditoDsiponible'),
				'credito-maximo'
			);
			return;
		}

		if (esPedidoActualExistenteEnPedidosClientes)
			dispatch(modificarPedidoCliente({pedidoActual, clienteActual}));
		else dispatch(agregarPedidoCliente({pedidoActual, clienteActual}));

		history.goBack();
	}, [
		pedidosClienteMismaFechaEntrega,
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
