import React from 'react';
import theme from 'theme';
import {CheckRedondoIcon, FlechaAbajoIcon} from 'assests/iconos';
import {useTranslation} from 'react-i18next';
import TarjetaBonificacion from '../TarjetaBonificacion';
import {TGruposBonificacion} from 'models';
import {useContador, useMostrarAviso} from 'hooks';
import {useAppDispatch, useObtenerVisitaActual} from 'redux/hooks';
import {cambiarSeQuedaAEditar} from 'redux/features/visitaActual/visitaActualSlice';
import {BotonSmall, MaterialSelect} from 'components/UI';
import {
	Box,
	capitalize,
	Card,
	Collapse,
	Divider,
	Typography,
} from '@mui/material';

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
	aplicacionBonificacion,
	resetBonificaciones,
}) => {
	const {t} = useTranslation();
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
	const [primerProductoAgregado, setPrimerProductoAgregado] =
		React.useState<boolean>(false);
	const [opciones, setOpciones] = React.useState<string>(
		grupoBonificacionesActivas?.nombreGrupo ?? grupos[0].nombreGrupo
	);
	const dispatch = useAppDispatch();

	const grupoSeleccionado = grupos.find(
		(grupo) => grupo.nombreGrupo === opciones
	);

	const mostrarAviso = useMostrarAviso();

	const [hayBonificaciones, setHayBonificaciones] =
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
		if (visitaActual.seQuedaAEditar.seQueda) {
			dispatch(cambiarSeQuedaAEditar({seQueda: true, bordeError: true}));
			mostrarAviso(
				'error',
				t('toast.errorBonificacionTotalTitulo'),
				t('toast.errorBonificacionTotalMensaje')
			);
			return;
		}

		if (visitaActual.seQuedaAEditar.bordeError) {
			dispatch(cambiarSeQuedaAEditar({seQueda: false, bordeError: false}));
		}
		setExpandido(id);
	};

	const indexBonificacion = visitaActual.bonificaciones.findIndex(
		(bonificacion) => bonificacion.idBonificacion === Number(id)
	);

	React.useEffect(() => {
		if (
			aplicacionBonificacion === 'Total' &&
			contador !== 0 &&
			contador !== grupoSeleccionado?.cantidadBeneficioGrupo
		) {
			dispatch(cambiarSeQuedaAEditar({seQueda: true, bordeError: false}));
			return;
		}

		if (visitaActual.seQuedaAEditar.seQueda) {
			dispatch(cambiarSeQuedaAEditar({seQueda: false, bordeError: false}));
		}
	}, [
		aplicacionBonificacion,
		contador,
		grupoSeleccionado?.cantidadBeneficioGrupo,
	]);

	const [bordeColor, setBordeColor] = React.useState<string>('#D9D9D9');

	const cantidadEjecutada = visitaActual.bonificaciones[
		indexBonificacion
	].detalle.reduce(
		(cantidad, bonificacion) => (cantidad += bonificacion.cantidad),
		0
	);

	const mostrarCheck =
		(hayBonificaciones && aplicacionBonificacion !== 'Total') ||
		(hayBonificaciones &&
			grupoSeleccionado?.cantidadBeneficioGrupo === cantidadEjecutada);

	React.useEffect(() => {
		if (hayBonificaciones) {
			if (
				(aplicacionBonificacion !== 'Total' && cantidadEjecutada > 0) ||
				(aplicacionBonificacion === 'Total' &&
					cantidadEjecutada === grupoSeleccionado?.cantidadBeneficioGrupo)
			) {
				setBordeColor(theme.palette.success.main);
				return;
			}

			if (visitaActual.seQuedaAEditar.bordeError) {
				setBordeColor(theme.palette.primary.main);
				return;
			}

			setBordeColor('#D9D9D9');
		}
	}, [
		hayBonificaciones,
		grupoSeleccionado?.cantidadBeneficioGrupo,
		visitaActual.seQuedaAEditar.bordeError,
		cantidadEjecutada,
	]);

	React.useEffect(() => {
		if (indexBonificacion > -1) {
			if (
				visitaActual.bonificaciones[indexBonificacion].detalle.length >= 1 &&
				!primerProductoAgregado
			) {
				setPrimerProductoAgregado(true);
			}
		}
	}, []);

	React.useEffect(() => {
		if (indexBonificacion > -1) {
			if (
				visitaActual.bonificaciones[indexBonificacion].detalle.length === 1 &&
				!primerProductoAgregado &&
				focusId !== ''
			) {
				setPrimerProductoAgregado(true);
				mostrarAviso(
					'success',
					t('toast.bonificacionAgregada'),
					undefined,
					undefined,
					'bonificacionAgregada'
				);
			}
			if (
				visitaActual.bonificaciones[indexBonificacion].detalle.length === 0 &&
				primerProductoAgregado
			) {
				setPrimerProductoAgregado(false);
			}
			if (visitaActual.bonificaciones[indexBonificacion].detalle.length > 0) {
				return setHayBonificaciones(true);
			}
		}
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
		if (resetBonificaciones) {
			reiniciar();
			setOpciones(grupos[0].nombreGrupo);
			setPrimerProductoAgregado(false);
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
						<Box display='flex' justifyContent='flex-end'>
							<CheckRedondoIcon height='20px' width='20px' />
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
							<MaterialSelect
								state={capitalize(opciones)}
								setState={setOpciones}
								opciones={[...grupos.map((grupo) => grupo.nombreGrupo)]}
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
									errorAplicacionTotal={visitaActual.seQuedaAEditar.bordeError}
									statefocusId={{focusId, setFocusId}}
									statePrimerProductoAgregado={{
										primerProductoAgregado,
										setPrimerProductoAgregado,
									}}
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
					<BotonSmall
						fullWidth
						onClick={() => manejadorExpandido(expandido === id ? false : id)}
					>
						<Typography
							fontFamily='Open Sans'
							variant='caption'
							color='secondary'
						>
							{expandido === id
								? t('general.ocultarDetalle')
								: t('general.verDetalle')}
						</Typography>
						<FlechaAbajoIcon
							height={10}
							style={{
								transition: 'transform 0.3s ease-in-out',
								transform:
									expandido === id ? 'rotateX(180deg)' : 'rotate(0deg)',
							}}
							width={10}
						/>
					</BotonSmall>
				</Box>
			</Box>
		</Card>
	);
};

export default DesplegableBonificaciones;
