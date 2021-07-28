import {Dispatch, SetStateAction} from 'react';
import {Grid} from '@material-ui/core';
import {
	TFunctionMostarAvertenciaPorDialogo,
	TInputsFormularioAgregarProducto,
	TPrecioProducto,
	TPrecioSinVigencia,
} from 'models';
import {
	AgregarUnidadesYSubUnidadesDelProductoActual,
	InputSeleccionarProducto,
} from 'components/Negocio';
import {useForm} from 'react-hook-form';

export type Props = {
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo;
	stateProductoActual: {
		productoActual: TPrecioSinVigencia;
		setProductoActual: React.Dispatch<React.SetStateAction<TPrecioSinVigencia>>;
	};
	statePreciosProductos: {
		preciosProductos: TPrecioProducto[];
		setPreciosProductos: Dispatch<SetStateAction<TPrecioProducto[]>>;
	};
};

const FormularioAgregarProducto = (props: Props) => {
	const {
		stateProductoActual,
		statePreciosProductos,
		mostrarAdvertenciaEnDialogo,
	} = props;

	const defaultValues: TInputsFormularioAgregarProducto = {
		unidades: '',
		subUnidades: '',
		codigoProductoConNombre: '',
		productoABuscar: '',
	};

	const {
		control,
		handleSubmit,
		setValue,
		getValues,
	} = useForm<TInputsFormularioAgregarProducto>({defaultValues});

	const hookForm = {control, handleSubmit, setValue, getValues};

	return (
		<Grid container spacing={1}>
			<Grid item xs={4}>
				<InputSeleccionarProducto
					hookForm={hookForm}
					{...stateProductoActual}
					{...statePreciosProductos}
				/>
			</Grid>
			<Grid item xs={8}>
				<AgregarUnidadesYSubUnidadesDelProductoActual
					hookForm={hookForm}
					mostrarAdvertenciaEnDialogo={mostrarAdvertenciaEnDialogo}
					{...stateProductoActual}
				/>
			</Grid>
		</Grid>
	);
};

export default FormularioAgregarProducto;
