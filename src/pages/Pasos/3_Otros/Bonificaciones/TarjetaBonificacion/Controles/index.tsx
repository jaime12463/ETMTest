import React from 'react';
import {Box, IconButton} from '@mui/material';
import {
	AgregarRedondoIcon,
	AvisoIcon,
	BotellaIcon,
	CajaIcon,
	QuitarRellenoIcon,
} from 'assests/iconos';
import {useAppDispatch, useObtenerVisitaActual} from 'redux/hooks';
import {
	agregarBonificacion,
	eliminarBonificacion,
	eliminarBonificacionesGrupo,
} from 'redux/features/visitaActual/visitaActualSlice';
import {TDetalleBonificacionesCliente, TPrecioProducto} from 'models';
import {InputCantidades, InputPropsEstilos, Modal} from 'components/UI';
import {Contador, useMostrarAviso} from 'hooks';
import {useTranslation} from 'react-i18next';

interface Props {
	contador: Contador;
	idBonificacion: number;
	idGrupo: number;
	producto: TPrecioProducto | TDetalleBonificacionesCliente;
	resetBonificaciones: boolean;
	statefocusId: any;
	statePrimerProductoAgregado: any;
	unidadMedida: string;
}

const Controles: React.VFC<Props> = ({
	contador: {
		actualizarContador,
		contador,
		decrementar,
		estadoInicial,
		incrementar,
		reiniciar,
	},
	idBonificacion,
	idGrupo,
	producto,
	resetBonificaciones,
	statefocusId,
	unidadMedida,
}) => {
	const visitaActual = useObtenerVisitaActual();
	const [alerta, setAlerta] = React.useState<boolean>(false);
	const mostrarAviso = useMostrarAviso();
	const {setFocusId} = statefocusId;
	const {t} = useTranslation();

	const bonificacionEjecutada = visitaActual.bonificaciones.find(
		(bonificacion) => {
			if (bonificacion.idBonificacion === idBonificacion) {
				return bonificacion;
			}
		}
	);

	const productoBonificacion = bonificacionEjecutada?.detalle.find(
		(detalle) => {
			if (detalle.codigoProducto === producto.codigoProducto) {
				return detalle;
			}
		}
	);

	const hayBonificacionesDistintoGrupo = () => {
		if (bonificacionEjecutada) {
			if (bonificacionEjecutada.detalle.length > 0) {
				if (bonificacionEjecutada.detalle[0].idGrupo !== idGrupo) {
					return true;
				}
			}
		}

		return false;
	};

	const indexBonificacion = visitaActual.bonificaciones.findIndex(
		(bonificacion) => bonificacion.idBonificacion === idBonificacion
	);

	const totalCantidadBonificaciones = visitaActual.bonificaciones[
		indexBonificacion
	].detalle.reduce((total, detalle) => total + detalle.cantidad, 0);

	const [cantidad, setCantidad] = React.useState<number>(
		productoBonificacion?.cantidad ?? 0
	);
	const [cantidadTemporal, setCantidadTemporal] = React.useState<number>(0);
	const [puedeAgregar, setPuedeAgregar] = React.useState<boolean>(false);
	const dispatch = useAppDispatch();

	const useEstilosProps: InputPropsEstilos = {
		bordeError:
			estadoInicial - totalCantidadBonificaciones < 0 ||
			visitaActual.seQuedaAEditar.bordeError ||
			visitaActual.seQuedaAEditar.seQueda,
		cantidadMaximaConfig: 0,
		unidades: cantidad,
	};

	React.useEffect(() => {
		actualizarContador(totalCantidadBonificaciones);
	}, [totalCantidadBonificaciones]);

	React.useEffect(() => {
		if (puedeAgregar) {
			if (cantidad === 0) {
				dispatch(
					eliminarBonificacion({
						codigoProducto: producto.codigoProducto,
						idBonificacion,
					})
				);
				setPuedeAgregar(false);
				return;
			}

			dispatch(
				agregarBonificacion({
					idBonificacion,
					bonificacion: {
						codigoProducto: producto.codigoProducto,
						numeroPedido: '',
						cantidad,
						idGrupo,
						unidadMedida,
					},
				})
			);
		}
		return () => setPuedeAgregar(false);
	}, [puedeAgregar]);

	React.useEffect(() => {
		if (resetBonificaciones) {
			setCantidad(0);
		}
	}, [resetBonificaciones]);

	// const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
	// 	if (e.key === 'Enter') {
	// 		if (estadoInicial - totalCantidadBonificaciones < 0) {
	// 			mostrarAviso(
	// 				'error',
	// 				t('toast.errorBonificacionExcedeCantidadTitulo'),
	// 				t('toast.errorBonificaionExcedeCantidadMensaje')
	// 			);
	// 			setCantidad(productoBonificacion?.cantidad ?? 0);
	// 			return;
	// 		}
	// 		if (estadoInicial - totalCantidadBonificaciones < 0) {
	// 			mostrarAviso(
	// 				'error',
	// 				t('toast.errorBonificacionExcedeCantidadTitulo'),
	// 				t('toast.errorBonificaionExcedeCantidadMensaje')
	// 			);
	// 			setCantidad(productoBonificacion?.cantidad ?? 0);
	// 			return;
	// 		}
	// 		setPuedeAgregar(true);
	// 	}
	// };

	// const handleBlur = () => {
	// 	if (estadoInicial - totalCantidadBonificaciones < 0) {
	// 		mostrarAviso(
	// 			'error',
	// 			t('toast.errorBonificacionExcedeCantidadTitulo'),
	// 			t('toast.errorBonificaionExcedeCantidadMensaje')
	// 		);
	// 		setCantidad(productoBonificacion?.cantidad ?? 0);
	// 		return;
	// 	}

	// 	setPuedeAgregar(true);
	// };

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (hayBonificacionesDistintoGrupo()) {
			setAlerta((prevAlerta) => !prevAlerta);

			setCantidadTemporal(Number(e.target.value.replace(/[^0-9]/g, '')));
			return;
		}

		setCantidad(Number(e.target.value.replace(/[^0-9]/g, '')));
		setPuedeAgregar(true);
	};

	const handleButtons = (e: React.MouseEvent<HTMLButtonElement>) => {
		const {name} = e.currentTarget;

		if (hayBonificacionesDistintoGrupo()) {
			setAlerta((prevAlerta) => !prevAlerta);
			setCantidadTemporal(1);
			return;
		}

		if (name === '-') {
			setCantidad((prevCantidad) => {
				if (prevCantidad > 0) return prevCantidad - 1;
				return 0;
			});
			setFocusId(producto.codigoProducto);
			setPuedeAgregar(true);
		}

		if (name === '+') {
			setCantidad((prevCantidad) => {
				return prevCantidad + 1 > estadoInicial
					? estadoInicial
					: prevCantidad + 1;
			});
			setFocusId(producto.codigoProducto);
			setPuedeAgregar(true);
		}
	};

	return (
		<>
			<Modal
				alerta={alerta}
				setAlerta={setAlerta}
				contenidoMensaje={{
					titulo: t('modal.bonificacionActivaTitulo'),
					mensaje: t('modal.bonificacionActivaMensaje'),
					callbackAceptar: () => {
						reiniciar();
						dispatch(eliminarBonificacionesGrupo({idBonificacion}));
						setCantidad(cantidadTemporal);
						setPuedeAgregar(true);
					},
					tituloBotonAceptar: t('general.reiniciar'),
					tituloBotonCancelar: t('general.cancelar'),
					iconoMensaje: <AvisoIcon />,
				}}
			/>
			<Box flex='1' padding='19px 14px 8px 0' sx={{background: '#F5F0EF'}}>
				<Box
					alignItems='center'
					display='flex'
					justifyContent='flex-end'
					gap='2px'
				>
					{unidadMedida === 'Unidad' ? (
						<CajaIcon height={18} width={18} />
					) : (
						<BotellaIcon height={18} width={18} />
					)}
					<IconButton
						sx={{marginLeft: '2px', padding: 0}}
						name='-'
						onClick={handleButtons}
						disabled={cantidad === 0}
					>
						<QuitarRellenoIcon
							height={18}
							width={18}
							disabled={cantidad === 0}
						/>
					</IconButton>
					<InputCantidades
						id='unidades_producto'
						name='unidades'
						// onBlur={handleBlur}
						onChange={handleChange}
						onFocus={(e) => {
							e.target.select();
							setFocusId(producto.codigoProducto);
						}}
						// onKeyDown={handleKeyPress}
						value={cantidad}
						useEstilosProps={useEstilosProps}
					/>

					<IconButton
						sx={{padding: '0'}}
						size='small'
						name='+'
						onClick={handleButtons}
						disabled={contador === 0}
					>
						<AgregarRedondoIcon
							width={18}
							height={18}
							disabled={contador === 0}
						/>
					</IconButton>
				</Box>
			</Box>
		</>
	);
};

export default Controles;
