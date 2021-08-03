import {
	ListadoProductosAgregadosAlPedidoActual,
	FormularioAgregarProducto,
} from '..';
import {Fragment, FunctionComponent, useState} from 'react';
import {
	InputsKeysFormTomaDePedido,
	TFormTomaDePedido,
	TPrecioProducto,
} from 'models';
import {useInicializarPreciosProductosDelClienteActual} from 'hooks';
import {Box} from '@material-ui/core';
import {useForm} from 'react-hook-form';

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

	const defaultValues: TFormTomaDePedido = {
		unidades: '',
		subUnidades: '',
		productoABuscar: '',
	};

	const {
		control,
		handleSubmit,
		setValue,
		getValues,
	} = useForm<TFormTomaDePedido>({defaultValues});

	const stateInputFocus = {inputFocus, setInputFocus};

	const hookForm = {control, handleSubmit, setValue, getValues};

	useInicializarPreciosProductosDelClienteActual(setPreciosProductos);

	return (
		<Fragment>
			<Box my={2}>
				<FormularioAgregarProducto
					hookForm={hookForm}
					stateProductoActual={{productoActual, setProductoActual}}
					statePreciosProductos={{preciosProductos, setPreciosProductos}}
					stateInputFocus={stateInputFocus}
				/>
			</Box>
			<ListadoProductosAgregadosAlPedidoActual
				setProductoActual={setProductoActual}
				hookForm={hookForm}
				preciosProductos={preciosProductos}
				setInputFocus={setInputFocus}
			/>
		</Fragment>
	);
};

export default TabVentas;
