import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import {
	AgregarRedondoIcon,
	BotellaIcon,
	CajaIcon,
	QuitarRellenoIcon,
} from 'assests/iconos';
import {formatearNumero} from 'utils/methods';
import useEstilos from '../useEstilos';
import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {InputsKeysFormTomaDePedido, TProductoPedido} from 'models';
import {useAgregarProductoAlPedidoActual} from 'pages/Pasos/2_TomaDePedido/hooks';
import {
	useMostrarAdvertenciaEnDialogo,
	useMostrarAviso,
	useObtenerDatosCliente,
} from 'hooks';
import {editarUnidadesOSubUnidadesEjecutadas} from 'redux/features/visitaActual/visitaActualSlice';
import {useTranslation} from 'react-i18next';
import {useObtenerProductoPorCodigo} from 'hooks/useObtenerProductoPorCodigo';

interface GetValuesProps {
	unidades: number;
	subUnidades: number;
	productoABuscar: string;
	tipoDePedido: string;
	catalogoMotivo: string;
}

interface Props {
	idMaterialIniciativa: number;
	estadoSelect: string;
	unidadesEjecutadas: number;
	subUnidadesEjecutadas: number;
}

const Producto: React.FC<Props> = ({
	idMaterialIniciativa,
	estadoSelect,
	unidadesEjecutadas,
	subUnidadesEjecutadas,
}) => {
	const producto = useObtenerProductoPorCodigo(idMaterialIniciativa);
	if (!producto) return null;

	const visitaActual = useObtenerVisitaActual();
	const clienteActual = useObtenerClienteActual();
	const {t} = useTranslation();

	const defaultValues: GetValuesProps = {
		unidades: unidadesEjecutadas,
		subUnidades: subUnidadesEjecutadas,
		productoABuscar: '',
		tipoDePedido: visitaActual.tipoPedidoActual,
		catalogoMotivo: '',
	};

	const unidades = unidadesEjecutadas;
	const subUnidades = subUnidadesEjecutadas;

	const [getValues, setGetValues] =
		React.useState<GetValuesProps>(defaultValues);

	const [puedeAgregar, setPuedeAgregar] = React.useState<boolean>(false);

	const [focusId, setFocusId] = React.useState<number>(0);
	const [inputFocus, setInputFocus] =
		React.useState<InputsKeysFormTomaDePedido>('productoABuscar');

	const {mostrarAdvertenciaEnDialogo} = useMostrarAdvertenciaEnDialogo();

	const productoACargar: TProductoPedido = {
		...producto,
		unidades,
		subUnidades,
		catalogoMotivo: '',
		total: 0,
		tipoPago: clienteActual.tipoPagoActual,
		preciosBase: {
			unidad: producto.precioConImpuestoUnidad,
			subUnidad: producto.precioConImpuestoSubunidad,
		},
		preciosNeto: {
			unidad: producto.precioConImpuestoUnidad,
			subUnidad: producto.precioConImpuestoSubunidad,
		},
		preciosPromo: {
			unidad: 0,
			subUnidad: 0,
		},
	};

	const agregarProductoAlPedidoActual = useAgregarProductoAlPedidoActual(
		productoACargar,
		mostrarAdvertenciaEnDialogo,
		getValues,
		setGetValues
	);

	const mostrarAviso = useMostrarAviso();

	// const classes = useEstilos({
	// 	estado: estadoSelect,
	// 	inputsBloqueados: visitaActual.pasoATomaPedido,
	// });

	const dispatch = useAppDispatch();

	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const {configuracionPedido}: any = datosCliente;

	React.useEffect(() => {
		if (puedeAgregar) {
			agregarProductoAlPedidoActual(getValues);
			dispatch(
				editarUnidadesOSubUnidadesEjecutadas({
					codigoIniciativa: Number(idMaterialIniciativa),
					unidadesEjecutadas: getValues.unidades,
					subUnidadesEjecutadas: getValues.subUnidades,
				})
			);
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
			editarUnidadesOSubUnidadesEjecutadas({
				codigoIniciativa: Number(idMaterialIniciativa),
				unidadesEjecutadas: getValues.unidades,
				subUnidadesEjecutadas: getValues.subUnidades,
			})
		);
		setFocusId(0);
		setInputFocus('productoABuscar');
	};

	const handleInputChange = (
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
				dispatch(
					editarUnidadesOSubUnidadesEjecutadas({
						codigoIniciativa: Number(idMaterialIniciativa),
						unidadesEjecutadas: getValues.unidades,
						subUnidadesEjecutadas: getValues.subUnidades,
					})
				);
			} else if (inputFocus === 'subUnidades') {
				validacionSubUnidades();
			}
		}
	};

	return (
		<Box>
			<Box display='flex' alignItems='center' justifyContent='space-between'>
				<Box display='flex' flexDirection='column' padding='12px 8px 12px 12px'>
					<Typography
						variant='subtitle3'
						data-cy={`iniciativa-material-${idMaterialIniciativa}`}
					>
						{producto.codigoProducto}
					</Typography>
					<Typography
						variant='subtitle3'
						noWrap
						width='150px'
						data-cy={`iniciativa-nombreProducto-${idMaterialIniciativa}`}
					>
						{producto.nombreProducto}
					</Typography>
					<Box display='flex' alignItems='center' marginTop='4px' gap='4px'>
						<CajaIcon height='18px' width='18px' />
						<Typography
							variant='caption'
							data-cy={`iniciativa-presentacion-${idMaterialIniciativa}`}
						>
							x{producto.presentacion}
						</Typography>
						<Typography
							variant='subtitle3'
							data-cy={`iniciativa-precioUnidad-${idMaterialIniciativa}`}
						>
							{formatearNumero(producto.precioConImpuestoUnidad, t)}
						</Typography>
						<BotellaIcon
							height='15px'
							width='15px'
							style={{marginLeft: '2px'}}
						/>
						<Typography
							variant='subtitle3'
							data-cy={`iniciativa-precioSubunidad-${idMaterialIniciativa}`}
						>
							{formatearNumero(producto.precioConImpuestoSubunidad, t)}
						</Typography>
					</Box>
				</Box>

				<Box
					display='flex'
					alignItems='center'
					justifyContent='center'
					flexDirection='column'
					gap='12px'
					padding='12px 12px 12px 8px'
					minWidth='125px'
					sx={{background: '#F5F0EF'}}
				>
					<Box
						display='flex'
						alignItems='center'
						justifyContent='center'
						gap='2px'
					>
						<CajaIcon width='18px' height='18px' />
						{estadoSelect === 'ejecutada' && !visitaActual.pasoATomaPedido && (
							<IconButton
								size='small'
								value='-'
								name='unidades'
								sx={{marginLeft: '2px', padding: 0}}
								disabled={getValues.unidades === 0}
								onClick={handleButtons}
							>
								<QuitarRellenoIcon
									width='18px'
									height='18px'
									disabled={getValues.unidades === 0}
								/>
							</IconButton>
						)}
						<Input
							// className={classes.input}
							inputProps={{
								style: {textAlign: 'center'},
								inputMode: 'numeric',
								// className: classes.input,
							}}
							disableUnderline
							name='unidades'
							value={getValues.unidades}
							onChange={handleInputChange}
							disabled={
								estadoSelect !== 'ejecutada' || visitaActual.pasoATomaPedido
							}
							onKeyPress={handleKeyPress}
							id='unidades_producto'
							onClick={() => {
								setInputFocus('unidades');
								setFocusId(producto.codigoProducto);
							}}
							onFocus={(e) => e.target.select()}
							inputRef={(input) => {
								if (
									inputFocus === 'unidades' &&
									focusId === producto.codigoProducto
								) {
									input?.focus();
								}
							}}
							data-cy={`iniciativa-unidad-venta`}
						/>
						{estadoSelect === 'ejecutada' && !visitaActual.pasoATomaPedido && (
							<IconButton
								size='small'
								name='unidades'
								value='+'
								sx={{padding: 0}}
								onClick={handleButtons}
								disabled={
									producto.unidadesDisponibles
										? getValues.unidades >= producto.unidadesDisponibles
											? true
											: false
										: getValues.unidades >=
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
											? getValues.unidades >= producto.unidadesDisponibles
												? true
												: false
											: getValues.unidades >=
											  configuracionPedido?.cantidadMaximaUnidades
											? true
											: false
									}
								/>
							</IconButton>
						)}
					</Box>
					{producto.esVentaSubunidades && (
						<Box
							display='flex'
							alignItems='center'
							justifyContent='center'
							gap='2px'
						>
							<BotellaIcon width='18px' height='18px' />
							{estadoSelect === 'ejecutada' && !visitaActual.pasoATomaPedido && (
								<IconButton
									size='small'
									value='-'
									name='subUnidades'
									sx={{marginLeft: '2px', padding: 0}}
									disabled={getValues.subUnidades === 0}
									onClick={handleButtons}
								>
									<QuitarRellenoIcon
										width='18px'
										height='18px'
										disabled={getValues.subUnidades === 0}
									/>
								</IconButton>
							)}
							<Input
								// className={classes.input}
								inputProps={{
									style: {textAlign: 'center'},
									inputMode: 'numeric',
									// className: classes.input,
								}}
								disableUnderline
								name='subUnidades'
								value={getValues.subUnidades}
								onChange={handleInputChange}
								disabled={
									estadoSelect !== 'ejecutada' || visitaActual.pasoATomaPedido
								}
								id='subUnidades_producto'
								onClick={() => {
									setInputFocus('subUnidades');
									setFocusId(producto.codigoProducto);
								}}
								onFocus={(e) => e.target.select()}
								onBlur={validacionSubUnidades}
								onKeyPress={handleKeyPress}
								inputRef={(input) => {
									if (
										inputFocus === 'subUnidades' &&
										focusId === producto.codigoProducto
									) {
										input?.focus();
									}
								}}
								data-cy={`iniciativa-subUnidad-venta`}
							/>
							{estadoSelect === 'ejecutada' && !visitaActual.pasoATomaPedido && (
								<IconButton
									size='small'
									name='subUnidades'
									value='+'
									sx={{padding: 0}}
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
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default Producto;
