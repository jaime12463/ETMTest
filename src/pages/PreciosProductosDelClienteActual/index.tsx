import useEstilos from './useEstilos';
import {useTranslation} from 'react-i18next';
import {Estructura} from 'components/UI';
import {FormularioAgregarProducto} from './components';
import {useState} from 'react';
import {
	InputsKeysFormTomaDePedido,
	TFormTomaDePedido,
	TPrecioProducto,
} from 'models';
import {ListPreciosProductosDelClienteActual} from './components';
import {useInicializarPreciosProductosDelClienteActual} from 'hooks';
import {
	FechaEntregaDelPedidoActual,
	InfoClienteDelPedidoActual,
} from 'components/Negocio';
import {Box} from '@material-ui/core';
import {useForm} from 'react-hook-form';

const PreciosProductosDelClienteActual: React.FC = () => {
	const {t} = useTranslation();

	const estilos = useEstilos();

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

	const hookForm = {control, handleSubmit, setValue, getValues};

	useInicializarPreciosProductosDelClienteActual(setPreciosProductos);

	return (
		<Estructura>
			<Estructura.Encabezado esConFechaHaciaAtras={true}>
				<InfoClienteDelPedidoActual />
			</Estructura.Encabezado>
			<Estructura.Cuerpo>
				<Box my={3}>
					<FechaEntregaDelPedidoActual />
				</Box>
				<FormularioAgregarProducto
					hookForm={hookForm}
					stateProductoActual={{productoActual, setProductoActual}}
					statePreciosProductos={{preciosProductos, setPreciosProductos}}
					stateInputFocus={{inputFocus, setInputFocus}}
				/>
				<ListPreciosProductosDelClienteActual
					setProductoActual={setProductoActual}
					hookForm={hookForm}
					preciosProductos={preciosProductos}
					setInputFocus={setInputFocus}
				/>
			</Estructura.Cuerpo>
		</Estructura>
	);
};

export default PreciosProductosDelClienteActual;
