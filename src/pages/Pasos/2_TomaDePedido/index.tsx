import React from 'react';
import {
	TabVentas,
	TotalesMetodoDeVentaDelPedidoActual,
	BotonCerrarPedidoDelCliente,
} from './components';
import {TotalesCompromisoDeCobroPedidoActual} from 'pages/Pasos/3_Otros/CompromisoDeCobro/components/index';
import {
	Dialogo,
	Estructura,
	Tabs,
	BotonBarraInferior,
	Stepper,
	TarjetaColapsable,
	TarjetaDoble,
} from 'components/UI';
import {
	Button,
	Grid,
	IconButton,
	Box,
	Typography,
	Input,
	Stack,
} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {useHistory, useRouteMatch} from 'react-router-dom';
import nombresRutas from 'routes/nombresRutas';
import {
	AutocompleteSeleccionarProducto,
	FechaEntregaDelPedidoActual,
	InfoClienteDelPedidoActual,
} from 'components/Negocio';
import CompromisoDeCobro from 'pages/Pasos/3_Otros/CompromisoDeCobro';
import {validarDeshabilitarTabCompromisoDeCobro} from 'utils/validaciones';
import {
	useAppDispatch,
	useAppSelector,
	useObtenerConfiguracion,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {
	useInicializarPreciosProductosDelClienteActual,
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
} from '../../../assests/iconos';

import TomaPedido from './TomaPedidos';
import PromoPush from './PromoPush';

const TomaPedidoDelClienteActual: React.FC = () => {
	const [expandido, setExpandido] = React.useState<boolean | string>(false);
	const visitaActual = useObtenerVisitaActual();
	const {venta} = visitaActual.pedidos;
	const productosConUnidades = venta.productos.filter((producto) => {
		return producto.unidades > 0 || producto.subUnidades > 0;
	});

	console.log(productosConUnidades.length);

	return (
		<Stack spacing={2}>
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
				cantidadItems={productosConUnidades.length}
			>
				<TomaPedido />
			</TarjetaColapsable>

			<TarjetaColapsable
				id='Promociones'
				titulo={<Typography variant={'subtitle1'}>Promociones</Typography>}
				subTitulo={
					<Typography variant={'body3'}>
						Selecciona las promociones que tienes disponible para tus clientes.
					</Typography>
				}
				expandido={expandido}
				setExpandido={setExpandido}
			>
				<PromoPush />
			</TarjetaColapsable>
		</Stack>
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

	const manjadorClickDialog = (resultado: boolean, data: any) => {
		if (resultado)
			if (data.textoInput.trim() !== '')
				dispatch(cambiarOrdenDeCompra({ordenDeCompra: data.textoInput}));
			else {
				//EMAHOY
				/* 				console.log(
					'DATA en blanco y acepto. Debe mostrar segunda advertencia'
				); */
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
