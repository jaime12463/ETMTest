import React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import {VisualizadorPdfs} from 'components/UI';
import {
	AgregarRedondoIcon,
	AvisoIcon,
	BotellaIcon,
	CajaIcon,
	CerrarRedondoIcon,
	CheckRedondoIcon,
	Clip,
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
	useObtenerDatos,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {
	borrarProductoDelPedidoActual,
	cambiarEstadoIniciativa,
	cambiarMotivoCancelacionIniciativa,
	cambiarSeQuedaAEditar,
	editarUnidadesOSubUnidadesEjecutadas,
} from 'redux/features/visitaActual/visitaActualSlice';
import {
	TProductoPedido,
	TIniciativasCliente,
	InputsKeysFormTomaDePedido,
} from 'models';
import theme from 'theme';
import {useAgregarProductoAlPedidoActual} from 'pages/Pasos/2_TomaDePedido/hooks';
import {
	useMostrarAdvertenciaEnDialogo,
	useMostrarAviso,
	useObtenerDatosCliente,
} from 'hooks';
import {formatearFecha, formatearNumero} from 'utils/methods';
import CustomSelect from 'components/UI/CustomSelect';
import {Link} from '@mui/material';
import Modal from 'components/UI/Modal';
import ModalCore from 'components/UI/ModalCore';

const ButtonStyled = styled(Button)(() => ({
	border: `1.5px solid ${theme.palette.secondary.main}`,
	boxSizing: 'border-box',
	borderRadius: '20px',
	minHeight: '10px',
	height: '18px',
	width: '276px',
	textTransform: 'none',
	'&:hover': {
		background: 'none',
	},
}));

interface Props extends TIniciativasCliente {
	expandido: boolean | string;
	setExpandido: React.Dispatch<React.SetStateAction<string | boolean>>;
	iniciativaIncompleta: boolean;
	setIniciativaIncompleta: React.Dispatch<React.SetStateAction<boolean>>;
	idIniciativaIncompleta: number | null;
	setIdIniciativaIncompleta: React.Dispatch<
		React.SetStateAction<number | null>
	>;
	avanza: boolean;
	setAvanza: React.Dispatch<React.SetStateAction<boolean>>;
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
	nombreIniciativa,
	nombreActividadPlan,
	descripcionIniciativa,
	unidadesEjecutadas,
	subUnidadesEjecutadas,
	estado,
	motivo,
	idMaterialIniciativa,
	finVigenciaIniciativa,
	archivoAdjunto,
	idActividadIniciativa,
	iniciativaIncompleta,
	setIniciativaIncompleta,
	idIniciativaIncompleta,
	setIdIniciativaIncompleta,
	avanza,
	setAvanza,
}) => {
	const {t} = useTranslation();
	const obtenerProductoPorCodigo = useObtenerProductoPorCodigo();
	const producto = obtenerProductoPorCodigo(idMaterialIniciativa);
	const visitaActual = useObtenerVisitaActual();
	const {motivosCancelacionIniciativas} = useObtenerConfiguracion();
	const clienteActual = useObtenerClienteActual();
	const {mostrarAdvertenciaEnDialogo} = useMostrarAdvertenciaEnDialogo();
	const unidades = unidadesEjecutadas;
	const subUnidades = subUnidadesEjecutadas;
	const id = idMaterialIniciativa.toString();

	const fechaVencimiento = formatearFecha(finVigenciaIniciativa, t).replace(
		/-/g,
		'/'
	);

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
		preciosBase: {
			unidad: producto.precioConImpuestoUnidad,
			subUnidad: producto.precioConImpuestoSubunidad,
		},
		preciosPromo: {
			unidad: 0,
			subUnidad: 0,
		},
		preciosNeto: {
			unidad: producto.precioConImpuestoUnidad,
			subUnidad: producto.precioConImpuestoSubunidad,
		},
	};

	const [estadoSelect, setEstadoSelect] = React.useState<string>(estado);
	const [motivoSelect, setMotivoSelect] = React.useState<string>(motivo);

	const [getValues, setGetValues] =
		React.useState<GetValuesProps>(defaultValues);

	const [mostrarArchivosAdjuntos, setMostrarArchivosAdjuntos] =
		React.useState(false);
	const classes = useEstilos({
		estado: estadoSelect,
		inputsBloqueados: visitaActual.pasoATomaPedido,
		editarInputs: visitaActual?.seQuedaAEditar?.bordeError,
	});

	const [alerta, setAlerta] = React.useState<boolean>(false);
	const [cacheId, setCacheId] = React.useState<string | boolean>(false);

	const dispatch = useAppDispatch();

	React.useEffect(() => {
		if (
			unidadesEjecutadas === 0 &&
			subUnidadesEjecutadas === 0 &&
			estado === 'ejecutada'
		) {
			setIniciativaIncompleta(true);
			setIdIniciativaIncompleta(idMaterialIniciativa);
			return;
		}

		setIniciativaIncompleta(false);
	}, [unidadesEjecutadas, subUnidadesEjecutadas, estado]);

	const manejadorExpandido = (id: string | boolean) => {
		if (iniciativaIncompleta) {
			setAlerta(true);
			setCacheId(id);
			return;
		}

		setExpandido(id);
	};

	const agregarProductoAlPedidoActual = useAgregarProductoAlPedidoActual(
		productoACargar,
		mostrarAdvertenciaEnDialogo,
		getValues,
		setGetValues
	);

	const [puedeAgregar, setPuedeAgregar] = React.useState<boolean>(false);

	const [focusId, setFocusId] = React.useState<number>(0);
	const [inputFocus, setInputFocus] =
		React.useState<InputsKeysFormTomaDePedido>('productoABuscar');

	const mostrarAviso = useMostrarAviso();

	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const {configuracionPedido}: any = datosCliente;

	const {envases, medidas} = useObtenerDatos();

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

	React.useEffect(() => {
		if (
			visitaActual.seQuedaAEditar.bordeError &&
			estado === 'cancelada' &&
			motivo === ''
		) {
			setExpandido(id);
			dispatch(cambiarSeQuedaAEditar({seQueda: false, bordeError: false}));
		}
	}, [visitaActual.seQuedaAEditar.bordeError, estado, motivo, id]);

	React.useEffect(() => {
		if (estadoSelect === 'cancelada' && motivoSelect !== '') {
			dispatch(
				cambiarMotivoCancelacionIniciativa({
					motivo: motivoSelect,
					codigoIniciativa: idActividadIniciativa,
				})
			);
		}
	}, [estadoSelect, motivoSelect]);

	React.useEffect(() => {
		if (!visitaActual.pasoATomaPedido) {
			switch (estadoSelect) {
				case 'pendiente':
					setEstadoSelect('pendiente');
					setMotivoSelect('');
					setGetValues({...getValues, unidades, subUnidades});
					dispatch(
						cambiarEstadoIniciativa({
							estado: 'pendiente',
							codigoIniciativa: idMaterialIniciativa,
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
								codigoIniciativa: idActividadIniciativa,
							})
						);
						setMotivoSelect(t(''));
					}
					break;
				case 'ejecutada':
					setEstadoSelect('ejecutada');
					agregarProductoAlPedidoActual(getValues);
					dispatch(
						cambiarEstadoIniciativa({
							estado: 'ejecutada',
							codigoIniciativa: idMaterialIniciativa,
						})
					);
					if (motivo !== '') {
						dispatch(
							cambiarMotivoCancelacionIniciativa({
								motivo: '',
								codigoIniciativa: idActividadIniciativa,
							})
						);
						setMotivoSelect(t(''));
					}
					break;
				case 'cancelada':
					setEstadoSelect('cancelada');
					setGetValues({...getValues, unidades, subUnidades});
					dispatch(
						cambiarEstadoIniciativa({
							estado: 'cancelada',
							codigoIniciativa: idMaterialIniciativa,
						})
					);
					dispatch(
						borrarProductoDelPedidoActual({
							codigoProducto: producto.codigoProducto,
						})
					);
					break;
				default:
					break;
			}
		}
	}, [estadoSelect]);

	React.useEffect(() => {
		if (
			visitaActual.seQuedaAEditar.bordeError &&
			idIniciativaIncompleta === idMaterialIniciativa
		) {
			if (getValues.unidades > 0 || getValues.subUnidades) {
				dispatch(cambiarSeQuedaAEditar({seQueda: false, bordeError: false}));
			}
		}

		if (avanza) {
			if (idIniciativaIncompleta === idMaterialIniciativa) {
				setEstadoSelect('pendiente');
				setMotivoSelect('');
				setGetValues({...getValues, unidades, subUnidades});
			}
			setAvanza(false);
		}
	}, [
		avanza,
		visitaActual?.seQuedaAEditar?.bordeError,
		getValues.unidades,
		getValues.subUnidades,
	]);

	return (
		<>
			<Modal
				alerta={alerta}
				setAlerta={setAlerta}
				contenidoMensaje={{
					titulo: t('modal.tarjetasVaciasTitulo'),
					mensaje: t('modal.tarjetasVaciasMensaje'),
					tituloBotonAceptar: t('general.avanzar'),
					callbackAceptar: () => {
						dispatch(
							cambiarEstadoIniciativa({
								estado: 'pendiente',
								codigoIniciativa: idIniciativaIncompleta ?? 0,
							})
						);

						setIniciativaIncompleta(false);
						setExpandido(cacheId);
						setAvanza(true);
					},
					tituloBotonCancelar: t('general.editarCantidades'),
					callbackCancelar: () =>
						dispatch(cambiarSeQuedaAEditar({seQueda: false, bordeError: true})),
					iconoMensaje: <AvisoIcon />,
				}}
			/>
			<Card
				className={classes.card}
				style={{boxShadow: 'none', overflow: 'visible'}}
				data-cy={'iniciativa-' + id}
			>
				<Box>
					<Box
						display='flex'
						flexDirection='column'
						alignItems='start'
						padding={expandido === id ? '12px 14px' : '12px 14px 0 14px'}
						borderRadius='4px 4px 0 0'
						gap='8px'
						sx={{
							background:
								expandido === id ? theme.palette.secondary.light : 'none',
							transition: 'background 0.3s ease-in-out',
						}}
					>
						{estadoSelect === 'cancelada' && motivo === '' && (
							<Box display='flex' justifyContent='flex-end' width='100%'>
								<Typography
									color='#fff'
									fontFamily='Open Sans'
									padding='2px 12px'
									sx={{
										background: theme.palette.primary.light,
										borderRadius: '50px',
									}}
									variant='caption'
								>
									{t('general.sinMotivo')}
								</Typography>
							</Box>
						)}
						{estadoSelect === 'ejecutada' && (
							<Box display='flex' justifyContent='end' width='100%'>
								<CheckRedondoIcon height='17.5px' width='17.5px' />
							</Box>
						)}
						{estadoSelect === 'cancelada' && motivo !== '' && (
							<Box display='flex' justifyContent='end' width='100%'>
								<CerrarRedondoIcon
									height='20px'
									width='20px'
									fill={
										expandido === id
											? theme.palette.primary.light
											: theme.palette.primary.main
									}
								/>
							</Box>
						)}
						<Typography
							variant='subtitle2'
							fontSize='12px'
							data-cy={`iniciativa-titulo-${id}`}
							color={expandido === id ? '#fff' : '#000'}
						>
							{nombreIniciativa}
						</Typography>
					</Box>
					<Collapse
						in={expandido === id}
						timeout='auto'
						unmountOnExit
						data-cy={'iniciativa-detalle-' + id}
					>
						<Divider />

						<Box
							display='flex'
							flexDirection='column'
							gap='12px'
							marginBottom='8px'
							padding='0 14px'
						>
							<Box
								display='flex'
								alignItems='center'
								marginTop='8px'
								data-cy={`iniciativa-estatus-${id}`}
							>
								<Typography
									variant='body3'
									fontFamily='Open Sans'
									flex='1'
									sx={{opacity: 0.5}}
								>
									{t('general.estatus')}
								</Typography>
								<Box flex='3' data-cy={`iniciativa-estatus-value-${id}`}>
									<CustomSelect
										opciones={[
											t('general.pendiente'),
											t('general.cancelada'),
											t('general.ejecutada'),
										]}
										opcionSeleccionada={estadoSelect}
										setOpcion={setEstadoSelect}
										bloqueado={visitaActual.pasoATomaPedido}
										dataCy={`iniciativa-estatus-value-${id}`}
									/>
								</Box>
							</Box>
							{estadoSelect === 'cancelada' && (
								<Box display='flex' alignItems='center'>
									<Typography
										variant='body3'
										fontFamily='Open Sans'
										flex='1'
										sx={{opacity: 0.5}}
									>
										{t('general.motivo')}
									</Typography>
									<Box flex='3'>
										<CustomSelect
											opciones={[
												...motivosCancelacionIniciativas.map(
													(motivos) => motivos.descripcion
												),
											]}
											opcionSeleccionada={motivoSelect}
											setOpcion={setMotivoSelect}
											bloqueado={visitaActual.pasoATomaPedido}
											border
											dataCy={`iniciativa-motivo-value-${id}`}
											placeholder={t('general.motivoCancelacion')}
										/>
									</Box>
								</Box>
							)}
							<Box
								display='flex'
								gap='8px'
								alignItems='center'
								data-cy={`iniciativa-planDeActividades-${id}`}
							>
								<Typography
									variant='body3'
									fontFamily='Open Sans'
									flex='1'
									sx={{opacity: 0.5}}
								>
									{t('general.planDeActividades')}
								</Typography>
								<Typography variant='subtitle3' fontFamily='Open Sans' flex='3'>
									{nombreActividadPlan}
								</Typography>
							</Box>
							<Box
								display='flex'
								gap='8px'
								alignItems='center'
								data-cy={`iniciativa-descripcion-${id}`}
							>
								<Typography
									variant='body3'
									fontFamily='Open Sans'
									flex='1'
									sx={{opacity: 0.5}}
								>
									{t('general.descripcion')}
								</Typography>
								<Typography variant='subtitle3' fontFamily='Open Sans' flex='3'>
									{descripcionIniciativa}
								</Typography>
							</Box>
							<Box
								display='flex'
								gap='8px'
								alignItems='center'
								data-cy={`iniciativa-vigencia-${id}`}
							>
								<Typography
									variant='body3'
									fontFamily='Open Sans'
									flex='1'
									sx={{opacity: 0.5}}
								>
									{t('general.vigencia')}
								</Typography>
								<Typography variant='subtitle3' fontFamily='Open Sans' flex='3'>
									{fechaVencimiento}
								</Typography>
							</Box>
							{archivoAdjunto && (
								<>
									<ModalCore open={mostrarArchivosAdjuntos}>
										<VisualizadorPdfs
											titulo={archivoAdjunto}
											archivo={archivoAdjunto}
											setOpen={setMostrarArchivosAdjuntos}
										/>
									</ModalCore>
									<Box
										display='flex'
										gap='8px'
										alignItems='center'
										data-cy={`iniciativa-vigencia-${id}`}
									>
										<Typography
											variant='body3'
											fontFamily='Open Sans'
											flex='1'
											sx={{opacity: 0.5}}
										>
											{t('general.archivosAdjuntos')}
										</Typography>
										<Box alignItems='center' display='flex' flex='3' gap='10px'>
											<Clip height='12px' width='12px' />
											<Link
												variant='subtitle3'
												color='#000'
												sx={{textDecoration: 'none'}}
												fontFamily='Open Sans'
												component='button'
												onClick={() => {
													setMostrarArchivosAdjuntos(true);
												}}
											>
												{archivoAdjunto}
											</Link>
										</Box>
									</Box>
								</>
							)}
						</Box>
						<Divider />

						<Box
							sx={{
								outline:
									visitaActual.seQuedaAEditar.bordeError &&
									idIniciativaIncompleta === idMaterialIniciativa
										? `1px solid ${theme.palette.primary.main}`
										: 'none',
							}}
						>
							<Box
								display='flex'
								alignItems='center'
								justifyContent='space-between'
							>
								<Box
									display='flex'
									flexDirection='column'
									padding='12px 8px 12px 12px'
								>
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
										marginBottom={producto.atributos ? 0 : '6px'}
									>
										{producto.nombreProducto}
									</Typography>

									{producto.atributos && (
										<Typography
											margin='4px 0 6px 0'
											variant='caption'
											color={theme.palette.secondary.main}
										>
											{`${
												medidas[producto.atributos?.medida ?? 0].descripcion
											} | ${
												envases[producto.atributos?.envase ?? 0].descripcion
											}`}
										</Typography>
									)}

									<Box display='flex' alignItems='center' gap='4px'>
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
									padding='22px 12px 16px 8px'
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
										{estadoSelect === 'ejecutada' &&
											!visitaActual.pasoATomaPedido && (
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
												estadoSelect !== 'ejecutada' ||
												visitaActual.pasoATomaPedido
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
										{estadoSelect === 'ejecutada' &&
											!visitaActual.pasoATomaPedido && (
												<IconButton
													size='small'
													name='unidades'
													value='+'
													sx={{padding: 0}}
													onClick={handleButtons}
													disabled={
														producto.unidadesDisponibles
															? getValues.unidades >=
															  producto.unidadesDisponibles
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
																? getValues.unidades >=
																  producto.unidadesDisponibles
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
											{estadoSelect === 'ejecutada' &&
												!visitaActual.pasoATomaPedido && (
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
													estadoSelect !== 'ejecutada' ||
													visitaActual.pasoATomaPedido
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
											{estadoSelect === 'ejecutada' &&
												!visitaActual.pasoATomaPedido && (
													<IconButton
														size='small'
														name='subUnidades'
														value='+'
														sx={{padding: 0}}
														onClick={handleButtons}
														disabled={
															getValues.subUnidades >=
															producto.presentacion -
																producto.subunidadesVentaMinima
														}
													>
														<AgregarRedondoIcon
															width='18px'
															height='18px'
															disabled={
																getValues.subUnidades >=
																producto.presentacion -
																	producto.subunidadesVentaMinima
															}
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
					<Box padding={expandido === id ? '12px 14px' : '8px 14px 12px 14px'}>
						<ButtonStyled
							disableFocusRipple
							fullWidth
							disableRipple
							onClick={() => manejadorExpandido(expandido === id ? false : id)}
							data-cy={'ver-detalle-iniciativa-' + id}
						>
							<CardActions disableSpacing style={{padding: 0}}>
								<Box display='flex' gap='6px' alignItems='center'>
									<Typography variant='caption' color='secondary'>
										{expandido === id
											? t('general.ocultarDetalle')
											: t('general.verDetalle')}
									</Typography>
									<Box
										className={clsx(classes.expand, {
											[classes.expandOpen]: expandido === id,
										})}
										aria-expanded={expandido === id}
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
		</>
	);
};

export default TarjetaIniciativas;
