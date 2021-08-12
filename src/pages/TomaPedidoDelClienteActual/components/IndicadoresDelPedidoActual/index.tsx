import {Grid} from '@material-ui/core';
import {BarraDeProgeso, Center} from 'components/UI';
import {TCliente, TClienteActual} from 'models';
import {
	useObtenerDatosCliente,
	useCalcularTotalPedido,
	useObtenerPedidosClienteMismaFechaEntrega,
	useObtenerCreditoDisponible,
} from 'hooks';
import {useObtenerClienteActual} from 'redux/hooks';
import {useTranslation} from 'react-i18next';
import {useState, useEffect} from 'react';
import {
	obtenerTotalesPedidosCliente,
	obtenerTotalesContadoPedidosCliente,
} from 'utils/methods';

const obtenerporcentaje = (valor: number, valorMax: number = 0) => {
	return (valor * 100) / valorMax;
};

const IndicadoresDelPedidoActual = () => {
	const {t} = useTranslation();
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const calcularTotalPedido = useCalcularTotalPedido();
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

	const totalesContadoPedidoCliente = obtenerTotalesContadoPedidosCliente(
		pedidosClienteMismaFechaEntrega
	);

	const creditoDisponible = useObtenerCreditoDisponible().creditoDisponible;

	const [color, setColor] = useState({
		pedidoMinimo: 'rojo',
		pedidoMaximo: 'verde',
		creditoDisponible: 'verde',
	});

	useEffect(() => {
		setColor({
			pedidoMinimo:
				obtenerporcentaje(
					totalesPedidoCliente + calcularTotalPedido.totalPrecio,
					datosCliente?.configuracionPedido.ventaMinima?.montoVentaMinima
				) >= 100
					? 'verde'
					: 'rojo',
			pedidoMaximo:
				obtenerporcentaje(
					totalesContadoPedidoCliente +
						calcularTotalPedido.totalContado.totalPrecio,
					datosCliente?.configuracionPedido.ventaContadoMaxima
						?.montoVentaContadoMaxima
				) > 100
					? 'rojo'
					: 'verde',
			creditoDisponible:
				obtenerporcentaje(
					creditoDisponible - calcularTotalPedido.totalCredito.totalPrecio,
					datosCliente?.informacionCrediticia.disponible
				) <= 0
					? 'rojo'
					: 'verde',
		});
	}, [calcularTotalPedido]);

	const indicadores = [
		{
			titulo: t('general.pedidoMinimo'),
			valorMax: datosCliente?.configuracionPedido.ventaMinima?.montoVentaMinima,
			valor: totalesPedidoCliente + calcularTotalPedido.totalPrecio,
			color: color.pedidoMinimo,
		},
		{
			titulo: t('general.pedidoMaximo'),
			valorMax:
				datosCliente?.configuracionPedido.ventaContadoMaxima
					?.montoVentaContadoMaxima,
			valor:
				totalesContadoPedidoCliente +
				calcularTotalPedido.totalContado.totalPrecio,
			color: color.pedidoMaximo,
		},
		{
			titulo: t('general.creditoDisponible'),
			valorMax: datosCliente?.informacionCrediticia.disponible,
			valor: creditoDisponible - calcularTotalPedido.totalCredito.totalPrecio,
			color: color.creditoDisponible,
			condicion: datosCliente?.informacionCrediticia.condicion,
		},
	];

	return (
		<div>
			<Grid container direction='row' justify='center' spacing={3}>
				{indicadores.map((el, i) => (
					<Grid item xs='auto' key={i} style={{padding: 7}}>
						<Center>
							<BarraDeProgeso
								titulo={el.titulo}
								max={el.valorMax}
								valor={el.valor}
								color={el.color}
								condicion={el.condicion}
								disable={
									el.condicion === 'contado'
										? true
										: el.valorMax === undefined
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
