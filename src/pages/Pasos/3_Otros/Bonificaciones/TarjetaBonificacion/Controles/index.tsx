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
import {useMostrarAviso} from 'hooks';

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
	errorAplicacionTotal: boolean;
	statefocusId: any;
	statePrimerProductoAgregado: any;
}

const Controles: React.VFC<Props> = ({
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
	errorAplicacionTotal,
	statefocusId,
}) => {
	const visitaActual = useObtenerVisitaActual();
	const [alerta, setAlerta] = React.useState<boolean>(false);
	const mostrarAviso = useMostrarAviso();
	const {setFocusId} = statefocusId;

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
		bordeError: errorAplicacionTotal,
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
			setPuedeAgregar(false);
		}
	}, [puedeAgregar]);

	React.useEffect(() => {
		if (resetBonificaciones) {
			setCantidad(0);
		}
	}, [resetBonificaciones]);

	const [cantidadBorrado, setCantidadBorrado] = React.useState<number | null>(
		null
	);
	const [cantidadBackspace, setCantidadBackspace] = React.useState<number>(0);

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Backspace') {
			setCantidadBackspace((prevBackspace) => prevBackspace + 1);
			setCantidadBorrado((prevCantidad) => {
				if (prevCantidad === null) {
					return cantidad % 10;
				}

				return cantidad * (cantidadBackspace * 10) + prevCantidad;
			});
			return;
		}

		if (e.key !== 'Enter' && e.key !== 'Backspace') {
			incrementar(cantidadBorrado ?? 0);
			setCantidadBackspace(0);
		}

		if (e.key === 'Enter') {
			if (contador - cantidad < 0) {
				mostrarAviso(
					'error',
					'La cantidad es mayor a la aplicacion maxima permitida'
				), //ToDo validar mensaje con funcional
					setCantidad(productoBonificacion?.cantidad ?? 0);

				return;
			}

			if (estadoInicial - cantidad < 0) {
				mostrarAviso(
					'error',
					'La cantidad es mayor a la aplicacion maxima permitida'
				), //ToDo validar mensaje con funcional
					setCantidad(productoBonificacion?.cantidad ?? 0);

				return;
			}

			setPuedeAgregar(true);
		}
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (estadoInicial - cantidad < 0) {
			mostrarAviso(
				'error',
				'La cantidad es mayor a la aplicacion maxima permitida'
			), //ToDo validar mensaje con funcional
				setCantidad(productoBonificacion?.cantidad ?? 0);
			return;
		}

		setPuedeAgregar(true);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (hayBonificacionesDistintoGrupo()) {
			setAlerta((prevAlerta) => !prevAlerta);

			setCantidadTemporal(Number(e.target.value.replace(/[^0-9]/g, '')));
			return;
		}

		setCantidad(Number(e.target.value.replace(/[^0-9]/g, '')));
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
			setFocusId(producto.codigoProducto);
			setPuedeAgregar(true);
		}

		if (name === '+') {
			decrementar();
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
				<Box
					alignItems='center'
					display='flex'
					justifyContent='flex-end'
					gap='2px'
				>
					{unidadMedida === 'Unidad' ? (
						<CajaIcon height='18px' width='18px' />
					) : (
						<BotellaIcon height='18px' width='18px' />
					)}
					<IconButton
						sx={{marginLeft: '2px', padding: 0}}
						name='-'
						onClick={handleButtons}
						disabled={cantidad === 0}
					>
						<QuitarRellenoIcon
							height='18px'
							width='18px'
							disabled={cantidad === 0}
						/>
					</IconButton>
					<InputCantidades
						id='unidades_producto'
						name='unidades'
						onBlur={handleBlur}
						onChange={handleChange}
						onFocus={(e) => {
							e.target.select();
							setFocusId(producto.codigoProducto);
						}}
						onKeyDown={handleKeyPress}
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
							width='18px'
							height='18px'
							disabled={contador === 0}
						/>
					</IconButton>
				</Box>
			</Box>
		</>
	);
};

export default Controles;
