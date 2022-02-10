import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {CheckRedondoIcon} from 'assests/iconos';
import theme from 'theme';
import {useTranslation} from 'react-i18next';
import {TPromoOngoing, TPromoOngoingAplicadas} from 'models';
import {useAppDispatch, useObtenerVisitaActual} from 'redux/hooks';
import {agregarBeneficiosPromoOngoing} from 'redux/features/visitaActual/visitaActualSlice';

export interface CardProps {
	promocionAutomatica?: boolean;
	tipo?: 'contado' | 'credito';
	soloLectura?: boolean;
	beneficiosPararAgregar?: TPromoOngoingAplicadas;
	promocion: TPromoOngoing;
	borroPromociones?: {
		credito: boolean;
		contado: boolean;
	};
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
}) => {
	const [mostrarCheck, setMostrarCheck] = React.useState<boolean>(false);
	const [bordeColor, setBordeColor] = React.useState<string>('#D9D9D9');
	const {t} = useTranslation();
	const {descripcion, promocionID} = promocion;
	const dispatch = useAppDispatch();
	const visitaActual = useObtenerVisitaActual();

	React.useEffect(() => {
		if (!promocionAutomatica) {
			const promocionAplicada = visitaActual.promosOngoing.some(
				(promo) => beneficiosPararAgregar?.promocionID === promo.promocionID
			);

			if (promocionAplicada) {
				setMostrarCheck(true);
				setBordeColor(theme.palette.success.main);
			}
		}
	}, []);

	const onClick = () => {
		setMostrarCheck(true);
		setBordeColor(theme.palette.success.main);
		if (beneficiosPararAgregar) {
			dispatch(
				agregarBeneficiosPromoOngoing({
					beneficios: [beneficiosPararAgregar],
				})
			);
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
			console.log('entro');
			setMostrarCheck(false);
			setBordeColor('#D9D9D9');
			setBorroPromociones({...borroPromociones, [tipo]: false});
		}
	}, [borroPromociones]);

	React.useEffect(() => {
		if (promocionAutomatica) {
			setMostrarCheck(true);
			setBordeColor(theme.palette.success.main);
		}
	}, [promocionAutomatica]);

	return (
		<Box
			border={`1px solid ${bordeColor}`}
			borderRadius='8px'
			padding='12px 14px'
		>
			<Box display='flex' justifyContent='space-between'>
				<Box display='flex' flexDirection='column'>
					<Typography variant='subtitle3' fontFamily='Open Sans'>
						{promocionID}
					</Typography>
					<Typography variant='subtitle3'>{descripcion}</Typography>
				</Box>
				{mostrarCheck && <CheckRedondoIcon height='20px' width='20px' />}
			</Box>
			{!soloLectura && (
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
					{!promocionAutomatica && !mostrarCheck && (
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
			)}
		</Box>
	);
};
