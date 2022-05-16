import React, {useState, useEffect} from 'react';
import {Box, Typography} from '@mui/material';
import {AvisoIcon, CheckRedondoIcon, FlechaDerechaIcon} from 'assests/iconos';
import {EPasos, TStatePasos} from 'models';
import theme from 'theme';
import {
	useObtenerCompromisoDeCobroActual,
	useObtenerVisitaActual,
} from 'redux/hooks';
import i18n from 'i18next';
import {useMostrarAviso} from 'hooks';
import {useTranslation} from 'react-i18next';

interface Props {
	pasos: TStatePasos;
	setPasos: React.Dispatch<React.SetStateAction<TStatePasos>>;
}

interface PasosNavegacion {
	id: EPasos;
	numero: number;
	paso: string;
}

const pasosNavegacion: PasosNavegacion[] = [
	{
		id: EPasos.Planeacion,
		numero: 1,
		paso: i18n.t('pasos.planeacion'),
	},
	{
		id: EPasos.TomaPedido,
		numero: 2,
		paso: i18n.t('pasos.tomaDePedido'),
	},
	{
		id: EPasos.Otros,
		numero: 3,
		paso: i18n.t('pasos.otros'),
	},
	{
		id: EPasos.FinalizarPedido,
		numero: 4,
		paso: i18n.t('pasos.finalizar'),
	},
];

export const Navegacion: React.VFC<Props> = ({pasos, setPasos}) => {
	const visitaActual = useObtenerVisitaActual();
	const [navegacion, setNavegacion] =
		useState<PasosNavegacion[]>(pasosNavegacion);
	const [inset, setInset] = useState<string>('inset(0px 288px 0px 15px)');

	const {
		pedidos: {venta, canje, ventaenvase, prestamoenvase},
		bonificaciones,
		ordenDeCompra,
		pasoATomaPedido,
	} = useObtenerVisitaActual();

	const {t} = useTranslation();
	const mostrarAviso = useMostrarAviso();

	const {monto} = useObtenerCompromisoDeCobroActual();

	const [ventaProductos, setVentaProductos] = useState<string>(
		JSON.stringify(venta.productos)
	);

	const [canjeProductos, setCanjeProductos] = useState<string>(
		JSON.stringify(canje.productos)
	);

	const [ventaEnvaseProductos, setVentaEnvaseProductos] = useState<string>(
		JSON.stringify(ventaenvase.productos)
	);

	const [prestamoEnvaseProductos, setPrestamoEnvaseProductos] =
		useState<string>(JSON.stringify(prestamoenvase.productos));

	const [bonificacionesProductos, setBonificacionesProductos] =
		useState<string>(() => {
			const detalleBonificaciones = bonificaciones
				.map((bonificacion) => bonificacion.detalle)
				.flat();

			return JSON.stringify(detalleBonificaciones);
		});

	const [ordenDeCompraProductos, setOrdenDeCompraProductos] =
		useState(ordenDeCompra);
	const [compromisoDeCobro, setCompromisoDeCobro] = useState<number>(monto);

	const [cambioPedido, setCambioPedido] = useState<boolean>(false);

	const onClick = (step: TStatePasos['actual']) => {
		setPasos((state) => {
			if (state.actual > step) {
				return {
					actual: step,
					visitados: {
						...state.visitados,
						[state.actual]: true,
					},
				};
			}

			return {
				...state,
				actual: step,
			};
		});
	};

	useEffect(() => {
		if (pasos.actual === EPasos.Planeacion) {
			if (pasoATomaPedido) {
				mostrarAviso(
					'warning',
					t('advertencias.noEditarPlaneacionTitulo'),
					t('advertencias.noEditarPlaneacionDescripcion'),
					undefined,
					'advertenciaPaso1'
				);
			}

			setInset('inset(0px 288px 0px 15px)');
		}

		if (pasos.actual === EPasos.TomaPedido) {
			setInset('inset(0px 197px 0px 106px)');
		}

		if (pasos.actual === EPasos.Otros) {
			if (cambioPedido) {
				setCambioPedido(false);
			}

			if (visitaActual.clienteBloqueado) {
				setNavegacion([
					{
						id: EPasos.Otros,
						numero: 3,
						paso: i18n.t('pasos.otros'),
					},
					{
						id: EPasos.FinalizarPedido,
						numero: 4,
						paso: i18n.t('pasos.finalizar'),
					},
				]);
				setPasos((state) => ({
					...state,
					visitados: {...state.visitados, [EPasos.Otros]: true},
				}));
				setInset('inset(0px 288px 0px 15px)');
				return;
			}

			setInset('inset(0px 106px 0px 197px)');
		}

		if (pasos.actual === EPasos.FinalizarPedido) {
			if (cambioPedido) {
				setCambioPedido(false);
			}

			if (visitaActual.clienteBloqueado) {
				setInset('inset(0px 197px 0px 106px)');
				return;
			}

			setInset('inset(0px 15px 0px 288px)');
		}
	}, [pasos.actual, visitaActual.clienteBloqueado]);

	useEffect(() => {
		if (ventaProductos !== JSON.stringify(venta.productos)) {
			setVentaProductos(JSON.stringify(venta.productos));
			if (
				pasos.visitados[EPasos.Otros] ||
				pasos.visitados[EPasos.FinalizarPedido]
			) {
				setCambioPedido(true);
			}
		}

		if (canjeProductos !== JSON.stringify(canje.productos)) {
			setCanjeProductos(JSON.stringify(canje.productos));

			if (pasos.visitados[EPasos.FinalizarPedido]) {
				setCambioPedido(true);
			}
		}

		if (ventaEnvaseProductos !== JSON.stringify(ventaenvase.productos)) {
			setVentaEnvaseProductos(JSON.stringify(ventaenvase.productos));

			if (pasos.visitados[EPasos.FinalizarPedido]) {
				setCambioPedido(true);
			}
		}

		if (prestamoEnvaseProductos !== JSON.stringify(prestamoenvase.productos)) {
			setPrestamoEnvaseProductos(JSON.stringify(prestamoenvase.productos));

			if (pasos.visitados[EPasos.FinalizarPedido]) {
				setCambioPedido(true);
			}
		}

		const detalleBonificaciones = bonificaciones
			.map((bonificacion) => bonificacion.detalle)
			.flat();

		if (bonificacionesProductos !== JSON.stringify(detalleBonificaciones)) {
			setBonificacionesProductos(JSON.stringify(detalleBonificaciones));

			if (pasos.visitados[EPasos.FinalizarPedido]) {
				setCambioPedido(true);
			}
		}

		if (ordenDeCompraProductos !== ordenDeCompra) {
			setOrdenDeCompraProductos(ordenDeCompra);

			if (pasos.visitados[EPasos.FinalizarPedido]) {
				setCambioPedido(true);
			}
		}

		if (compromisoDeCobro !== monto) {
			setCompromisoDeCobro(monto);

			if (pasos.visitados[EPasos.FinalizarPedido]) {
				setCambioPedido(true);
			}
		}
	}, [
		venta.productos,
		canje.productos,
		ventaenvase.productos,
		prestamoenvase.productos,
		bonificaciones,
		ordenDeCompra,
		monto,
	]);

	useEffect(() => {
		if (cambioPedido) {
			setPasos((state) => {
				if (state.actual === EPasos.TomaPedido) {
					return {
						...state,
						visitados: {
							...state.visitados,
							[EPasos.Otros]: false,
							[EPasos.FinalizarPedido]: false,
						},
					};
				}

				return {
					...state,
					visitados: {...state.visitados, [EPasos.FinalizarPedido]: false},
				};
			});
		}
	}, [cambioPedido]);

	return (
		<Box
			alignItems='center'
			display='flex'
			gap='5px'
			height='73px'
			overflow='hidden'
			position='relative'
			paddingTop='16px'
			sx={{
				background: '#F5F0F0',
				boxShadow: ' 0px 4px 6px -3px rgba(0, 0, 0, 0.25)',
				paddingInline: '15px',
				'&:before': {
					background: 'none',
					borderBottom: `4px solid ${theme.palette.secondary.main}`,
					clipPath: inset,
					content: '""',
					inset: 0,
					opacity: 1,
					pointerEvents: 'none',
					position: 'absolute',
					transition: 'clip-path 0.5s cubic-bezier(0.18,-0.11, 0, 0.87)',
				},
			}}
			width='100%'
		>
			{navegacion.map(({id, paso, numero}, index) => {
				return (
					<React.Fragment key={id}>
						<Box alignSelf='flex-start' position='relative'>
							{cambioPedido &&
								pasos.actual !== EPasos.Otros &&
								id === EPasos.Otros && (
									<AvisoIcon
										height={14}
										style={{
											position: 'absolute',
											top: -6,
											right: 14,
											zIndex: 1,
										}}
										width={14}
									/>
								)}
							<Box
								alignItems='center'
								component='button'
								disabled={!pasos.visitados[id]}
								display='flex'
								flexDirection='column'
								gap='10px'
								height='100%'
								onClick={() => onClick(id)}
								sx={{
									background: 'none',
									border: 'none',
									cursor: 'pointer',
									outline: 'none',
									padding: 0,
									'&:disabled': {
										cursor: 'auto',
										opacity: 0.5,
									},
								}}
								width='57px'
							>
								{pasos.visitados[id] && pasos.actual !== id ? (
									<CheckRedondoIcon
										height={20}
										style={{marginTop: '-2px'}}
										width={20}
									/>
								) : (
									<Box
										alignItems='center'
										borderRadius='50%'
										display='flex'
										height='16px'
										justifyContent='center'
										sx={{background: theme.palette.secondary.main}}
										width='16px'
									>
										<Typography color='#fff' fontWeight={500} variant='caption'>
											{numero}
										</Typography>
									</Box>
								)}
								<Typography
									color={
										pasos.visitados[id] && pasos.actual !== id
											? 'success.dark'
											: 'secondary'
									}
									fontWeight={500}
									variant='caption'
								>
									{paso}
								</Typography>
							</Box>
						</Box>
						{navegacion.length - 1 !== index && (
							<FlechaDerechaIcon style={{marginBottom: '12px'}} />
						)}
					</React.Fragment>
				);
			})}
		</Box>
	);
};
