import React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import {
	AgregarRedondoIcon,
	AvisoIcon,
	CajaIcon,
	QuitarRellenoIcon,
} from 'assests/iconos';
import useEstilos from '../useEstilos';
import theme from 'theme';
import {useAppDispatch, useObtenerVisitaActual} from 'redux/hooks';
import {
	agregarBonificacion,
	eliminarBonificacion,
	eliminarBonificacionesGrupo,
} from 'redux/features/visitaActual/visitaActualSlice';
import {TDetalleBonificacionesCliente, TPrecioProducto} from 'models';
import Modal from 'components/UI/Modal';

interface Props {
	contador: number;
	estadoInicial: number;
	incrementar: (cantidad?: number) => void;
	decrementar: (cantidad?: number) => void;
	reiniciar: () => void;
	idBonificacion: number;
	producto: TPrecioProducto | TDetalleBonificacionesCliente;
	unidadMedida: string;
	idGrupo: number;
	resetBonificaciones: boolean;
	actualizarContador: (cantidad: number) => void;
}

const Controles: React.FC<Props> = ({
	contador,
	estadoInicial,
	incrementar,
	decrementar,
	reiniciar,
	idBonificacion,
	producto,
	unidadMedida,
	idGrupo,
	resetBonificaciones,
	actualizarContador,
}) => {
	const classes = useEstilos();
	const visitaActual = useObtenerVisitaActual();
	const [alerta, setAlerta] = React.useState<boolean>(false);

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

	React.useEffect(() => {
		actualizarContador(totalCantidadBonificaciones);
	}, [totalCantidadBonificaciones]);

	React.useEffect(() => {
		if (puedeAgregar) {
			if (cantidad === 0) {
				dispatch(
					eliminarBonificacion({codigoProducto: producto.codigoProducto})
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
			setPuedeAgregar(false);
		}
	}, [puedeAgregar]);

	React.useEffect(() => {
		if (resetBonificaciones) {
			setCantidad(0);
		}
	}, [resetBonificaciones]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (hayBonificacionesDistintoGrupo()) {
			setAlerta((prevAlerta) => !prevAlerta);
			setCantidadTemporal(Number(e.target.value.replace(/[^0-9]/g, '')));
			return;
		}

		if (estadoInicial - Number(e.target.value.replace(/[^0-9]/g, '')) < 0) {
			setCantidad(productoBonificacion?.cantidad ?? 0);
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
			incrementar();
			setCantidad((prevCantidad) => {
				if (prevCantidad > 0) return prevCantidad - 1;
				return 0;
			});
			setPuedeAgregar(true);
		}

		if (name === '+') {
			decrementar();
			setCantidad((prevCantidad) => {
				return prevCantidad + 1 > estadoInicial
					? estadoInicial
					: prevCantidad + 1;
			});
			setPuedeAgregar(true);
		}
	};

	return (
		<>
			<Modal
				alerta={alerta}
				setAlerta={setAlerta}
				contenidoMensaje={{
					titulo: 'Ya tienes una bonificación activa',
					mensaje:
						'Si decides agregar una bonificacion, la del otro grupo se perderá',
					callbackAceptar: () => {
						reiniciar();
						dispatch(eliminarBonificacionesGrupo({idBonificacion}));
						setCantidad(cantidadTemporal);
						setPuedeAgregar(true);
					},
					tituloBotonAceptar: 'Reiniciar',
					tituloBotonCancelar: 'Cancelar',
					iconoMensaje: <AvisoIcon />,
				}}
			/>
			<Box flex='1' padding='19px 14px 8px 0' sx={{background: '#F5F0EF'}}>
				<Box alignItems='center' display='flex' justifyContent='end' gap='2px'>
					<CajaIcon height='18px' width='18px' />
					<IconButton
						sx={{padding: 0}}
						name='-'
						onClick={handleButtons}
						disabled={cantidad === 0}
					>
						<QuitarRellenoIcon
							height='18px'
							width='18px'
							fill={cantidad === 0 ? '#D9D9D9' : theme.palette.secondary.dark}
						/>
					</IconButton>
					<Input
						autoComplete='off'
						className={classes.input}
						value={cantidad}
						onChange={handleChange}
						disableUnderline
						name='unidades'
						id='unidades_producto'
						onFocus={(e) => e.target.select()}
						inputProps={{
							style: {textAlign: 'center'},
							inputMode: 'numeric',
						}}
					/>
					<IconButton
						sx={{padding: '0'}}
						size='small'
						name='+'
						onClick={handleButtons}
						disabled={contador === 0}
					>
						<AgregarRedondoIcon
							width='18px'
							height='18px'
							fill={contador === 0 ? '#D9D9D9' : theme.palette.secondary.dark}
						/>
					</IconButton>
				</Box>
			</Box>
		</>
	);
};

export default Controles;
