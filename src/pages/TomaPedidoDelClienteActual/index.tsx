import React from 'react';
import {
	IndicadoresDelPedidoActual,
	TabVentas,
	TotalesMetodoDeVentaDelPedidoActual,
	BotonCerrarPedidoDelCliente,
} from './components';
import {TotalesCompromisoDeCobroPedidoActual} from '../CompromisoDeCobro/components/index';
import {
	Dialogo,
	Estructura,
	Tabs,
	BotonBarraInferior,
	Stepper,
} from 'components/UI';
import {Button, Grid, IconButton, Box} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {useHistory, useRouteMatch} from 'react-router-dom';
import nombresRutas from 'routes/nombresRutas';
import {
	FechaEntregaDelPedidoActual,
	InfoClienteDelPedidoActual,
} from 'components/Negocio';
import {useResetVisitaActualAlDesmontar} from './hooks';
import CompromisoDeCobro from 'pages/CompromisoDeCobro';
import {validarDeshabilitarTabCompromisoDeCobro} from 'utils/validaciones';
import {
	useAppDispatch,
	useAppSelector,
	useObtenerConfiguracion,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {
	useMostrarAdvertenciaEnDialogo,
	useObtenerDatosTipoPedido,
	useObtenerTiposPedidoSegunConfiguracion,
} from 'hooks';
import {
	cambiarOrdenDeCompra,
	selectVisitaActual,
} from 'redux/features/visitaActual/visitaActualSlice';

const TomaPedidoDelClienteActual: React.FC = () => {
	const [value, setValue] = React.useState(0);
	const {mostrarPromoPush} = useObtenerVisitaActual();
	const {habilitaOrdenDeCompra} = useObtenerConfiguracion();

	useResetVisitaActualAlDesmontar();
	/*useEffect(() => {
		effect
		return () => {
			cleanup
		}
	}, [])
	*/
	return (
		<Estructura>
			<Estructura.Encabezado
				esConFechaHaciaAtras={true}
				acciones={<BotonVerPedidosDelClienteActual />}
			>
				<InfoClienteDelPedidoActual />
			</Estructura.Encabezado>
			<Estructura.Cuerpo>
				<Box my={3}>
					<Stepper pasoActivo={1} />
				</Box>
				<Box mb={3}>{/* <IndicadoresDelPedidoActual /> */}</Box>
				<TabsPedidoActual value={value} setValue={setValue} />
			</Estructura.Cuerpo>
			<Estructura.PieDePagina>
				<BotonBarraInferior
					descripcion='Continuar a Toma de pedido'
					numeroItems={130}
					total='1000.00$'
				></BotonBarraInferior>
			</Estructura.PieDePagina>
		</Estructura>
	);
};

function BotonAgregarOrdenDeCompra() {
	const {t} = useTranslation();
	const dispatch = useAppDispatch();
	const {ordenDeCompra} = useAppSelector(selectVisitaActual);
	const {pedidos} = useObtenerVisitaActual();
	const obtenerTiposPedidoSegunConfiguracion =
		useObtenerTiposPedidoSegunConfiguracion;
	const {mostrarAdvertenciaEnDialogo, mostarDialogo, parametrosDialogo} =
		useMostrarAdvertenciaEnDialogo();

	let {path} = useRouteMatch();
	let history = useHistory();

	const tipoPedidosValorizados = obtenerTiposPedidoSegunConfiguracion(
		'esValorizado',
		true
	)();
	const tiposDePedidosValorizadosIngresadosConProductos = Object.keys(
		pedidos
	).filter(
		(pedido) =>
			tipoPedidosValorizados.includes(Number(pedido)) &&
			pedidos[Number(pedido)]?.productos.length > 0
	);

	console.log('Pedidos', pedidos);
	console.log(
		'contiene tipos valorizados',
		tiposDePedidosValorizadosIngresadosConProductos.length
	);

	const manjadorClickDialog = (resultado: boolean, data: any) => {
		if (resultado)
			if (data.textoInput.trim() !== '')
				dispatch(cambiarOrdenDeCompra({ordenDeCompra: data.textoInput}));
			else {
				//EMAHOY
				console.log(
					'DATA en blanco y acepto. Debe mostrar segunda advertencia'
				);
			}
	};

	const manejadorClick = () => {
		mostrarAdvertenciaEnDialogo(
			t('general.deseaAgregarOrdenDeCompra'),
			'dialog-agregarOrden',
			manjadorClickDialog,
			undefined,
			ordenDeCompra,
			t('titulos.ordenDeCompra')
		);
	};

	return (
		<>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<Button
				variant='contained'
				color='primary'
				data-cy='boton-agregarOrdenDeCompra'
				onClick={manejadorClick}
				fullWidth
				disabled={tiposDePedidosValorizadosIngresadosConProductos.length <= 0}
			>
				{t('general.agregarOrdenDeCompra').toUpperCase()}
			</Button>
		</>
	);
}

function BotonVerEnvases() {
	const {t} = useTranslation();
	const {mostrarPromoPush} = useObtenerVisitaActual();
	let {path} = useRouteMatch();
	let history = useHistory();
	const obtenerDatosTipoPedido = useObtenerDatosTipoPedido();
	const datosTipoPedidoActual = obtenerDatosTipoPedido();

	return !mostrarPromoPush ? (
		<Button
			variant='contained'
			color='primary'
			data-cy='boton-verEnvases'
			onClick={() => history.push(`${path}${nombresRutas.envasesRetornables}`)}
			fullWidth
			disabled={!datosTipoPedidoActual?.generaEnvases}
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
			Icono Pedidos
		</IconButton>
	);
}

function TabsPedidoActual({value, setValue}: any) {
	let {t} = useTranslation();

	const tabs = [
		{
			label: t('general.ventas'),
			component: <TabVentas />,
			deshabilitar: false,
		},
		{
			label: t('general.compromisoCobro'),
			component: <CompromisoDeCobro />,
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
