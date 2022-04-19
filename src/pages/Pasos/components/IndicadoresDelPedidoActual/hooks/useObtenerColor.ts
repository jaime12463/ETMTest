import {useState, useEffect} from 'react';
import {
	obtenerTotalesPedidosCliente,
	obtenerTotalesCompromisoDeCobroCliente,
	calcularTotalPedidosClienteValorizadosPorTipoPago,
} from 'utils/methods';
import {
	useObtenerDatosCliente,
	useCalcularTotalPedido,
	useObtenerPedidosClienteMismaFechaEntrega,
	useObtenerCreditoDisponible,
	useObtenerCompromisosDeCobroMismaFechaEntrega,
	useObtenerTotalPedidosVisitaActual,
} from 'hooks';
import {ETiposDePago, TCliente, TClienteActual} from 'models';
import {
	useObtenerClienteActual,
	useObtenerCompromisoDeCobroActual,
	useObtenerConfiguracion,
	useObtenerVisitaActual,
} from 'redux/hooks';

const obtenerporcentaje = (valor: number, valorMax: number = 0) => {
	return (valor * 100) / valorMax;
};
export const useObtenerColor = () => {
	const [color, setColor] = useState({
		pedidoMinimo: 'primary',
		pedidoMaximo: 'success',
		creditoDisponible: 'success',
	});

	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {obtenerPedidosClienteMismaFechaEntrega} =
		useObtenerPedidosClienteMismaFechaEntrega();
	const datosCliente: TCliente | undefined = obtenerDatosCliente(
		clienteActual.codigoCliente
	);
	const pedidosClienteMismaFechaEntrega =
		obtenerPedidosClienteMismaFechaEntrega(clienteActual.codigoCliente);
	const {tipoPedidos} = useObtenerConfiguracion();
	const totalesPedidoCliente = obtenerTotalesPedidosCliente({
		pedidosClienteMismaFechaEntrega,
		tipoPedidos,
	});
	const obtenerTotalPedidosVisitaActual = useObtenerTotalPedidosVisitaActual();
	const creditoDisponible = useObtenerCreditoDisponible().creditoDisponible;
	const totalContadoPedidosClienteMismaFechaEntrega =
		calcularTotalPedidosClienteValorizadosPorTipoPago({
			pedidosClienteMismaFechaEntrega,
			tipoPedidos,
			tipoPago: ETiposDePago.Contado,
		});
	const {obtenerCompromisosDeCobroMismaFechaEntrega} =
		useObtenerCompromisosDeCobroMismaFechaEntrega();
	const compromisosDeCobroMismaFechaEntrega =
		obtenerCompromisosDeCobroMismaFechaEntrega(clienteActual.codigoCliente);
	const compromisoDeCobroActual = useObtenerCompromisoDeCobroActual();

	const montoTotalCompromisos = obtenerTotalesCompromisoDeCobroCliente(
		compromisosDeCobroMismaFechaEntrega
	);

	const totalPedidoActual = obtenerTotalPedidosVisitaActual();
	const totalPedidoActualContribuyeMinimo =
		obtenerTotalPedidosVisitaActual(true);

	const visitaActual = useObtenerVisitaActual();

	const montoConsumidoPorFecha =
		datosCliente?.configuracionPedido.ventaContadoMaxima?.consumidoPorFecha.find(
			(fecha) => fecha.fechaEntrega === visitaActual.fechaEntrega
		)?.consumido || 0;

	useEffect(() => {
		setColor({
			pedidoMinimo:
				obtenerporcentaje(
					totalesPedidoCliente + totalPedidoActualContribuyeMinimo.totalPrecio,
					datosCliente?.configuracionPedido.ventaMinima?.montoVentaMinima
				) >= 100
					? 'success'
					: 'primary',
			pedidoMaximo:
				obtenerporcentaje(
					montoConsumidoPorFecha +
						totalContadoPedidosClienteMismaFechaEntrega +
						totalPedidoActual.totalContado.totalPrecio +
						montoTotalCompromisos +
						compromisoDeCobroActual.monto,
					datosCliente?.configuracionPedido.ventaContadoMaxima
						?.montoVentaContadoMaxima
				) > 100
					? 'primary'
					: 'success',
			creditoDisponible:
				obtenerporcentaje(
					creditoDisponible - totalPedidoActual.totalCredito.totalPrecio,
					datosCliente?.informacionCrediticia.disponible
				) <= 0
					? 'primary'
					: 'success',
		});
	}, [
		compromisoDeCobroActual,
		obtenerporcentaje,
		totalPedidoActual.totalPrecio,
		totalPedidoActual.totalCredito.totalPrecio,
		totalPedidoActual.totalContado.totalPrecio,
	]);

	return color;
};
