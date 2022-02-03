import React, {useState} from 'react';
import {
	InputsKeysFormTomaDePedido,
	TClienteActual,
	TFormTomaDePedido,
	TPrecioProducto,
	TCliente,
} from 'models';
import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {useForm} from 'react-hook-form';
import {
	useInicializarPreciosProductosDelClienteActual,
	useMostrarAviso,
	useObtenerDatosCliente,
} from 'hooks';
import {
	agregarBeneficiosPromoOngoing,
	agregarProductoDelPedidoActual,
	cambiarAvisos,
	cambiarSeQuedaAEditar,
} from 'redux/features/visitaActual/visitaActualSlice';
import {SwipeBorrar} from 'components/UI';
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
import {styled} from '@mui/material/styles';
import {useBorrarLinea, useBorrarTodoTomaPedido} from '../hooks';
import {useMostrarAdvertenciaEnDialogo} from 'hooks';
import useEstilos from '../useEstilos';
import {SwitchCambiarTipoPago} from '../components';
import Modal from 'components/UI/Modal';
import TarjetaTomaPedido from 'components/UI/TarjetaTomaPedido';
import TarjetaPromoPush from 'pages/Pasos/2_TomaDePedido/PromoPush/TarjetaPromoPush';
import {Box} from '@mui/system';
import theme from 'theme';
import {useTranslation} from 'react-i18next';

import {
	obtenerlistaPromocionesVigentes,
	obtenerPromocionesOngoingTotal,
} from 'utils/procesos/promociones';
import {useObtenerDatos} from 'redux/hooks';
import Tooltip, {TooltipProps, tooltipClasses} from '@mui/material/Tooltip';

const TextStyled = styled(Typography)(() => ({
	color: theme.palette.secondary.main,
	fontSize: '10px',
}));

const TooltipStyled = styled(({className, ...props}: TooltipProps) => (
	<Tooltip {...props} classes={{popper: className}} />
))({
	[`& .${tooltipClasses.tooltip}`]: {
		maxWidth: 'none',
		backgroundColor: '#FFFBEF',
		color: '#000000',
		border: '1.5px solid #F7B500',
		borderRadius: '10px',
		bottom: '6px',
	},
	[`& .${tooltipClasses.arrow}`]: {
		'&:before': {
			backgroundColor: '#F7B500',
		},
	},
});

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

	const promocionesVigentesCliente = React.useMemo(
		() => obtenerlistaPromocionesVigentes(datosCliente, datos.promociones),
		[datosCliente, datos.promociones]
	);

	const puedeBotonPromocionesOngoing =
		venta.productos.some(
			(producto) => producto.unidades > 0 || producto.subUnidades > 0
		) && promocionesVigentesCliente?.existenPromociones;

	const manejadorBotonPromosOngoing = () => {
		setOpenDrawerPromociones(true);
		let promociones = obtenerPromocionesOngoingTotal(
			datosCliente,
			venta.productos,
			promocionesVigentesCliente
		);
		setPromocionesOingoing(promociones);
		dispatch(
			cambiarAvisos({
				calculoPromociones: true,
				cambioElPedidoSinPromociones: false,
			})
		);

		dispatch(
			agregarBeneficiosPromoOngoing({
				beneficios: promociones.benficiosParaAgregar,
			})
		);
		setOpenTooltip(false);
	};

	React.useEffect(() => {
		const {cambioElPedidoSinPromociones, calculoPromociones} =
			visitaActual.avisos;

		if (cambioElPedidoSinPromociones && calculoPromociones) {
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
						},
					})
				);
			}
			setFocusId(productoActual.codigoProducto);
			setProductoActual(null);
			mostrarAviso(
				'success',
				t('toast.productoIngresado'),
				undefined,
				undefined,
				'productoIngresado'
			);
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
					margin='18px 0'
					paddingLeft='18px'
				>
					<AutocompleteSeleccionarProducto
						hookForm={hookForm}
						stateProductoActual={{productoActual, setProductoActual}}
						statePreciosProductos={{preciosProductos, setPreciosProductos}}
						stateInputFocus={stateInputFocus}
					/>
					{puedeBotonPromocionesOngoing && (
						<Box alignItems='center' display='flex' gap='16px'>
							<TooltipStyled
								open={openTooltip}
								title={
									<Typography
										fontSize={'10px'}
										fontStyle={'caption'}
										lineHeight={'10px'}
										fontFamily={'Open Sans'}
									>
										Las promociones disponibles podrían haber cambiado.
									</Typography>
								}
								arrow
							>
								<IconButton
									style={{padding: 0}}
									onClick={() => manejadorBotonPromosOngoing()}
								>
									<PromocionColor height='24px' width='24px' />
								</IconButton>
							</TooltipStyled>

							<IconButton sx={{padding: 0, marginRight: '9px'}}>
								<BuscarIcon height='18px' width='18px' />
							</IconButton>
						</Box>
					)}
				</Box>
				<DrawerPromociones
					openDrawerPromociones={openDrawerPromociones}
					setOpenDrawerPromociones={setOpenDrawerPromociones}
					promocionesOingoing={promocionesOingoing}
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
									icon={<BorrarIcon width='7.5px' height='7.5px' />}
									label={<TextStyled>Borrar todo</TextStyled>}
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
