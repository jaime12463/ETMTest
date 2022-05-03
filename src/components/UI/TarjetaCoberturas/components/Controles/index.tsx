import React from 'react';
import {Box, IconButton} from '@mui/material';
import {
	AgregarRedondoIcon,
	BotellaIcon,
	CajaIcon,
	QuitarRellenoIcon,
} from 'assests/iconos';
import {TClienteActual, TProductoPedido, TStateInputFocus} from 'models';
import {
	useMostrarAdvertenciaEnDialogo,
	useMostrarAviso,
	useObtenerDatosCliente,
	useValidacionPermiteSubUnidades,
} from 'hooks';
import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {useAgregarProductoAlPedidoActual} from 'pages/Pasos/2_TomaDePedido/hooks';
import {useTranslation} from 'react-i18next';
import {StateFocusID} from 'components/UI/TarjetaTomaPedido';
import useEstilos from './useEstilos';
import {
	agregarCoberturasEjecutadas,
	borrarProductoDelPedidoActual,
} from 'redux/features/visitaActual/visitaActualSlice';
import {InputCantidades, InputPropsEstilos} from 'components/UI';
interface Props {
	producto: TProductoPedido;
	stateInputFocus: TStateInputFocus;
	stateFocusId: StateFocusID;
	resetCoberturas: boolean;
	setResetCoberturas: React.Dispatch<React.SetStateAction<boolean>>;
}

const Controles: React.VFC<Props> = ({
	producto,
	stateInputFocus,
	stateFocusId,
	resetCoberturas,
	setResetCoberturas,
}) => {
	const {mostrarAdvertenciaEnDialogo} = useMostrarAdvertenciaEnDialogo();
	const visitaActual = useObtenerVisitaActual();
	const [puedeAgregar, setPuedeAgregar] = React.useState<boolean>(false);
	const permiteSubUnidades = useValidacionPermiteSubUnidades(producto);
	const coberturaEjecutada = visitaActual.coberturasEjecutadas.find(
		(p) => producto.codigoProducto === p.codigoProducto
	);

	const defaultValues = {
		unidades: (coberturaEjecutada?.unidades || producto.unidades) ?? 0,
		subUnidades: (coberturaEjecutada?.subUnidades || producto.subUnidades) ?? 0,
		productoABuscar: '',
		tipoDePedido: visitaActual.tipoPedidoActual,
		catalogoMotivo: '',
	};
	const {focusId, setFocusId} = stateFocusId;

	const [getValues, setGetValues] = React.useState(defaultValues);

	const {inputFocus, setInputFocus} = stateInputFocus;

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
	const dispatch = useAppDispatch();
	const classes = useEstilos({inputsBloqueados: visitaActual.pasoATomaPedido});

	const useEstilosProps: InputPropsEstilos = {
		bordeError: visitaActual.seQuedaAEditar.bordeError,
		cantidadMaximaConfig: configuracionPedido.cantidadMaximaUnidades ?? 0,
		subUnidades: getValues.subUnidades,
		unidades: getValues.unidades,
		unidadesDisponibles: producto.unidadesDisponibles,
		disabled: visitaActual.pasoATomaPedido,
	};

	React.useEffect(() => {
		if (puedeAgregar) {
			agregarProductoAlPedidoActual(getValues);
			dispatch(
				agregarCoberturasEjecutadas({
					codigoProducto: producto.codigoProducto,
					unidades: getValues.unidades,
					subUnidades: getValues.subUnidades,
				})
			);
			setPuedeAgregar(false);
		}
	}, [puedeAgregar]);

	React.useEffect(() => {
		return () => {
			if (getValues.unidades === 0 && getValues.subUnidades === 0) {
				dispatch(
					borrarProductoDelPedidoActual({
						codigoProducto: producto.codigoProducto,
					})
				);
			}
		};
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
		dispatch(
			agregarCoberturasEjecutadas({
				codigoProducto: producto.codigoProducto,
				unidades: getValues.unidades,
				subUnidades: getValues.subUnidades,
			})
		);
		setFocusId(0);
		setInputFocus('productoABuscar');
	};

	const handleOnChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setGetValues({
			...getValues,
			[e.target.name]: +e.target.value.replace(/[^0-9]/g, ''),
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
				dispatch(
					agregarCoberturasEjecutadas({
						codigoProducto: producto.codigoProducto,
						unidades: getValues.unidades,
						subUnidades: getValues.subUnidades,
					})
				);
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

	React.useEffect(() => {
		if (resetCoberturas) {
			dispatch(
				agregarCoberturasEjecutadas({
					codigoProducto: producto.codigoProducto,
					unidades: 0,
					subUnidades: 0,
				})
			);
			setGetValues((prevState) => {
				return {
					...prevState,
					unidades: 0,
					subUnidades: 0,
				};
			});
			setResetCoberturas(false);
		}
	}, [resetCoberturas]);

	return (
		<Box
			display='flex'
			flexDirection='column'
			alignItems='center'
			width='125px'
			gap='10px'
			padding='22px 0 16px 0'
			sx={{background: '#F5F0EF'}}
		>
			<Box display='flex' alignItems='center' justifyContent='center' gap='2px'>
				<CajaIcon height='18px' width='18px' />
				{!visitaActual.pasoATomaPedido && (
					<IconButton
						sx={{marginLeft: '2px', padding: '0'}}
						size='small'
						value='-'
						name='unidades'
						onClick={handleButtons}
						disabled={getValues.unidades === 0}
					>
						<QuitarRellenoIcon
							width='18px'
							height='18px'
							disabled={getValues.unidades === 0}
						/>
					</IconButton>
				)}
				<InputCantidades
					disabled={visitaActual.pasoATomaPedido}
					id='unidades_producto'
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
					useEstilosProps={useEstilosProps}
					value={getValues.unidades}
				/>
				{!visitaActual.pasoATomaPedido && (
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
								: producto.unidades >=
								  configuracionPedido?.cantidadMaximaUnidades
								? true
								: false
						}
					>
						<AgregarRedondoIcon
							width='18px'
							height='18px'
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
						/>
					</IconButton>
				)}
			</Box>
			{permiteSubUnidades && (
				<Box width='100%'>
					<Box
						display='flex'
						alignItems='center'
						justifyContent='center'
						gap='2px'
					>
						<BotellaIcon width='18px' height='18px' />
						{!visitaActual.pasoATomaPedido && (
							<IconButton
								sx={{marginLeft: '2px', padding: '0'}}
								size='small'
								value='-'
								name='subUnidades'
								onClick={handleButtons}
								disabled={getValues.subUnidades === 0}
							>
								<QuitarRellenoIcon
									width='18px'
									height='18px'
									disabled={getValues.subUnidades === 0}
								/>
							</IconButton>
						)}
						<InputCantidades
							disabled={visitaActual.pasoATomaPedido}
							id='subUnidades_producto'
							inputRef={(input) => {
								if (
									inputFocus === 'subUnidades' &&
									focusId === producto.codigoProducto
								) {
									input?.focus();
								}
							}}
							name='subUnidades'
							onBlur={validacionSubUnidades}
							onChange={handleOnChange}
							onClick={() => {
								setInputFocus('subUnidades');
								setFocusId(producto.codigoProducto);
							}}
							onFocus={(e) => e.target.select()}
							onKeyPress={handleKeyPress}
							useEstilosProps={useEstilosProps}
							value={getValues.subUnidades}
						/>
						{!visitaActual.pasoATomaPedido && (
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
									disabled={
										getValues.subUnidades >=
										producto.presentacion - producto.subunidadesVentaMinima
									}
								/>
							</IconButton>
						)}
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default Controles;
