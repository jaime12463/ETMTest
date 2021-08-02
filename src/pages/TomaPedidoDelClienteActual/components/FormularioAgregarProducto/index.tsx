import {useState} from 'react';
import {Grid} from '@material-ui/core';
import {
	TFormTomaDePedido,
	InputsKeysFormTomaDePedido,
	TStatePreciosProductos,
	TStateProductoActual,
} from 'models';
import {
	InputsUnidadesYSubUnidades,
	InputSeleccionarProducto,
} from 'components/Negocio';
import {useForm} from 'react-hook-form';

export type Props = {
	stateProductoActual: TStateProductoActual;
	statePreciosProductos: TStatePreciosProductos;
};

const FormularioAgregarProducto = (props: Props) => {
	const [inputFocus, setInputFocus] = useState<InputsKeysFormTomaDePedido>(
		'productoABuscar'
	);

	const {stateProductoActual, statePreciosProductos} = props;

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

	return (
		<Grid container spacing={1}>
			<Grid item xs={6}>
				<InputSeleccionarProducto
					hookForm={hookForm}
					stateProductoActual={stateProductoActual}
					statePreciosProductos={statePreciosProductos}
					stateInputFocus={stateInputFocus}
				/>
			</Grid>
			<Grid item xs={6}>
				<InputsUnidadesYSubUnidades
					hookForm={hookForm}
					stateProductoActual={stateProductoActual}
					stateInputFocus={stateInputFocus}
				/>
			</Grid>
		</Grid>
	);
};

export default FormularioAgregarProducto;
