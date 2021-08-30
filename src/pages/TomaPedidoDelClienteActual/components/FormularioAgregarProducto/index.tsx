import {Grid} from '@material-ui/core';
import {
	TFormTomaDePedido,
	THookForm,
	TStateInputFocus,
	TStatePreciosProductos,
	TStateProductoActual,
} from 'models';
import {
	InputsUnidadesYSubUnidades,
	InputSeleccionarProducto,
} from 'components/Negocio';
import {InfoProductoActual} from '..';

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
			<Grid item xs={12}>
				<InfoProductoActual stateProductoActual={stateProductoActual} />
			</Grid>
		</Grid>
	);
};

export default FormularioAgregarProducto;
