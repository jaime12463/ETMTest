import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import {StateFocusID} from 'components/UI/TarjetaTomaPedido';
import {TClienteActual, TProductoPedido, TStateInputFocus} from 'models';
import {
	useMostrarAdvertenciaEnDialogo,
	useMostrarAviso,
	useObtenerDatosCliente,
	useValidacionPermiteSubUnidades,
} from 'hooks';
import {useObtenerClienteActual} from 'redux/hooks';
import {
	useAgregarProductoAlPedidoActual,
	useValidarProductoPermiteSubUnidades,
} from 'pages/Pasos/2_TomaDePedido/hooks';
import {Dialogo} from 'components/UI';
import {
	AgregarRedondoIcon,
	BotellaIcon,
	CajaIcon,
	QuitarRellenoIcon,
} from 'assests/iconos';
import useEstilos from './useEstilos';
import theme from 'theme';
import {GetValueProps} from '..';

interface Props {
	producto: TProductoPedido;
	stateInputFocus: TStateInputFocus;
	statefocusId: StateFocusID;
	stateCatalogo: any;
	getValues: GetValueProps;
	setGetValues: React.Dispatch<React.SetStateAction<GetValueProps>>;
}

const Controles: React.FC<Props> = ({
	producto,
	stateInputFocus,
	statefocusId,
	stateCatalogo,
	getValues,
	setGetValues,
}) => {
	const {mostrarAdvertenciaEnDialogo, mostarDialogo, parametrosDialogo} =
		useMostrarAdvertenciaEnDialogo();
	const [puedeAgregar, setPuedeAgregar] = React.useState<boolean>(false);
	const {catalogoMotivo} = stateCatalogo;

	const {focusId, setFocusId} = statefocusId;
	const mostrarAviso = useMostrarAviso();
	const {inputFocus, setInputFocus} = stateInputFocus;

	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const {configuracionPedido}: any = datosCliente;
	const validacionPermiteSubUnidades =
		useValidacionPermiteSubUnidades(producto);

	const avisoCanjeAgregado = () =>
		focusId === producto.codigoProducto &&
		mostrarAviso(
			'success',
			'Canje agregado correctamente',
			undefined,
			undefined,
			'canjeAgreado'
		);

	React.useEffect(() => {
		if (producto.catalogoMotivo !== '') {
			if (producto.unidades > 0 || producto.subUnidades > 0)
				avisoCanjeAgregado();
		}
	}, [
		producto.catalogoMotivo,
		producto.unidades,
		producto.subUnidades,
		catalogoMotivo,
	]);

	const agregarProductoAlPedidoActual = useAgregarProductoAlPedidoActual(
		producto,
		mostrarAdvertenciaEnDialogo,
		getValues,
		setGetValues
	);

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setGetValues({
			...getValues,
			[e.target.name]: e.target.value.replace(/[^0-9]/g, ''),
		});
		setFocusId(producto.codigoProducto);
		setPuedeAgregar(true);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			//avisoCanjeAgregado();
			agregarProductoAlPedidoActual(getValues);

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
				...getValues,
				catalogoMotivo: catalogoMotivo[producto.codigoProducto].codigoMotivo,
			});
		}
		if (getValues.unidades > 0 || getValues.subUnidades > 0) {
			if (catalogoMotivo[producto.codigoProducto]) {
				//avisoCanjeAgregado();
				agregarProductoAlPedidoActual({
					...getValues,
					catalogoMotivo: catalogoMotivo[producto.codigoProducto].codigoMotivo,
				});
			}
		}
	}, [catalogoMotivo]);

	React.useEffect(() => {
		if (getValues.unidades === 0 && getValues.subUnidades === 0) {
			setGetValues({...getValues, catalogoMotivo: ''});
		}
	}, [getValues.unidades, getValues.subUnidades]);

	React.useEffect(() => {
		if (puedeAgregar) {
			//avisoCanjeAgregado();
			agregarProductoAlPedidoActual(getValues);
			setPuedeAgregar(false);
		}
	}, [puedeAgregar]);

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
		//avisoCanjeAgregado();
		agregarProductoAlPedidoActual(getValues);
	};

	const classes = useEstilos();

	return (
		<>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<Box
				alignItems='center'
				display='flex'
				flexDirection='column'
				padding='22px 14px 12px 8px'
				gap='12px'
				width='125px'
				borderRadius={
					getValues.unidades > 0 ||
					getValues.subUnidades > 0 ||
					getValues.catalogoMotivo !== '' ||
					(getValues.unidades !== 0 && getValues.subUnidades !== 0)
						? '0 0 8px 0'
						: '0 8px 8px 0'
				}
				sx={{background: '#F5F0EF'}}
			>
				<Box
					alignItems='center'
					display='flex'
					gap='2px'
					justifyContent='flex-end'
				>
					<CajaIcon
						height='18px'
						width='18px'
						fill={theme.palette.secondary.dark}
						style={{marginRight: '2px'}}
					/>
					<IconButton
						size='small'
						value='-'
						name='unidades'
						onClick={handleButtons}
						disabled={producto.unidades === 0}
						sx={{padding: 0}}
					>
						<QuitarRellenoIcon
							width='18px'
							height='18px'
							disabled={producto.unidades === 0}
						/>
					</IconButton>
					<Input
						className={classes.input}
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
						onFocus={(e) => {
							e.target.select();
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
					<IconButton
						sx={{padding: 0}}
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
							disabled={
								producto.unidades >= configuracionPedido?.cantidadMaximaUnidades
									? true
									: false
							}
						/>
					</IconButton>
				</Box>
				{validacionPermiteSubUnidades && (
					<Box
						alignItems='center'
						display='flex'
						justifyContent='flex-end'
						gap='2px'
					>
						<BotellaIcon
							width='18px'
							height='18px'
							style={{marginRight: '2px'}}
						/>
						<IconButton
							sx={{padding: 0}}
							size='small'
							value='-'
							name='subUnidades'
							onClick={handleButtons}
							disabled={producto.subUnidades === 0}
						>
							<QuitarRellenoIcon
								width='18px'
								height='18px'
								disabled={producto.subUnidades === 0}
							/>
						</IconButton>
						<Input
							className={classes.input}
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
							sx={{padding: 0}}
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
								disabled={
									getValues.subUnidades >=
									producto.presentacion - producto.subunidadesVentaMinima
								}
							/>
						</IconButton>
					</Box>
				)}
			</Box>
		</>
	);
};

export default Controles;
