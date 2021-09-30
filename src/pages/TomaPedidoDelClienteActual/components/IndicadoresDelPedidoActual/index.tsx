import {Grid} from '@mui/material';
import {BarraDeProgreso, Center} from 'components/UI';
import {ETiposDePago, TCliente, TClienteActual} from 'models';
import {
	useObtenerDatosCliente,
	useObtenerPedidosClienteMismaFechaEntrega,
	useObtenerCreditoDisponible,
	useObtenerCompromisosDeCobroMismaFechaEntrega,
	useObtenerTotalPedidosVisitaActual,
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

	const indicadores = [
		{
			titulo: t('general.pedidoMinimo'),
			valorMax: datosCliente?.configuracionPedido.ventaMinima?.montoVentaMinima,
			valor:
				totalesPedidoCliente +
				(obtenerTotalPedidosVisitaActual().totalPrecio ?? 0),
			color: color.pedidoMinimo,
			dataCY: 'indicador-pedido-minimo',
		},
		{
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
		},
		{
			titulo: t('general.creditoDisponible'),
			valorMax: datosCliente?.informacionCrediticia.disponible,
			valor:
				creditoDisponible - //error
				(obtenerTotalPedidosVisitaActual().totalCredito.totalPrecio ?? 0),
			color: color.creditoDisponible,
			condicion: datosCliente?.informacionCrediticia.condicion,
			dataCY: 'indicador-credito-maximo',
		},
	];

	return (
		<div>
			<Grid container direction='row' spacing={3}>
				{indicadores.map((el, i) => (
					<Grid item xs='auto' key={i} style={{padding: 7}}>
						<Center>
							<BarraDeProgreso
								titulo={el.titulo}
								max={el.valorMax}
								valor={el.valor}
								color={el.color}
								condicion={el.condicion}
								dataCY={el.dataCY}
								disable={
									el.condicion === 'contado'
										? true
										: el.valorMax === 0
										? true
										: false
								}
							/>
						</Center>
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default IndicadoresDelPedidoActual;
