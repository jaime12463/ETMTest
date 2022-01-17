import React, {useState} from 'react';
import {
	InputsKeysFormTomaDePedido,
	TClienteActual,
	TFormTomaDePedido,
	TPrecioProducto,
	TCliente,
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
	useObtenerCreditoDisponible,
	useObtenerDatosCliente,
	useObtenerTotalPedidosVisitaActual,
} from 'hooks';
import visitaActualSlice, {
	agregarProductoDelPedidoActual,
	cambiarSeQuedaAEditar,
} from 'redux/features/visitaActual/visitaActualSlice';

import {Dialogo, SwipeBorrar} from 'components/UI';
import {AutocompleteSeleccionarProducto} from 'components/Negocio';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import {BorrarIcon} from 'assests/iconos';
import {styled} from '@mui/material/styles';
import {useBorrarLinea, useBorrarTodoTomaPedido} from '../hooks';
import {useMostrarAdvertenciaEnDialogo} from 'hooks';
import useEstilos from '../useEstilos';
import {SwitchCambiarTipoPago} from '../components';
import {useTranslation} from 'react-i18next';
import {useSnackbar} from 'notistack';
import Modal from 'components/UI/Modal';
import TarjetaTomaPedido from 'components/UI/TarjetaTomaPedido';
import TarjetaPromoPush from 'pages/Pasos/2_TomaDePedido/PromoPush/TarjetaPromoPush';

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
	const creditoDisponible = useObtenerCreditoDisponible().creditoDisponible;
	const obtenerTotalPedidosVisitaActual = useObtenerTotalPedidosVisitaActual();
	const [preciosProductos, setPreciosProductos] = React.useState<
		TPrecioProducto[]
	>([]);
	const [expandidoPromoPush, setExpandidoexpandidoPromoPush] = React.useState<
		string | boolean
	>(false);
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
	const mostrarAviso = useMostrarAviso();
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const datosCliente: TCliente | undefined = obtenerDatosCliente(
		clienteActual.codigoCliente
	);

	const borrarTodosLosProductos = useBorrarTodoTomaPedido(
		{setAlerta, setConfigAlerta},
		venta.productos
	);

	const {configuracionPedido}: any = datosCliente;

	const borrarlinea = useBorrarLinea({setAlerta, setConfigAlerta});

	React.useEffect(() => {
		if (
			!visitaActual.seQuedaAEditar.seQueda &&
			visitaActual.seQuedaAEditar.bordeError &&
			venta.productos.every((producto) => {
				if (producto.unidadesDisponibles) {
					return producto.unidades <= producto.unidadesDisponibles;
				}

				return (
					(producto.unidades > 0 &&
						producto.unidades <= configuracionPedido.cantidadMaximaUnidades) ||
					producto.subUnidades > 0
				);
			})
		) {
			dispatch(cambiarSeQuedaAEditar({seQueda: false, bordeError: false}));
		}
	}, [visitaActual.seQuedaAEditar.seQueda, venta.productos]);

	React.useEffect(() => {
		if (
			datosCliente?.informacionCrediticia.condicion !== 'contado' &&
			creditoDisponible -
				(obtenerTotalPedidosVisitaActual().totalCredito.totalPrecio ?? 0) <
				0
		) {
			mostrarAviso(
				'warning',
				'Limite de credito excedido',
				'este cliente ha excedido su limite de crédito, por lo que no se podra levantar pedidos a crédito',
				undefined,
				'sinLimiteCredito'
			);
		}
	}, [venta.productos]);

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
			mostrarAviso(
				'success',
				'Se ha ingresado el producto exitosamente',
				undefined,
				undefined,
				'productoIngresado'
			);
		}
	}, [productoActual?.codigoProducto]);

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
					{venta?.productos?.length > 0 &&
						venta?.productos?.some(
							(producto) => producto.unidades > 0 || producto.subUnidades > 0
						) && (
							<>
								<SwitchCambiarTipoPago />
								<Chip
									className={classes.root}
									size='small'
									icon={<BorrarIcon width='7.5px' height='7.5px' />}
									label={<TextStyled>Borrar todo</TextStyled>}
									sx={{'&:hover': {background: 'none'}}}
									onClick={() => borrarTodosLosProductos()}
								/>
							</>
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
									manejadorGesto={() => borrarlinea(producto)}
								>
									{producto.promoPush ? (
										<TarjetaPromoPush
											key={producto.codigoProducto}
											item={producto}
											id={producto.nombreProducto}
											expandidoPromoPush={expandidoPromoPush}
											setExpandidoexpandidoPromoPush={
												setExpandidoexpandidoPromoPush
											}
											mostrarAdvertenciaEnDialogo={mostrarAdvertenciaEnDialogo}
											stateFocusId={{focusId, setFocusId}}
											stateInputFocus={stateInputFocus}
										/>
									) : (
										<TarjetaTomaPedido
											producto={producto}
											stateFocusId={{focusId, setFocusId}}
											stateInputFocus={stateInputFocus}
											bordeRedondeado
											conSwitch
											stateAviso={{setAlerta, setConfigAlerta}}
										/>
									)}
								</SwipeBorrar>
							);
						})}
			</Stack>
		</>
	);
};
export default TomaPedido;
