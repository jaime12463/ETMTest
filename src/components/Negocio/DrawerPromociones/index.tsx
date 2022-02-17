import {Box, Typography} from '@mui/material';
import {AvisoIcon, PromocionesIcon} from 'assests/iconos';
import Drawer from 'components/UI/Drawer';
import PromoOngoing from 'components/UI/PromoOngoing';
import {ETiposDePago, TPromoOngoingAplicadas} from 'models';
import {TPromoOngoing} from 'models/server';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from 'redux/hooks';
import {borrarPromocionesOngoing} from 'redux/features/visitaActual/visitaActualSlice';
import React from 'react';
import {TPromoOngoingAplicablesResultado} from 'utils/procesos/promociones';
import Modal from 'components/UI/Modal';

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
	const [configAlerta, setConfigAlerta] = React.useState({
		titulo: '',
		mensaje: '',
		tituloBotonAceptar: '',
		tituloBotonCancelar: '',
		iconoMensaje: <></>,
		callbackAceptar: () => {},
	});

	const [alerta, setAlerta] = React.useState<boolean>(false);
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
		<>
			<Modal
				setAlerta={setAlerta}
				alerta={alerta}
				contenidoMensaje={configAlerta}
			/>
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
							data-cy='pantalla-promociones'
						>
							{t('titulos.promociones')}
						</Typography>
					</Box>
				}
			>
				<Box
					display='flex'
					flexDirection='column'
					gap='16px'
					padding='22px 10px'
				>
					{promocionesOingoing?.credito?.promosAplicables.length > 0 && (
						<PromoOngoing.Container
							tipo='credito'
							onClick={() => {
								setConfigAlerta({
									titulo: 'Restablecer promociones a crédito',
									mensaje:
										'Las promociones a crédito que ya tienes aplicadas se reiniciarán para volver a calcular. ',
									tituloBotonAceptar: 'Aceptar',
									callbackAceptar: () => restablecerPromociones('Credito'),
									tituloBotonCancelar: 'Cancelar',
									iconoMensaje: <AvisoIcon />,
								});
								setAlerta(true);
							}}
							dataCy='Promociones-Credito'
						>
							<PromoOngoing.CardsContainer>
								{promocionesOingoing?.credito?.promosAplicables.map(
									(promocion: TPromoOngoing) => (
										<PromoOngoing.Card
											key={promocion.promocionID}
											promosSimilares={
												promocionesOingoing.credito
													.indiceProductosxPromosManuales
											}
											tipo='credito'
											promocion={promocion}
											promocionAutomatica={promocion.aplicacion === 'A'}
											borroPromociones={borroPromociones}
											setBorroPromociones={setBorroPromociones}
											beneficiosPararAgregar={promocionesOingoing?.benficiosParaAgregar?.find(
												(promo: TPromoOngoingAplicadas) =>
													promo.promocionID === promocion.promocionID &&
													promo.tipoPago === ETiposDePago.Credito
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
							onClick={() => {
								setConfigAlerta({
									titulo: 'Restablecer promociones a contado',
									mensaje:
										'Las promociones a contado que ya tienes aplicadas se reiniciarán para volver a calcular.',
									tituloBotonAceptar: 'Aceptar',
									callbackAceptar: () => restablecerPromociones('Contado'),
									tituloBotonCancelar: 'Cancelar',
									iconoMensaje: <AvisoIcon />,
								});
								setAlerta(true);
							}}
							dataCy='Promociones-Contado'
						>
							<PromoOngoing.CardsContainer>
								{promocionesOingoing?.contado?.promosAplicables.map(
									(promocion: TPromoOngoing) => (
										<PromoOngoing.Card
											key={promocion.promocionID}
											promosSimilares={
												promocionesOingoing.contado
													.indiceProductosxPromosManuales
											}
											tipo='contado'
											promocion={promocion}
											promocionAutomatica={promocion.aplicacion === 'A'}
											borroPromociones={borroPromociones}
											setBorroPromociones={setBorroPromociones}
											beneficiosPararAgregar={promocionesOingoing?.benficiosParaAgregar?.find(
												(promo: TPromoOngoingAplicadas) =>
													promo.promocionID === promocion.promocionID &&
													promo.tipoPago === ETiposDePago.Contado
											)}
										/>
									)
								)}
							</PromoOngoing.CardsContainer>
						</PromoOngoing.Container>
					)}
					{promocionesOingoing?.noAplicable?.length > 0 && (
						<PromoOngoing.Container dataCy='No-aplicables'>
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
		</>
	);
};
