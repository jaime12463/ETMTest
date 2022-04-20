import React from 'react';
import {Box, Typography} from '@mui/material';
import {AvisoIcon, PromocionesIcon} from 'assests/iconos';
import {ETiposDePago, TClienteActual, TPromoOngoingAplicadas} from 'models';
import {TCliente, TPromoOngoing} from 'models/server';
import {useTranslation} from 'react-i18next';
import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {borrarPromocionesOngoing} from 'redux/features/visitaActual/visitaActualSlice';

import {
	TPromoOngoingAplicables,
	TPromoOngoingAplicablesResultado,
	TPromoOngoingDisponibilidad,
	PromocionesOngoing,
} from 'utils/procesos/promociones/PromocionesOngoing';
import {useObtenerDatosCliente} from 'hooks';
import {Drawer, Modal, PromoOngoing} from 'components/UI';

export interface Props {
	openDrawerPromociones: boolean;
	promocionesOingoing: {
		benficiosParaAgregar: TPromoOngoingAplicadas[];
		contado: TPromoOngoingAplicablesResultado | undefined;
		credito: TPromoOngoingAplicablesResultado | undefined;
		disponibles: TPromoOngoingDisponibilidad;
		noAplicable: TPromoOngoing[];
	};
	setOpenDrawerPromociones: React.Dispatch<React.SetStateAction<boolean>>;
	setPromocionesOingoing: React.Dispatch<{
		benficiosParaAgregar: TPromoOngoingAplicadas[];
		contado: TPromoOngoingAplicablesResultado | undefined;
		credito: TPromoOngoingAplicablesResultado | undefined;
		disponibles: TPromoOngoingDisponibilidad;
		noAplicable: TPromoOngoing[];
	}>;
}

export const DrawerPromociones: React.VFC<Props> = ({
	openDrawerPromociones,
	promocionesOingoing,
	setOpenDrawerPromociones,
	setPromocionesOingoing,
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
	const [expandido, setExpandidoexpandido] = React.useState<string | boolean>(
		false
	);

	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const datosCliente: TCliente | undefined = obtenerDatosCliente(
		clienteActual.codigoCliente
	);
	if (!datosCliente) return <></>;
	const visitaActual = useObtenerVisitaActual();
	const [alerta, setAlerta] = React.useState<boolean>(false);
	const [borroPromociones, setBorroPromociones] = React.useState<{
		credito: boolean;
		contado: boolean;
	}>({credito: false, contado: false});

	const promocionesOngoing = PromocionesOngoing.getInstance();

	const [promosDisponibles, setpromosDisponibles] =
		React.useState<TPromoOngoingDisponibilidad>({});

	const dispatch = useAppDispatch();

	React.useEffect(() => {
		if (promocionesOingoing) {
			setpromosDisponibles({...promocionesOingoing.disponibles});
		}
	}, [openDrawerPromociones]);

	const restablecerPromociones = (tipo: 'Credito' | 'Contado') => {
		let promociones = promocionesOngoing.calcular(
			visitaActual.pedidos.venta.productos,
			tipo === 'Credito' ? [ETiposDePago.Credito] : [ETiposDePago.Contado]
		);

		if (tipo === 'Contado') {
			setPromocionesOingoing({
				...promociones,
				credito: promocionesOingoing.credito,
			});
		} else {
			setPromocionesOingoing({
				...promociones,
				contado: promocionesOingoing.contado,
			});
		}
		setpromosDisponibles(promociones.disponibles);
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

	React.useEffect(() => {
		if (promocionesOingoing) {
			setpromosDisponibles(promocionesOingoing.disponibles);
		}
	}, [promocionesOingoing]);

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
							{t('descuentos.promocionesOngoing')}
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
					{promocionesOingoing?.credito &&
						promocionesOingoing?.credito?.promosAplicables.length > 0 && (
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
										(
											promocion: TPromoOngoing & TPromoOngoingAplicables,
											index
										) => (
											<PromoOngoing.Card
												key={promocion.promocionID}
												promosMismosRequisitos={
													promocionesOingoing?.credito
														?.indiceProductosxPromosManuales
												}
												tipo='credito'
												promocionesOngoing={promocionesOngoing}
												promocion={promocion}
												promocionAutomatica={promocion.aplicacion === 'A'}
												borroPromociones={borroPromociones}
												setBorroPromociones={setBorroPromociones}
												setpromosDisponibles={setpromosDisponibles}
												promosDisponibles={promosDisponibles}
												setExpandidoexpandido={setExpandidoexpandido}
												expandido={expandido}
												index={index}
											/>
										)
									)}
								</PromoOngoing.CardsContainer>
							</PromoOngoing.Container>
						)}
					{promocionesOingoing?.contado &&
						promocionesOingoing?.contado?.promosAplicables.length > 0 && (
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
										(
											promocion: TPromoOngoing & TPromoOngoingAplicables,
											index
										) => (
											<PromoOngoing.Card
												key={promocion.promocionID}
												promosMismosRequisitos={
													promocionesOingoing?.contado
														?.indiceProductosxPromosManuales
												}
												tipo='contado'
												promocion={promocion}
												promocionesOngoing={promocionesOngoing}
												promocionAutomatica={promocion.aplicacion === 'A'}
												borroPromociones={borroPromociones}
												setpromosDisponibles={setpromosDisponibles}
												setBorroPromociones={setBorroPromociones}
												setExpandidoexpandido={setExpandidoexpandido}
												expandido={expandido}
												promosDisponibles={promosDisponibles}
												index={index}
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
									(promocion: any, index) => (
										<PromoOngoing.Card
											key={promocion.promocionID}
											promocionesOngoing={promocionesOngoing}
											setExpandidoexpandido={setExpandidoexpandido}
											expandido={expandido}
											promocion={promocion}
											index={index}
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
