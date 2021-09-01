import {Grid} from '@material-ui/core';
import {BarraDeProgeso, Center} from 'components/UI';
import {TCliente, TClienteActual, TTotalPedido} from 'models';
import {
	useObtenerDatosCliente,
	useCalcularTotalPedido,
	useObtenerPedidosClienteMismaFechaEntrega,
	useObtenerCreditoDisponible,
	useObtenerCompromisosDeCobroMismaFechaEntrega,
} from 'hooks';
import {
	useObtenerClienteActual,
	useObtenerCompromisoDeCobroActual,
	useObtenerPedidoActual,
} from 'redux/hooks';
import {useTranslation} from 'react-i18next';
import {
	obtenerTotalesPedidosCliente,
	obtenerTotalesContadoPedidosCliente,
	obtenerTotalesCompromisoDeCobroCliente,
} from 'utils/methods';
import {useObtenerColor} from './hooks/useObtenerColor';
import {useEffect, useState} from 'react';

const IndicadoresDelPedidoActual = () => {
	const {t} = useTranslation();
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const calcularTotalPedido = useCalcularTotalPedido();
	const pedidoActual = useObtenerPedidoActual();
	const [totalPedidoActual, setTotalPedidoActual] = useState<TTotalPedido>();
	useEffect(() => {
		const totalPedidoActual = calcularTotalPedido();
		setTotalPedidoActual(totalPedidoActual);
	}, [pedidoActual]);
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

	const creditoDisponible = useObtenerCreditoDisponible().creditoDisponible;

	const color = useObtenerColor();

	const indicadores = [
		{
			titulo: t('general.pedidoMinimo'),
			valorMax: datosCliente?.configuracionPedido.ventaMinima?.montoVentaMinima,
			valor: totalesPedidoCliente + (totalPedidoActual?.totalPrecio ?? 0),
			color: color.pedidoMinimo,
			dataCY: 'indicador-pedido-minimo',
		},
		{
			titulo: t('general.pedidoMaximo'),
			valorMax:
				datosCliente?.configuracionPedido.ventaContadoMaxima
					?.montoVentaContadoMaxima,
			valor:
				totalesContadoPedidoCliente +
				(totalPedidoActual?.totalContado.totalPrecio ?? 0) +
				montoTotalCompromisos +
				compromisoDeCobroActual.monto,
			color: color.pedidoMaximo,
			dataCY: 'indicador-credito-minimo',
		},
		{
			titulo: t('general.creditoDisponible'),
			valorMax: datosCliente?.informacionCrediticia.disponible,
			valor:
				creditoDisponible - (totalPedidoActual?.totalCredito.totalPrecio ?? 0),
			color: color.creditoDisponible,
			condicion: datosCliente?.informacionCrediticia.condicion,
			dataCY: 'indicador-credito-maximo',
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
								dataCY={el.dataCY}
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
