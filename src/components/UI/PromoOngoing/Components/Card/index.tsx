import React from 'react';
import {CheckRedondoIcon, FlechaAbajoIcon} from 'assests/iconos';
import theme from 'theme';
import {useTranslation} from 'react-i18next';
import {
	EFormaBeneficio,
	EFormaDeAsignacion,
	ETiposDePago,
	TCodigoCantidad,
	TPromoOngoing,
} from 'models';
import {useAppDispatch, useObtenerVisitaActual} from 'redux/hooks';
import {agregarBeneficiosPromoOngoing} from 'redux/features/visitaActual/visitaActualSlice';

import {
	TProductosUsadosEnOtrasPromos,
	TPromoOngoingAplicables,
	PromocionesOngoing,
	TPromoOngoingDisponibilidad,
} from 'utils/procesos/promociones/PromocionesOngoing';
import {TarjetaPromociones} from './TarjetaPromociones';
import {createStyles, makeStyles, styled} from '@material-ui/styles';
import {
	Box,
	Button,
	Card as CardMUI,
	CardActions,
	Collapse,
	Divider,
	Stack,
	Theme,
	Typography,
} from '@mui/material';
import clsx from 'clsx';
import CustomSelect from 'components/UI/CustomSelect';
import {useMostrarAviso} from 'hooks';

const useEstilos = makeStyles((theme: Theme) =>
	createStyles({
		expand: {
			transform: 'rotate(0deg)',
			padding: 0,
		},
		expandOpen: {
			transform: 'rotate(180deg)',
		},
		inactiva: {
			opacity: 0.6,
		},
		cardContent: {
			'&.MuiCardContent-root': {
				padding: 0,

				'&.MuiCardContent-root:last-child': {
					padding: 0,
				},
			},
		},
	})
);

export interface CardProps {
	promocionesOngoing: PromocionesOngoing;
	promocionAutomatica?: boolean;
	tipo?: 'contado' | 'credito';
	soloLectura?: boolean;
	setExpandidoexpandido: React.Dispatch<React.SetStateAction<string | boolean>>;
	expandido: string | boolean;
	promocion: TPromoOngoing & TPromoOngoingAplicables;
	promosSimilares?: TProductosUsadosEnOtrasPromos;
	borroPromociones?: {
		credito: boolean;
		contado: boolean;
	};
	index: number;
	promosDisponibles?: TPromoOngoingDisponibilidad;
	setpromosDisponibles?: React.Dispatch<
		React.SetStateAction<TPromoOngoingDisponibilidad>
	>;
	setBorroPromociones?: React.Dispatch<
		React.SetStateAction<{
			credito: boolean;
			contado: boolean;
		}>
	>;
}

export const Card: React.VFC<CardProps> = ({
	promocionAutomatica = false,
	soloLectura = false,
	promocion,
	borroPromociones,
	tipo,
	setBorroPromociones,

	promocionesOngoing,
	setpromosDisponibles,
	promosDisponibles,
	setExpandidoexpandido,
	expandido,
	index,
}) => {
	const [mostrarCheck, setMostrarCheck] = React.useState<boolean>(false);
	const [bordeColor, setBordeColor] = React.useState<string>('#D9D9D9');
	const [focusId, setFocusId] = React.useState<string>('');
	const [beneficiosParaAgregar, setBeneficiosParaAgregar] =
		React.useState<TPromoOngoingAplicables>();
	const [gruposSelect, setGruposSelect] = React.useState<string>('');
	const [grupoYSecuenciaActual, setGrupoYSecuenciaActual] = React.useState<{
		grupo: number;
		secuencia: number;
	}>({grupo: 0, secuencia: 0});
	const [promocionEditada, setPromocionEditada] =
		React.useState<TPromoOngoingAplicables>();
	const [secuenciaSelect, setSecuenciaSelect] = React.useState<string>('');
	const [promocionSinDisponible, setPromocionSinDisponible] =
		React.useState<boolean>(true);

	const [valorBeneficio, setValorBeneficio] = React.useState<string>('');
	const {t} = useTranslation();
	const {descripcion, promocionID} = promocion;
	const dispatch = useAppDispatch();
	const visitaActual = useObtenerVisitaActual();
	const expandID = `${promocion.promocionID}-${tipo}`;

	const [promocionAplicada, setPromocionAplicada] =
		React.useState<boolean>(false);

	const [disponibleSecuencia, setDisponibleSecuencia] =
		React.useState<number>(0);

	const classes = useEstilos();

	const mostrarAviso = useMostrarAviso();

	const tipoPago =
		tipo === 'contado' ? ETiposDePago.Contado : ETiposDePago.Credito;

	React.useEffect(() => {
		if (beneficiosParaAgregar) {
			const materiales = beneficiosParaAgregar.beneficios[
				grupoYSecuenciaActual.grupo
			].secuencias[grupoYSecuenciaActual.secuencia]
				.materialesBeneficio as TCodigoCantidad[];
			const totalProductos = materiales.reduce(
				(a: number, v: TCodigoCantidad) => a + v.cantidad,
				0
			);

			setDisponibleSecuencia(
				beneficiosParaAgregar.beneficios[grupoYSecuenciaActual.grupo]
					.secuencias[grupoYSecuenciaActual.secuencia].tope - totalProductos
			);
		}
	}, [beneficiosParaAgregar, grupoYSecuenciaActual]);

	React.useEffect(() => {
		if (!promocionAutomatica && !soloLectura && setpromosDisponibles) {
			if (promocion.aplicada) {
				setPromocionAplicada(true);
				setMostrarCheck(true);
				setBordeColor(theme.palette.success.main);
				setpromosDisponibles((prevState) => ({
					...prevState,
					[Number(promocionID)]: {
						disponibles: prevState[Number(promocionID)].disponibles,
						aplicadas: prevState[Number(promocionID)].aplicadas + 1,
					},
				}));
			} else {
				setPromocionAplicada(false);
			}
		}
	}, []);

	React.useEffect(() => {
		if (promocion) {
			setPromocionEditada({...promocion});
			setGruposSelect(promocion.beneficios[0].descripcion);
			setGrupoYSecuenciaActual({grupo: 0, secuencia: 0});
			setSecuenciaSelect(
				promocion.beneficios[0].secuencias[0].secuencia.toString()
			);
		}

		return () => setExpandidoexpandido(false);
	}, []);

	React.useEffect(() => {
		if (promocion && gruposSelect !== '') {
			const indexGrupo = promocion.beneficios.findIndex(
				(grupo) =>
					grupo.descripcion.toLowerCase() === gruposSelect.toLowerCase()
			);
			setGrupoYSecuenciaActual({grupo: indexGrupo, secuencia: 0});
			setSecuenciaSelect(
				promocion.beneficios[indexGrupo].secuencias[0].secuencia.toString()
			);
			setBeneficiosParaAgregar(JSON.parse(JSON.stringify(promocion)));
		}
	}, [gruposSelect]);

	React.useEffect(() => {
		if (promocion && secuenciaSelect !== '') {
			const indexSecuencia = promocion.beneficios[
				grupoYSecuenciaActual.grupo
			].secuencias.findIndex(
				(secuncia) => secuncia.secuencia === Number(secuenciaSelect)
			);

			setGrupoYSecuenciaActual((prevState) => ({
				...prevState,
				secuencia: indexSecuencia,
			}));
		}
	}, [secuenciaSelect]);

	React.useEffect(() => {
		if (beneficiosParaAgregar) {
			const secuenciaActual =
				beneficiosParaAgregar.beneficios[grupoYSecuenciaActual.grupo]
					.secuencias[grupoYSecuenciaActual.secuencia];

			secuenciaActual.formaBeneficio === EFormaBeneficio.DescuentoPorcentaje
				? setValorBeneficio(`Beneficio: ${secuenciaActual.valorBeneficio}%`)
				: secuenciaActual.formaBeneficio === EFormaBeneficio.DescuentoMonto
				? setValorBeneficio(`Beneficio: $-${secuenciaActual.valorBeneficio}`)
				: secuenciaActual.formaBeneficio === EFormaBeneficio.Precio
				? setValorBeneficio(
						`Precio recuperación: $${secuenciaActual.valorBeneficio}`
				  )
				: setValorBeneficio('Beneficio: Obsequio');
		}
	}, [grupoYSecuenciaActual]);

	React.useEffect(() => {
		if (!promocionAutomatica) {
			if (!promocionAplicada && promosDisponibles) {
				if (
					promosDisponibles[Number(promocionID)].disponibles -
						promosDisponibles[Number(promocionID)].aplicadas <=
					0
				) {
					setPromocionSinDisponible(true);
				} else {
					setPromocionSinDisponible(false);
				}
			}
		}
	}, [promosDisponibles, borroPromociones, visitaActual.promosOngoing]);

	const onClick = () => {
		if (!promocionAplicada && beneficiosParaAgregar) {
			if (beneficiosParaAgregar.asignacion === EFormaDeAsignacion.Total) {
				let apliacionTotalIncomplenta = false;

				beneficiosParaAgregar.beneficios[
					grupoYSecuenciaActual.grupo
				].secuencias.forEach((secuencia: any) => {
					let tope = secuencia.tope;

					let totalCantidadMateriales = secuencia.materialesBeneficio.reduce(
						(a: number, v: TCodigoCantidad) => a + v.cantidad,
						0
					);

					if (totalCantidadMateriales < tope) {
						apliacionTotalIncomplenta = true;
					}
				});

				if (apliacionTotalIncomplenta) {
					setBordeColor(theme.palette.error.main);
					return mostrarAviso(
						'error',
						'Aplicación máxima incompleta',
						'Se debe asignar la aplicación total del beneficio'
					);
				}
			}
			setMostrarCheck(true);
			setBordeColor(theme.palette.success.main);
			setPromocionAplicada(true);
			promocionesOngoing.aplicarPromo(tipoPago, index, {
				...beneficiosParaAgregar,
				aplicada: true,
			});

			if (promocion && beneficiosParaAgregar && setpromosDisponibles) {
				setpromosDisponibles((prevState) => ({
					...prevState,
					[Number(promocionID)]: {
						disponibles: prevState[Number(promocionID)].disponibles,
						aplicadas: prevState[Number(promocionID)].aplicadas + 1,
					},
				}));

				dispatch(
					agregarBeneficiosPromoOngoing({
						beneficios: [
							...visitaActual.promosOngoing,
							{
								...beneficiosParaAgregar,
								tipoPago,
								beneficios: [
									beneficiosParaAgregar.beneficios[grupoYSecuenciaActual.grupo],
								],
							},
						],
					})
				);
				setExpandidoexpandido(false);
			}
		}
	};

	React.useEffect(() => {
		if (
			!promocionAutomatica &&
			borroPromociones &&
			tipo &&
			borroPromociones[tipo] &&
			setBorroPromociones
		) {
			setMostrarCheck(false);
			setBordeColor('#D9D9D9');
			setBorroPromociones({...borroPromociones, [tipo]: false});
			setPromocionAplicada(false);
			const indexGrupo = promocion.beneficios.findIndex(
				(grupo) =>
					grupo.descripcion.toLowerCase() === gruposSelect.toLowerCase()
			);
			setGrupoYSecuenciaActual({grupo: indexGrupo, secuencia: 0});
			setSecuenciaSelect(
				promocion.beneficios[indexGrupo].secuencias[0].secuencia.toString()
			);

			setBeneficiosParaAgregar(JSON.parse(JSON.stringify(promocion)));
			setExpandidoexpandido(false);
		}
	}, [borroPromociones]);

	React.useEffect(() => {
		if (promocionAutomatica) {
			setMostrarCheck(true);
			setBordeColor(theme.palette.success.main);
			if (
				promocion &&
				!visitaActual.promosOngoing.some(
					(promo) => promo.promocionID === promocionID
				)
			) {
				dispatch(
					agregarBeneficiosPromoOngoing({
						beneficios: [
							...visitaActual.promosOngoing,
							{
								...promocion,
								tipoPago,
								beneficios: [promocion.beneficios[grupoYSecuenciaActual.grupo]],
							},
						],
					})
				);
			}
		}
	}, [promocionAutomatica, borroPromociones]);

	const manejadorExpandido = (id: string | boolean) => {
		setExpandidoexpandido(id);
	};

	return (
		<CardMUI
			style={{
				boxShadow: 'none',
				overflow: 'visible',
			}}
		>
			<Box border={`1px solid ${bordeColor}`} borderRadius='8px'>
				<Box
					align-items='center'
					color={expandido === expandID ? '#fff' : '#000'}
					borderRadius='4px 4px 0 0 '
					display='flex'
					flexDirection='column'
					justifyContent='space-between'
					padding={
						expandido === expandID
							? '12px 14px 12px 14px'
							: '12px 14px 8px 14px'
					}
					sx={{
						background:
							expandido === expandID ? theme.palette.secondary.light : 'none',
						borderBottom: 'none',
						transition: 'all 0.3s ease-in-out',
					}}
				>
					<Box display='flex' justifyContent='space-between'>
						<Box display='flex' flexDirection='column'>
							<Typography
								variant='subtitle3'
								fontFamily='Open Sans'
								data-cy={`promoOnGoing-ID-${promocion.promocionID}-${tipo}`}
							>
								{promocion.promocionID}
							</Typography>
							<Typography variant='subtitle3'>
								{promocion.descripcion}
							</Typography>
						</Box>
						{mostrarCheck && (
							<CheckRedondoIcon
								height='20px'
								width='20px'
								data-cy={`promoOnGoing-Check-${promocion.promocionID}-${tipo}`}
							/>
						)}
					</Box>
					{promocionAutomatica && (
						<Box
							borderRadius='50px'
							display='flex'
							marginTop='8px'
							padding='2px 12px'
							sx={{background: theme.palette.primary.main}}
							width='fit-content'
						>
							<Typography variant='caption' color='#fff' fontFamily='Open Sans'>
								{t('general.promocionAutomatica')}
							</Typography>
						</Box>
					)}
				</Box>

				<Collapse in={expandido === expandID} timeout='auto' unmountOnExit>
					<Box
						borderBottom='none'
						borderTop='none'
						padding='10px 14px 0px 14px'
					>
						<Box display='flex'>
							<Box marginBottom='8px'>
								<Typography variant='subtitle3' fontFamily='Open Sans'>
									Grupos
								</Typography>
								<Box width='181px' height='24px' mt='8px'>
									<CustomSelect
										bloqueado={promocionAplicada}
										opcionSeleccionada={gruposSelect}
										opciones={[
											...promocion?.beneficios?.map(
												(beneficio) => beneficio.descripcion
											),
										]}
										setOpcion={setGruposSelect}
										dataCy='select-grupos-promociones'
									/>
								</Box>
							</Box>
							<Box marginBottom='8px' padding='0 14px'>
								<Typography variant='subtitle3' fontFamily='Open Sans'>
									Secuencia
								</Typography>
								<Box width='81px' height='24px' mt='8px' mb='8px'>
									<CustomSelect
										opcionSeleccionada={secuenciaSelect}
										opciones={[
											...promocion?.beneficios[
												grupoYSecuenciaActual.grupo
											].secuencias?.map((secuencia) =>
												secuencia?.secuencia?.toString()
											),
										]}
										setOpcion={setSecuenciaSelect}
										dataCy='select-secuencia-promociones'
									/>
								</Box>
								<Typography
									variant='caption'
									fontFamily='Open Sans'
									color='red'
								>
									Disponible:
									{disponibleSecuencia}
								</Typography>
							</Box>
						</Box>

						<Stack spacing={'14px'}>
							<Box>
								<Typography
									fontSize={'14px'}
									color={'red'}
									variant='subtitle2'
									fontFamily='Open Sans'
								>
									{valorBeneficio}
								</Typography>
							</Box>
							<Box>
								<Button
									onClick={onClick}
									disabled={
										promocionAplicada ||
										promocionAutomatica ||
										promocionSinDisponible
									}
									sx={{
										border:
											promocionAplicada ||
											promocionAutomatica ||
											promocionSinDisponible
												? 'none'
												: `1px solid #651C32`,
										borderRadius: '50px',
										display: 'flex',
										gap: '4px',
										padding: '4px 12px',
										width: '276px',
										height: '33px',
										backgroundColor:
											promocionAplicada ||
											promocionAutomatica ||
											promocionSinDisponible
												? '#D9D9D9'
												: '#fff',
										textTransform: 'none',
										'&:hover': {
											background: 'none',
										},
									}}
									data-cy={`boton-aplicarPromocion`}
								>
									<Typography
										color={
											promocionAplicada ||
											promocionAutomatica ||
											promocionSinDisponible
												? ''
												: '#8A4C5F'
										}
										fontSize={'12px'}
										variant='subtitle3'
										fontFamily='Poppins'
										sx={{padding: '4px 12px'}}
									>
										Aplicar Beneficio
									</Typography>
								</Button>
							</Box>
							<Box>
								<Typography variant='subtitle3'>
									Detalles del beneficio
								</Typography>
							</Box>
						</Stack>
					</Box>
					<Divider sx={{marginTop: '10px'}} variant='fullWidth' />
					{!soloLectura &&
						promocion.beneficios[grupoYSecuenciaActual.grupo].secuencias[
							grupoYSecuenciaActual.secuencia
						].materialesBeneficio.map((producto) => {
							const {cantidad, codigo} = producto as TCodigoCantidad;

							return (
								<TarjetaPromociones
									key={Number(codigo)}
									promocionAplicada={promocionAplicada}
									promocionAutomatica={promocionAutomatica}
									stateBeneficiosParaAgregar={{
										beneficiosParaAgregar,
										setBeneficiosParaAgregar,
									}}
									promocionSinDisponible={promocionSinDisponible}
									grupoYSecuenciaActual={grupoYSecuenciaActual}
									producto={{
										codigoProducto: Number(codigo),
										tope: promocion.beneficios[grupoYSecuenciaActual.grupo]
											.secuencias[grupoYSecuenciaActual.secuencia].tope,
										tipoPago,
										cantidad:
											promocion.beneficios[grupoYSecuenciaActual.grupo]
												.secuencias[grupoYSecuenciaActual.secuencia].cantidad,
										unidadMedida:
											promocion.beneficios[grupoYSecuenciaActual.grupo]
												.secuencias[grupoYSecuenciaActual.secuencia]
												.unidadMedida,
									}}
									statefocusId={{focusId, setFocusId}}
								/>
							);
						})}
					<Divider sx={{marginBottom: '10px'}} variant='fullWidth' />
				</Collapse>

				<Box
					padding={
						expandido === expandID ? '0 14px 12px 14px' : '0 14px 12px 14px'
					}
					sx={{
						borderTop: 'none',
					}}
				>
					<Button
						sx={{
							boxSizing: 'border-box',
							border: '1px solid #651C32',
							borderRadius: '50px',
							minHeight: '10px',
							height: '18px',
							textTransform: 'none',
							'&:hover': {
								background: 'none',
							},
						}}
						disableFocusRipple
						fullWidth
						disableRipple
						onClick={() => {
							if (
								(expandido === expandID && promocion.asignacion) ===
								EFormaDeAsignacion.Total
							) {
								let apliacionTotalIncomplenta = false;
								promocion.beneficios[
									grupoYSecuenciaActual.grupo
								].secuencias.forEach((secuencia: any) => {
									let tope = secuencia.tope;

									let totalCantidadMateriales =
										secuencia.materialesBeneficio.reduce(
											(a: number, v: TCodigoCantidad) => a + v.cantidad,
											0
										);

									if (totalCantidadMateriales < tope) {
										apliacionTotalIncomplenta = true;
									}
								});

								if (apliacionTotalIncomplenta) {
									setBordeColor(theme.palette.error.main);
									return mostrarAviso(
										'error',
										'Aplicación máxima incompleta',
										'Se debe asignar la aplicación total del beneficio'
									);
								} else {
									manejadorExpandido(expandido === expandID ? false : expandID);
								}
							} else {
								manejadorExpandido(expandido === expandID ? false : expandID);
							}
						}}
					>
						<CardActions disableSpacing style={{padding: 0}}>
							<Box display='flex' gap='6px' alignItems='center'>
								<Typography variant='caption' color='secondary'>
									{expandido !== expandID
										? t('general.verDetalle')
										: t('general.ocultarDetalle')}
								</Typography>
								<Box
									className={clsx(classes.expand, {
										[classes.expandOpen]: expandido === expandID ? true : false,
									})}
									aria-expanded={expandido === expandID ? true : false}
									style={{padding: 0}}
								>
									<FlechaAbajoIcon width='10px' height='10px' />
								</Box>
							</Box>
						</CardActions>
					</Button>
				</Box>
			</Box>
		</CardMUI>
	);
};
