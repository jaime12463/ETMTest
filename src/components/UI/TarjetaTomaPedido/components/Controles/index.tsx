import React, {useEffect} from 'react';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {
	AgregarRedondoIcon,
	BotellaIcon,
	CajaIcon,
	QuitarRellenoIcon,
} from 'assests/iconos';
import {
	ETipoDescuento,
	TClienteActual,
	TProductoPedido,
	TStateInfoDescuentos,
	TStateInputFocus,
} from 'models';
import {
	useMostrarAdvertenciaEnDialogo,
	useMostrarAviso,
	useObtenerDatosCliente,
	useValidacionPermiteSubUnidades,
} from 'hooks';
import {useObtenerClienteActual, useObtenerVisitaActual} from 'redux/hooks';
import {useAgregarProductoAlPedidoActual} from 'pages/Pasos/2_TomaDePedido/hooks';
import {useTranslation} from 'react-i18next';
import {StateFocusID} from '../..';
import useEstilos from './useEstilos';
import {TInfoBeneficioProductoPromoOngoing} from 'hooks/useCalularPruductoEnPromoOnGoing';

interface Props {
	obtenerCalculoDescuentoProducto: (
		valoresIngresados: {
			inputPolarizado: number | undefined;
			unidades: number;
			subUnidades: number;
		},
		stateInfoDescuento: TStateInfoDescuentos
	) => void;
	infoBeneficio: TInfoBeneficioProductoPromoOngoing;
	producto: TProductoPedido;
	stateFocusId: StateFocusID;
	stateInfoDescuento: TStateInfoDescuentos;
	stateInputFocus: TStateInputFocus;
}

const Controles: React.FC<Props> = ({
	obtenerCalculoDescuentoProducto,
	infoBeneficio: {cantidad, unidadMedida},
	producto,
	stateFocusId,
	stateInfoDescuento,
	stateInputFocus,
}) => {
	const {mostrarAdvertenciaEnDialogo} = useMostrarAdvertenciaEnDialogo();
	const visitaActual = useObtenerVisitaActual();
	const {infoDescuento} = stateInfoDescuento;
	const [puedeAgregar, setPuedeAgregar] = React.useState<boolean>(false);
	const [cambioValores, setCambioValores] = React.useState<boolean>(false);

	const defaultValue = {
		unidades: producto.unidades,
		subUnidades: producto.subUnidades,
		productoABuscar: '',
		tipoDePedido: visitaActual.tipoPedidoActual,
		catalogoMotivo: '',
		infoDescuento: infoDescuento,
	};
	const [getValues, setGetValues] = React.useState(defaultValue);

	const {focusId, setFocusId} = stateFocusId;

	const {inputFocus, setInputFocus} = stateInputFocus;

	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const {configuracionPedido}: any = datosCliente;

	const agregarProductoAlPedidoActual = useAgregarProductoAlPedidoActual(
		producto,
		mostrarAdvertenciaEnDialogo,
		getValues,
		setGetValues,
		stateInfoDescuento
	);
	const {t} = useTranslation();
	const mostrarAviso = useMostrarAviso();
	const validacionPermiteSubUnidades =
		useValidacionPermiteSubUnidades(producto);

	const classes = useEstilos({
		bordeError: visitaActual.seQuedaAEditar.bordeError,
		unidades: getValues.unidades,
		subUnidades: getValues.subUnidades,
		producto,
		cantidadMaximaConfig: configuracionPedido.cantidadMaximaUnidades,
	});

	React.useEffect(() => {
		obtenerCalculoDescuentoProducto(
			{
				inputPolarizado: undefined,
				unidades: producto.unidades,
				subUnidades: producto.subUnidades,
			},
			stateInfoDescuento
		);
	}, []);

	React.useEffect(() => {
		if (
			infoDescuento.porcentajeDescuento >= 0 &&
			focusId === producto.codigoProducto
		) {
			if (getValues.unidades > 0 || getValues.subUnidades > 0) {
				agregarProductoAlPedidoActual(defaultValue);
			}
		}
		setGetValues(defaultValue);
	}, [infoDescuento]);

	useEffect(() => {
		if (getValues.unidades > 0) {
			agregarProductoAlPedidoActual(
				getValues,
				obtenerCalculoDescuentoProducto,
				{actualizaDescuento: true}
			);
		}
	}, [visitaActual.promosOngoing]);

	React.useEffect(() => {
		if (puedeAgregar) {
			agregarProductoAlPedidoActual(getValues, obtenerCalculoDescuentoProducto);
			setPuedeAgregar(false);
			setCambioValores(false);
		}
	}, [puedeAgregar]);

	const validacionSubUnidades = React.useCallback(() => {
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
		if (cambioValores) {
			agregarProductoAlPedidoActual(getValues, obtenerCalculoDescuentoProducto);
			setCambioValores(false);
		}

		if (producto.descuentoPolarizado) {
			setInputFocus('descuento');
		} else {
			setFocusId(0);
			setInputFocus('productoABuscar');
		}
	}, [getValues]);

	const handleOnChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setCambioValores(true);
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
				if (cambioValores) {
					setCambioValores(false);
					agregarProductoAlPedidoActual(
						getValues,
						obtenerCalculoDescuentoProducto
					);
				}
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
		<Box display='flex' flexDirection='column'>
			<Box
				alignItems='center'
				display='flex'
				flexDirection='column'
				gap='12px'
				padding='20px 0 12px 0'
				width='125px'
			>
				<Box
					alignItems='center'
					display='flex'
					gap='2px'
					justifyContent='center'
				>
					<CajaIcon height='18px' width='18px' />
					<IconButton
						disabled={producto.unidades === 0}
						name='unidades'
						onClick={handleButtons}
						size='small'
						sx={{marginLeft: '2px', padding: '0'}}
						value='-'
					>
						<QuitarRellenoIcon
							disabled={producto.unidades === 0}
							height='18px'
							width='18px'
						/>
					</IconButton>
					<Input
						autoComplete='off'
						className={classes.input}
						data-cy={`cantidad-producto-unidades-${producto.codigoProducto}`}
						disableUnderline
						id='unidades_producto'
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
						name='unidades'
						onChange={handleOnChange}
						onClick={() => {
							setInputFocus('unidades');
							setFocusId(producto.codigoProducto);
						}}
						onFocus={(e) => e.target.select()}
						onKeyPress={handleKeyPress}
						value={getValues.unidades}
					/>
					<IconButton
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
						name='unidades'
						onClick={handleButtons}
						size='small'
						sx={{padding: '0'}}
						value='+'
					>
						<AgregarRedondoIcon
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
							height='18px'
							width='18px'
						/>
					</IconButton>
				</Box>
				{validacionPermiteSubUnidades && (
					<Box width='100%'>
						<Box
							alignItems='center'
							display='flex'
							gap='2px'
							justifyContent='center'
						>
							<BotellaIcon width='18px' height='18px' />
							<IconButton
								disabled={getValues.subUnidades === 0}
								name='subUnidades'
								onClick={handleButtons}
								size='small'
								sx={{marginLeft: '2px', padding: '0'}}
								value='-'
							>
								<QuitarRellenoIcon
									disabled={getValues.subUnidades === 0}
									height='18px'
									width='18px'
								/>
							</IconButton>
							<Input
								autoComplete='off'
								className={classes.input}
								data-cy={`cantidad-producto-subUnidades-${producto.codigoProducto}`}
								disableUnderline
								id='subUnidades_producto'
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
								name='subUnidades'
								onChange={handleOnChange}
								onKeyPress={handleKeyPress}
								onBlur={validacionSubUnidades}
								onClick={() => {
									setInputFocus('subUnidades');
									setFocusId(producto.codigoProducto);
								}}
								onFocus={(e) => e.target.select()}
								value={getValues.subUnidades}
							/>
							<IconButton
								disabled={
									getValues.subUnidades >=
									producto.presentacion - producto.subunidadesVentaMinima
								}
								name='subUnidades'
								onClick={handleButtons}
								size='small'
								sx={{padding: '0'}}
								value='+'
							>
								<AgregarRedondoIcon
									disabled={
										getValues.subUnidades >=
										producto.presentacion - producto.subunidadesVentaMinima
									}
									height='18px'
									width='18px'
								/>
							</IconButton>
						</Box>
					</Box>
				)}
			</Box>
			{cantidad &&
				((((unidadMedida === 'Unidad' && cantidad !== producto.unidades) ||
					(unidadMedida !== 'Unidad' && cantidad !== producto.subUnidades)) &&
					infoDescuento.tipo === ETipoDescuento.automatico) ||
					infoDescuento.tipo === ETipoDescuento.polarizado) && (
					<Box
						display='flex'
						flexDirection='column'
						gap='6px'
						marginTop={validacionPermiteSubUnidades ? '0' : '26px'}
						padding='0 14px 12px 8px'
					>
						<Typography color='#000' variant='caption' fontFamily='Open Sans'>
							{t('descuentos.promocionOngoing')}
						</Typography>
						<Box alignItems='center' display='flex' gap='4px'>
							{unidadMedida === 'Unidad' ? (
								<CajaIcon height='18px' width='18px' />
							) : (
								<BotellaIcon height='18px' width='18px' />
							)}
							<Typography
								color='rgba(0, 0, 0, .50)'
								flex='1'
								fontFamily='Open Sans'
								sx={{
									background: '#D9D9D9',
									borderRadius: '10px',
									paddingBlock: '2px',
								}}
								textAlign='center'
								variant='subtitle3'
							>
								{cantidad}
							</Typography>
						</Box>
					</Box>
				)}
		</Box>
	);
};

export default Controles;
