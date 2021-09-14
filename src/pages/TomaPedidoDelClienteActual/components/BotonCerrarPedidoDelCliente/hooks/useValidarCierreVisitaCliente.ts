import {
	useCalcularTotalPedido,
	useObtenerCreditoDisponible,
	useObtenerDatosCliente,
	useObtenerPedidosClienteMismaFechaEntrega,
	useObtenerCompromisosDeCobroMismaFechaEntrega,
	useObtenerTotalPedidosVisitaActual,
} from 'hooks';
import {
	useObtenerClienteActual,
	useObtenerCompromisoDeCobroActual,
} from 'redux/hooks';
import {TClienteActual, TRetornoValidacion, TTotalPedido} from 'models';

import {
	obtenerTotalContadoPedidosCliente,
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

	const validarCierreVisitaCliente = (): TRetornoValidacion => {
		
		const totalPedidosVisitaActual =calcularTotalPedidosVisitaActual();
		const totalContadoPedidosClienteMismaFechaEntrega= obtenerTotalContadoPedidosCliente(pedidosClienteMismaFechaEntrega);
		
		let retornoValidacion: TRetornoValidacion = {
			esValido: false,
			propsAdvertencia: null,
		};

		retornoValidacion= validarDatosCliente(datosCliente);
		if (!retornoValidacion.esValido) return retornoValidacion;

		retornoValidacion= validarSiExcedeElMontoMinimo(datosCliente, (totalPedidosVisitaActual.totalPrecio + totalContadoPedidosClienteMismaFechaEntrega));
		if (!retornoValidacion.esValido) return retornoValidacion;

		retornoValidacion= validarSiExcedeAlMaximoContado(
			(datosCliente?.configuracionPedido.ventaContadoMaxima?.montoVentaContadoMaxima ?? 0),
			totalPedidosVisitaActual.totalPrecio +	compromisoDeCobroActual.monto +	montoTotalCompromisos,
			totalContadoPedidosClienteMismaFechaEntrega
		);
		if (!retornoValidacion.esValido) return retornoValidacion;

		retornoValidacion=validarSiExcedeAlMaximoDeCredito(clienteActual.condicion, creditoDisponible,totalPedidosVisitaActual.totalCredito.totalPrecio)
		if (!retornoValidacion.esValido) return retornoValidacion;

		return retornoValidacion;
		

		
	};

	return validarCierreVisitaCliente;
};
