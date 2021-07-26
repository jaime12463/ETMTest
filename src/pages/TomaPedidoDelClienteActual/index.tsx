import {
	BotonCerrarPedido,
	BotonVerEnvases,
	BotonVerPedidosDelClienteActual,
	FechaEntregaDelPedidoActual,
	IndicadoresDelPedidoActual,
	InfoClienteDelPedidoActual,
	TabsPedidoActual,
	TotalContadoDelPedidoActual,
	TotalCreditoDelPedidoActual,
} from './components';
import {Estructura} from 'components/UI';
import {Box, Grid} from '@material-ui/core';

const TomaPedidoDelClienteActual: React.FC = () => {
	return (
		<Estructura>
			<Estructura.Encabezado
				esConFechaHaciaAtras={true}
				acciones={<BotonVerPedidosDelClienteActual />}
			>
				<InfoClienteDelPedidoActual />
			</Estructura.Encabezado>
			<Estructura.Cuerpo>
				<FechaEntregaDelPedidoActual />
				<IndicadoresDelPedidoActual />
				<TabsPedidoActual />
			</Estructura.Cuerpo>
			<Estructura.PieDePagina>
				<Box mx={2}>
					<Grid container spacing={1}>
						<Grid item xs={6}>
							<TotalCreditoDelPedidoActual />
						</Grid>
						<Grid item xs={6}>
							<TotalContadoDelPedidoActual />
						</Grid>
					</Grid>
					<Grid container spacing={1}>
						<Grid item xs={6}>
							<BotonCerrarPedido />
						</Grid>
						<Grid item xs={6}>
							<BotonVerEnvases />
						</Grid>
					</Grid>
				</Box>
			</Estructura.PieDePagina>
		</Estructura>
	);
};

export default TomaPedidoDelClienteActual;
