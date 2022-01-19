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
import flechaAbajo from '../../../assests/iconos/chevron--down.svg';
import Chip from '@mui/material/Chip';
import {styled} from '@mui/material/styles';
import {AvisoIcon, FlechaAbajoIcon} from 'assests/iconos';
import {useMostrarAviso} from 'hooks';
import Modal from '../Modal';
import {useAppDispatch, useObtenerVisitaActual} from 'redux/hooks';
import {
	cambiarEstadoIniciativa,
	cambiarSeQuedaAEditar,
} from 'redux/features/visitaActual/visitaActualSlice';
import {TIniciativasCliente} from 'models';
import {useTranslation} from 'react-i18next';

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

type Props = {
	setExpandido: Dispatch<SetStateAction<string | boolean>>;
	expandido: string | boolean;
	titulo: React.ReactNode;
	subTitulo?: React.ReactNode;
	id: string;
	cantidadItems?: number;
	disabled?: boolean;
	mensaje?: React.ReactNode;
	valido?: boolean;
	labelChip?: string | React.ReactNode;
	dataCy: string;
	disabledPadding?: boolean;
	mostrarAvisoAlCerrar?: boolean;
	contenidoMensajeAviso?: {
		tipo: 'default' | 'error' | 'success' | 'warning' | 'info';
		titulo: string;
		mensaje?: string;
		opciones?: any;
		dataCy?: string;
	};
	iniciativasEjecutadasSinCantidad?: TIniciativasCliente;
};

export const TarjetaColapsable: React.FC<Props> = ({
	children,
	setExpandido,
	titulo,
	subTitulo,
	expandido,
	id,
	cantidadItems,
	disabled,
	mensaje,
	valido = false,
	labelChip,
	dataCy,
	contenidoMensajeAviso,
	mostrarAvisoAlCerrar,
	iniciativasEjecutadasSinCantidad,
	disabledPadding,
}) => {
	const mostrarAviso = useMostrarAviso();
	const classes = useEstilos({valido, open: expandido === id});
	const [alerta, setAlerta] = React.useState<boolean>(false);
	const [cacheId, setCacheId] = React.useState<string | boolean>(expandido);
	const dispatch = useAppDispatch();
	const visitaActual = useObtenerVisitaActual();
	const {t} = useTranslation();

	const manejadorExpandido = (id: string | boolean) => {
		if (iniciativasEjecutadasSinCantidad) {
			setAlerta(true);
			setCacheId(id);
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
				t('advertencias.excedeMayorPermitido'),
				t('advertencias.excedeMayorPermitidoSubtitulo'),
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
						dispatch(
							cambiarEstadoIniciativa({
								estado: 'pendiente',
								codigoIniciativa:
									iniciativasEjecutadasSinCantidad?.idMaterialIniciativa ?? 0,
							})
						);
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
				sx={{overflow: 'visible', position: 'relative'}}
				data-cy={'tarjeta-' + dataCy}
			>
				<CardHeader
					style={{padding: '0 18px'}}
					title={
						<Box display='flex' justifyContent='space-between'>
							<Box alignSelf='center' data-cy={'titulo-' + dataCy}>
								{titulo}
							</Box>
							<Box>
								<CardActions disableSpacing style={{padding: 0}}>
									{cantidadItems !== undefined && cantidadItems > 0 && (
										<ChipStyled
											size='small'
											label={labelChip}
											className={classes.root}
										/>
									)}
									{!disabled ? (
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
						<Box marginTop='5px'>
							<Typography variant='body3' fontFamily='Open Sans'>
								{subTitulo}
							</Typography>
							{disabled ? <p data-cy={'mensaje-' + dataCy}>{mensaje}</p> : null}
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
