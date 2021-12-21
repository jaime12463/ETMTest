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
import TarjetaCanjes from './TarjetaCanjes';

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
		<Stack spacing='10px'>
			<AutocompleteSeleccionarProducto
				hookForm={hookForm}
				stateProductoActual={{productoActual, setProductoActual}}
				statePreciosProductos={{preciosProductos, setPreciosProductos}}
				stateInputFocus={stateInputFocus}
			/>

			{canje.productos?.map((producto) => {
				return (
					<TarjetaCanjes
						key={producto.codigoProducto}
						producto={producto}
						condicion={clienteActual.condicion}
						stateCatalogo={{catalogoMotivo, setCatalogoMotivo}}
						stateInputFocus={stateInputFocus}
						statefocusId={{focusId, setFocusId}}
						visitaActual={visitaActual}
					/>
				);
			})}
		</Stack>
	);
};
