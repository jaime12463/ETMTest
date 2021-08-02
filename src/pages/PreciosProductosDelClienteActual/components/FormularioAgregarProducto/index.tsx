import {useState} from 'react';
import {Grid} from '@material-ui/core';
import {
	InputsKeysFormTomaDePedido,
	TFormTomaDePedido,
	TStateProductoActual,
	TStatePreciosProductos,
} from 'models';
import {
	InputsUnidadesYSubUnidades,
	InputFiltroPreciosProductosDelClienteActual,
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

	const hookForm = {control, handleSubmit, setValue, getValues};

	return (
		<Grid container spacing={1}>
			<Grid item xs={12}>
				<InputFiltroPreciosProductosDelClienteActual
					hookForm={hookForm}
					statePreciosProductos={statePreciosProductos}
				/>
			</Grid>
			<Grid item xs={12}>
				<InputsUnidadesYSubUnidades
					hookForm={hookForm}
					stateProductoActual={stateProductoActual}
					stateInputFocus={{inputFocus, setInputFocus}}
				/>
			</Grid>
		</Grid>
	);
};

export default FormularioAgregarProducto;
