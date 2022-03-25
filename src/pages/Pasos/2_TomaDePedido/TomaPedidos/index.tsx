import React, {useState} from 'react';
import {
	InputsKeysFormTomaDePedido,
	TClienteActual,
	TFormTomaDePedido,
	TPrecioProducto,
	TCliente,
	ETiposDePago,
	TPedidosClientes,
} from 'models';
import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerPedidosClientes,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {useForm} from 'react-hook-form';
import {
	useInicializarPreciosProductosDelClienteActual,
	useMostrarAviso,
	useObtenerDatosCliente,
} from 'hooks';
import {
	agregarProductoDelPedidoActual,
	borrarPromocionesOngoing,
	cambiarAvisos,
	cambiarSeQuedaAEditar,
} from 'redux/features/visitaActual/visitaActualSlice';
import {SwipeBorrar, Tooltip} from 'components/UI';
import {
	AutocompleteSeleccionarProducto,
	DrawerPromociones,
} from 'components/Negocio';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import {BorrarIcon, BuscarIcon, PromocionColor} from 'assests/iconos';
import {useBorrarLinea, useBorrarTodoTomaPedido} from '../hooks';
import {useMostrarAdvertenciaEnDialogo} from 'hooks';
import useEstilos from '../useEstilos';
import {SwitchCambiarTipoPago} from '../components';
import Modal from 'components/UI/Modal';
import TarjetaTomaPedido from 'components/UI/TarjetaTomaPedido';
import TarjetaPromoPush from 'pages/Pasos/2_TomaDePedido/PromoPush/TarjetaPromoPush';
import Box from '@mui/material/Box';
import {useTranslation} from 'react-i18next';
import {PromocionesOngoing} from 'utils/procesos/promociones/PromocionesOngoing';

import {useObtenerDatos} from 'redux/hooks';
import DrawerBuscador from 'components/Negocio/DrawerBuscador';

const TomaPedido: React.FC = () => {
	const {mostrarAdvertenciaEnDialogo, mostarDialogo, parametrosDialogo} =
		useMostrarAdvertenciaEnDialogo();

	const [configAlerta, setConfigAlerta] = useState({
		titulo: '',
		mensaje: '',
		tituloBotonAceptar: '',
		tituloBotonCancelar: '',
		iconoMensaje: <></>,
		callbackAceptar: () => {},
	});

	const {t} = useTranslation();

	const [alerta, setAlerta] = React.useState<boolean>(false);
	const [openBuscador, setOpenBuscador] = React.useState<boolean>(false);
	const [openTooltip, setOpenTooltip] = React.useState<boolean>(false);
	const [preciosProductos, setPreciosProductos] = React.useState<
		TPrecioProducto[]
	>([]);
	const [expandidoPromoPush, setExpandidoexpandidoPromoPush] = React.useState<
		string | boolean
	>(false);
	const [productoActual, setProductoActual] =
		React.useState<TPrecioProducto | null>(null);

	const [inputFocus, setInputFocus] =
		React.useState<InputsKeysFormTomaDePedido>('productoABuscar');

	const [promocionesOingoing, setPromocionesOingoing] = React.useState<any>();
	const [openDrawerPromociones, setOpenDrawerPromociones] =
		React.useState<boolean>(false);

	const [focusId, setFocusId] = React.useState(0);
	const visitaActual = useObtenerVisitaActual();
	const datos = useObtenerDatos();
	const {venta} = visitaActual.pedidos;
	const defaultValues: TFormTomaDePedido = {
		unidades: '',
		subUnidades: '',
		productoABuscar: '',
		tipoDePedido: visitaActual.tipoPedidoActual,
		catalogoMotivo: '',
	};
	const {control, handleSubmit, setValue, getValues} =
		useForm<TFormTomaDePedido>({defaultValues});
	const stateInputFocus = {inputFocus, setInputFocus};
	const hookForm = {control, handleSubmit, setValue, getValues};
	useInicializarPreciosProductosDelClienteActual(setPreciosProductos);
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const dispatch = useAppDispatch();
	const catalogoMotivo = '';
	const classes = useEstilos();
	const mostrarAviso = useMostrarAviso();
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const datosCliente: TCliente | undefined = obtenerDatosCliente(
		clienteActual.codigoCliente
	);

	const borrarTodosLosProductos = useBorrarTodoTomaPedido(
		{setAlerta, setConfigAlerta},
		venta.productos
	);

	if (!datosCliente) return <></>;
	const {configuracionPedido}: any = datosCliente;

	const borrarlinea = useBorrarLinea({setAlerta, setConfigAlerta});

	const promocionesOngoing = PromocionesOngoing.getInstance();
	const promocionesVigentesCliente = promocionesOngoing.obtenerListaVigentes();
	const pedidosCliente: TPedidosClientes = useObtenerPedidosClientes();

	const puedeBotonPromocionesOngoing =
		venta.productos.some(
			(producto) => producto.unidades > 0 || producto.subUnidades > 0
		) && promocionesVigentesCliente?.existenPromociones;

	const manejadorBotonPromosOngoing = () => {
		setOpenDrawerPromociones(true);
		setFocusId(0);
		setInputFocus('productoABuscar');
		if (
			visitaActual.avisos.cambioElPedidoSinPromociones.contado ||
			visitaActual.avisos.cambioElPedidoSinPromociones.credito
		) {
			const {cambioElPedidoSinPromociones} = visitaActual.avisos;
			let tipos: ETiposDePago[] =
				cambioElPedidoSinPromociones.contado &&
				cambioElPedidoSinPromociones.credito
					? [ETiposDePago.Contado, ETiposDePago.Credito]
					: cambioElPedidoSinPromociones.contado &&
					  !cambioElPedidoSinPromociones.credito
					? [ETiposDePago.Contado]
					: cambioElPedidoSinPromociones.credito &&
					  !cambioElPedidoSinPromociones.contado
					? [ETiposDePago.Credito]
					: [ETiposDePago.Contado, ETiposDePago.Credito];

			const promociones = promocionesOngoing.calcular(venta.productos, tipos);

			tipos.length === 1 && tipos[0] === ETiposDePago.Contado
				? setPromocionesOingoing({
						...promociones,
						credito: promocionesOingoing?.credito ?? promociones.credito,
				  })
				: tipos.length === 1 && tipos[0] === ETiposDePago.Credito
				? setPromocionesOingoing({
						...promociones,
						contado: promocionesOingoing?.contado ?? promociones.contado,
				  })
				: setPromocionesOingoing({...promociones});

			tipos.forEach((tipo) =>
				dispatch(
					borrarPromocionesOngoing({
						tipoPago: tipo === ETiposDePago.Contado ? 'Contado' : 'Credito',
					})
				)
			);
		} else {
			const promociones = promocionesOngoing.calcular(venta.productos, []);
			setPromocionesOingoing(promociones);
		}

		dispatch(
			cambiarAvisos({
				calculoPromociones: true,
				cambioElPedidoSinPromociones: {contado: false, credito: false},
			})
		);

		setOpenTooltip(false);
	};

	React.useEffect(() => {
		const {cambioElPedidoSinPromociones, calculoPromociones} =
			visitaActual.avisos;

		if (
			(cambioElPedidoSinPromociones.contado ||
				cambioElPedidoSinPromociones.credito) &&
			calculoPromociones &&
			venta.productos.length > 0
		) {
			setOpenTooltip(true);
		}
	}, [visitaActual.avisos.cambioElPedidoSinPromociones]);

	React.useEffect(() => {
		if (
			!visitaActual.seQuedaAEditar.seQueda &&
			visitaActual.seQuedaAEditar.bordeError &&
			venta.productos.every((producto) => {
				if (producto.unidadesDisponibles) {
					return producto.unidades <= producto.unidadesDisponibles;
				}

				return (
					(producto.unidades > 0 &&
						producto.unidades <= configuracionPedido.cantidadMaximaUnidades) ||
					producto.subUnidades > 0
				);
			})
		) {
			dispatch(cambiarSeQuedaAEditar({seQueda: false, bordeError: false}));
		}
	}, [visitaActual.seQuedaAEditar.seQueda, venta.productos]);

	React.useEffect(() => {
		if (productoActual !== null) {
			const productoEnPedido = venta.productos.find(
				(producto) => producto.codigoProducto === productoActual.codigoProducto
			);
			if (!productoEnPedido) {
				dispatch(
					agregarProductoDelPedidoActual({
						productoPedido: {
							...productoActual,
							unidades: 0,
							subUnidades: 0,
							total: 0,
							tipoPago: clienteActual.tipoPagoActual,
							catalogoMotivo,
							estado: 'activo',
							preciosBase: {
								unidad: productoActual.precioConImpuestoUnidad,
								subUnidad: productoActual.precioConImpuestoSubunidad,
							},
							preciosNeto: {
								unidad: productoActual.precioConImpuestoUnidad,
								subUnidad: productoActual.precioConImpuestoSubunidad,
							},
							preciosPromo: {
								unidad: 0,
								subUnidad: 0,
							},
						},
					})
				);
			}
			setFocusId(productoActual.codigoProducto);
			setProductoActual(null);
		}
	}, [productoActual?.codigoProducto]);

	return (
		<>
			<Modal
				setAlerta={setAlerta}
				alerta={alerta}
				contenidoMensaje={configAlerta}
			/>
			<Stack spacing='10px'>
				<Box
					alignItems='center'
					display='flex'
					justifyContent='space-between'
					margin={
						openTooltip
							? '18px 0 45px 0'
							: venta.productos.length > 0
							? '18px 0 28px 0'
							: '18px 0 0 0'
					}
					paddingLeft='18px'
				>
					<AutocompleteSeleccionarProducto
						hookForm={hookForm}
						stateProductoActual={{productoActual, setProductoActual}}
						statePreciosProductos={{preciosProductos, setPreciosProductos}}
						stateInputFocus={stateInputFocus}
					/>
					<Box alignItems='center' display='flex' gap='16px'>
						{puedeBotonPromocionesOngoing && (
							<Box position='relative'>
								<IconButton
									style={{padding: 0}}
									onClick={() => manejadorBotonPromosOngoing()}
									data-cy={'botonPromocionesOnGoing'}
								>
									<PromocionColor height='24px' width='24px' />
								</IconButton>
								<Tooltip open={openTooltip} />
							</Box>
						)}
						<IconButton
							sx={{padding: 0, marginRight: '9px'}}
							onClick={() => setOpenBuscador(true)}
						>
							<BuscarIcon height='18px' width='18px' />
						</IconButton>
					</Box>
				</Box>
				<DrawerBuscador
					openBuscador={openBuscador}
					setOpenBuscador={setOpenBuscador}
				/>
				<DrawerPromociones
					openDrawerPromociones={openDrawerPromociones}
					setOpenDrawerPromociones={setOpenDrawerPromociones}
					promocionesOingoing={promocionesOingoing}
					setPromocionesOingoing={setPromocionesOingoing}
				/>
				{venta?.productos?.length > 0 &&
					venta?.productos?.some(
						(producto) => producto.unidades > 0 || producto.subUnidades > 0
					) && (
						<Grid container alignItems='center' justifyContent='space-between'>
							<Box
								display={'flex'}
								minWidth={'100%'}
								justifyContent='space-between'
								alignItems='center'
								padding={'0 0 0 18px'}
							>
								<SwitchCambiarTipoPago />
								<Chip
									className={classes.root}
									size='small'
									label={
										<Box alignItems='center' display='flex' gap='4px'>
											<BorrarIcon width='10px' height='10px' />
											<Typography
												variant='caption'
												color='secondary'
												fontFamily='Open Sans'
											>
												{t('general.eliminarTodo')}
											</Typography>
										</Box>
									}
									sx={{'&:hover': {background: 'none'}}}
									onClick={() => borrarTodosLosProductos()}
								/>
							</Box>
						</Grid>
					)}

				{venta.productos.length > 0 &&
					venta.productos
						.filter((producto) => producto.estado === 'activo')
						.map((producto) => {
							return (
								<SwipeBorrar
									key={producto.codigoProducto}
									item={producto}
									manejadorGesto={() => borrarlinea(producto)}
								>
									{producto.promoPush ? (
										<Box
											minWidth={'100%'}
											display={'flex'}
											justifyContent={'flex-end'}
										>
											<TarjetaPromoPush
												key={producto.codigoProducto}
												item={producto}
												id={producto.nombreProducto}
												expandidoPromoPush={expandidoPromoPush}
												setExpandidoexpandidoPromoPush={
													setExpandidoexpandidoPromoPush
												}
												mostrarAdvertenciaEnDialogo={
													mostrarAdvertenciaEnDialogo
												}
												stateFocusId={{focusId, setFocusId}}
												stateInputFocus={stateInputFocus}
											/>
										</Box>
									) : (
										<TarjetaTomaPedido
											producto={producto}
											stateFocusId={{focusId, setFocusId}}
											stateInputFocus={stateInputFocus}
											bordeRedondeado
											conSwitch
											stateAviso={{setAlerta, setConfigAlerta}}
										/>
									)}
								</SwipeBorrar>
							);
						})}
			</Stack>
		</>
	);
};
export default TomaPedido;
