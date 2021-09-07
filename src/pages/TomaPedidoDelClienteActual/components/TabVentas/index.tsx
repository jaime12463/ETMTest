import {
	ListadoProductosAgregadosAlPedidoActual,
	FormularioAgregarProducto,
	SelectTipoDePedido,
} from '..';
import {Fragment, FunctionComponent, useState} from 'react';
import {
	InputsKeysFormTomaDePedido,
	TFormTomaDePedido,
	TPrecioProducto,
	TTipoPedido,
} from 'models';
import {
	useInicializarPreciosProductosDelClienteActual,
	useObtenerDatosTipoPedido,
} from 'hooks';
import {Box, Grid} from '@material-ui/core';
import {useForm} from 'react-hook-form';
import {useObtenerVisitaActual} from 'redux/hooks';
import {MenuPromoPush} from 'components/Negocio';
import {TarjetasPromoPush} from '..';
import ListadoCanjesAgregadosAlPedidoActual from '../ListadoCanjesAgregadosAlPedidoActual';

type Props = {};

const TabVentas: FunctionComponent<Props> = (props) => {
	const [preciosProductos, setPreciosProductos] = useState<TPrecioProducto[]>(
		[]
	);

	const [productoActual, setProductoActual] = useState<TPrecioProducto | null>(
		null
	);

	const [inputFocus, setInputFocus] = useState<InputsKeysFormTomaDePedido>(
		'productoABuscar'
	);

	const visitaActual = useObtenerVisitaActual();

	const defaultValues: TFormTomaDePedido = {
		unidades: '',
		subUnidades: '',
		productoABuscar: '',
		tipoDePedido: visitaActual.tipoPedidoActual.toString(),
		catalogoMotivo: '',
	};

	const {
		control,
		handleSubmit,
		setValue,
		getValues,
	} = useForm<TFormTomaDePedido>({defaultValues});

	const stateInputFocus = {inputFocus, setInputFocus};

	const hookForm = {control, handleSubmit, setValue, getValues};

	const obtenerDatosTipoPedido = useObtenerDatosTipoPedido();

	const datosTipoPedidoActual:
		| TTipoPedido
		| undefined = obtenerDatosTipoPedido();

	useInicializarPreciosProductosDelClienteActual(setPreciosProductos);

	return (
		<Fragment>
			<Box my={2}>
				<Box my={2}>
					<Grid container>
						<Grid item xs={8}>
							<SelectTipoDePedido hookForm={hookForm} />
						</Grid>
						<Grid item xs={4}>
							<MenuPromoPush />
						</Grid>
					</Grid>
				</Box>
				<FormularioAgregarProducto
					hookForm={hookForm}
					stateProductoActual={{productoActual, setProductoActual}}
					statePreciosProductos={{preciosProductos, setPreciosProductos}}
					stateInputFocus={stateInputFocus}
				/>
			</Box>
			{/*TODO: Mostrar solo cuando requiereMotivo es False. Tambien cuando esValorizado es True? */}
			{!visitaActual.mostrarPromoPush &&
				!datosTipoPedidoActual?.requiereMotivo && (
					<ListadoProductosAgregadosAlPedidoActual
						setProductoActual={setProductoActual}
						hookForm={hookForm}
						preciosProductos={preciosProductos}
						setInputFocus={setInputFocus}
					/>
				)}
			{/*TODO: Mostrar solo cuando requiereMotivo es True. Tambien cuando esValorizado es False? */}
			{!visitaActual.mostrarPromoPush &&
				datosTipoPedidoActual?.requiereMotivo && (
					<ListadoCanjesAgregadosAlPedidoActual
						setProductoActual={setProductoActual}
						hookForm={hookForm}
						preciosProductos={preciosProductos}
						setInputFocus={setInputFocus}
					/>
				)}
			{visitaActual.mostrarPromoPush && <TarjetasPromoPush />}
		</Fragment>
	);
};

export default TabVentas;
