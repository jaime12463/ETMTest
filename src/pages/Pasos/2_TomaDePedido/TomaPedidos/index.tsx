import React, {useEffect, useState, useCallback} from 'react';
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
import {
	AgregarRedondoIcon,
	BotellaIcon,
	CajaIcon,
	QuitarRellenoIcon,
} from 'assests/iconos';
import {IconButton} from '@mui/material';
import {styled} from '@mui/material/styles';
import Input from '@mui/material/Input';
import {useAgregarProductoAlPedidoActual} from '../hooks';
import {
	useMostrarAdvertenciaEnDialogo,
	useMostrarContenidoEnCajon,
} from 'hooks';

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

const TomaPedido: React.FC = () => {
	const [expandido, setExpandido] = React.useState<string | boolean>(false);

	const [preciosProductos, setPreciosProductos] = React.useState<
		TPrecioProducto[]
	>([]);
	const [productoActual, setProductoActual] =
		React.useState<TPrecioProducto | null>(null);

	const [inputFocus, setInputFocus] =
		React.useState<InputsKeysFormTomaDePedido>('productoABuscar');

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
								/>
							}
							derecha={
								<Derecha
									producto={producto}
									stateInputFocus={stateInputFocus}
									visitaActual={visitaActual}
								/>
							}
						/>
					);
				})}
		</TarjetaColapsable>
	);
};

interface Props {
	producto: TProductoPedido;
	stateInputFocus: TStateInputFocus;
	visitaActual: TVisita;
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
			<Grid></Grid>
		</Grid>
	);
};

const Derecha: React.FC<Props> = ({
	producto,
	stateInputFocus,
	visitaActual,
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

	const [getValues, setGetValues] = React.useState(defaultValues);

	const {inputFocus, setInputFocus} = stateInputFocus;

	const handleOnChangue = (e: any) => {
		setGetValues({...getValues, [e.target.name]: e.target.value});
	};

	const handleKeyPress = (event: any) => {
		if (event.key === 'Enter') {
			agregarProductoAlPedidoActual(getValues);
			if (inputFocus === 'unidades') {
				setInputFocus('subUnidades');
			} else if (inputFocus === 'subUnidades') {
				setInputFocus('productoABuscar');
			}
		}
	};

	useEffect(() => {
		agregarProductoAlPedidoActual(getValues);
	}, [getValues]);

	const handleButtons = (e: any) => {
		const {value, name} = e.currentTarget;

		if (name === 'unidades') {
			setGetValues({
				...getValues,
				[name]: value === '+' ? ++getValues.unidades : --getValues.unidades,
			});
		} else if (name === 'subUnidades') {
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
							onChange={(e) => handleOnChangue(e)}
							onKeyPress={(e) => handleKeyPress(e)}
							disableUnderline
							name='unidades'
							id='unidades_producto'
							onClick={() => setInputFocus('unidades')}
							inputProps={{style: {textAlign: 'center'}}}
							inputRef={(input) => {
								if (inputFocus === 'unidades') {
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
							onChange={(e) => handleOnChangue(e)}
							value={getValues.subUnidades}
							disableUnderline
							id='subUnidades_producto'
							name='subUnidades'
							onClick={() => setInputFocus('subUnidades')}
							inputProps={{style: {textAlign: 'center'}}}
							inputRef={(input) => {
								if (inputFocus === 'subUnidades') {
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
