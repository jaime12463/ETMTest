import {
	useObtenerCreditoDisponible,
	useObtenerDatosCliente,
	useObtenerPedidosClienteMismaFechaEntrega,
	useObtenerCompromisosDeCobroMismaFechaEntrega,
	useObtenerTotalPedidosVisitaActual,
	useObtenerCoberturas,
} from 'hooks';
import {
	useObtenerClienteActual,
	useObtenerCompromisoDeCobroActual,
	useObtenerConfiguracion,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {ETiposDePago, TClienteActual, TRetornoValidacion} from 'models';

import {calcularTotalPedidosClienteValorizadosPorTipoPago} from 'utils/methods';

import {
	validarDatosCliente,
	validarSiExcedeElMontoMinimo,
	validarSiExcedeAlMaximoContado,
	validarSiExcedeAlMaximoDeCredito,
	validarProductosIniciativas,
	validarCoberturas,
} from 'utils/validaciones/validacionesDePedidos';

import {obtenerTotalesCompromisoDeCobroCliente} from 'utils/methods';

export const useValidarCierreVisitaCliente = () => {
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {obtenerCompromisosDeCobroMismaFechaEntrega} =
		useObtenerCompromisosDeCobroMismaFechaEntrega();
	const compromisosDeCobroMismaFechaEntrega =
		obtenerCompromisosDeCobroMismaFechaEntrega(clienteActual.codigoCliente);
	const compromisoDeCobroActual = useObtenerCompromisoDeCobroActual();
	const montoTotalCompromisos = obtenerTotalesCompromisoDeCobroCliente(
		compromisosDeCobroMismaFechaEntrega
	);
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const {pedidosClienteMismaFechaEntrega} =
		useObtenerPedidosClienteMismaFechaEntrega();
	const {creditoDisponible} = useObtenerCreditoDisponible();
	const calcularTotalPedidosVisitaActual = useObtenerTotalPedidosVisitaActual();
	const {tipoPedidos} = useObtenerConfiguracion();
	const visitaActual = useObtenerVisitaActual();
	const coberturas = useObtenerCoberturas();

	const validarCierreVisitaCliente = (): TRetornoValidacion => {
		const totalPedidosVisitaActual = calcularTotalPedidosVisitaActual(true);
		const totalContadoPedidosClienteMismaFechaEntrega =
			calcularTotalPedidosClienteValorizadosPorTipoPago({
				pedidosClienteMismaFechaEntrega,
				tipoPedidos,
				tipoPago: ETiposDePago.Contado,
			});
		const totalCreditoPedidosClienteMismaFechaEntrega =
			calcularTotalPedidosClienteValorizadosPorTipoPago({
				pedidosClienteMismaFechaEntrega,
				tipoPedidos,
				tipoPago: ETiposDePago.Credito,
			});

		let retornoValidacion: TRetornoValidacion = {
			esValido: false,
			propsAdvertencia: null,
			iniciativasVerificadas: visitaActual.iniciativas,
			coberturasCumplidas: [],
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

		return {
			...retornoValidacion,
			iniciativasVerificadas: validarProductosIniciativas(
				visitaActual.iniciativas,
				visitaActual.pedidos
			),
			coberturasCumplidas: validarCoberturas(coberturas, visitaActual.pedidos),
		};
	};

	return validarCierreVisitaCliente;
};
