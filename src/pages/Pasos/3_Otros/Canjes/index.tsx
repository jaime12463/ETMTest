import {
	InputsKeysFormTomaDePedido,
	TClienteActual,
	TCondicicon,
	TFormTomaDePedido,
	TPrecioProducto,
	TProductoPedido,
	TStateInputFocus,
	TVisita,
	TOpcionSelect,
} from 'models';
import {AutocompleteSeleccionarProducto} from 'components/Negocio';
import React, {useEffect, useState} from 'react';
import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {useForm} from 'react-hook-form';
import {TarjetaDoble, Dialogo} from 'components/UI';
import {
	useInicializarPreciosProductosDelClienteActual,
	useMostrarAdvertenciaEnDialogo,
	useObtenerDatosCliente,
} from 'hooks';
import {agregarProductoDelPedidoActual} from 'redux/features/visitaActual/visitaActualSlice';
import {
	Stack,
	Box,
	Typography,
	IconButton,
	Input,
	Select,
	MenuItem,
	Chip,
	FormControl,
} from '@mui/material';
import {
	AgregarRedondoIcon,
	BotellaIcon,
	CajaIcon,
	CheckRedondoIcon,
	QuitarRellenoIcon,
} from 'assests/iconos';
import {styled} from '@mui/material/styles';

import {
	useAgregarProductoAlPedidoActual,
	useObtenerCatalogoMotivos,
} from 'pages/Pasos/2_TomaDePedido/hooks/index';
import theme from 'theme';
import CustomSelect from 'components/UI/CustomSelect';

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

const ChipStyled = styled(Chip)(({theme}) => ({
	textAlign: 'center',
	fontFamily: 'Open Sans',
	width: '72px',
	height: '14px',
	padding: '2px, 12px, 2px, 12px',
	marginRight: '5px',
}));

export const Canjes = () => {
	const [preciosProductos, setPreciosProductos] = React.useState<
		TPrecioProducto[]
	>([]);
	const [productoActual, setProductoActual] =
		React.useState<TPrecioProducto | null>(null);
	const [inputFocus, setInputFocus] =
		React.useState<InputsKeysFormTomaDePedido>('productoABuscar');
	const [focusId, setFocusId] = React.useState(0);
	const visitaActual = useObtenerVisitaActual();

	const {canje} = visitaActual.pedidos;

	const defaultValues: TFormTomaDePedido = {
		unidades: '',
		subUnidades: '',
		productoABuscar: '',
		tipoDePedido: visitaActual.tipoPedidoActual,
		catalogoMotivo: '',
	};
	const {control, handleSubmit, setValue, getValues} =
		useForm<TFormTomaDePedido>({
			defaultValues,
		});
	const dispatch = useAppDispatch();
	const hookForm = {control, handleSubmit, setValue, getValues};

	useInicializarPreciosProductosDelClienteActual(setPreciosProductos);
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const stateInputFocus = {inputFocus, setInputFocus};
	const [catalogoMotivo, setCatalogoMotivo] = useState({});

	React.useEffect(() => {
		if (productoActual !== null) {
			const productoEnPedido = canje.productos.find(
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
							catalogoMotivo: '',
							estado: 'activo',
						},
					})
				);
			}
			setFocusId(productoActual.codigoProducto);
			setProductoActual(null);
		}
	}, [productoActual?.codigoProducto]);

	return (
		<Stack spacing='10px'>
			<AutocompleteSeleccionarProducto
				hookForm={hookForm}
				stateProductoActual={{productoActual, setProductoActual}}
				statePreciosProductos={{preciosProductos, setPreciosProductos}}
				stateInputFocus={stateInputFocus}
			/>

			{canje.productos.length > 0 &&
				canje.productos.map((producto) => {
					let color =
						(producto.unidades > 0 && producto.catalogoMotivo !== '') ||
						(producto.subUnidades > 0 && producto.catalogoMotivo !== '')
							? '#00CF91'
							: (producto.unidades < 1 &&
									catalogoMotivo.hasOwnProperty(producto.codigoProducto)) ||
							  (producto.subUnidades < 1 &&
									catalogoMotivo.hasOwnProperty(producto.codigoProducto))
							? '#FF0000'
							: (producto.unidades > 0 && producto.catalogoMotivo === '') ||
							  (producto.subUnidades > 0 && producto.catalogoMotivo === '')
							? '#FF0000'
							: '#D9D9D9';

					return (
						<TarjetaDoble
							borderColor={color}
							key={producto.codigoProducto}
							izquierda={
								<Izquierda
									producto={producto}
									condicion={clienteActual.condicion}
									stateCatalogo={{catalogoMotivo, setCatalogoMotivo}}
									stateInputFocus={stateInputFocus}
									statefocusId={{focusId, setFocusId}}
								/>
							}
							derecha={
								<Derecha
									producto={producto}
									stateInputFocus={stateInputFocus}
									visitaActual={visitaActual}
									statefocusId={{focusId, setFocusId}}
									stateCatalogo={{catalogoMotivo, setCatalogoMotivo}}
								/>
							}
							widthIzquierda='179px'
							widthDerecha='125px'
						/>
					);
				})}
		</Stack>
	);
};

interface StateFocusID {
	focusId: number;
	setFocusId: React.Dispatch<React.SetStateAction<number>>;
}
interface IzquierdaProps {
	producto: TProductoPedido;
	condicion: TCondicicon;
	stateCatalogo: any;
	stateInputFocus: TStateInputFocus;
	statefocusId: StateFocusID;
}

const Izquierda: React.FC<IzquierdaProps> = ({
	producto,
	condicion,
	stateCatalogo,
	stateInputFocus,
	statefocusId,
}) => {
	const {inputFocus, setInputFocus} = stateInputFocus;
	const itemCatalogoMotivos = useObtenerCatalogoMotivos();
	const {focusId, setFocusId} = statefocusId;
	const {catalogoMotivo, setCatalogoMotivo} = stateCatalogo;
	const [motivo, setMotivo] = useState('');

	React.useEffect(() => {
		const motivoFiltrado = itemCatalogoMotivos.find(
			(item) =>
				item.label === `${motivo.charAt(0).toUpperCase()}${motivo.slice(1)}`
		);

		if (motivoFiltrado) {
			setCatalogoMotivo({
				...catalogoMotivo,
				[producto.codigoProducto]: {codigoMotivo: motivoFiltrado.value},
			});
			setFocusId(0);
			setInputFocus('productoABuscar');
		}
	}, [motivo]);

	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateRows: '1fr auto 1fr',
				padding:
					producto.unidades > 0 || producto.subUnidades > 0 || motivo !== ''
						? '40px 14px 12px 14px'
						: '12px 14px 12px 14px',
				height: '100%',
			}}
		>
			<Box display='flex' flexDirection='column'>
				<Typography variant='subtitle3'>{producto.codigoProducto}</Typography>
				<Typography variant='subtitle3' fontFamily='Poppins' marginBottom='4px'>
					{producto.nombreProducto.toUpperCase()}
				</Typography>
			</Box>
			<Box display='flex' alignItems='center' marginBottom='12px'>
				<CajaIcon height='14px' width='19px' />
				<Typography
					variant='caption'
					fontFamily='Open Sans'
					marginRight='4px'
				>{`x${producto.presentacion}`}</Typography>
			</Box>
			<Box>
				<CustomSelect
					opciones={[...itemCatalogoMotivos.map((item) => item.label)]}
					opcionSeleccionada={motivo}
					setOpcion={setMotivo}
				/>
			</Box>
		</Box>
	);
};

interface DerechaProps {
	producto: TProductoPedido;
	stateInputFocus: TStateInputFocus;
	visitaActual: TVisita;
	statefocusId: StateFocusID;
	stateCatalogo: any;
}

const Derecha: React.FC<DerechaProps> = ({
	producto,
	stateInputFocus,
	visitaActual,
	statefocusId,
	stateCatalogo,
}) => {
	const {mostrarAdvertenciaEnDialogo, mostarDialogo, parametrosDialogo} =
		useMostrarAdvertenciaEnDialogo();

	const [puedeAgregar, setPuedeAgregar] = useState(false);
	const {catalogoMotivo} = stateCatalogo;

	const defaultValues = {
		unidades: producto.unidades,
		subUnidades: producto.subUnidades,
		productoABuscar: '',
		tipoDePedido: visitaActual.tipoPedidoActual,
		catalogoMotivo: producto.catalogoMotivo,
	};
	const [getValue, setGetValues] = React.useState(defaultValues);

	useEffect(() => {
		setGetValues(defaultValues);
	}, []);

	const {focusId, setFocusId} = statefocusId;

	const {inputFocus, setInputFocus} = stateInputFocus;

	const [mostrarAcciones, setMostrarAcciones] = React.useState<boolean>(false);
	const [pendiente, setPendiente] = useState<boolean>(false);

	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const {configuracionPedido}: any = datosCliente;

	const agregarProductoAlPedidoActual = useAgregarProductoAlPedidoActual(
		producto,
		mostrarAdvertenciaEnDialogo,
		getValue,
		setGetValues
	);

	const handleOnChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setGetValues({
			...getValue,
			[e.target.name]: e.target.value.replace(/[^0-9]/g, ''),
		});
		setFocusId(producto.codigoProducto);
		setPuedeAgregar(true);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			agregarProductoAlPedidoActual(getValue);
			if (inputFocus === 'unidades') {
				setInputFocus('subUnidades');
			} else if (inputFocus === 'subUnidades') {
				setInputFocus('motivo');
			}
		}
	};

	React.useEffect(() => {
		if (catalogoMotivo[producto.codigoProducto]) {
			setGetValues({
				...getValue,
				catalogoMotivo: catalogoMotivo[producto.codigoProducto].codigoMotivo,
			});
		}
		if (getValue.unidades > 0 || getValue.subUnidades > 0) {
			if (catalogoMotivo[producto.codigoProducto]) {
				agregarProductoAlPedidoActual({
					...getValue,
					catalogoMotivo: catalogoMotivo[producto.codigoProducto].codigoMotivo,
				});
			}
		}
	}, [catalogoMotivo]);

	React.useEffect(() => {
		if (puedeAgregar) {
			agregarProductoAlPedidoActual(getValue);
			setPuedeAgregar(false);
		}
	}, [puedeAgregar]);

	React.useEffect(() => {
		if (getValue.unidades > 0 || getValue.subUnidades > 0) {
			if (getValue.catalogoMotivo !== '') {
				setMostrarAcciones(true);
				setPendiente(false);
			} else {
				setPendiente(true);
			}
		} else {
			if (getValue.catalogoMotivo !== '') {
				setPendiente(true);
			}
		}

		return () => {
			setMostrarAcciones(false),
				setPendiente(false),
				delete catalogoMotivo[producto.codigoProducto];
		};
	}, [getValue, catalogoMotivo]);

	const handleButtons = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		const {value, name} = e.currentTarget;
		setFocusId(producto.codigoProducto);
		if (name === 'unidades') {
			if (value === '-' && getValue.unidades === 0) {
				return;
			}
			setInputFocus('unidades');
			setGetValues({
				...getValue,
				[name]: value === '+' ? ++getValue.unidades : --getValue.unidades,
			});
		} else if (name === 'subUnidades') {
			if (value === '-' && getValue.subUnidades === 0) {
				return;
			}
			setInputFocus('subUnidades');
			setGetValues({
				...getValue,
				[name]: value === '+' ? ++getValue.subUnidades : --getValue.subUnidades,
			});
		}
		agregarProductoAlPedidoActual(getValue);
	};

	return (
		<>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<Box
				sx={{
					display: 'grid',
					gridTemplateRows:
						pendiente || mostrarAcciones ? '1fr 3fr' : 'auto 1fr',
					padding: '12px 0',
					placeItems: 'start',
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
					{pendiente && (
						<>
							<ChipStyled
								label={
									<Typography
										variant={'caption'}
										color='white'
										textAlign='center'
										fontFamily='Open Sans'
									>
										Pendiente
									</Typography>
								}
								color={'primary'}
							/>
						</>
					)}
				</Box>
				<Box display='flex' flexDirection='column'>
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
							value={getValue.unidades}
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
								producto.unidades >= configuracionPedido?.cantidadMaximaUnidades
									? true
									: false
							}
						>
							<AgregarRedondoIcon
								width='18px'
								height='18px'
								fill={
									producto.unidades >=
									configuracionPedido?.cantidadMaximaUnidades
										? '#D9D9D9'
										: '#2F000E'
								}
							/>
						</IconButton>
					</Box>
					<Box display='flex' alignItems='center'>
						<BotellaIcon width='18px' height='18px' />
						<IconButton
							size='small'
							value='-'
							name='subUnidades'
							onClick={handleButtons}
							disabled={producto.subUnidades > 0 ? false : true}
						>
							<QuitarRellenoIcon
								width='18px'
								height='18px'
								fill={producto.subUnidades > 0 ? '#2F000E' : '#D9D9D9'}
							/>
						</IconButton>
						<InputStyled
							onKeyPress={handleKeyPress}
							onChange={handleOnChange}
							value={getValue.subUnidades}
							disableUnderline
							id='subUnidades_producto'
							name='subUnidades'
							onClick={() => {
								setInputFocus('subUnidades');
								setFocusId(producto.codigoProducto);
							}}
							onFocus={(e) => e.target.select()}
							inputProps={{style: {textAlign: 'center'}, inputMode: 'numeric'}}
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
								getValue.subUnidades >=
								producto.presentacion - producto.subunidadesVentaMinima
							}
						>
							<AgregarRedondoIcon
								width='18px'
								height='18px'
								fill={
									getValue.subUnidades >=
									producto.presentacion - producto.subunidadesVentaMinima
										? '#D9D9D9'
										: '#2F000E'
								}
							/>
						</IconButton>
					</Box>
				</Box>
			</Box>
		</>
	);
};
