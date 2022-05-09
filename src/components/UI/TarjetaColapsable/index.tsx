import React, {Dispatch, SetStateAction} from 'react';
import {
	Box,
	Card,
	CardActions,
	Collapse,
	CardHeader,
	CardContent,
	IconButton,
	Typography,
} from '@mui/material';
import useEstilos from './useEstilos';
import clsx from 'clsx';
import Chip from '@mui/material/Chip';
import {styled} from '@mui/material/styles';
import {AvisoIcon, FlechaAbajoIcon} from 'assests/iconos';
import {useMostrarAviso} from 'hooks';
import {
	useAppDispatch,
	useObtenerVisitaActual,
	useObtenerConfiguracion,
} from 'redux/hooks';
import {
	cambiarEstadoIniciativa,
	cambiarSeQuedaAEditar,
} from 'redux/features/visitaActual/visitaActualSlice';
import {TIniciativasCliente} from 'models';
import {useTranslation} from 'react-i18next';
import {Modal} from '..';

const ChipStyled = styled(Chip)(() => ({
	background: '#000',
	color: '#fff',
	fontFamily: 'Open Sans',
	fontWeight: 'bold',
	opacity: '0.7',
	'&.MuiChip-sizeSmall': {
		fontSize: '12px',
		padding: '2px 4px',
	},
}));

interface Props {
	cantidadItems?: number;
	contenidoMensajeAviso?: {
		tipo: 'default' | 'error' | 'success' | 'warning' | 'info';
		titulo: string;
		mensaje?: string;
		opciones?: any;
		dataCy?: string;
	};
	dataCy: string;
	disabled?: boolean;
	disabledPadding?: boolean;
	expandido: string | boolean;
	id: string;
	iniciativasCanceladasSinMotivo?: boolean;
	iniciativasEjecutadasSinCantidad?: TIniciativasCliente[];
	labelChip?: string | React.ReactNode;
	mensaje?: React.ReactNode;
	mostrarAvisoAlCerrar?: boolean;
	setExpandido: Dispatch<SetStateAction<string | boolean>>;
	subTitulo?: React.ReactNode;
	titulo: React.ReactNode;
	valido?: boolean;
}

export const TarjetaColapsable: React.FC<Props> = ({
	cantidadItems,
	children,
	contenidoMensajeAviso,
	dataCy,
	disabled,
	disabledPadding,
	expandido,
	id,
	iniciativasCanceladasSinMotivo,
	iniciativasEjecutadasSinCantidad,
	labelChip,
	mensaje,
	mostrarAvisoAlCerrar,
	setExpandido,
	subTitulo,
	titulo,
	valido = false,
}) => {
	const mostrarAviso = useMostrarAviso();
	const classes = useEstilos({valido, open: expandido === id});
	const [alerta, setAlerta] = React.useState<boolean>(false);
	const [cacheId, setCacheId] = React.useState<string | boolean>(expandido);
	const dispatch = useAppDispatch();
	const visitaActual = useObtenerVisitaActual();
	const {t} = useTranslation();
	const {bonificacionesConVenta} = useObtenerConfiguracion();

	const manejadorExpandido = (id: string | boolean) => {
		if (!!iniciativasEjecutadasSinCantidad?.length) {
			setAlerta(true);
			setCacheId(
				iniciativasEjecutadasSinCantidad[0].idActividadIniciativa.toString()
			);
			return;
		}

		if (iniciativasCanceladasSinMotivo) {
			mostrarAviso(
				'error',
				t('toast.iniciativaSinMotivoTitulo'),
				t('toast.iniciativaSinMotivoMensaje')
			);
			return;
		}

		if (expandido === 'Bonificaciones' && visitaActual.seQuedaAEditar.seQueda) {
			dispatch(cambiarSeQuedaAEditar({seQueda: true, bordeError: true}));
			mostrarAviso(
				'error',
				t('toast.errorBonificacionTotalTitulo'),
				t('toast.errorBonificacionTotalMensaje')
			);
			return;
		}

		if (
			expandido === 'Toma de pedido' &&
			visitaActual.seQuedaAEditar.bordeError
		) {
			mostrarAviso(
				'error',
				t('toast.excedeMayorPermitidoTitulo'),
				t('toast.excedeMayorPermitidoMensaje'),
				undefined,
				'excede-disponible'
			);
			return;
		}

		if (mostrarAvisoAlCerrar) {
			const aviso = contenidoMensajeAviso;
			if (aviso) {
				return mostrarAviso(
					aviso.tipo,
					aviso.titulo,
					aviso.mensaje,
					aviso.opciones,
					aviso.dataCy
				);
			}
		} else {
			setExpandido(id);
		}
	};

	return (
		<>
			<Modal
				alerta={alerta}
				setAlerta={setAlerta}
				contenidoMensaje={{
					titulo: 'Existen tarjetas vacias',
					mensaje:
						'Si avanzas, las tarjetas que no tienen cantidades se eliminaran.',
					tituloBotonAceptar: 'Avanzar',
					callbackAceptar: () => {
						iniciativasEjecutadasSinCantidad?.map((iniciativa) => {
							dispatch(
								cambiarEstadoIniciativa({
									estado: 'pendiente',
									codigoIniciativa: iniciativa.idActividadIniciativa ?? 0,
								})
							);
						});
						setExpandido(cacheId);
					},
					tituloBotonCancelar: 'Editar Cantidades',
					callbackCancelar: () =>
						dispatch(cambiarSeQuedaAEditar({seQueda: true, bordeError: true})),
					iconoMensaje: <AvisoIcon />,
				}}
			/>
			<Card
				className={clsx(classes.root, {
					[classes.inactiva]: expandido !== id,
				})}
				sx={{overflow: 'visible', minHeight: '82px'}}
				data-cy={'tarjeta-' + dataCy}
			>
				<CardHeader
					sx={{padding: '0 18px'}}
					title={
						<Box display='flex' justifyContent='space-between'>
							<Box
								color={'black'}
								alignSelf='center'
								data-cy={'titulo-' + dataCy}
							>
								{titulo}
							</Box>
							<Box>
								<CardActions disableSpacing sx={{padding: 0}}>
									{cantidadItems !== undefined && cantidadItems > 0 && (
										<ChipStyled
											size='small'
											label={
												<Typography variant='subtitle3' fontFamily='Open Sans'>
													{labelChip}
												</Typography>
											}
											className={classes.root}
										/>
									)}
									{(id === 'Bonificaciones' && !bonificacionesConVenta) ||
									!disabled ? (
										<IconButton
											sx={{padding: 0, marginLeft: '8px'}}
											onClick={() =>
												manejadorExpandido(expandido === id ? false : id)
											}
											aria-expanded={expandido === id}
											data-cy={'expandir-' + dataCy}
										>
											<FlechaAbajoIcon className={classes.arrow} />
										</IconButton>
									) : null}
								</CardActions>
							</Box>
						</Box>
					}
					subheader={
						<Box display='flex' flexDirection='column' marginTop='10px'>
							<Typography
								color={'black'}
								variant='body3'
								fontFamily='Open Sans'
							>
								{subTitulo}
							</Typography>
							{disabled ? (
								<Typography
									data-cy={'mensaje-' + dataCy}
									fontFamily='Open Sans'
									marginTop='10px'
									variant='subtitle3'
								>
									{mensaje}
								</Typography>
							) : null}
						</Box>
					}
				></CardHeader>
				<CardContent
					className={expandido !== id ? classes.root : ''}
					style={{padding: disabledPadding ? '0 18px 0 0' : '0 18px'}}
				>
					<Collapse in={expandido === id} timeout='auto' unmountOnExit>
						{children}
					</Collapse>
				</CardContent>
			</Card>
		</>
	);
};
