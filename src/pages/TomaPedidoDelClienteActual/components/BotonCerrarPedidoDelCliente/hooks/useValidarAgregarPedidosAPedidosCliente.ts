import {
	useCalcularTotalPedido,
	useObtenerCreditoDisponible,
	useObtenerDatosCliente,
	useObtenerPedidosClienteMismaFechaEntrega,
	useObtenerCompromisosDeCobroMismaFechaEntrega,
} from 'hooks';
import {
	useObtenerClienteActual,
	useObtenerCompromisoDeCobroActual,
} from 'redux/hooks';
import {TClienteActual, TRetornoValidacion, TTotalPedido} from 'models';

import {
	validarMontoMinimoPedido,
	validarTotalConMontoMaximoContado,
} from 'utils/validaciones';
import {obtenerTotalesCompromisoDeCobroCliente} from 'utils/methods';
import {useTranslation} from 'react-i18next';

export const useValidarAgregarPedidosAPedidosCliente = () => {
	const calcularTotalPedido: () => TTotalPedido = useCalcularTotalPedido();
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
	const {
		pedidosClienteMismaFechaEntrega,
	} = useObtenerPedidosClienteMismaFechaEntrega();
	const {creditoDisponible} = useObtenerCreditoDisponible();

	const useValidarAgregarPedidosAPedidosCliente = (): TRetornoValidacion => {
		let totalVisitaActual = calcularTotalPedido();

		const retornoValidacion: TRetornoValidacion = {
			esValido: false,
			propsAvertencia: null,
		};

		if (!datosCliente) {
			retornoValidacion.propsAvertencia = {
				dataCy: 'no-datos-cliente',
				mensaje: t('No se encontro datos del cliente'),
			};
			return retornoValidacion;
		}

		const esValidoMontoMinidoPedido: boolean = validarMontoMinimoPedido(
			totalVisitaActual.totalPrecio,
			datosCliente.configuracionPedido
		);

		if (
			totalVisitaActual.totalUnidades > 0 &&
			!esValidoMontoMinidoPedido &&
			pedidosClienteMismaFechaEntrega.length === 0
		) {
			retornoValidacion.propsAvertencia = {
				dataCy: 'pedido-minimo',
				mensaje: t('advertencias.pedidoMinimo', {
					monto: datosCliente.configuracionPedido.ventaMinima?.montoVentaMinima,
				}),
			};
			return retornoValidacion;
		}

		const esMenorAlMontoMaximoContado: boolean = validarTotalConMontoMaximoContado(
			totalVisitaActual.totalContado.totalPrecio +
				compromisoDeCobroActual.monto +
				montoTotalCompromisos,
			pedidosClienteMismaFechaEntrega,
			datosCliente.configuracionPedido.ventaContadoMaxima
				?.montoVentaContadoMaxima ?? 0
		);

		if (!esMenorAlMontoMaximoContado) {
			retornoValidacion.propsAvertencia = {
				dataCy: 'monto-maximo',
				mensaje: t('advertencias.masDelMontoMaximo', {
					montoVentaMaxima:
						datosCliente.configuracionPedido.ventaContadoMaxima
							?.montoVentaContadoMaxima ?? '',
				}),
			};
			return retornoValidacion;
		}

		const esMenorAlMontoMaximoCredito: boolean =
			totalVisitaActual.totalCredito.totalPrecio < creditoDisponible;

		const esCondicionCreditoInformal =
			clienteActual.condicion === 'creditoInformal';

		if (esCondicionCreditoInformal && !esMenorAlMontoMaximoCredito) {
			retornoValidacion.propsAvertencia = {
				dataCy: 'credito-maximo',
				mensaje: t('advertencias.excedeCreditoDsiponible'),
			};
			return retornoValidacion;
		}

		retornoValidacion.esValido = true;
		return retornoValidacion;
	};

	return useValidarAgregarPedidosAPedidosCliente;
};
