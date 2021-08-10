import {Grid} from '@material-ui/core';
import {
	TFormTomaDePedido,
	TStateProductoActual,
	TStatePreciosProductos,
	TStateInputFocus,
	THookForm,
} from 'models';
import {
	InputsUnidadesYSubUnidades,
	InputFiltroPreciosProductosDelClienteActual,
} from 'components/Negocio';

export type Props = {
	hookForm: THookForm<TFormTomaDePedido>;
	stateProductoActual: TStateProductoActual;
	statePreciosProductos: TStatePreciosProductos;
	stateInputFocus: TStateInputFocus;
};

const FormularioAgregarProducto = (props: Props) => {
	const {
		stateProductoActual,
		statePreciosProductos,
		hookForm,
		stateInputFocus,
	} = props;
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
					stateInputFocus={stateInputFocus}
				/>
			</Grid>
		</Grid>
	);
};

export default FormularioAgregarProducto;
