import React, {useState} from 'react';
import {
	InputsKeysFormTomaDePedido,
	TClienteActual,
	TFormTomaDePedido,
	TPrecioProducto,
	TProductoPedido,
	TTipoPedido,
	TStateInputFocus,
	TVisita,
} from 'models';
import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {useForm} from 'react-hook-form';
import {
	useInicializarPreciosProductosDelClienteActual,
	useObtenerDatosTipoPedido,
} from 'hooks';
import {agregarProductoDelPedidoActual} from 'redux/features/visitaActual/visitaActualSlice';

import {TarjetaColapsable, TarjetaDoble, Dialogo} from 'components/UI';
import {InputSeleccionarProducto} from 'components/Negocio';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import {
	AgregarRedondoIcon,
	BorrarIcon,
	BotellaIcon,
	CajaIcon,
	QuitarRellenoIcon,
} from 'assests/iconos';
import {styled} from '@mui/material/styles';
import Input from '@mui/material/Input';
import {useAgregarProductoAlPedidoActual} from '../hooks';
import {
	useMostrarAdvertenciaEnDialogo,
	useMostrarContenidoEnCajon,
} from 'hooks';
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
	const [expandido, setExpandido] = React.useState<string | boolean>(false);

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
		tipoDePedido: visitaActual.tipoPedidoActual.toString(),
		catalogoMotivo: '',
	};
	const {control, handleSubmit, setValue, getValues} =
		useForm<TFormTomaDePedido>({defaultValues});
	const stateInputFocus = {inputFocus, setInputFocus};
	const hookForm = {control, handleSubmit, setValue, getValues};
	const obtenerDatosTipoPedido = useObtenerDatosTipoPedido();
	const datosTipoPedidoActual: TTipoPedido | undefined =
		obtenerDatosTipoPedido();
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
	}, [productoActual]);

	return (
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
			<Stack spacing='10px'>
				{/* <AutocompleteSeleccionarProducto
      hookForm={hookForm}
      stateProductoActual={{productoActual, setProductoActual}} 
      statePreciosProductos={{preciosProductos, setPreciosProductos}} 
      stateInputFocus={stateInputFocus} 
    /> */}

				<InputSeleccionarProducto
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
										stateInputFocus={stateInputFocus}
										visitaActual={visitaActual}
										key={producto.codigoProducto}
										statefocusId={{focusId, setFocusId}}
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
							/>
						);
					})}
			</Stack>
		</TarjetaColapsable>
	);
};

interface Props {
	producto: TProductoPedido;
	stateInputFocus: TStateInputFocus;
	visitaActual: TVisita;
	statefocusId: any;
}

const Izquierda: React.FC<Props> = ({producto}) => {
	return (
		<Grid container direction='column' padding={2}>
			<Grid item>
				<Typography fontSize='12px' fontWeight='600'>
					{producto.codigoProducto}
				</Typography>
				<Typography fontSize='12px' fontFamily='Poppins' fontWeight='600'>
					{producto.nombreProducto.toUpperCase()}
				</Typography>
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
		</Grid>
	);
};

const Derecha: React.FC<Props> = ({
	producto,
	stateInputFocus,
	visitaActual,
	statefocusId,
}) => {
	const {mostrarAdvertenciaEnDialogo, mostarDialogo, parametrosDialogo} =
		useMostrarAdvertenciaEnDialogo();

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

	const handleOnChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setGetValues({
			...getValues,
			[e.target.name]: e.target.value.replace(/[^0-9]/g, ''),
		});
		setFocusId(producto.codigoProducto);
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
		agregarProductoAlPedidoActual(getValues);
	}, [getValues]);

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
	};

	const agregarProductoAlPedidoActual = useAgregarProductoAlPedidoActual(
		producto,
		mostrarAdvertenciaEnDialogo,
		getValues,
		setGetValues
	);

	return (
		<>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
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
						<IconButton
							size='small'
							value='-'
							name='unidades'
							onClick={(e) => handleButtons(e)}
						>
							<QuitarRellenoIcon width='18px' height='18px' />
						</IconButton>
					</Grid>
					<Grid item>
						<InputStyled
							value={getValues.unidades}
							onChange={(e) => handleOnChange(e)}
							onKeyPress={(e) => handleKeyPress(e)}
							disableUnderline
							name='unidades'
							id='unidades_producto'
							onClick={() => {
								setInputFocus('unidades');
								setFocusId(producto.codigoProducto);
							}}
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
					</Grid>
					<Grid item>
						<IconButton
							size='small'
							name='unidades'
							value='+'
							onClick={(e) => handleButtons(e)}
						>
							<AgregarRedondoIcon width='18px' height='18px' />
						</IconButton>
					</Grid>
				</Grid>
				<Grid container direction='row' alignItems='center'>
					<Grid item>
						<BotellaIcon />
					</Grid>
					<Grid item>
						<IconButton
							size='small'
							name='subUnidades'
							value='-'
							onClick={(e) => handleButtons(e)}
						>
							<QuitarRellenoIcon width='18px' height='18px' />
						</IconButton>
					</Grid>
					<Grid item>
						<InputStyled
							onKeyPress={(e) => handleKeyPress(e)}
							onChange={(e) => handleOnChange(e)}
							value={getValues.subUnidades}
							disableUnderline
							id='subUnidades_producto'
							name='subUnidades'
							onClick={() => {
								setInputFocus('subUnidades');
								setFocusId(producto.codigoProducto);
							}}
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
					</Grid>
					<Grid item>
						<IconButton
							size='small'
							name='subUnidades'
							value='+'
							onClick={(e) => handleButtons(e)}
						>
							<AgregarRedondoIcon width='18px' height='18px' />
						</IconButton>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default TomaPedido;
