import React from 'react';
import {
	IndicadoresDelPedidoActual,
	TabVentas,
	TotalesMetodoDeVentaDelPedidoActual,
	BotonCerrarPedidoDelCliente,
} from './components';
import {TotalesCompromisoDeCobroPedidoActual} from '../CompromisoDeCobro/components/index';
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
import {useResetVisitaActualAlDesmontar} from './hooks';
import CompromisoDeCobro from 'pages/CompromisoDeCobro';
import {validarDeshabilitarTabCompromisoDeCobro} from 'utils/validaciones';
import {useObtenerMostrarPromoPush} from 'hooks';

const TomaPedidoDelClienteActual: React.FC = () => {
	const [value, setValue] = React.useState(0);
	const obtenerMostrarPromoPush = useObtenerMostrarPromoPush();

	useResetVisitaActualAlDesmontar();
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
				<TabsPedidoActual value={value} setValue={setValue} />
			</Estructura.Cuerpo>
			<Estructura.PieDePagina>
				<Grid container spacing={1}>
					{!obtenerMostrarPromoPush && <PieDelTab value={value} />}
				</Grid>

				<Grid container spacing={1}>
					<Grid item xs={6}>
						<BotonVerEnvases />
					</Grid>
					<Grid item xs={6}>
						<BotonCerrarPedidoDelCliente />
					</Grid>
				</Grid>
			</Estructura.PieDePagina>
		</Estructura>
	);
};

function BotonVerEnvases() {
	const {t} = useTranslation();
	const obtenerMostrarPromoPush = useObtenerMostrarPromoPush();
	let {path} = useRouteMatch();
	let history = useHistory();

	return !obtenerMostrarPromoPush ? (
		<Button
			variant='contained'
			color='primary'
			data-cy='boton-verEnvases'
			onClick={() => history.push(`${path}${nombresRutas.envasesRetornables}`)}
			fullWidth
		>
			{t('general.verEnvases').toUpperCase()}
		</Button>
	) : null;
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

function TabsPedidoActual({value, setValue}: any) {
	let {t} = useTranslation();

	const tabs = [
		{
			label: t('general.ventas'),
			component: TabVentas,
			deshabilitar: false,
		},
		{
			label: t('general.compromisoCobro'),
			component: CompromisoDeCobro,
			deshabilitar: validarDeshabilitarTabCompromisoDeCobro(),
		},
	];

	return <Tabs tabs={tabs} value={value} setValue={setValue} />;
}

function PieDelTab({value}: {value: number}) {
	return value === 0 ? (
		<TotalesMetodoDeVentaDelPedidoActual />
	) : (
		<TotalesCompromisoDeCobroPedidoActual />
	);
}

export default TomaPedidoDelClienteActual;
