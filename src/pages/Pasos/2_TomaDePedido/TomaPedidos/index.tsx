import React, {Fragment, useEffect, useState} from 'react';
import {
	InputsKeysFormTomaDePedido,
	TClienteActual,
	TCondicicon,
	TFormTomaDePedido,
	TPrecioProducto,
	TProductoPedido,
	TStateInputFocus,
	TVisita,
	TPedido,
} from 'models';

import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerVisitaActual,
	useObtenerConfiguracion,
} from 'redux/hooks';
import {useForm} from 'react-hook-form';
import {
	useInicializarPreciosProductosDelClienteActual,
	useMostrarAviso,
} from 'hooks';
import {
	agregarProductoDelPedidoActual,
	editarProductoDelPedidoActual,
	borrarProductoDelPedidoActual,
	borrarProductosDeVisitaActual,
} from 'redux/features/visitaActual/visitaActualSlice';

import {TarjetaDoble, Dialogo, SwipeBorrar} from 'components/UI';
import {AutocompleteSeleccionarProducto} from 'components/Negocio';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import {
	AgregarRedondoIcon,
	BorrarIcon,
	BotellaIcon,
	CajaIcon,
	CheckRedondoIcon,
	QuitarRellenoIcon,
} from 'assests/iconos';
import {styled} from '@mui/material/styles';
import Input from '@mui/material/Input';
import {
	useAgregarProductoAlPedidoActual,
	useValidarBorrarPedido,
} from '../hooks';
import {
	useMostrarAdvertenciaEnDialogo,
	useBorrarTodoLosProductos,
	useObtenerDatosCliente,
} from 'hooks';
import useEstilos from '../useEstilos';
import {SwitchCambiarTipoPago} from '../components';
import theme from 'theme';
import {useTranslation} from 'react-i18next';
import {formatearNumero} from 'utils/methods';
import {Button, Fade, Grow} from '@mui/material';
import {useSnackbar} from 'notistack';
import {AvisoDeshacer} from 'components/UI/AvisoContenido/AvisosPlantilla';
import Modal from 'components/UI/Modal';

const InputStyled = styled(Input)(({}) => ({
	backgroundColor: 'white',
	border: '1px solid #2F000E',
	borderRadius: '10px',
	fontSize: '12px',
	fontWeight: 600,
	height: '16px',
	lineHeight: '16px',
	width: '42px',
}));

const TextStyled = styled(Typography)(() => ({
	color: '#651C32',
	fontSize: '10px',
}));

const TomaPedido: React.FC = () => {
	const {mostrarAdvertenciaEnDialogo, mostarDialogo, parametrosDialogo} =
		useMostrarAdvertenciaEnDialogo();

	const [configAlerta, setConfigAlerta] = useState({
		titulo: '',
		mensaje: '',
		tituloBotonAceptar: '',
		tituloBotonCancelar: '',
		callbackAceptar: () => {},
	});

	const {t} = useTranslation();
	const [alerta, setAlerta] = React.useState<boolean>(false);
	const [preciosProductos, setPreciosProductos] = React.useState<
		TPrecioProducto[]
	>([]);
	const [productoActual, setProductoActual] =
		React.useState<TPrecioProducto | null>(null);

	const [inputFocus, setInputFocus] =
		React.useState<InputsKeysFormTomaDePedido>('productoABuscar');

	const [focusId, setFocusId] = React.useState(0);
	const visitaActual = useObtenerVisitaActual();
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

	const borrarTodosLosProductos = useBorrarTodoLosProductos(
		{setAlerta, setConfigAlerta},
		venta.productos
	);

	const validarBorrarPedido = useValidarBorrarPedido(
		mostrarAdvertenciaEnDialogo
	);

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
							total:
								productoActual.precioConImpuestoUnidad * 0 +
								productoActual.precioConImpuestoSubunidad * 0,
							tipoPago: clienteActual.tipoPagoActual,
							catalogoMotivo,
							estado: 'activo',
						},
					})
				);
			}
			setFocusId(productoActual.codigoProducto);
			setProductoActual(null);
		}
	}, [productoActual?.codigoProducto]);

	const avisoDeshacer = useMostrarAviso();
	const {enqueueSnackbar, closeSnackbar} = useSnackbar();
	const cambiarEstadoProducto = (
		producto: TProductoPedido,
		nuevoEstado: 'activo' | 'eliminado' | 'borrardo' | 'transito'
	) => {
		if (nuevoEstado === 'borrardo') {
			//ToDo borrar
		} else {
			dispatch(
				editarProductoDelPedidoActual({
					productoPedido: {...producto, estado: nuevoEstado},
				})
			);
		}
	};

	const manejadorDeshacerGestoBorrar = (producto: TProductoPedido) => {
		cambiarEstadoProducto(producto, 'eliminado');

		const aviso = ({
			borrarProductosNoMandatorios,
			productosNoMandatorios,
		}: any) => {
			enqueueSnackbar(
				<AvisoDeshacer
					titulo='Tarjeta Eliminada'
					acciones={
						<>
							<Typography
								variant='caption'
								fontFamily='Poppins'
								color='#fff'
								sx={{cursor: 'pointer'}}
								onClick={() => {
									cambiarEstadoProducto(producto, 'activo');
									closeSnackbar(producto.codigoProducto);
								}}
							>
								Deshacer
							</Typography>
						</>
					}
				/>,
				{
					key: producto.codigoProducto,
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'center',
					},
					onClose: (event, reason, key) => {
						if (reason === 'timeout') {
							if (borrarProductosNoMandatorios) {
								productosNoMandatorios.forEach((pedido: TPedido) => {
									dispatch(
										borrarProductosDeVisitaActual({
											tipoPedidoActual: pedido.tipoPedido,
										})
									);
								});
							}
							return dispatch(
								borrarProductoDelPedidoActual({
									codigoProducto: producto.codigoProducto,
									codigoTipoPedidoActual: 'venta',
								})
							);
						}
					},
				}
			);
		};

		return validarBorrarPedido(aviso, cambiarEstadoProducto, producto);
	};

	return (
		<>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<Modal
				setAlerta={setAlerta}
				alerta={alerta}
				contenidoMensaje={configAlerta}
			/>
			<Stack spacing='10px'>
				<AutocompleteSeleccionarProducto
					hookForm={hookForm}
					stateProductoActual={{productoActual, setProductoActual}}
					statePreciosProductos={{preciosProductos, setPreciosProductos}}
					stateInputFocus={stateInputFocus}
				/>

				<Grid container alignItems='center' justifyContent='space-between'>
					<SwitchCambiarTipoPago />
					{venta.productos.length > 0 &&
						venta.productos.some(
							(producto) => producto.unidades > 0 || producto.subUnidades > 0
						) && (
							<Chip
								className={classes.root}
								size='small'
								icon={<BorrarIcon width='7.5px' height='7.5px' />}
								label={<TextStyled>Borrar todo</TextStyled>}
								sx={{'&:hover': {background: 'none'}}}
								onClick={() => {
									setConfigAlerta({
										titulo: '¿Quieres Borrar Todos Los Productos?',
										mensaje:
											'Todos los productos seleccionados se borraran de toma de pedido',
										tituloBotonAceptar: 'Si',
										tituloBotonCancelar: 'No',
										callbackAceptar: () => borrarTodosLosProductos(),
									});
									setAlerta(true);
								}}
							/>
						)}
				</Grid>

				{venta.productos.length > 0 &&
					venta.productos
						.filter((producto) => producto.estado === 'activo')
						.map((producto, i) => {
							return (
								<SwipeBorrar
									key={producto.codigoProducto}
									item={producto}
									manejadorGesto={() => {
										manejadorDeshacerGestoBorrar(producto);
										return 0;
									}}
								>
									<TarjetaDoble
										izquierda={
											<Izquierda
												producto={producto}
												condicion={clienteActual.condicion}
											/>
										}
										derecha={
											<Derecha
												producto={producto}
												stateInputFocus={stateInputFocus}
												visitaActual={visitaActual}
												statefocusId={{focusId, setFocusId}}
											/>
										}
										widthIzquierda='179px'
										widthDerecha='125px'
										borderColor={
											producto.unidades > 0 || producto.subUnidades > 0
												? '#00CF91'
												: '#D9D9D9'
										}
									/>
								</SwipeBorrar>
							);
						})}
			</Stack>
		</>
	);
};

interface IzquierdaProps {
	producto: TProductoPedido;
	condicion: TCondicicon;
}

const Izquierda: React.FC<IzquierdaProps> = ({producto, condicion}) => {
	const {t} = useTranslation();

	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateRows: 'repeat(3, 1fr)',
				padding: '12px 14px 0 14px',
				height: '100%',
			}}
		>
			<Box sx={{placeSelf: 'start', alignSelf: 'start'}}>
				{condicion === 'creditoInformal' && (
					<SwitchCambiarTipoPago producto={producto} />
				)}
			</Box>
			<Box display='flex' flexDirection='column'>
				<Typography variant='subtitle3'>{producto.codigoProducto}</Typography>
				<Typography
					variant='subtitle3'
					fontFamily='Poppins'
					marginBottom='4px'
					noWrap
					width='150px'
				>
					{producto.nombreProducto.toUpperCase()}
				</Typography>
			</Box>
			<Box display='flex' alignItems='center' sx={{placeSelf: 'start'}}>
				<CajaIcon height='14px' width='19px' />
				<Typography
					variant='caption'
					marginRight='4px'
				>{`x${producto.presentacion}`}</Typography>
				<Typography variant='subtitle3' marginRight='8px'>
					{formatearNumero(producto.precioConImpuestoUnidad, t)}
				</Typography>
				{producto.esVentaSubunidades && (
					<>
						<BotellaIcon height='14px' width='14px' />
						<Typography variant='subtitle3' marginLeft='4px'>
							{formatearNumero(producto.precioConImpuestoSubunidad, t)}
						</Typography>
					</>
				)}
			</Box>
		</Box>
	);
};

interface StateFocusID {
	focusId: number;
	setFocusId: React.Dispatch<React.SetStateAction<number>>;
}
interface DerechaProps {
	producto: TProductoPedido;
	stateInputFocus: TStateInputFocus;
	visitaActual: TVisita;
	statefocusId: StateFocusID;
}

const Derecha: React.FC<DerechaProps> = ({
	producto,
	stateInputFocus,
	visitaActual,
	statefocusId,
}) => {
	const {mostrarAdvertenciaEnDialogo, mostarDialogo, parametrosDialogo} =
		useMostrarAdvertenciaEnDialogo();

	const [puedeAgregar, setPuedeAgregar] = useState(false);

	const defaultValues = {
		unidades: producto.unidades,
		subUnidades: producto.subUnidades,
		productoABuscar: '',
		tipoDePedido: visitaActual.tipoPedidoActual,
		catalogoMotivo: '',
	};
	const {focusId, setFocusId} = statefocusId;

	const [getValues, setGetValues] = React.useState(defaultValues);

	const {inputFocus, setInputFocus} = stateInputFocus;

	const [mostrarAcciones, setMostrarAcciones] = React.useState<boolean>(false);

	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const {configuracionPedido}: any = datosCliente;

	const agregarProductoAlPedidoActual = useAgregarProductoAlPedidoActual(
		producto,
		mostrarAdvertenciaEnDialogo,
		getValues,
		setGetValues
	);
	const {t} = useTranslation();
	const mostrarAviso = useMostrarAviso();

	React.useEffect(() => {
		if (puedeAgregar) {
			agregarProductoAlPedidoActual(getValues);
			setPuedeAgregar(false);
		}
	}, [puedeAgregar]);

	React.useEffect(() => {
		if (getValues.unidades > 0 || getValues.subUnidades > 0) {
			setMostrarAcciones(true);
		}

		return () => setMostrarAcciones(false);
	}, [getValues.unidades, getValues.subUnidades]);

	const validacionSubUnidades = () => {
		if (
			getValues.subUnidades % producto.subunidadesVentaMinima !== 0 &&
			getValues.subUnidades < producto.presentacion
		) {
			return (
				mostrarAviso(
					'error',
					t('advertencias.subUnidadesNoMultiplo', {
						subunidadesVentaMinima: producto.subunidadesVentaMinima,
					})
				),
				setGetValues({
					...getValues,
					subUnidades: 0,
				})
			);
		}

		agregarProductoAlPedidoActual(getValues);
		setFocusId(0);
		setInputFocus('productoABuscar');
	};

	const handleOnChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setGetValues({
			...getValues,
			[e.target.name]: e.target.value.replace(/[^0-9]/g, ''),
		});
		setFocusId(producto.codigoProducto);

		if (e.target.name === 'unidades') {
			setPuedeAgregar(true);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			if (inputFocus === 'unidades') {
				setInputFocus('subUnidades');
				agregarProductoAlPedidoActual(getValues);
			} else if (inputFocus === 'subUnidades') {
				validacionSubUnidades();
			}
		}
	};

	const handleButtons = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		const {value, name} = e.currentTarget;
		setFocusId(producto.codigoProducto);
		if (name === 'unidades') {
			if (value === '-' && getValues.unidades === 0) {
				return;
			}
			setInputFocus('unidades');
			setGetValues({
				...getValues,
				[name]: value === '+' ? ++getValues.unidades : --getValues.unidades,
			});
			setPuedeAgregar(true);
		} else if (name === 'subUnidades') {
			if (value === '-' && getValues.subUnidades === 0) {
				return;
			}
			setInputFocus('subUnidades');
			setGetValues((prevState) => ({
				...prevState,
				[name]:
					value === '+'
						? prevState.subUnidades + producto.subunidadesVentaMinima
						: prevState.subUnidades - producto.subunidadesVentaMinima,
			}));
			setPuedeAgregar(true);
		}
	};

	return (
		<>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<Box
				sx={{
					display: 'grid',
					gridTemplateRows: 'repeat(3, 1fr)',
					padding: '12px 0',
					placeItems: 'center',
					justifyContent: 'center',
					height: '100%',
				}}
			>
				<Box justifySelf='end' alignSelf='start'>
					{mostrarAcciones && (
						<>
							<IconButton sx={{padding: '0 5px'}}>
								<CheckRedondoIcon
									height='17.5px'
									width='17.5px'
									fill={`${theme.palette.success.main}`}
								/>
							</IconButton>
						</>
					)}
				</Box>
				<Box display='flex' alignItems='center'>
					<CajaIcon height='13px' width='18px' />
					<IconButton
						size='small'
						value='-'
						name='unidades'
						onClick={handleButtons}
						disabled={producto.unidades > 0 ? false : true}
					>
						<QuitarRellenoIcon
							width='18px'
							height='18px'
							fill={producto.unidades > 0 ? '#2F000E' : '#D9D9D9'}
						/>
					</IconButton>
					<InputStyled
						value={getValues.unidades}
						onChange={handleOnChange}
						onKeyPress={handleKeyPress}
						disableUnderline
						name='unidades'
						id='unidades_producto'
						onClick={() => {
							setInputFocus('unidades');
							setFocusId(producto.codigoProducto);
						}}
						onFocus={(e) => e.target.select()}
						inputProps={{style: {textAlign: 'center'}, inputMode: 'numeric'}}
						inputRef={(input) => {
							if (
								inputFocus === 'unidades' &&
								focusId === producto.codigoProducto
							) {
								input?.focus();
							}
						}}
					/>
					<IconButton
						size='small'
						name='unidades'
						value='+'
						onClick={handleButtons}
						disabled={
							producto.unidadesDisponibles
								? producto.unidades >= producto.unidadesDisponibles
									? true
									: false
								: producto.unidades >=
								  configuracionPedido?.cantidadMaximaUnidades
								? true
								: false
						}
					>
						<AgregarRedondoIcon
							width='18px'
							height='18px'
							fill={
								producto.unidadesDisponibles
									? producto.unidades >= producto.unidadesDisponibles
										? '#D9D9D9'
										: '#2F000E'
									: producto.unidades >=
									  configuracionPedido?.cantidadMaximaUnidades
									? '#D9D9D9'
									: '#2F000E'
							}
						/>
					</IconButton>
				</Box>
				<Box display='flex' alignItems='center'>
					{producto.esVentaSubunidades && (
						<>
							<BotellaIcon width='18px' height='18px' />
							<IconButton
								size='small'
								value='-'
								name='subUnidades'
								onClick={handleButtons}
								disabled={getValues.subUnidades > 0 ? false : true}
							>
								<QuitarRellenoIcon
									width='18px'
									height='18px'
									fill={getValues.subUnidades > 0 ? '#2F000E' : '#D9D9D9'}
								/>
							</IconButton>
							<InputStyled
								onKeyPress={handleKeyPress}
								onChange={handleOnChange}
								value={getValues.subUnidades}
								disableUnderline
								id='subUnidades_producto'
								name='subUnidades'
								onClick={() => {
									setInputFocus('subUnidades');
									setFocusId(producto.codigoProducto);
								}}
								onFocus={(e) => e.target.select()}
								onBlur={validacionSubUnidades}
								inputProps={{
									style: {textAlign: 'center'},
									inputMode: 'numeric',
								}}
								inputRef={(input) => {
									if (
										inputFocus === 'subUnidades' &&
										focusId === producto.codigoProducto
									) {
										input?.focus();
									}
								}}
							/>
							<IconButton
								size='small'
								name='subUnidades'
								value='+'
								onClick={handleButtons}
								disabled={
									getValues.subUnidades >=
									producto.presentacion - producto.subunidadesVentaMinima
								}
							>
								<AgregarRedondoIcon
									width='18px'
									height='18px'
									fill={
										getValues.subUnidades >=
										producto.presentacion - producto.subunidadesVentaMinima
											? '#D9D9D9'
											: '#2F000E'
									}
								/>
							</IconButton>
						</>
					)}
				</Box>
			</Box>
		</>
	);
};

export default TomaPedido;
