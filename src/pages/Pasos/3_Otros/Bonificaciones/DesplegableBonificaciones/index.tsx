import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import {styled} from '@mui/material/styles';
import clsx from 'clsx';
import theme from 'theme';
import {CheckRedondoIcon, FlechaAbajoIcon} from 'assests/iconos';
import {useTranslation} from 'react-i18next';
import useEstilos from './useEstilos';
import CustomSelect from 'components/UI/CustomSelect';
import TarjetaBonificacion from '../TarjetaBonificacion';
import {TGruposBonificacion} from 'models';
import {useContador, useMostrarAviso} from 'hooks';
import {useObtenerProductoPorCodigo} from 'hooks/useObtenerProductoPorCodigo';
import {useAppDispatch, useObtenerVisitaActual} from 'redux/hooks';
import {eliminarBonificacionesGrupo} from 'redux/features/visitaActual/visitaActualSlice';

const ButtonStyled = styled(Button)(() => ({
	border: '1.5px solid #651C32',
	boxSizing: 'border-box',
	borderRadius: '20px',
	minHeight: '10px',
	height: '16px',
	textTransform: 'none',
	'&:hover': {
		background: 'none',
	},
}));

interface Props {
	id: string;
	expandido: string | boolean;
	setExpandido: React.Dispatch<React.SetStateAction<string | boolean>>;
	nombre: string;
	grupos: TGruposBonificacion[];
	vigenciaInicioBonificacion: string;
	vigenciaFinBonificacion: string;
	aplicacionBonificacion: string;
	resetBonificaciones: boolean;
}

const DesplegableBonificaciones: React.FC<Props> = ({
	id,
	expandido,
	setExpandido,
	nombre,
	grupos,
	vigenciaInicioBonificacion,
	vigenciaFinBonificacion,
	aplicacionBonificacion,
	resetBonificaciones,
}) => {
	const {t} = useTranslation();
	const classes = useEstilos();
	const visitaActual = useObtenerVisitaActual();

	const grupoConBonificaiones = visitaActual.bonificaciones.find(
		(bonificacion) => {
			return bonificacion.detalle.length > 0;
		}
	);

	const grupoBonificacionesActivas = grupos.find((grupo) => {
		if (grupo.idGrupo === grupoConBonificaiones?.detalle[0]?.idGrupo) {
			return grupo;
		}
	});

	const [focusId, setFocusId] = React.useState<string>('');

	const [opciones, setOpciones] = React.useState<string>(
		grupoBonificacionesActivas?.nombreGrupo.toLowerCase() ??
			grupos[0].nombreGrupo.toLowerCase()
	);
	const dispatch = useAppDispatch();
	const grupoSeleccionado = grupos.find(
		(grupo) => grupo.nombreGrupo.toLowerCase() === opciones
	);

	const mostrarAviso = useMostrarAviso();

	const [hayBonificaciones, setHayBonificaciones] =
		React.useState<boolean>(false);

	const [errorAplicacionTotal, setErrorAplicacionTotal] =
		React.useState<boolean>(false);

	const {
		contador,
		incrementar,
		decrementar,
		reiniciar,
		estadoInicial,
		actualizarContador,
	} = useContador(grupoSeleccionado?.cantidadBeneficioGrupo);

	const manejadorExpandido = (id: string | boolean) => {
		if (typeof id === 'boolean' && aplicacionBonificacion === 'Total') {
			if (
				contador !== 0 &&
				contador !== grupoSeleccionado?.cantidadBeneficioGrupo
			) {
				setErrorAplicacionTotal(true);
				return;
			}
		}
		setErrorAplicacionTotal(false);
		setExpandido(id);
	};

	let bordeColor = '#D9D9D9';

	if (hayBonificaciones) {
		if (aplicacionBonificacion !== 'Total') {
			bordeColor = theme.palette.success.main;
		} else if (contador === 0) {
			bordeColor = theme.palette.success.main;
		} else if (errorAplicacionTotal) {
			bordeColor = theme.palette.primary.main;
		}
	}

	const mostrarCheck =
		(hayBonificaciones && aplicacionBonificacion !== 'Total') ||
		(hayBonificaciones && contador === 0);

	const indexBonificacion = visitaActual.bonificaciones.findIndex(
		(bonificacion) => bonificacion.idBonificacion === Number(id)
	);

	React.useEffect(() => {
		if (indexBonificacion > -1) {
			if (visitaActual.bonificaciones[indexBonificacion].detalle.length > 0) {
				return setHayBonificaciones(true);
			}
		}
		setErrorAplicacionTotal(false);
		setHayBonificaciones(false);
	}, [visitaActual.bonificaciones[indexBonificacion].detalle]);

	React.useEffect(() => {
		if (grupoBonificacionesActivas?.nombreGrupo) {
			if (grupoBonificacionesActivas?.nombreGrupo !== opciones) {
				const indexBonificacion = visitaActual.bonificaciones.findIndex(
					(bonificacion) => bonificacion.idBonificacion === Number(id)
				);

				if (indexBonificacion > -1) {
					const idGrupo = grupos.find(
						(grupo) =>
							grupo.nombreGrupo ===
							opciones.charAt(0).toUpperCase() + opciones.slice(1)
					)?.idGrupo;

					const hayDelGrupo = visitaActual.bonificaciones[
						indexBonificacion
					].detalle.some((bonificacion) => bonificacion.idGrupo === idGrupo);

					if (hayDelGrupo) {
						return;
					}
				}

				reiniciar();
			}
		}
	}, [opciones]);

	React.useEffect(() => {
		if (aplicacionBonificacion === 'Total' && contador === 0) {
			setErrorAplicacionTotal(false);
		}
	}, [contador]);

	React.useEffect(() => {
		if (errorAplicacionTotal) {
			mostrarAviso(
				'error',
				'Error en bonificación total',
				'Esta bonificación tiene que ser de aplicación total. Favor de modificar cantidades.'
			);
		}
	}, [errorAplicacionTotal]);

	React.useEffect(() => {
		if (resetBonificaciones) {
			reiniciar();
			setOpciones(grupos[0].nombreGrupo.toLowerCase());
			setErrorAplicacionTotal(false);
		}
	}, [resetBonificaciones]);

	return (
		<Card
			style={{
				boxShadow: 'none',
				overflow: 'visible',
			}}
		>
			<Box border={`1px solid ${bordeColor}`} borderRadius='4px'>
				<Box
					align-items='center'
					color={expandido === id ? '#fff' : '#000'}
					borderRadius='4px 4px 0 0 '
					display='flex'
					flexDirection='column'
					justifyContent='space-between'
					padding={
						expandido === id ? '12px 14px 12px 14px' : '12px 14px 8px 14px'
					}
					sx={{
						background:
							expandido === id ? theme.palette.secondary.light : 'none',
						borderBottom: 'none',
						transition: 'all 0.3s ease-in-out',
					}}
				>
					{mostrarCheck && (
						<Box display='flex' justifyContent='end'>
							<CheckRedondoIcon
								height='20px'
								width='20px'
								fill={theme.palette.success.main}
							/>
						</Box>
					)}
					<Box display='flex' flexDirection='column' gap='2px'>
						<Typography variant='subtitle3' fontFamily='Open Sans'>
							{id}
						</Typography>
						<Typography variant='subtitle3'>{nombre}</Typography>
					</Box>
				</Box>
				<Collapse in={expandido === id} timeout='auto' unmountOnExit>
					<Box borderBottom='none' borderTop='none' padding='10px 0'>
						<Box
							alignItems='center'
							display='flex'
							justifyContent='space-between'
							marginBottom='8px'
							padding='0 14px'
						>
							<Typography variant='subtitle3' fontFamily='Open Sans'>
								Grupos
							</Typography>
							<Typography
								variant='subtitle3'
								fontFamily='Open Sans'
								color={theme.palette.primary.main}
							>
								Aplicación Máxima {contador}
							</Typography>
						</Box>
						<Box marginBottom='10px' padding='0 14px'>
							<CustomSelect
								opcionSeleccionada={opciones}
								opciones={[...grupos.map((grupo) => grupo.nombreGrupo)]}
								setOpcion={setOpciones}
								dataCy='select-bonificaciones'
							/>
						</Box>
						<Typography
							fontFamily='Open Sans'
							fontSize='12px'
							fontWeight='700'
							padding='0 14px'
							marginBottom='10px'
							letterSpacing='-0.48px'
						>
							Beneficios
						</Typography>
						<Divider />
						{grupoSeleccionado?.productosBeneficioGrupo?.map((producto) => (
							<Box key={producto}>
								<TarjetaBonificacion
									codigoProducto={producto}
									unidadMedida={grupoSeleccionado.unidadMedida}
									incrementar={incrementar}
									decrementar={decrementar}
									reiniciar={reiniciar}
									contador={contador}
									estadoInicial={estadoInicial}
									idBonificacion={Number(id)}
									idGrupo={grupoSeleccionado.idGrupo}
									resetBonificaciones={resetBonificaciones}
									actualizarContador={actualizarContador}
									errorAplicacionTotal={errorAplicacionTotal}
									statefocusId={{focusId, setFocusId}}
								/>
								<Divider />
							</Box>
						))}
					</Box>
				</Collapse>
				<Box
					padding={expandido === id ? '0 14px 12px 14px' : '0 14px 12px 14px'}
					sx={{
						borderTop: 'none',
					}}
				>
					<ButtonStyled
						disableFocusRipple
						fullWidth
						disableRipple
						onClick={() => manejadorExpandido(expandido === id ? false : id)}
					>
						<CardActions disableSpacing style={{padding: 0}}>
							<Box display='flex' gap='6px' alignItems='center'>
								<Typography variant='caption' color='secondary'>
									{expandido === id
										? t('general.ocultarDetalle')
										: t('general.verDetalle')}
								</Typography>
								<Box
									className={clsx(classes.expand, {
										[classes.expandOpen]: expandido === id ? true : false,
									})}
									aria-expanded={expandido === id ? true : false}
									style={{padding: 0}}
								>
									<FlechaAbajoIcon width='10px' height='10px' />
								</Box>
							</Box>
						</CardActions>
					</ButtonStyled>
				</Box>
			</Box>
		</Card>
	);
};

export default DesplegableBonificaciones;
