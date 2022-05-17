import React from 'react';
import {
	Box,
	Card,
	Collapse,
	Divider,
	Link,
	Typography,
	capitalize,
} from '@mui/material';
import {BotonSmall, VisualizadorPdfs} from 'components/UI';
import {
	AvisoIcon,
	BotellaIcon,
	CajaIcon,
	CerrarRedondoIcon,
	CheckRedondoIcon,
	Clip,
	FlechaAbajoIcon,
} from 'assests/iconos';
import {useTranslation} from 'react-i18next';
import useEstilos from './useEstilos';
import {useObtenerProductoPorCodigo} from 'hooks/useObtenerProductoPorCodigo';
import {
	useAppDispatch,
	useObtenerConfiguracion,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {
	borrarProductoDelPedidoActual,
	cambiarEstadoIniciativa,
	cambiarMotivoCancelacionIniciativa,
	cambiarSeQuedaAEditar,
	limpiarValoresIniciativas,
} from 'redux/features/visitaActual/visitaActualSlice';
import {TIniciativasCliente, EUnidadMedida, TPrecioProducto} from 'models';
import theme from 'theme';
import {formatearFecha} from 'utils/methods';
import {Modal, ModalCore, MaterialSelect} from 'components/UI';
import {useContador} from 'hooks';
import {Producto} from './components';

interface Props {
	avanza: boolean;
	expandido: boolean | string;
	idIniciativaIncompleta: number | null;
	iniciativa: TIniciativasCliente;
	iniciativaIncompleta: boolean;
	setAvanza: React.Dispatch<React.SetStateAction<boolean>>;
	setExpandido: React.Dispatch<React.SetStateAction<string | boolean>>;
	setIdIniciativaIncompleta: React.Dispatch<
		React.SetStateAction<number | null>
	>;
	setIniciativaIncompleta: React.Dispatch<React.SetStateAction<boolean>>;
}

const TarjetaIniciativas: React.VFC<Props> = ({
	avanza,
	expandido,
	idIniciativaIncompleta,
	iniciativa: {
		archivoAdjunto,
		cantidad,
		cantidadesProductos,
		descripcionIniciativa,
		estado,
		finVigenciaIniciativa,
		idActividadIniciativa,
		materialesIniciativa,
		motivo,
		nombreActividadPlan,
		nombreIniciativa,
		unidadMedida,
	},
	iniciativaIncompleta,
	setAvanza,
	setExpandido,
	setIdIniciativaIncompleta,
	setIniciativaIncompleta,
}) => {
	const {t} = useTranslation();
	const obtenerProductoPorCodigo = useObtenerProductoPorCodigo();
	const visitaActual = useObtenerVisitaActual();
	const {motivosCancelacionIniciativas, habilitaCancelarIniciativa} =
		useObtenerConfiguracion();
	const id = idActividadIniciativa.toString();

	const {contador, ...restoContador} = useContador(cantidad);

	const productosIniciativa = React.useMemo(() => {
		const productos: TPrecioProducto[] = [];

		materialesIniciativa.map((codigo) => {
			const productoExistente = obtenerProductoPorCodigo(codigo);

			if (productoExistente) {
				productos.push(productoExistente);
			}
		});

		return productos;
	}, []);

	const fechaVencimiento = formatearFecha(finVigenciaIniciativa, t).replace(
		/-/g,
		'/'
	);

	const [estadoSelect, setEstadoSelect] = React.useState<string>(estado);
	const [motivoSelect, setMotivoSelect] = React.useState<string>(motivo);

	const [mostrarArchivosAdjuntos, setMostrarArchivosAdjuntos] =
		React.useState(false);

	const cantidadesEjecutadasIniciativa = React.useMemo(() => {
		return Object.values(cantidadesProductos).reduce((total, actual) => {
			return total + actual.unidades + actual.subUnidades;
		}, 0);
	}, [cantidadesProductos]);

	const classes = useEstilos({
		editarInputs:
			visitaActual?.seQuedaAEditar?.bordeError ||
			cantidadesEjecutadasIniciativa === 0,
		estado,
		iniciativaAbierta: expandido === id,
		inputsBloqueados: visitaActual.pasoATomaPedido,
	});

	const [alerta, setAlerta] = React.useState<boolean>(false);
	const [cacheId, setCacheId] = React.useState<string | boolean>(false);

	const dispatch = useAppDispatch();

	React.useEffect(() => {
		if (cantidadesEjecutadasIniciativa === 0 && estado === 'ejecutada') {
			setIniciativaIncompleta(true);
			setIdIniciativaIncompleta(idActividadIniciativa);
			return;
		}

		setIniciativaIncompleta(false);
	}, [cantidadesProductos, estado]);

	const manejadorExpandido = (id: string | boolean) => {
		if (iniciativaIncompleta) {
			setAlerta(true);
			setCacheId(id);
			return;
		}

		setExpandido(id);
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
					dispatch(
						cambiarEstadoIniciativa({
							estado: 'pendiente',
							codigoIniciativa: idActividadIniciativa,
						})
					);
					Object.keys(cantidadesProductos).map((codigo) => {
						dispatch(
							borrarProductoDelPedidoActual({
								codigoProducto: +codigo,
							})
						);
					});
					dispatch(
						limpiarValoresIniciativas({idIniciativa: idActividadIniciativa})
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
					dispatch(
						cambiarEstadoIniciativa({
							estado: 'ejecutada',
							codigoIniciativa: idActividadIniciativa,
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
					dispatch(
						cambiarEstadoIniciativa({
							estado: 'cancelada',
							codigoIniciativa: idActividadIniciativa,
						})
					);
					Object.keys(cantidadesProductos).map((codigo) => {
						dispatch(
							borrarProductoDelPedidoActual({
								codigoProducto: +codigo,
							})
						);
					});
					dispatch(
						limpiarValoresIniciativas({idIniciativa: idActividadIniciativa})
					);
					break;
			}
		}
	}, [estadoSelect]);

	React.useEffect(() => {
		if (
			visitaActual.seQuedaAEditar.bordeError &&
			idIniciativaIncompleta === idActividadIniciativa
		) {
			if (cantidadesEjecutadasIniciativa > 0) {
				dispatch(cambiarSeQuedaAEditar({seQueda: false, bordeError: false}));
			}
		}
		if (avanza) {
			if (idIniciativaIncompleta === idActividadIniciativa) {
				setEstadoSelect('pendiente');
				setMotivoSelect('');
				dispatch(
					limpiarValoresIniciativas({idIniciativa: idActividadIniciativa})
				);
				dispatch(cambiarSeQuedaAEditar({seQueda: false, bordeError: false}));
			}
			setAvanza(false);
		}
	}, [avanza, visitaActual?.seQuedaAEditar?.bordeError, cantidadesProductos]);

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
						padding={expandido === id ? '12px 14px' : '12px 14px 0 14px'}
						borderRadius='4px 4px 0 0'
						gap='8px'
						sx={{
							background:
								expandido === id ? theme.palette.secondary.light : 'none',
							transition: 'background 0.3s ease-in-out',
						}}
					>
						{((estadoSelect === 'cancelada' && motivo === '') ||
							estadoSelect === 'pendiente') &&
							expandido === id && (
								<Box display='flex' justifyContent='flex-end' width='100%'>
									<Typography
										color={
											estadoSelect === 'pendiente'
												? theme.palette.secondary.main
												: '#fff'
										}
										fontFamily='Open Sans'
										padding='2px 12px'
										sx={{
											background:
												estadoSelect === 'pendiente'
													? theme.palette.warning.main
													: theme.palette.primary.main,
											borderRadius: '50px',
										}}
										variant='caption'
									>
										{estadoSelect === 'pendiente'
											? t('general.pendiente')
											: t('general.sinMotivo')}
									</Typography>
								</Box>
							)}
						{estadoSelect === 'ejecutada' &&
							cantidadesEjecutadasIniciativa > 0 && (
								<Box display='flex' justifyContent='flex-end' width='100%'>
									<CheckRedondoIcon height={20} width={20} />
								</Box>
							)}
						{estadoSelect === 'cancelada' && motivo !== '' && (
							<Box display='flex' justifyContent='flex-end' width='100%'>
								<CerrarRedondoIcon height={20} width={20} />
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
						<Box display='flex' flexDirection='column' padding='10px 14px'>
							<Box alignItems='flex-end' display='flex' flexDirection='column'>
								<Typography
									fontFamily='Open Sans'
									marginBottom='4px'
									variant='subtitle3'
								>
									{`${t('general.aplicacionPendiente')}:`}
								</Typography>
								<Box
									alignItems='center'
									display='flex'
									gap='2px'
									marginBottom='10px'
								>
									{unidadMedida === EUnidadMedida.Unidad ? (
										<CajaIcon height={18} width={18} />
									) : (
										<BotellaIcon height={18} width={18} />
									)}
									<Typography
										color='secondary'
										fontFamily='Open Sans'
										variant='subtitle3'
									>
										{contador}
									</Typography>
								</Box>
							</Box>
							<Divider />
						</Box>
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
								data-cy={`iniciativa-estatus-${id}`}
							>
								<Typography variant='body3' fontFamily='Open Sans' flex='1'>
									{t('general.estatus')}
								</Typography>
								<Box flex='3' data-cy={`iniciativa-estatus-value-${id}`}>
									<MaterialSelect
										state={capitalize(estadoSelect)}
										setState={setEstadoSelect}
										opciones={
											habilitaCancelarIniciativa
												? [
														t('general.pendiente'),
														t('general.ejecutada'),
														t('general.cancelada'),
												  ]
												: [t('general.pendiente'), t('general.ejecutada')]
										}
										disabled={visitaActual.pasoATomaPedido}
										borderColor={estadoSelect === 'pendiente'}
									/>
								</Box>
							</Box>
							{estadoSelect === 'cancelada' && (
								<Box display='flex' alignItems='center'>
									<Typography variant='body3' fontFamily='Open Sans' flex='1'>
										{t('general.motivo')}
									</Typography>
									<Box flex='3'>
										<MaterialSelect
											state={capitalize(motivoSelect)}
											setState={setMotivoSelect}
											opciones={[
												...motivosCancelacionIniciativas.map(
													(motivos) => motivos.descripcion
												),
											]}
											borderColor={motivoSelect === ''}
											placeholder={t('general.motivoCancelacion')}
											greyTextPlaceholder
											disabled={visitaActual.pasoATomaPedido}
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
								<Typography variant='body3' fontFamily='Open Sans' flex='1'>
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
								<Typography variant='body3' fontFamily='Open Sans' flex='1'>
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
								<Typography variant='body3' fontFamily='Open Sans' flex='1'>
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
										<Typography variant='body3' fontFamily='Open Sans' flex='1'>
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
						{productosIniciativa?.map((producto, index) => (
							<Box key={producto.codigoProducto}>
								<Producto
									cantidadesProductos={cantidadesProductos}
									estado={estadoSelect}
									idIniciativa={idActividadIniciativa}
									producto={producto}
									restoContador={restoContador}
									unidadMedida={unidadMedida}
								/>
								{productosIniciativa.length !== index - 1 && <Divider />}
							</Box>
						))}
					</Collapse>
					<Box padding={expandido === id ? '12px 14px' : '8px 14px 12px 14px'}>
						<BotonSmall
							data-cy={'ver-detalle-iniciativa-' + id}
							fullWidth
							onClick={() => manejadorExpandido(expandido === id ? false : id)}
						>
							<Typography
								color='secondary'
								fontFamily='Open Sans'
								variant='caption'
							>
								{expandido === id
									? t('general.ocultarDetalle')
									: t('general.verDetalle')}
							</Typography>
							<FlechaAbajoIcon
								height={10}
								style={{
									transition: 'transform 0.3s ease-in-out',
									transform:
										expandido === id ? 'rotateX(180deg)' : 'rotate(0deg)',
								}}
								width={10}
							/>
						</BotonSmall>
					</Box>
				</Box>
			</Card>
		</>
	);
};

export default TarjetaIniciativas;
