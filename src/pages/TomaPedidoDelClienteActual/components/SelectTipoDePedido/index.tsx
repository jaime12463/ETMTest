import {FunctionComponent} from 'react';
import Select from 'components/UI/Select';
import {TFormTomaDePedido, THookForm, TStateProductoActual} from 'models';
import {
	useCambiarTipoDePedido,
	useObtenerOpcionesTiposDePedidos,
} from './hooks';
import { useResetLineaActual } from 'hooks';

type Props = {
	hookForm: THookForm<TFormTomaDePedido>;
	stateProductoActual: TStateProductoActual;
};

export const SelectTipoDePedido: FunctionComponent<Props> = (props) => {
	const {hookForm, stateProductoActual} = props;
	const {control, setValue} = hookForm;
	const opcionesTiposDePedidos = useObtenerOpcionesTiposDePedidos();
	const {setProductoActual} = stateProductoActual;
	const resetLineaActual = useResetLineaActual(setValue, setProductoActual);
	const cambiarTipoDePedido = useCambiarTipoDePedido(resetLineaActual);

	return (
		<Select
			control={control}
			opciones={opcionesTiposDePedidos}
			name='tipoDePedido'
			dataCY='select-cambiar-tipo-pedido'
			handleChange={cambiarTipoDePedido}
		/>
	);
};
