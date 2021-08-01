import {Dispatch, FunctionComponent, SetStateAction} from 'react';
import {FormInput} from 'components/UI';
import {
	THookForm,
	TInputsFormularioAgregarProducto,
	TPrecioProducto,
	TPrecioSinVigencia,
} from 'models';
import {useFiltrarPreciosProductosDelClienteActual} from './hooks';

export type Props = {
	hookForm: THookForm<TInputsFormularioAgregarProducto>;
	preciosProductos: TPrecioProducto[];
	setPreciosProductos: Dispatch<SetStateAction<TPrecioProducto[]>>;
	productoActual: TPrecioSinVigencia;
};

const FiltroPreciosProductosDelClienteActual: FunctionComponent<Props> = (
	props
) => {
	const {hookForm, preciosProductos, setPreciosProductos} = props;

	const {handleSubmit, control} = hookForm;

	const filtrarPreciosProductosDelClienteActual = useFiltrarPreciosProductosDelClienteActual(
		preciosProductos,
		setPreciosProductos
	);

	return (
		<FormInput
			onChangeForm={handleSubmit(filtrarPreciosProductosDelClienteActual)}
			control={control}
			name='productoABuscar'
			inputDataCY='codigo-producto'
			id='producto_buscar'
		/>
	);
};

export default FiltroPreciosProductosDelClienteActual;
