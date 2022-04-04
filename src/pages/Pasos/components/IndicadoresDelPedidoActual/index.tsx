import React from 'react';
import {Grid} from '@mui/material';
import {BarraDeProgreso} from 'components/UI';
import {ETiposDePago, TCliente, TClienteActual} from 'models';
import {
	useObtenerDatosCliente,
	useObtenerPedidosClienteMismaFechaEntrega,
	useObtenerCreditoDisponible,
	useObtenerCompromisosDeCobroMismaFechaEntrega,
	useObtenerTotalPedidosVisitaActual,
	useMostrarAviso,
} from 'hooks';
import {
	useObtenerClienteActual,
	useObtenerCompromisoDeCobroActual,
	useObtenerConfiguracion,
} from 'redux/hooks';
import {useTranslation} from 'react-i18next';
import {
	obtenerTotalesPedidosCliente,
	obtenerTotalesCompromisoDeCobroCliente,
	calcularTotalPedidosClienteValorizadosPorTipoPago,
} from 'utils/methods';
import {useObtenerColor} from './hooks/useObtenerColor';

const IndicadoresDelPedidoActual = () => {
	const {t} = useTranslation();
	const {obtenerDatosCliente} = useObtenerDatosCliente();

	const obtenerTotalPedidosVisitaActual = useObtenerTotalPedidosVisitaActual();

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

	const creditoDisponible = useObtenerCreditoDisponible().creditoDisponible;

	const color = useObtenerColor();

	const mostrarAviso = useMostrarAviso();

	const [yaMostroAviso, setYaMostroAviso] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (
			!yaMostroAviso &&
			datosCliente?.informacionCrediticia.condicion !== 'contado' &&
			creditoDisponible -
				(obtenerTotalPedidosVisitaActual().totalCredito.totalPrecio ?? 0) <
				0
		) {
			mostrarAviso(
				'warning',
				t('toast.limiteDeCreditoExcedidoTitulo'),
				t('toast.limiteDeCreditoExcedidoMensaje'),
				undefined,
				'sinLimiteCredito'
			);
			setYaMostroAviso(true);
		}

		if (yaMostroAviso && creditoDisponible >= 0) {
			setYaMostroAviso(false);
		}
	}, [
		creditoDisponible -
			(obtenerTotalPedidosVisitaActual().totalCredito.totalPrecio ?? 0) <
			0,
	]);

	const indicadores = [];

	const disponible = datosCliente?.informacionCrediticia.disponible;
	if (datosCliente?.informacionCrediticia.condicion !== 'contado')
		indicadores.push({
			titulo: t('general.creditoDisponible'),
			valorMax: disponible === 0 ? 1 : disponible,
			valor:
				creditoDisponible - //error
				(obtenerTotalPedidosVisitaActual().totalCredito.totalPrecio ?? 0),
			color: color.creditoDisponible,
			condicion: datosCliente?.informacionCrediticia.condicion,
			dataCY: 'indicador-credito-maximo',
		});

	if (datosCliente?.configuracionPedido.ventaMinima?.montoVentaMinima)
		indicadores.push({
			titulo: t('general.pedidoMinimo'),
			valorMax: datosCliente?.configuracionPedido.ventaMinima?.montoVentaMinima,
			valor:
				totalesPedidoCliente +
				(obtenerTotalPedidosVisitaActual(true).totalPrecio ?? 0),
			color: color.pedidoMinimo,
			dataCY: 'indicador-pedido-minimo',
		});

	if (
		datosCliente?.configuracionPedido.ventaContadoMaxima
			?.montoVentaContadoMaxima
	)
		indicadores.push({
			titulo: t('general.pedidoMaximo'),
			valorMax:
				datosCliente?.configuracionPedido.ventaContadoMaxima
					?.montoVentaContadoMaxima,
			valor:
				totalContadoPedidosClienteMismaFechaEntrega +
				(obtenerTotalPedidosVisitaActual().totalContado.totalPrecio ?? 0) +
				montoTotalCompromisos +
				compromisoDeCobroActual.monto,
			color: color.pedidoMaximo,
			dataCY: 'indicador-credito-minimo',
		});

	return (
		<Grid container spacing='20px' alignItems='flex-end'>
			{indicadores.map((el, i) => (
				<Grid item xs key={i}>
					<BarraDeProgreso
						titulo={el.titulo}
						max={el.valorMax}
						valor={el.valor}
						color={el.color}
						condicion={el.condicion}
						dataCY={el.dataCY}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default IndicadoresDelPedidoActual;
