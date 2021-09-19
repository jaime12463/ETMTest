import {
	useCalcularTotalPedido,
	useObtenerCreditoDisponible,
	useObtenerDatosCliente,
	useObtenerPedidosClienteMismaFechaEntrega,
	useObtenerCompromisosDeCobroMismaFechaEntrega,
	useObtenerTotalPedidosVisitaActual,
	useObtenerDatosTipoPedido,
} from 'hooks';
import {
	useObtenerClienteActual,
	useObtenerCompromisoDeCobroActual,
} from 'redux/hooks';
import {TClienteActual, TRetornoValidacion, TTotalPedido} from 'models';

import {
	obtenerTotalContadoPedidosCliente,
	obtenerTotalCreditoPedidosCliente,
} from 'utils/methods';

import {
	validarDatosCliente,
	validarSiExcedeElMontoMinimo,
	validarSiExcedeAlMaximoContado,
	validarSiExcedeAlMaximoDeCredito,
} from 'utils/validaciones/validacionesDePedidos';

import {obtenerTotalesCompromisoDeCobroCliente} from 'utils/methods';
import {useTranslation} from 'react-i18next';

export const useValidarCierreVisitaCliente = () => {
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
	const calcularTotalPedidosVisitaActual = useObtenerTotalPedidosVisitaActual();
	const obtenerDatosTipoPedido = useObtenerDatosTipoPedido();
	const datosTipoPedidoActual = obtenerDatosTipoPedido();

	const validarCierreVisitaCliente = (): TRetornoValidacion => {
		const totalPedidosVisitaActual = calcularTotalPedidosVisitaActual(true);
		const totalContadoPedidosClienteMismaFechaEntrega = obtenerTotalContadoPedidosCliente(
			pedidosClienteMismaFechaEntrega
		);
		const totalCreditoPedidosClienteMismaFechaEntrega = obtenerTotalCreditoPedidosCliente(
			pedidosClienteMismaFechaEntrega
		);

		let retornoValidacion: TRetornoValidacion = {
			esValido: false,
			propsAdvertencia: null,
		};

		retornoValidacion = validarDatosCliente(datosCliente);
		if (!retornoValidacion.esValido) return retornoValidacion;

		retornoValidacion = validarSiExcedeElMontoMinimo(
			datosCliente,
			totalPedidosVisitaActual.totalPrecio +
				totalContadoPedidosClienteMismaFechaEntrega +
				totalCreditoPedidosClienteMismaFechaEntrega
		);

		if (!retornoValidacion.esValido) return retornoValidacion;

		retornoValidacion = validarSiExcedeAlMaximoContado(
			datosCliente?.configuracionPedido.ventaContadoMaxima
				?.montoVentaContadoMaxima ?? 0,
			totalPedidosVisitaActual.totalContado.totalPrecio +
				compromisoDeCobroActual.monto +
				montoTotalCompromisos,
			totalContadoPedidosClienteMismaFechaEntrega
		);
		if (!retornoValidacion.esValido) return retornoValidacion;

		retornoValidacion = validarSiExcedeAlMaximoDeCredito(
			clienteActual.condicion,
			creditoDisponible,
			totalPedidosVisitaActual.totalCredito.totalPrecio
		);
		if (!retornoValidacion.esValido) return retornoValidacion;

		return retornoValidacion;
	};

	return validarCierreVisitaCliente;
};
