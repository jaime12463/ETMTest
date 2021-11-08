import React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {
	AgregarRedondoIcon,
	BotellaIcon,
	CajaIcon,
	CerrarRedondoIcon,
	CheckRedondoIcon,
	FlechaAbajoIcon,
	QuitarRellenoIcon,
} from 'assests/iconos';
import {useTranslation} from 'react-i18next';
import useEstilos from './useEstilos';
import clsx from 'clsx';
import {useObtenerProductoPorCodigo} from 'hooks/useObtenerProductoPorCodigo';
import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerConfiguracion,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {
	borrarProductoDelPedidoActual,
	cambiarEstadoIniciativa,
	cambiarMotivoCancelacionIniciativa,
	editarUnidadesOSubUnidadesEjecutadas,
} from 'redux/features/visitaActual/visitaActualSlice';
import {
	InputsKeysFormTomaDePedido,
	TMotivosCancelacionIniciativas,
	TProductoPedido,
} from 'models';
import theme from 'theme';
import {useAgregarProductoAlPedidoActual} from 'pages/Pasos/2_TomaDePedido/hooks';
import {useMostrarAdvertenciaEnDialogo, useMostrarAviso} from 'hooks';
import {formatearNumero} from 'utils/methods';

const ButtonStyled = styled(Button)(() => ({
	border: '1.5px solid #651C32',
	boxSizing: 'border-box',
	borderRadius: '20px',
	minHeight: '10px',
	height: '16px',
	textTransform: 'none',
	'&:hover': {
		background: 'none',
	},
}));

interface Props {
	expandido: boolean | string;
	setExpandido: React.Dispatch<React.SetStateAction<string | boolean>>;
	id: string;
	nombreIniciativa: string;
	planActividad: string;
	descripcion: string;
	fechaVencimiento: string;
	unidades: number;
	unidadesEjecutadas: number;
	subUnidades: number;
	subUnidadesEjecutadas: number;
	codigo: number;
	estado: 'pendiente' | 'ejecutada' | 'cancelada';
	motivo: string;
}

interface GetValuesProps {
	unidades: number;
	subUnidades: number;
	productoABuscar: string;
	tipoDePedido: string;
	catalogoMotivo: string;
}

const TarjetaIniciativas: React.FC<Props> = ({
	expandido,
	setExpandido,
	id,
	nombreIniciativa,
	planActividad,
	descripcion,
	fechaVencimiento,
	unidades,
	unidadesEjecutadas,
	subUnidades,
	subUnidadesEjecutadas,
	codigo,
	estado,
	motivo,
}) => {
	const {t} = useTranslation();
	const producto = useObtenerProductoPorCodigo(codigo);
	const visitaActual = useObtenerVisitaActual();
	const {motivosCancelacionIniciativas} = useObtenerConfiguracion();
	const clienteActual = useObtenerClienteActual();
	const {mostrarAdvertenciaEnDialogo} = useMostrarAdvertenciaEnDialogo();

	if (!producto) return null;

	const defaultValues: GetValuesProps = {
		unidades: unidadesEjecutadas,
		subUnidades: subUnidadesEjecutadas,
		productoABuscar: '',
		tipoDePedido: visitaActual.tipoPedidoActual,
		catalogoMotivo: '',
	};

	const productoACargar: TProductoPedido = {
		...producto,
		unidades,
		subUnidades,
		catalogoMotivo: '',
		total: 0,
		tipoPago: clienteActual.tipoPagoActual,
	};
	const mostrarAviso = useMostrarAviso();
	const [openEstado, setOpenEstado] = React.useState<boolean>(false);
	const [openMotivo, setOpenMotivo] = React.useState<boolean>(false);
	const [estadoSelect, setEstadoSelect] = React.useState<
		'pendiente' | 'ejecutada' | 'cancelada'
	>(estado);
	const [motivoSelect, setMotivoSelect] = React.useState<string>('');

	const [puedeAgregar, setPuedeAgregar] = React.useState<boolean>(false);
	const [getValues, setGetValues] =
		React.useState<GetValuesProps>(defaultValues);

	const [focusId, setFocusId] = React.useState<number>(0);
	const [inputFocus, setInputFocus] =
		React.useState<InputsKeysFormTomaDePedido>('productoABuscar');
	const classes = useEstilos({
		estado: estadoSelect,
		inputsBloqueados: visitaActual.iniciativasBloqueadas,
	});

	const dispatch = useAppDispatch();
	const manejadorExpandido =
		({id}: any) =>
		(event: React.SyntheticEvent) => {
			setExpandido(id);
		};

	const agregarProductoAlPedidoActual = useAgregarProductoAlPedidoActual(
		productoACargar,
		mostrarAdvertenciaEnDialogo,
		getValues,
		setGetValues
	);

	React.useEffect(() => {
		if (puedeAgregar) {
			agregarProductoAlPedidoActual(getValues);
			dispatch(
				editarUnidadesOSubUnidadesEjecutadas({
					codigoIniciativa: Number(id),
					unidadesEjecutadas: getValues.unidades,
					subUnidadesEjecutadas: getValues.subUnidades,
				})
			);
			setPuedeAgregar(false);
		}
	}, [puedeAgregar]);

	React.useEffect(() => {
		if (estadoSelect === 'cancelada' && motivoSelect !== '') {
			dispatch(
				cambiarEstadoIniciativa({
					estado: 'cancelada',
					codigoIniciativa: Number(id),
				})
			);
			dispatch(
				cambiarMotivoCancelacionIniciativa({
					motivo: motivoSelect,
					codigoIniciativa: Number(id),
				})
			);
		}
	}, [estadoSelect, motivoSelect]);

	const handleSelectChange = (e: SelectChangeEvent<typeof estadoSelect>) => {
		switch (e.target.value) {
			case 'pendiente':
				setEstadoSelect('pendiente');
				dispatch(
					cambiarEstadoIniciativa({
						estado: 'pendiente',
						codigoIniciativa: Number(id),
					})
				);
				dispatch(
					borrarProductoDelPedidoActual({
						codigoProducto: producto.codigoProducto,
					})
				);
				if (motivo !== '') {
					dispatch(
						cambiarMotivoCancelacionIniciativa({
							motivo: '',
							codigoIniciativa: Number(id),
						})
					);
					setMotivoSelect('');
				}
				break;
			case 'ejecutada':
				setEstadoSelect('ejecutada');
				agregarProductoAlPedidoActual(getValues);
				dispatch(
					cambiarEstadoIniciativa({
						estado: 'ejecutada',
						codigoIniciativa: Number(id),
					})
				);
				if (motivo !== '') {
					dispatch(
						cambiarMotivoCancelacionIniciativa({
							motivo: '',
							codigoIniciativa: Number(id),
						})
					);
					setMotivoSelect('');
				}
				break;
			case 'cancelada':
				setEstadoSelect('cancelada');
				dispatch(
					borrarProductoDelPedidoActual({
						codigoProducto: producto.codigoProducto,
					})
				);
				break;
			default:
				break;
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
				codigoIniciativa: Number(id),
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
						codigoIniciativa: Number(id),
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
		<Card
			className={classes.card}
			style={{padding: '12px 14px', boxShadow: 'none'}}
		>
			<Box>
				<Box
					display='flex'
					flexDirection={
						estadoSelect === 'pendiente' ||
						(estadoSelect === 'cancelada' && motivoSelect === '')
							? 'column'
							: 'row'
					}
					alignItems='start'
					marginBottom='12px'
					gap={
						estadoSelect === 'pendiente' ||
						(estadoSelect === 'cancelada' && motivoSelect === '')
							? '8px'
							: '40px'
					}
				>
					{estadoSelect === 'cancelada' && motivoSelect === '' && (
						<Box display='flex' justifyContent='flex-end' width='100%'>
							<Typography
								color='#fff'
								fontFamily='Open Sans'
								padding='2px 12px'
								sx={{
									background: theme.palette.primary.main,
									borderRadius: '50px',
								}}
								variant='caption'
							>
								{t('general.sinMotivo')}
							</Typography>
						</Box>
					)}
					<Typography variant='subtitle2'>{nombreIniciativa}</Typography>
					{estadoSelect === 'ejecutada' && (
						<Box>
							<CheckRedondoIcon fill={theme.palette.success.main} />
						</Box>
					)}
					{estadoSelect === 'cancelada' && motivo !== '' && (
						<Box>
							<CerrarRedondoIcon />
						</Box>
					)}
				</Box>
				<Collapse in={expandido === id} timeout='auto' unmountOnExit>
					<Divider />
					<Stack spacing='12px' marginBottom='8px'>
						<Box display='flex' alignItems='center' marginTop='8px'>
							<Typography variant='body3' fontFamily='Open Sans' flex='1'>
								{t('general.estatus')}
							</Typography>
							<Box flex='3'>
								<Select
									className={classes.select}
									sx={{fontSize: '10px', fontFamily: 'Open Sans'}}
									open={openEstado}
									onClose={() => setOpenEstado(false)}
									onOpen={() => setOpenEstado(true)}
									value={estadoSelect}
									onChange={handleSelectChange}
									disabled={visitaActual.iniciativasBloqueadas}
								>
									<MenuItem
										sx={{fontSize: '10px', fontFamily: 'Open Sans'}}
										value='pendiente'
									>
										{t('general.pendiente')}
									</MenuItem>
									<MenuItem
										sx={{fontSize: '10px', fontFamily: 'Open Sans'}}
										value='ejecutada'
									>
										{t('general.ejecutada')}
									</MenuItem>
									<MenuItem
										sx={{fontSize: '10px', fontFamily: 'Open Sans'}}
										value='cancelada'
									>
										{t('general.cancelada')}
									</MenuItem>
								</Select>
							</Box>
						</Box>
						{estadoSelect === 'cancelada' && (
							<Box display='flex' alignItems='center' marginTop='8px'>
								<Typography variant='body3' fontFamily='Open Sans' flex='1'>
									{t('general.motivo')}
								</Typography>
								<Box flex='3'>
									<Select
										className={classes.select}
										sx={{fontSize: '10px', fontFamily: 'Open Sans'}}
										open={openMotivo}
										onClose={() => setOpenMotivo(false)}
										onOpen={() => setOpenMotivo(true)}
										value={motivoSelect}
										onChange={(e) => {
											setMotivoSelect(e.target.value);
										}}
										disabled={visitaActual.iniciativasBloqueadas}
									>
										{motivosCancelacionIniciativas?.map(
											(motivo: TMotivosCancelacionIniciativas) => (
												<MenuItem
													sx={{fontSize: '10px'}}
													key={motivo.codigo}
													value={motivo.descripcion}
												>
													{motivo.descripcion}
												</MenuItem>
											)
										)}
									</Select>
								</Box>
							</Box>
						)}
						<Box display='flex' gap='8px' alignItems='center'>
							<Typography variant='body3' fontFamily='Open Sans' flex='1'>
								{t('general.planDeActividades')}
							</Typography>
							<Typography variant='subtitle3' fontFamily='Open Sans' flex='3'>
								{planActividad}
							</Typography>
						</Box>
						<Box display='flex' gap='8px' alignItems='center'>
							<Typography variant='body3' fontFamily='Open Sans' flex='1'>
								{t('general.descripcion')}
							</Typography>
							<Typography variant='subtitle3' fontFamily='Open Sans' flex='3'>
								{descripcion}
							</Typography>
						</Box>
						<Box display='flex' gap='8px' alignItems='center'>
							<Typography variant='body3' fontFamily='Open Sans' flex='1'>
								{t('general.vigencia')}
							</Typography>
							<Typography variant='subtitle3' fontFamily='Open Sans' flex='3'>
								{fechaVencimiento}
							</Typography>
						</Box>
					</Stack>
					<Divider />
					<Box margin='8px 0'>
						<Box
							display='flex'
							alignItems='center'
							justifyContent='space-between'
						>
							<Box display='flex' flexDirection='column'>
								<Typography variant='subtitle3'>
									{producto.codigoProducto}
								</Typography>
								<Typography variant='subtitle3' noWrap width='150px'>
									{producto.nombreProducto}
								</Typography>
								<Box
									display='flex'
									alignItems='center'
									marginTop='4px'
									gap='4px'
								>
									<CajaIcon height='18px' width='18px' />
									<Typography variant='caption'>
										x{producto.presentacion}
									</Typography>
									<Typography variant='subtitle3'>
										{formatearNumero(producto.precioConImpuestoUnidad, t)}
									</Typography>
									<BotellaIcon height='15px' width='15px' />
									<Typography variant='subtitle3'>
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
							>
								<Box
									display='flex'
									alignItems='center'
									justifyContent='center'
									gap='4px'
								>
									<CajaIcon width='18px' height='18px' />
									{estadoSelect === 'ejecutada' &&
										!visitaActual.iniciativasBloqueadas && (
											<IconButton
												size='small'
												value='-'
												name='unidades'
												sx={{padding: 0}}
												disabled={getValues.unidades <= 0}
												onClick={handleButtons}
											>
												<QuitarRellenoIcon
													width='18px'
													height='18px'
													fill={getValues.unidades <= 0 ? '#D9D9D9' : '#2F000E'}
												/>
											</IconButton>
										)}
									<Input
										className={classes.input}
										inputProps={{
											style: {textAlign: 'center'},
											inputMode: 'numeric',
											className: classes.input,
										}}
										disableUnderline
										name='unidades'
										value={getValues.unidades}
										onChange={handleInputChange}
										disabled={
											estado !== 'ejecutada' ||
											visitaActual.iniciativasBloqueadas
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
									/>
									{estadoSelect === 'ejecutada' &&
										!visitaActual.iniciativasBloqueadas && (
											<IconButton
												size='small'
												name='unidades'
												value='+'
												sx={{padding: 0}}
												onClick={handleButtons}
											>
												<AgregarRedondoIcon
													width='18px'
													height='18px'
													fill='#2F000E'
												/>
											</IconButton>
										)}
								</Box>
								{producto.esVentaSubunidades && (
									<Box
										display='flex'
										alignItems='center'
										justifyContent='center'
										gap='4px'
									>
										<BotellaIcon width='18px' height='18px' />
										{estado === 'ejecutada' &&
											!visitaActual.iniciativasBloqueadas && (
												<IconButton
													size='small'
													value='-'
													name='subUnidades'
													sx={{padding: 0}}
													disabled={getValues.subUnidades <= 0}
													onClick={handleButtons}
												>
													<QuitarRellenoIcon
														width='18px'
														height='18px'
														fill={
															getValues.subUnidades <= 0 ? '#D9D9D9' : '#2F000E'
														}
													/>
												</IconButton>
											)}
										<Input
											className={classes.input}
											inputProps={{
												style: {textAlign: 'center'},
												inputMode: 'numeric',
												className: classes.input,
											}}
											disableUnderline
											name='subUnidades'
											value={getValues.subUnidades}
											onChange={handleInputChange}
											disabled={
												estado !== 'ejecutada' ||
												visitaActual.iniciativasBloqueadas
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
										/>
										{estadoSelect === 'ejecutada' &&
											!visitaActual.iniciativasBloqueadas && (
												<IconButton
													size='small'
													name='subUnidades'
													value='+'
													sx={{padding: 0}}
													onClick={handleButtons}
												>
													<AgregarRedondoIcon
														width='18px'
														height='18px'
														fill='#2F000E'
													/>
												</IconButton>
											)}
									</Box>
								)}
							</Box>
						</Box>
					</Box>
					<Divider />
				</Collapse>
				<Box marginTop='8px'>
					<ButtonStyled
						disableFocusRipple
						fullWidth
						disableRipple
						onClick={manejadorExpandido({
							id: expandido === id ? false : id,
						})}
					>
						<CardActions disableSpacing style={{padding: 0}}>
							<Box display='flex' gap='6px' alignItems='center'>
								<Typography variant='caption' color='secondary'>
									Ver detalle
								</Typography>
								<Box
									className={clsx(classes.expand, {
										[classes.expandOpen]: expandido === id ? true : false,
									})}
									aria-expanded={expandido === id ? true : false}
									style={{padding: 0}}
								>
									<FlechaAbajoIcon width='10px' height='10px' />
								</Box>
							</Box>
						</CardActions>
					</ButtonStyled>
				</Box>
			</Box>
		</Card>
	);
};

export default TarjetaIniciativas;
