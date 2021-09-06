import {useState, useEffect} from 'react';
import {
	obtenerTotalesPedidosCliente,
	obtenerTotalesContadoPedidosCliente,
	obtenerTotalesCompromisoDeCobroCliente,
} from 'utils/methods';
import {
	useObtenerDatosCliente,
	useCalcularTotalPedido,
	useObtenerPedidosClienteMismaFechaEntrega,
	useObtenerCreditoDisponible,
	useObtenerCompromisosDeCobroMismaFechaEntrega,
} from 'hooks';
import {TCliente, TClienteActual} from 'models';
import {
	useObtenerClienteActual,
	useObtenerCompromisoDeCobroActual,
} from 'redux/hooks';

const obtenerporcentaje = (valor: number, valorMax: number = 0) => {
	return (valor * 100) / valorMax;
};
export const useObtenerColor = () => {
	const [color, setColor] = useState({
		pedidoMinimo: 'rojo',
		pedidoMaximo: 'verde',
		creditoDisponible: 'verde',
	});
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {
		obtenerPedidosClienteMismaFechaEntrega,
	} = useObtenerPedidosClienteMismaFechaEntrega();
	const datosCliente: TCliente | undefined = obtenerDatosCliente(
		clienteActual.codigoCliente
	);
	const pedidosClienteMismaFechaEntrega = obtenerPedidosClienteMismaFechaEntrega(
		clienteActual.codigoCliente
	);

	const totalesPedidoCliente = obtenerTotalesPedidosCliente(
		pedidosClienteMismaFechaEntrega
	);
	const calcularTotalPedido = useCalcularTotalPedido();
	const creditoDisponible = useObtenerCreditoDisponible().creditoDisponible;
	const totalesContadoPedidoCliente = obtenerTotalesContadoPedidosCliente(
		pedidosClienteMismaFechaEntrega
	);
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

	useEffect(() => {
		const totalPedidoActual = calcularTotalPedido();
		setColor({
			pedidoMinimo:
				obtenerporcentaje(
					totalesPedidoCliente + totalPedidoActual.totalPrecio,
					datosCliente?.configuracionPedido.ventaMinima?.montoVentaMinima
				) >= 100
					? 'verde'
					: 'rojo',
			pedidoMaximo:
				obtenerporcentaje(
					totalesContadoPedidoCliente +
						totalPedidoActual.totalContado.totalPrecio +
						montoTotalCompromisos +
						compromisoDeCobroActual.monto,
					datosCliente?.configuracionPedido.ventaContadoMaxima
						?.montoVentaContadoMaxima
				) > 100
					? 'rojo'
					: 'verde',
			creditoDisponible:
				obtenerporcentaje(
					creditoDisponible - totalPedidoActual.totalCredito.totalPrecio,
					datosCliente?.informacionCrediticia.disponible
				) <= 0
					? 'rojo'
					: 'verde',
		});
	}, [compromisoDeCobroActual, obtenerporcentaje, calcularTotalPedido]);

	return color;
};
