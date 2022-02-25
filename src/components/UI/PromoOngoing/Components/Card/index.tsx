import React from 'react';
import {CheckRedondoIcon, FlechaAbajoIcon} from 'assests/iconos';
import theme from 'theme';
import {useTranslation} from 'react-i18next';
import {
	ETiposDePago,
	TProductosPromoOngoingAplicadas,
	TPromoOngoing,
	TPromoOngoingAplicadas,
} from 'models';
import {useAppDispatch, useObtenerVisitaActual} from 'redux/hooks';
import {agregarBeneficiosPromoOngoing} from 'redux/features/visitaActual/visitaActualSlice';
import {TProductosUsadosEnOtrasPromos} from 'utils/procesos/promociones';
import {TPromoOngoingDisponibilidad} from 'utils/procesos/promociones/PromocionesOngoing';
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
	promocionAutomatica?: boolean;
	tipo?: 'contado' | 'credito';
	soloLectura?: boolean;
	setExpandidoexpandido: React.Dispatch<React.SetStateAction<string | boolean>>;
	expandido: string | boolean;
	beneficiosPararAgregar?: TPromoOngoingAplicadas;
	promocion: TPromoOngoing;
	promosSimilares?: TProductosUsadosEnOtrasPromos;
	borroPromociones?: {
		credito: boolean;
		contado: boolean;
	};
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
	beneficiosPararAgregar,
	promocion,
	borroPromociones,
	tipo,
	setBorroPromociones,
	promosSimilares,
	setpromosDisponibles,
	promosDisponibles,
	setExpandidoexpandido,
	expandido,
}) => {
	const [mostrarCheck, setMostrarCheck] = React.useState<boolean>(false);
	const [bordeColor, setBordeColor] = React.useState<string>('#D9D9D9');
	const [puedeVerBotonera, setPuedeVerBotonera] = React.useState<boolean>(true);
	const [esPromoSimilar, setEsPromoSimilar] = React.useState<boolean>(false);
	const [borroPromocion, setBorroPromocion] = React.useState<boolean>(false);
	const [focusId, setFocusId] = React.useState<string>('');
	const [beneficiosProductos, setBeneficiosProductos] = React.useState<
		TProductosPromoOngoingAplicadas[]
	>([]);
	const [beneficiosSelect, setBeneficiosSelect] = React.useState<string>('');
	const [promocionSinDisponibile, setPromocionSinDisponibile] =
		React.useState<boolean>(false);
	const {t} = useTranslation();
	const {descripcion, promocionID} = promocion;
	const dispatch = useAppDispatch();
	const visitaActual = useObtenerVisitaActual();

	const [promocionAplicada, setPromocionAplicada] =
		React.useState<boolean>(false);

	const classes = useEstilos();

	const tipoPago =
		tipo === 'contado' ? ETiposDePago.Contado : ETiposDePago.Credito;

	React.useEffect(() => {
		if (beneficiosPararAgregar)
			setBeneficiosProductos([...beneficiosPararAgregar.productos]);
	}, [beneficiosPararAgregar]);

	React.useEffect(() => {
		promocionAutomatica
			? setPuedeVerBotonera(false)
			: mostrarCheck
			? setPuedeVerBotonera(false)
			: esPromoSimilar
			? setPuedeVerBotonera(false)
			: promocionSinDisponibile
			? setPuedeVerBotonera(false)
			: setPuedeVerBotonera(true);
	}, [
		promocionAutomatica,
		mostrarCheck,
		esPromoSimilar,
		visitaActual.promosOngoing,
		promocionSinDisponibile,
		promosDisponibles,
		borroPromociones,
		borroPromocion,
	]);

	React.useEffect(() => {
		if (promosSimilares && !promocionAutomatica) {
			let promosSimilatresLista = Object.values(promosSimilares).flat();
			let PromoSimilar = visitaActual.promosOngoing.find((promo) => {
				let hayPromoSimilar = promosSimilatresLista.find(
					(similar) =>
						similar === promo.promocionID && promo.tipoPago === tipoPago
				);
				if (hayPromoSimilar) {
					return promo;
				}
			});

			if (PromoSimilar && PromoSimilar?.promocionID !== promocionID) {
				setEsPromoSimilar(true);
			}
		}
	}, [visitaActual.promosOngoing]);

	React.useEffect(() => {
		if (!promocionAutomatica) {
			if (!promocionAplicada && promosDisponibles) {
				if (
					promosDisponibles[Number(promocionID)].disponibles -
						promosDisponibles[Number(promocionID)].aplicadas <=
					0
				) {
					setPromocionSinDisponibile(true);
				} else {
					setPromocionSinDisponibile(false);
				}
			}
		}
	}, [promosDisponibles, borroPromociones, borroPromocion]);

	React.useEffect(() => {
		if (!promocionAutomatica && !soloLectura) {
			let promoAplicada = visitaActual.promosOngoing.some(
				(promo) =>
					promocionID == promo.promocionID && promo.tipoPago === tipoPago
			);

			setPromocionAplicada(promoAplicada);
			if (promoAplicada) {
				setMostrarCheck(true);
				setBordeColor(theme.palette.success.main);
				if (promosDisponibles && setpromosDisponibles) {
					setpromosDisponibles({
						...promosDisponibles,
						[Number(promocionID)]: {
							disponibles: promosDisponibles[Number(promocionID)].disponibles,
							aplicadas: promosDisponibles[Number(promocionID)].aplicadas + 1,
						},
					});
				}
			} else {
				setPromocionAplicada(false);
			}
		}
	}, [borroPromociones]);

	/* React.useEffect(() => {
		setBorroPromocion(true);
		if (!promocionAutomatica && borroPromocion) {
			if (promocionAplicada) {
				if (promosDisponibles && setpromosDisponibles) {
					setpromosDisponibles({
						...promosDisponibles,
						[Number(promocionID)]: {
							disponibles: promosDisponibles[Number(promocionID)].disponibles,
							aplicadas: promosDisponibles[Number(promocionID)].aplicadas + 1,
						},
					});

					setBorroPromocion(false);
				}
			} else {
				setPromocionAplicada(false);
			}
		}
	}, [borroPromociones]); */

	const onClick = () => {
		if (!promocionAplicada) {
			setMostrarCheck(true);
			setBordeColor(theme.palette.success.main);
			setPromocionAplicada(true);
			if (beneficiosPararAgregar) {
				dispatch(
					agregarBeneficiosPromoOngoing({
						beneficios: visitaActual.promosOngoing.concat(
							beneficiosPararAgregar
						),
					})
				);
			}
			if (promosDisponibles && setpromosDisponibles) {
				setpromosDisponibles({
					...promosDisponibles,
					[Number(promocionID)]: {
						disponibles: promosDisponibles[Number(promocionID)].disponibles,
						aplicadas: promosDisponibles[Number(promocionID)].aplicadas + 1,
					},
				});
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
			setEsPromoSimilar(false);
			setPromocionAplicada(false);
		}
	}, [borroPromociones]);

	React.useEffect(() => {
		if (promocionAutomatica) {
			setMostrarCheck(true);
			setBordeColor(theme.palette.success.main);
		}
	}, [promocionAutomatica]);

	console.log({beneficiosPararAgregar, promocion});

	const manejadorExpandido = (id: string | boolean) => {
		setExpandidoexpandido(id);
	};

	console.log([
		...promocion?.beneficios?.map((beneficio) => beneficio.descripcion),
	]);

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
					color={
						expandido === promocion.promocionID.toString() ? '#fff' : '#000'
					}
					borderRadius='4px 4px 0 0 '
					display='flex'
					flexDirection='column'
					justifyContent='space-between'
					padding={
						expandido === promocion.promocionID.toString()
							? '12px 14px 12px 14px'
							: '12px 14px 8px 14px'
					}
					sx={{
						background:
							expandido === promocion.promocionID.toString()
								? theme.palette.secondary.light
								: 'none',
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

				<Collapse
					in={expandido === promocion.promocionID.toString()}
					timeout='auto'
					unmountOnExit
				>
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
										opcionSeleccionada={beneficiosSelect}
										opciones={[
											...promocion?.beneficios?.map(
												(beneficio) => beneficio.descripcion
											),
										]}
										setOpcion={setBeneficiosSelect}
										dataCy='select-bonificaciones'
									/>
								</Box>
							</Box>
							<Box marginBottom='8px' padding='0 14px'>
								<Typography variant='subtitle3' fontFamily='Open Sans'>
									Secuencia
								</Typography>
								<Box width='81px' height='24px' mt='8px' mb='8px'>
									<CustomSelect
										opcionSeleccionada={beneficiosSelect}
										opciones={[]}
										setOpcion={setBeneficiosSelect}
										dataCy='select-bonificaciones'
									/>
								</Box>
								<Typography
									variant='caption'
									fontFamily='Open Sans'
									color='red'
								>
									Disponible:
									{promosDisponibles &&
										promosDisponibles[Number(promocionID)].disponibles -
											promosDisponibles[Number(promocionID)].aplicadas}
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
									Beneficio: 9999%
								</Typography>
							</Box>
							<Box>
								<Button
									onClick={onClick}
									disabled={promocionAplicada}
									sx={{
										border: promocionAplicada ? 'none' : `1px solid #651C32`,
										borderRadius: '50px',
										display: 'flex',
										gap: '4px',
										padding: '4px 12px',
										width: '276px',
										height: '33px',
										backgroundColor: promocionAplicada ? '#D9D9D9' : '#fff',
										textTransform: 'none',
										'&:hover': {
											background: 'none',
										},
									}}
									data-cy={`boton-aplicarPromocion`}
								>
									<Typography
										color={promocionAplicada ? '' : '#8A4C5F'}
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
					{beneficiosPararAgregar?.productos.map((producto) => (
						<TarjetaPromociones
							key={producto.codigoProducto}
							promocionAplicada={promocionAplicada}
							producto={producto}
							statefocusId={{focusId, setFocusId}}
							stateBeneficiosProductos={{
								beneficiosProductos,
								setBeneficiosProductos,
							}}
						/>
					))}
					<Divider sx={{marginBottom: '10px'}} variant='fullWidth' />
				</Collapse>

				<Box
					padding={
						expandido === promocion.promocionID.toString()
							? '0 14px 12px 14px'
							: '0 14px 12px 14px'
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
						onClick={() =>
							manejadorExpandido(
								expandido === promocion.promocionID.toString()
									? false
									: promocion.promocionID.toString()
							)
						}
					>
						<CardActions disableSpacing style={{padding: 0}}>
							<Box display='flex' gap='6px' alignItems='center'>
								<Typography variant='caption' color='secondary'>
									{expandido !== promocion.promocionID.toString()
										? t('general.verDetalle')
										: t('general.ocultarDetalle')}
								</Typography>
								<Box
									className={clsx(classes.expand, {
										[classes.expandOpen]:
											expandido === promocion.promocionID.toString()
												? true
												: false,
									})}
									aria-expanded={
										expandido === promocion.promocionID.toString()
											? true
											: false
									}
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

/* {!soloLectura && (
				<>
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
					{puedeVerBotonera && (
						<Box display='flex' gap='10px' marginTop='8px'>
							<IconButton
								onClick={onClick}
								sx={{
									border: `1px solid ${theme.palette.secondary.main}`,
									borderRadius: '50px',
									display: 'flex',
									gap: '4px',
									padding: '4px 12px',
									width: 'fit-content',
									'&:hover': {
										backgroundColor: 'none',
									},
								}}
								data-cy={`promoOnGoing-Aplicar-${promocionID}-${tipo}`}
							>
								<Typography
									variant='caption'
									fontFamily='Open Sans'
									color={theme.palette.secondary.main}
								>
									{t('general.aplicar')}
								</Typography>
							</IconButton>
							<IconButton
								sx={{
									border: `1px solid ${theme.palette.secondary.main}`,
									borderRadius: '50px',
									display: 'flex',
									gap: '4px',
									padding: '4px 12px',
									width: 'fit-content',
									'&:hover': {
										backgroundColor: 'none',
									},
								}}
							>
								<Typography
									variant='caption'
									fontFamily='Open Sans'
									color={theme.palette.secondary.main}
								>
									{t('general.editar')}
								</Typography>
							</IconButton>
						</Box>
					)}
				</>
			)} */
