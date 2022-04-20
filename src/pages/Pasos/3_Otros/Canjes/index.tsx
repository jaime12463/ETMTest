import React from 'react';
import {
	InputsKeysFormTomaDePedido,
	TClienteActual,
	TFormTomaDePedido,
	TPrecioProducto,
} from 'models';
import {
	AutocompleteSeleccionarProducto,
	DrawerBuscador,
} from 'components/Negocio';
import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {useForm} from 'react-hook-form';
import {useInicializarPreciosProductosDelClienteActual} from 'hooks';
import {agregarProductoDelPedidoActual} from 'redux/features/visitaActual/visitaActualSlice';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import TarjetaCanjes from './TarjetaCanjes';
import {SwipeBorrar} from 'components/UI';
import {useBorrarLinea} from '../hooks/useBorrarLinea';
import {Box, Typography} from '@mui/material';
import {Modal} from 'components/UI';
import {BuscarIcon} from 'assests/iconos';

export const Canjes: React.VFC = () => {
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
	const [configAlerta, setConfigAlerta] = React.useState({
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
	const [catalogoMotivo, setCatalogoMotivo] = React.useState({});
	const borrarLinea = useBorrarLinea({setAlerta, setConfigAlerta});

	const [openBuscador, setOpenBuscador] = React.useState<boolean>(false);

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
							preciosPromo: {
								unidad: 0,
								subUnidad: 0,
							},
						},
					})
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

			<Stack>
				<Box padding='0 18px' marginBottom='16px' marginTop='32px'>
					<Typography
						fontWeight={'600'}
						fontSize={'Poppins'}
						variant='subtitle3'
					>
						Agregar producto para canje
					</Typography>
				</Box>
				<Box
					alignItems='center'
					display='flex'
					justifyContent='space-between'
					marginBottom={canje.productos.length > 0 ? '18px' : 0}
					paddingLeft='18px'
				>
					<AutocompleteSeleccionarProducto
						hookForm={hookForm}
						stateProductoActual={{productoActual, setProductoActual}}
						statePreciosProductos={{preciosProductos, setPreciosProductos}}
						stateInputFocus={stateInputFocus}
					/>

					<IconButton
						sx={{padding: 0, marginRight: '9px'}}
						onClick={() => setOpenBuscador(true)}
					>
						<BuscarIcon height='24px' width='24px' />
					</IconButton>
				</Box>

				<DrawerBuscador
					openBuscador={openBuscador}
					setOpenBuscador={setOpenBuscador}
				/>

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
