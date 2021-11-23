import React from 'react';
import {styled} from '@mui/material/styles';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import {
	AgregarRedondoIcon,
	BotellaIcon,
	CajaIcon,
	QuitarRellenoIcon,
} from 'assests/iconos';
import {
	TClienteActual,
	TPrecioProducto,
	TProductoPedido,
	TStateInputFocus,
} from 'models';
import {
	useMostrarAdvertenciaEnDialogo,
	useMostrarAviso,
	useObtenerDatosCliente,
} from 'hooks';
import {useObtenerClienteActual, useObtenerVisitaActual} from 'redux/hooks';
import {useAgregarProductoAlPedidoActual} from 'pages/Pasos/2_TomaDePedido/hooks';
import {useTranslation} from 'react-i18next';
import {StateFocusID} from '../..';

const InputStyled = styled(Input)(({}) => ({
	backgroundColor: 'white',
	border: '1px solid #2F000E',
	borderRadius: '10px',
	fontSize: '12px',
	fontWeight: 600,
	height: '16px',
	lineHeight: '16px',
	padding: '0 2px',
	width: '42px',
}));

interface Props {
	producto: TProductoPedido;
	stateInputFocus: TStateInputFocus;
	stateFocusId: StateFocusID;
}

const Controles: React.FC<Props> = ({
	producto,
	stateInputFocus,
	stateFocusId,
}) => {
	const {mostrarAdvertenciaEnDialogo} = useMostrarAdvertenciaEnDialogo();
	const visitaActual = useObtenerVisitaActual();
	const [puedeAgregar, setPuedeAgregar] = React.useState<boolean>(false);

	const defaultValues = {
		unidades: producto.unidades,
		subUnidades: producto.subUnidades,
		productoABuscar: '',
		tipoDePedido: visitaActual.tipoPedidoActual,
		catalogoMotivo: '',
	};
	const {focusId, setFocusId} = stateFocusId;

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
		<Box
			display='flex'
			flexDirection='column'
			alignItems='center'
			justifyContent='center'
			width='125px'
			gap='10px'
			padding='12px 0 16px 0'
			sx={{background: '#F5F0EF'}}
		>
			<Box display='flex' alignItems='center' justifyContent='center' gap='4px'>
				<CajaIcon height='18px' width='18px' />
				<IconButton
					sx={{padding: '0'}}
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
					inputProps={{
						style: {textAlign: 'center'},
						inputMode: 'numeric',
					}}
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
					sx={{padding: '0'}}
					size='small'
					name='unidades'
					value='+'
					onClick={handleButtons}
					disabled={
						producto.unidadesDisponibles
							? producto.unidades >= producto.unidadesDisponibles
								? true
								: false
							: producto.unidades >= configuracionPedido?.cantidadMaximaUnidades
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
			{producto.esVentaSubunidades && (
				<Box width='100%'>
					<Box
						display='flex'
						alignItems='center'
						justifyContent='center'
						gap='4px'
					>
						<BotellaIcon width='18px' height='18px' />
						<IconButton
							sx={{padding: '0'}}
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
							sx={{padding: '0'}}
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
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default Controles;
