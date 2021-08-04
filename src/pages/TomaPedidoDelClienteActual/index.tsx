import {
	IndicadoresDelPedidoActual,
	TabVentas,
	TotalesMetodoDeVentaDelPedidoActual,
	BotonCerrarPedidoDelCliente
} from './components';
import {Estructura, Tabs} from 'components/UI';
import {Button, Grid, IconButton, Box} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {useHistory, useRouteMatch} from 'react-router-dom';
import nombresRutas from 'routes/nombresRutas';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {
	FechaEntregaDelPedidoActual,
	InfoClienteDelPedidoActual,
} from 'components/Negocio';

const TomaPedidoDelClienteActual: React.FC = () => {
	//Hacer Reset pedido actual cuando se desmonte este componente
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
				<Box mb={3}>
					<IndicadoresDelPedidoActual />
				</Box>
				<TabsPedidoActual />
			</Estructura.Cuerpo>
			<Estructura.PieDePagina>
				<Grid container spacing={1}>
					<TotalesMetodoDeVentaDelPedidoActual />
				</Grid>
				<Grid container spacing={1}>
					<Grid item xs={6}>
						<BotonCerrarPedidoDelCliente />
					</Grid>
					<Grid item xs={6}>
						<BotonVerEnvases />
					</Grid>
				</Grid>
			</Estructura.PieDePagina>
		</Estructura>
	);
};

function BotonVerEnvases() {
	const {t} = useTranslation();
	let {path} = useRouteMatch();
	let history = useHistory();
	return (
		<Button
			variant='contained'
			color='primary'
			data-cy='boton-verEnvases'
			onClick={() => history.push(`${path}${nombresRutas.envasesRetornables}`)}
			fullWidth
		>
			{t('general.verEnvases').toUpperCase()}
		</Button>
	);
}

function BotonVerPedidosDelClienteActual() {
	let {path} = useRouteMatch();
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
