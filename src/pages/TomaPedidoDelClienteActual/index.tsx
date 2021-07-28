import {
	IndicadoresDelPedidoActual,
	InfoClienteDelPedidoActual,
	TabVentas,
	TotalContadoDelPedidoActual,
	TotalCreditoDelPedidoActual,
} from './components';
import {Estructura, Tabs} from 'components/UI';
import {Box, Button, Grid, IconButton} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {useHistory, useRouteMatch} from 'react-router-dom';
import nombresRutas from 'routes/nombresRutas';
import AssignmentIcon from '@material-ui/icons/Assignment';

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

function BotonCerrarPedido() {
	const {t} = useTranslation();
	return (
		<Button
			variant='contained'
			color='primary'
			data-cy='boton-cerrarPedido'
			onClick={() => {}}
			fullWidth
		>
			{t('general.cerrarPedido').toUpperCase()}
		</Button>
	);
}

function BotonVerEnvases() {
	const {t} = useTranslation();
	let {path} = useRouteMatch();
	let history = useHistory();
	return (
		<Button
			variant='contained'
			color='primary'
			data-cy='boton-verEnvases'
			//onClick={() => history.push(`${path}${nombresRutas.envasesRetornables}`)}
			onClick={() => history.push(`${path}${nombresRutas.envasesRetornables}`)}
			fullWidth
		>
			{t('verEnvases').toUpperCase()}
		</Button>
	);
}

function BotonVerPedidosDelClienteActual() {
	const history = useHistory();
	return (
		<IconButton
			size='small'
			onClick={() => history.push(`${path}${nombresRutas.pedidosCliente}`)}
		>
			<AssignmentIcon style={{color: 'white'}} />
		</IconButton>
	);
}

function FechaEntregaDelPedidoActual() {
	return <div>FechaEntregaDelPedidoActual</div>;
}

function TabsPedidoActual() {
	const tabs = [
		{
			label: 'Ventas',
			component: TabVentas,
		},
		{
			label: 'Canje',
			component: <h1>Canje</h1>,
		},
		{
			label: 'Devolucion',
			component: <h1>Devolucion</h1>,
		},
	];

	return <Tabs tabs={tabs} />;
}

export default TomaPedidoDelClienteActual;
