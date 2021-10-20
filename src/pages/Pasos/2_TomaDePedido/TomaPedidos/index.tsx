import React, {useState} from 'react';
import {
	InputsKeysFormTomaDePedido,
	TClienteActual,
	TCondicicon,
	TFormTomaDePedido,
	TPrecioProducto,
	TProductoPedido,
	TStateInputFocus,
	TVisita,
} from 'models';
import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {useForm} from 'react-hook-form';
import {useInicializarPreciosProductosDelClienteActual} from 'hooks';
import {
	agregarProductoDelPedidoActual,
	borrarProductoDelPedidoActual,
	borrarProductosDeVisitaActual,
} from 'redux/features/visitaActual/visitaActualSlice';

import {TarjetaColapsable, TarjetaDoble, Dialogo} from 'components/UI';
import {
	AutocompleteSeleccionarProducto,
	InputSeleccionarProducto,
} from 'components/Negocio';
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
import {useAgregarProductoAlPedidoActual} from '../hooks';
import {useMostrarAdvertenciaEnDialogo} from 'hooks';
import useEstilos from '../useEstilos';
import {SwitchCambiarTipoPago} from '../components';

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

	React.useEffect(() => {
		if (productoActual !== null) {
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
					},
				})
			);

			setFocusId(productoActual.codigoProducto);
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

			<Grid container alignItems='center' justifyContent='space-between'>
				<SwitchCambiarTipoPago />
				<Chip
					className={classes.root}
					size='small'
					icon={<BorrarIcon width='7.5px' height='7.5px' />}
					label={<TextStyled>Borrar todo</TextStyled>}
					onClick={() =>
						dispatch(
							borrarProductosDeVisitaActual({
								tipoPedidoActual: visitaActual.tipoPedidoActual,
							})
						)
					}
					sx={{'&:hover': {background: 'none'}}}
				/>
			</Grid>

			{venta.productos.length > 0 &&
				venta.productos.map((producto) => {
					return (
						<TarjetaDoble
							key={producto.codigoProducto}
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
						/>
					);
				})}
		</Stack>
	);
};

interface IzquierdaProps {
	producto: TProductoPedido;
	condicion: TCondicicon;
}

const Izquierda: React.FC<IzquierdaProps> = ({producto, condicion}) => {
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
			<Box>
				<Typography fontSize='12px' fontWeight='600'>
					{producto.codigoProducto}
				</Typography>
				<Typography
					fontSize='12px'
					fontFamily='Poppins'
					fontWeight='600'
					marginBottom='4px'
				>
					{producto.nombreProducto.toUpperCase()}
				</Typography>
			</Box>
			<Box display='flex'>
				<CajaIcon height='14px' width='19px' />
				<Typography
					fontSize='10px'
					marginRight='4px'
				>{`x${producto.presentacion}`}</Typography>
				<Typography fontSize='12px' fontWeight='600' marginRight='8px'>
					{`$${producto.precioConImpuestoUnidad}`}
				</Typography>
				<BotellaIcon height='14px' width='14px' />
				<Typography fontSize='12px' fontWeight='600' marginLeft='4px'>
					{`$${producto.precioConImpuestoSubunidad}`}
				</Typography>
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

	const dispatch = useAppDispatch();

	const agregarProductoAlPedidoActual = useAgregarProductoAlPedidoActual(
		producto,
		mostrarAdvertenciaEnDialogo,
		getValues,
		setGetValues
	);

	const handleOnChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setGetValues({
			...getValues,
			[e.target.name]: e.target.value.replace(/[^0-9]/g, ''),
		});
		setFocusId(producto.codigoProducto);
		setPuedeAgregar(true);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			agregarProductoAlPedidoActual(getValues);
			if (inputFocus === 'unidades') {
				setInputFocus('subUnidades');
			} else if (inputFocus === 'subUnidades') {
				setFocusId(0);
				setInputFocus('productoABuscar');
			}
		}
	};

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
		} else if (name === 'subUnidades') {
			if (value === '-' && getValues.subUnidades === 0) {
				return;
			}
			setInputFocus('subUnidades');
			setGetValues({
				...getValues,
				[name]:
					value === '+' ? ++getValues.subUnidades : --getValues.subUnidades,
			});
		}
		agregarProductoAlPedidoActual(getValues);
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
								<CheckRedondoIcon height='17.5px' width='17.5px' />
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
					>
						<AgregarRedondoIcon width='18px' height='18px' />
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
						value={getValues.subUnidades}
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
					>
						<AgregarRedondoIcon width='18px' height='18px' />
					</IconButton>
				</Box>
			</Box>
		</>
	);
};

export default TomaPedido;
