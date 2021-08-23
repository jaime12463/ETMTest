import {
	useCalcularTotalPedido,
	useObtenerCreditoDisponible,
	useObtenerDatosCliente,
	useObtenerPedidosClienteMismaFechaEntrega,
	useObtenerCompromisosDeCobroMismaFechaEntrega,
} from 'hooks';
import {
	useObtenerClienteActual,
	useObtenerPedidoActual,
	useObtenerPedidosClientes,
	useObtenerCompromisoDeCobroActual,
} from 'redux/hooks';
import {
	ETiposDePago,
	TCliente,
	TClienteActual,
	TFunctionMostarAvertenciaPorDialogo,
	TPedidoActual,
	TPedidoClienteParaEnviar,
	TPedidosClientes,
	TProductoPedido,
	TTotalPedido,
} from 'models';
import {useCallback} from 'react';
import {
	agregarPedidoCliente,
	guardarCompromisoDecobroCliente,
} from 'redux/features/pedidosClientes/pedidosClientesSlice';

import {limpiarCompromisoDeCobroActual} from 'redux/features/compromisoDeCobro/compromisoDeCobroSlice';
import {useAppDispatch} from 'redux/hooks';
import {
	validarMontoMinimoPedido,
	validarTotalConMontoMaximoContado,
} from 'utils/validaciones';
import {obtenerTotalesCompromisoDeCobroCliente} from 'utils/methods';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';

export const useAgregarPedidoActualAPedidosClientes = (
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo
) => {
	const dispatch = useAppDispatch();
	const totalPedidoActual: TTotalPedido = useCalcularTotalPedido();
	const pedidoActual: TPedidoActual = useObtenerPedidoActual();
	const pedidosClientes: TPedidosClientes = useObtenerPedidosClientes();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {
		obtenerCompromisosDeCobroMismaFechaEntrega,
	} = useObtenerCompromisosDeCobroMismaFechaEntrega();
	const compromisosDeCobroMismaFechaEntrega = obtenerCompromisosDeCobroMismaFechaEntrega(
		clienteActual.codigoCliente
	);
	const compromisoDeCobroActual = useObtenerCompromisoDeCobroActual();
	const montoTotalCompromisos = obtenerTotalesCompromisoDeCobroCliente(
		compromisosDeCobroMismaFechaEntrega
	);
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const {t} = useTranslation();
	const history = useHistory();
	const {
		pedidosClienteMismaFechaEntrega,
	} = useObtenerPedidosClienteMismaFechaEntrega();
	const {creditoDisponible} = useObtenerCreditoDisponible();

	const agregarPedidoActualAPedidosClientes = useCallback(() => {
		const pedidosCliente: TPedidoClienteParaEnviar[] =
			pedidosClientes[clienteActual.codigoCliente]?.pedidos;

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
			totalPedidoActual.totalContado.totalPrecio +
				compromisoDeCobroActual.monto +
				montoTotalCompromisos,
			pedidosClienteMismaFechaEntrega,
			configuracionPedido.ventaContadoMaxima?.montoVentaContadoMaxima ?? 0
		);

		if (!esMenorAlMontoMaximoContado) {
			mostrarAdvertenciaEnDialogo(
				t('advertencias.masDelMontoMaximo', {
					montoVentaMaxima:
						configuracionPedido.ventaContadoMaxima?.montoVentaContadoMaxima ??
						'',
				}),
				'monto-maximo'
			);
			return;
		}

		const esMenorAlMontoMaximoCredito: boolean =
			totalPedidoActual.totalCredito.totalPrecio < creditoDisponible;

		const esCondicionCreditoInformal =
			clienteActual.condicion === 'creditoInformal';

		if (esCondicionCreditoInformal && !esMenorAlMontoMaximoCredito) {
			mostrarAdvertenciaEnDialogo(
				t('advertencias.excedeCreditoDsiponible'),
				'credito-maximo'
			);
			return;
		}

		if (!esCondicionCreditoInformal) {
			const tipoPago =
				clienteActual.condicion === 'creditoFormal'
					? ETiposDePago.Credito
					: ETiposDePago.Contado;

			dispatch(agregarPedidoCliente({pedidoActual, clienteActual, tipoPago}));
		} else {
			const productosContadoDelPedidoActual = pedidoActual.productosPedido.filter(
				(producto: TProductoPedido) =>
					producto.tipoPago === ETiposDePago.Contado
			);

			if (productosContadoDelPedidoActual.length > 0) {
				const pedidoContado: TPedidoActual = {
					...pedidoActual,
					productosPedido: productosContadoDelPedidoActual,
				};
				dispatch(
					agregarPedidoCliente({
						pedidoActual: pedidoContado,
						clienteActual,
						tipoPago: ETiposDePago.Contado,
					})
				);
			}

			const productosCreditoDelPedidoActual = pedidoActual.productosPedido.filter(
				(producto: TProductoPedido) =>
					producto.tipoPago === ETiposDePago.Credito
			);

			if (productosCreditoDelPedidoActual.length > 0) {
				const pedidoCredito: TPedidoActual = {
					...pedidoActual,
					productosPedido: productosCreditoDelPedidoActual,
					codigoPedido: uuidv4(),
				};
				dispatch(
					agregarPedidoCliente({
						pedidoActual: pedidoCredito,
						clienteActual,
						tipoPago: ETiposDePago.Credito,
					})
				);
			}
		}
		dispatch(
			guardarCompromisoDecobroCliente({compromisoDeCobroActual, clienteActual})
		);
		dispatch(limpiarCompromisoDeCobroActual());

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
