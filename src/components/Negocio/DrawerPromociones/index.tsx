import {Box, Typography} from '@mui/material';
import {PromocionesIcon} from 'assests/iconos';
import Drawer from 'components/UI/Drawer';
import PromoOngoing from 'components/UI/PromoOngoing';
import {TPromoOngoing} from 'models/server';
import {useTranslation} from 'react-i18next';

export interface Props {
	openDrawerPromociones: boolean;
	setOpenDrawerPromociones: React.Dispatch<React.SetStateAction<boolean>>;
	promocionesOingoing: any;
}

export const DrawerPromociones: React.FC<Props> = ({
	openDrawerPromociones,
	setOpenDrawerPromociones,
	promocionesOingoing,
}) => {
	const {t} = useTranslation();

	return (
		<Drawer
			open={openDrawerPromociones}
			setOpen={setOpenDrawerPromociones}
			titulo={
				<Box
					alignItems='center'
					display='flex'
					gap='4px'
					padding='34px 0 22px 0'
				>
					<PromocionesIcon fill='#fff' height='24px' width='24px' />
					<Typography
						color='#fff'
						variant='subtitle2'
						fontFamily='Open Sans'
						fontWeight={700}
					>
						{t('titulos.promociones')}
					</Typography>
				</Box>
			}
		>
			<Box display='flex' flexDirection='column' gap='16px'>
				{promocionesOingoing?.credito?.length > 0 && (
					<PromoOngoing.Container tipo='credito'>
						<PromoOngoing.CardsContainer>
							{promocionesOingoing?.credito?.map((promocion: TPromoOngoing) => (
								<PromoOngoing.Card
									key={promocion.promocionID}
									promocion={promocion}
									promocionAutomatica={promocion.aplicacion === 'A'}
								/>
							))}
						</PromoOngoing.CardsContainer>
					</PromoOngoing.Container>
				)}
				{promocionesOingoing?.contado?.length > 0 && (
					<PromoOngoing.Container tipo='contado'>
						<PromoOngoing.CardsContainer>
							{promocionesOingoing?.contado?.map((promocion: TPromoOngoing) => (
								<PromoOngoing.Card
									key={promocion.promocionID}
									promocion={promocion}
									promocionAutomatica={promocion.aplicacion === 'A'}
								/>
							))}
						</PromoOngoing.CardsContainer>
					</PromoOngoing.Container>
				)}
				{promocionesOingoing?.noAplicable?.length > 0 && (
					<PromoOngoing.Container>
						<PromoOngoing.CardsContainer>
							{promocionesOingoing?.noAplicable?.map(
								(promocion: TPromoOngoing) => (
									<PromoOngoing.Card
										key={promocion.promocionID}
										promocion={promocion}
										soloLectura
									/>
								)
							)}
						</PromoOngoing.CardsContainer>
					</PromoOngoing.Container>
				)}
			</Box>
		</Drawer>
	);
};
