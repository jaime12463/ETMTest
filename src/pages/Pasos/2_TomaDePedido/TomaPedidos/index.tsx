import React, {useState} from 'react';
import {
	InputsKeysFormTomaDePedido,
	TClienteActual,
	TFormTomaDePedido,
	TPrecioProducto,
	TProductoPedido,
	TPedido,
} from 'models';

import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {useForm} from 'react-hook-form';
import {
	useInicializarPreciosProductosDelClienteActual,
	useMostrarAviso,
} from 'hooks';
import {
	agregarProductoDelPedidoActual,
	editarProductoDelPedidoActual,
	borrarProductoDelPedidoActual,
	borrarProductosDeVisitaActual,
} from 'redux/features/visitaActual/visitaActualSlice';

import {Dialogo, SwipeBorrar} from 'components/UI';
import {AutocompleteSeleccionarProducto} from 'components/Negocio';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import {AvisoIcon, BorrarIcon} from 'assests/iconos';
import {styled} from '@mui/material/styles';
import Input from '@mui/material/Input';
import {useValidarBorrarPedido} from '../hooks';
import {useMostrarAdvertenciaEnDialogo, useBorrarTodoLosProductos} from 'hooks';
import useEstilos from '../useEstilos';
import {SwitchCambiarTipoPago} from '../components';
import {useTranslation} from 'react-i18next';
import {useSnackbar} from 'notistack';
import {AvisoDeshacer} from 'components/UI/AvisoContenido/AvisosPlantilla';
import Modal from 'components/UI/Modal';
import TarjetaTomaPedido from 'components/UI/TarjetaTomaPedido';

const TextStyled = styled(Typography)(() => ({
	color: '#651C32',
	fontSize: '10px',
}));

const TomaPedido: React.FC = () => {
	const {mostrarAdvertenciaEnDialogo, mostarDialogo, parametrosDialogo} =
		useMostrarAdvertenciaEnDialogo();

	const [configAlerta, setConfigAlerta] = useState({
		titulo: '',
		mensaje: '',
		tituloBotonAceptar: '',
		tituloBotonCancelar: '',
		iconoMensaje: <></>,
		callbackAceptar: () => {},
	});

	const {t} = useTranslation();
	const [alerta, setAlerta] = React.useState<boolean>(false);
	const [preciosProductos, setPreciosProductos] = React.useState<
		TPrecioProducto[]
	>([]);
	const [productoActual, setProductoActual] =
		React.useState<TPrecioProducto | null>(null);

	const [inputFocus, setInputFocus] =
		React.useState<InputsKeysFormTomaDePedido>('productoABuscar');

	const [focusId, setFocusId] = React.useState(0);
	const visitaActual = useObtenerVisitaActual();
	const {venta} = visitaActual.pedidos;
	const defaultValues: TFormTomaDePedido = {
		unidades: '',
		subUnidades: '',
		productoABuscar: '',
		tipoDePedido: visitaActual.tipoPedidoActual,
		catalogoMotivo: '',
	};
	const {control, handleSubmit, setValue, getValues} =
		useForm<TFormTomaDePedido>({defaultValues});
	const stateInputFocus = {inputFocus, setInputFocus};
	const hookForm = {control, handleSubmit, setValue, getValues};
	useInicializarPreciosProductosDelClienteActual(setPreciosProductos);
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const dispatch = useAppDispatch();
	const catalogoMotivo = '';
	const classes = useEstilos();

	const borrarTodosLosProductos = useBorrarTodoLosProductos(
		{setAlerta, setConfigAlerta},
		venta.productos
	);

	const validarBorrarPedido = useValidarBorrarPedido(
		mostrarAdvertenciaEnDialogo
	);

	React.useEffect(() => {
		if (productoActual !== null) {
			const productoEnPedido = venta.productos.find(
				(producto) => producto.codigoProducto === productoActual.codigoProducto
			);
			if (!productoEnPedido) {
				dispatch(
					agregarProductoDelPedidoActual({
						productoPedido: {
							...productoActual,
							unidades: 0,
							subUnidades: 0,
							total: 0,
							tipoPago: clienteActual.tipoPagoActual,
							catalogoMotivo,
							estado: 'activo',
							preciosBase: {
								unidad: productoActual.precioConImpuestoUnidad,
								subUnidad: productoActual.precioConImpuestoSubunidad,
							},
							preciosNeto: {
								unidad: productoActual.precioConImpuestoUnidad,
								subUnidad: productoActual.precioConImpuestoSubunidad,
							},
						},
					})
				);
			}
			setFocusId(productoActual.codigoProducto);
			setProductoActual(null);
		}
	}, [productoActual?.codigoProducto]);

	const {enqueueSnackbar, closeSnackbar} = useSnackbar();
	const cambiarEstadoProducto = (
		producto: TProductoPedido,
		nuevoEstado: 'activo' | 'eliminado' | 'borrardo' | 'transito'
	) => {
		if (nuevoEstado === 'borrardo') {
			//ToDo borrar
		} else {
			dispatch(
				editarProductoDelPedidoActual({
					productoPedido: {...producto, estado: nuevoEstado},
				})
			);
		}
	};

	const manejadorDeshacerGestoBorrar = (producto: TProductoPedido) => {
		cambiarEstadoProducto(producto, 'eliminado');

		const aviso = ({
			borrarProductosNoMandatorios,
			productosNoMandatorios,
		}: any) => {
			enqueueSnackbar(
				<AvisoDeshacer
					titulo='Tarjeta Eliminada'
					acciones={
						<>
							<Typography
								variant='caption'
								fontFamily='Poppins'
								color='#fff'
								sx={{cursor: 'pointer'}}
								onClick={() => {
									cambiarEstadoProducto(producto, 'activo');
									closeSnackbar(producto.codigoProducto);
								}}
							>
								Deshacer
							</Typography>
						</>
					}
				/>,
				{
					key: producto.codigoProducto,
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'center',
					},
					onClose: (event, reason, key) => {
						if (reason === 'timeout') {
							if (borrarProductosNoMandatorios) {
								productosNoMandatorios.forEach((pedido: TPedido) => {
									dispatch(
										borrarProductosDeVisitaActual({
											tipoPedidoActual: pedido.tipoPedido,
										})
									);
								});
							}
							return dispatch(
								borrarProductoDelPedidoActual({
									codigoProducto: producto.codigoProducto,
									codigoTipoPedidoActual: 'venta',
								})
							);
						}
					},
				}
			);
		};

		return validarBorrarPedido(aviso, cambiarEstadoProducto, producto);
	};

	return (
		<>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<Modal
				setAlerta={setAlerta}
				alerta={alerta}
				contenidoMensaje={configAlerta}
			/>
			<Stack spacing='10px'>
				<AutocompleteSeleccionarProducto
					hookForm={hookForm}
					stateProductoActual={{productoActual, setProductoActual}}
					statePreciosProductos={{preciosProductos, setPreciosProductos}}
					stateInputFocus={stateInputFocus}
				/>

				<Grid container alignItems='center' justifyContent='space-between'>
					<SwitchCambiarTipoPago />
					{venta.productos.length > 0 &&
						venta.productos.some(
							(producto) => producto.unidades > 0 || producto.subUnidades > 0
						) && (
							<Chip
								className={classes.root}
								size='small'
								icon={<BorrarIcon width='7.5px' height='7.5px' />}
								label={<TextStyled>Borrar todo</TextStyled>}
								sx={{'&:hover': {background: 'none'}}}
								onClick={() => {
									setConfigAlerta({
										titulo: '¿Quieres Borrar Todos Los Productos?',
										mensaje:
											'Todos los productos seleccionados se borraran de toma de pedido',
										tituloBotonAceptar: 'Borrar todo',
										tituloBotonCancelar: 'Cancelar',
										callbackAceptar: () => borrarTodosLosProductos(),
										iconoMensaje: <AvisoIcon />,
									});
									setAlerta(true);
								}}
							/>
						)}
				</Grid>

				{venta.productos.length > 0 &&
					venta.productos
						.filter((producto) => producto.estado === 'activo')
						.map((producto, i) => {
							return (
								<SwipeBorrar
									key={producto.codigoProducto}
									item={producto}
									manejadorGesto={() => {
										manejadorDeshacerGestoBorrar(producto);
										return 0;
									}}
								>
									<TarjetaTomaPedido
										producto={producto}
										stateFocusId={{focusId, setFocusId}}
										stateInputFocus={stateInputFocus}
										bordeRedondeado
										conSwitch
									/>
								</SwipeBorrar>
							);
						})}
			</Stack>
		</>
	);
};
export default TomaPedido;
