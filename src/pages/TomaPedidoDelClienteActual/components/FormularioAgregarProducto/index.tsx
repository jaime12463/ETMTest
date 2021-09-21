import {Grid, Paper} from '@material-ui/core';
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
import {useAppSelector, useAppDispatch } from "redux/hooks";
import { selectVisitaActual } from 'redux/features/visitaActual/visitaActualSlice';

export type Props = {
	hookForm: THookForm<TFormTomaDePedido>;
	stateProductoActual: TStateProductoActual;
	statePreciosProductos: TStatePreciosProductos;
	stateInputFocus: TStateInputFocus;
};

const FormularioAgregarProducto = (props: Props) => {
	const {bloquearPanelCarga} = useAppSelector(selectVisitaActual);
	const {
		stateProductoActual,
		statePreciosProductos,
		hookForm,
		stateInputFocus,
	} = props;
	return (
		<fieldset disabled={bloquearPanelCarga} >
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
					<InfoProductoActual
						hookForm={hookForm}
						stateProductoActual={stateProductoActual}
						stateInputFocus={stateInputFocus} />
				</Grid>
			</Grid>
		</fieldset>
	);
};

export default FormularioAgregarProducto;
