import {Box, Typography} from '@mui/material';
import {PromocionesIcon} from 'assests/iconos';
import Drawer from 'components/UI/Drawer';
import PromoOngoing from 'components/UI/PromoOngoing';
import {TPromoOngoingAplicadas} from 'models';
import {TPromoOngoing} from 'models/server';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from 'redux/hooks';
import {borrarPromocionesOngoing} from 'redux/features/visitaActual/visitaActualSlice';
import React from 'react';
import {TPromoOngoingAplicablesResultado} from 'utils/procesos/promociones';

export interface Props {
	openDrawerPromociones: boolean;
	setOpenDrawerPromociones: React.Dispatch<React.SetStateAction<boolean>>;
	promocionesOingoing: {
		contado: TPromoOngoingAplicablesResultado;
		credito: TPromoOngoingAplicablesResultado;
		noAplicable: TPromoOngoing[];
		benficiosParaAgregar: TPromoOngoingAplicadas[];
	};
}

export const DrawerPromociones: React.FC<Props> = ({
	openDrawerPromociones,
	setOpenDrawerPromociones,
	promocionesOingoing,
}) => {
	const {t} = useTranslation();
	const [borroPromociones, setBorroPromociones] = React.useState<{
		credito: boolean;
		contado: boolean;
	}>({credito: false, contado: false});
	const dispatch = useAppDispatch();

	const restablecerPromociones = (tipo: 'Credito' | 'Contado') => {
		setBorroPromociones(
			tipo === 'Credito'
				? {...borroPromociones, credito: true}
				: {...borroPromociones, contado: true}
		);
		dispatch(
			borrarPromocionesOngoing({
				tipoPago: tipo,
			})
		);
	};

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
				{promocionesOingoing?.credito?.promosAplicables.length > 0 && (
					<PromoOngoing.Container
						tipo='credito'
						onClick={() => restablecerPromociones('Credito')}
					>
						<PromoOngoing.CardsContainer>
							{promocionesOingoing?.credito?.promosAplicables.map(
								(promocion: TPromoOngoing) => (
									<PromoOngoing.Card
										key={promocion.promocionID}
										promosSimilares={
											promocionesOingoing.credito.indiceProductosxPromosManuales
										}
										tipo='credito'
										promocion={promocion}
										promocionAutomatica={promocion.aplicacion === 'A'}
										borroPromociones={borroPromociones}
										setBorroPromociones={setBorroPromociones}
										beneficiosPararAgregar={promocionesOingoing?.benficiosParaAgregar?.find(
											(promo: TPromoOngoingAplicadas) =>
												promo.promocionID === promocion.promocionID
										)}
									/>
								)
							)}
						</PromoOngoing.CardsContainer>
					</PromoOngoing.Container>
				)}
				{promocionesOingoing?.contado?.promosAplicables.length > 0 && (
					<PromoOngoing.Container
						tipo='contado'
						onClick={() => restablecerPromociones('Contado')}
					>
						<PromoOngoing.CardsContainer>
							{promocionesOingoing?.contado?.promosAplicables.map(
								(promocion: TPromoOngoing) => (
									<PromoOngoing.Card
										key={promocion.promocionID}
										promosSimilares={
											promocionesOingoing.contado.indiceProductosxPromosManuales
										}
										tipo='contado'
										promocion={promocion}
										promocionAutomatica={promocion.aplicacion === 'A'}
										borroPromociones={borroPromociones}
										setBorroPromociones={setBorroPromociones}
										beneficiosPararAgregar={promocionesOingoing?.benficiosParaAgregar?.find(
											(promo: TPromoOngoingAplicadas) =>
												promo.promocionID === promocion.promocionID
										)}
									/>
								)
							)}
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
										beneficiosPararAgregar={promocionesOingoing?.benficiosParaAgregar?.find(
											(promo: TPromoOngoingAplicadas) =>
												promo.promocionID === promocion.promocionID
										)}
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
