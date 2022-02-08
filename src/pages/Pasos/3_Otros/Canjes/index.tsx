import {
	InputsKeysFormTomaDePedido,
	TClienteActual,
	TFormTomaDePedido,
	TPrecioProducto,
} from 'models';
import {AutocompleteSeleccionarProducto} from 'components/Negocio';
import React, {useState} from 'react';
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
import {agregarProductoDelPedidoActual} from 'redux/features/visitaActual/visitaActualSlice';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import TarjetaCanjes from './TarjetaCanjes';
import {SwipeBorrar} from 'components/UI';
import {useBorrarLinea} from '../hooks/useBorrarLinea';
import {Box} from '@mui/material';
import Modal from 'components/UI/Modal';
import {BuscarIcon} from 'assests/iconos';

export const Canjes = () => {
	const [preciosProductos, setPreciosProductos] = React.useState<
		TPrecioProducto[]
	>([]);
	const [productoActual, setProductoActual] =
		React.useState<TPrecioProducto | null>(null);
	const [inputFocus, setInputFocus] =
		React.useState<InputsKeysFormTomaDePedido>('productoABuscar');
	const [focusId, setFocusId] = React.useState(0);
	const visitaActual = useObtenerVisitaActual();
	const [alerta, setAlerta] = React.useState<boolean>(false);
	const [configAlerta, setConfigAlerta] = useState({
		titulo: '',
		mensaje: '',
		tituloBotonAceptar: '',
		tituloBotonCancelar: '',
		iconoMensaje: <></>,
		callbackAceptar: () => {},
	});
	const {canje} = visitaActual.pedidos;

	const defaultValues: TFormTomaDePedido = {
		unidades: '',
		subUnidades: '',
		productoABuscar: '',
		tipoDePedido: visitaActual.tipoPedidoActual,
		catalogoMotivo: '',
	};
	const {control, handleSubmit, setValue, getValues} =
		useForm<TFormTomaDePedido>({
			defaultValues,
		});
	const dispatch = useAppDispatch();
	const hookForm = {control, handleSubmit, setValue, getValues};

	useInicializarPreciosProductosDelClienteActual(setPreciosProductos);
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const stateInputFocus = {inputFocus, setInputFocus};
	const mostrarAviso = useMostrarAviso();
	const [catalogoMotivo, setCatalogoMotivo] = useState({});
	const borrarLinea = useBorrarLinea({setAlerta, setConfigAlerta});

	React.useEffect(() => {
		if (productoActual !== null) {
			const productoEnPedido = canje.productos.find(
				(producto) => producto.codigoProducto === productoActual.codigoProducto
			);

			if (!productoEnPedido) {
				dispatch(
					agregarProductoDelPedidoActual({
						productoPedido: {
							...productoActual,
							unidades: 0,
							subUnidades: 0,
							total:
								productoActual.precioConImpuestoUnidad * 0 +
								productoActual.precioConImpuestoSubunidad * 0,
							tipoPago: clienteActual.tipoPagoActual,
							catalogoMotivo: '',
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
				mostrarAviso(
					'success',
					'Producto ingresado correctamente',
					undefined,
					undefined,
					'productoIngresado'
				);
			}
			setFocusId(productoActual.codigoProducto);
			setProductoActual(null);
		}
	}, [productoActual?.codigoProducto]);

	return (
		<>
			<Modal
				setAlerta={setAlerta}
				alerta={alerta}
				contenidoMensaje={configAlerta}
			/>

			<Stack spacing='10px'>
				<Box
					alignItems='center'
					display='flex'
					justifyContent='space-between'
					margin='18px 0'
					paddingLeft='18px'
				>
					<AutocompleteSeleccionarProducto
						hookForm={hookForm}
						stateProductoActual={{productoActual, setProductoActual}}
						statePreciosProductos={{preciosProductos, setPreciosProductos}}
						stateInputFocus={stateInputFocus}
					/>

					<IconButton sx={{padding: 0, marginRight: '9px'}}>
						<BuscarIcon height='18px' width='18px' />
					</IconButton>
				</Box>

				{canje.productos?.map((producto) => {
					return (
						<SwipeBorrar
							key={producto.codigoProducto}
							item={producto}
							manejadorGesto={() => borrarLinea(producto)}
						>
							<TarjetaCanjes
								key={producto.codigoProducto}
								producto={producto}
								condicion={clienteActual.condicion}
								stateCatalogo={{catalogoMotivo, setCatalogoMotivo}}
								stateInputFocus={stateInputFocus}
								statefocusId={{focusId, setFocusId}}
								visitaActual={visitaActual}
							/>
						</SwipeBorrar>
					);
				})}
			</Stack>
		</>
	);
};
