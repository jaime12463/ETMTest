import React from 'react';
import {
	IndicadoresDelPedidoActual,
	TabVentas,
	TotalesMetodoDeVentaDelPedidoActual,
	BotonCerrarPedidoDelCliente,
} from './components';
import {TotalesCompromisoDeCobroPedidoActual} from 'pages/3_Otros/CompromisoDeCobro/components/index';
import {
	Dialogo,
	Estructura,
	Tabs,
	BotonBarraInferior,
	Stepper,
	TarjetaColapsable,
	TarjetaDoble,
} from 'components/UI';
import {Button, Grid, IconButton, Box, Typography, Input} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {useHistory, useRouteMatch} from 'react-router-dom';
import nombresRutas from 'routes/nombresRutas';
import {
	FechaEntregaDelPedidoActual,
	InfoClienteDelPedidoActual,
} from 'components/Negocio';
import CompromisoDeCobro from 'pages/3_Otros/CompromisoDeCobro';
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
import {
	AgregarRedondoIcon,
	BotellaIcon,
	CajaIcon,
	PromocionesRellenoIcon,
	QuitarRellenoIcon,
} from '../../assests/iconos';
import {useObtenerClienteActual} from '../../redux/hooks';
import {TClienteActual, TProductoPedido} from 'models';
import {styled} from '@mui/material/styles';

const InputStyled = styled(Input)(({}) => ({
	borderRadius: '10px',
	border: '1px solid #2F000E',
	height: '22px',
	width: '42px',
	backgroundColor: 'white',
	fontWeight: 600,
	lineHeight: '16px',
	fontSize: '12px',
}));

const TomaPedidoDelClienteActual: React.FC = () => {
	const [value, setValue] = React.useState(0);
	const {mostrarPromoPush, pedidos} = useObtenerVisitaActual();
	const {habilitaOrdenDeCompra} = useObtenerConfiguracion();
	const history = useHistory();
	let {path} = useRouteMatch();
	const {razonSocial}: TClienteActual = useObtenerClienteActual();
	const [expandido, setExpandido] = React.useState<string | boolean>(false);
	const {venta} = pedidos;

	return (
		<Estructura>
			<Estructura.Encabezado
				esConFechaHaciaAtras={true}
				titulo={razonSocial}
				// acciones={<BotonVerPedidosDelClienteActual />}
			>
				<InfoClienteDelPedidoActual />
			</Estructura.Encabezado>
			<Estructura.Cuerpo>
				<Box my={3}>
					<IndicadoresDelPedidoActual />
				</Box>
				<Box my={3}>
					<Stepper pasoActivo={1} />
				</Box>

				<TarjetaColapsable
					id='Toma de pedido'
					titulo={<Typography variant={'subtitle1'}>Toma de pedido</Typography>}
					subTitulo={
						<Typography variant={'body3'}>
							Modifica tu pedido con las mejores opciones para tu cliente.
						</Typography>
					}
					expandido={expandido}
					setExpandido={setExpandido}
					cantidadItems={venta.productos.length}
				>
					<TabsPedidoActual value={value} setValue={setValue} />
					{venta.productos.length > 0 &&
						venta.productos.map((producto) => {
							return (
								<TarjetaDoble
									key={producto.codigoProducto}
									izquierda={<Izquierda producto={producto} />}
									derecha={<Derecha producto={producto} />}
								/>
							);
						})}
				</TarjetaColapsable>
			</Estructura.Cuerpo>
			<Estructura.PieDePagina>
				<BotonBarraInferior
					descripcion='Continuar a Toma de pedido'
					numeroItems={130}
					total='1000.00$'
					onClick={() =>
						history.push(`${path}${nombresRutas.envasesRetornables}`)
					}
				/>
			</Estructura.PieDePagina>
		</Estructura>
	);
};

interface Props {
	producto: TProductoPedido;
}

const Izquierda: React.FC<Props> = ({producto}) => {
	console.log(producto);

	return (
		<Grid container direction='column' padding={2}>
			<Grid item>
				<Typography fontSize='12px' fontWeight='600'>
					{producto.codigoProducto}
				</Typography>
				<Typography fontSize='12px' fontFamily='Poppins' fontWeight='600'>
					{producto.nombreProducto.toUpperCase()}
				</Typography>
				{/* <Typography fontSize="10px">12 oz | Vidrio | Retornable</Typography> A DEFINIR DE DONDE VIENE ESTA INFO */}
			</Grid>
			<Grid container direction='row' spacing={0.5} alignItems='center'>
				<Grid item>
					<CajaIcon />
				</Grid>
				<Grid item>
					<Typography fontSize='10px'>{`x${producto.presentacion}`}</Typography>
				</Grid>
				<Grid item>
					<Typography
						fontSize='12px'
						fontWeight='600'
					>{`$${producto.precioConImpuestoUnidad}`}</Typography>
				</Grid>
				<Grid item>
					<BotellaIcon />
				</Grid>
				<Grid item>
					<Typography
						fontSize='12px'
						fontWeight='600'
					>{`$${producto.precioConImpuestoSubunidad}`}</Typography>
				</Grid>
			</Grid>
			<Grid></Grid>
		</Grid>
	);
};

const Derecha: React.FC<Props> = ({producto}) => {
	return (
		<Grid
			container
			direction='column'
			alignItems='center'
			justifyContent='center'
			padding={2}
			height='100%'
		>
			<Grid container direction='row' alignItems='center'>
				<Grid item>
					<CajaIcon />
				</Grid>
				<Grid item>
					<IconButton size='small'>
						<QuitarRellenoIcon width='18px' height='18px' />
					</IconButton>
				</Grid>
				<Grid item>
					<InputStyled
						value={producto.unidades}
						disableUnderline
						inputProps={{style: {textAlign: 'center'}}}
					/>
				</Grid>
				<Grid item>
					<IconButton size='small'>
						<AgregarRedondoIcon width='18px' height='18px' />
					</IconButton>
				</Grid>
			</Grid>
			<Grid container direction='row' alignItems='center'>
				<Grid item>
					<BotellaIcon />
				</Grid>
				<Grid item>
					<IconButton size='small'>
						<QuitarRellenoIcon width='18px' height='18px' />
					</IconButton>
				</Grid>
				<Grid item>
					<InputStyled
						value={producto.subUnidades}
						disableUnderline
						inputProps={{style: {textAlign: 'center'}}}
					/>
				</Grid>
				<Grid item>
					<IconButton size='small'>
						<AgregarRedondoIcon width='18px' height='18px' />
					</IconButton>
				</Grid>
			</Grid>
		</Grid>
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
			tipoPedidosValorizados.includes(pedido) &&
			pedidos[pedido]?.productos.length > 0
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

			/* 	onClick={() => history.push(`${path}${nombresRutas.pedidosCliente}`)} */
		>
			<PromocionesRellenoIcon fill='#fff' />
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
