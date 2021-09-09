import {FunctionComponent} from 'react';
import Select from 'components/UI/Select';
import {TFormTomaDePedido, THookForm} from 'models';
import {
	useCambiarTipoDePedido,
	useObtenerOpcionesTiposDePedidos,
} from './hooks';

type Props = {
	hookForm: THookForm<TFormTomaDePedido>;
};

export const SelectTipoDePedido: FunctionComponent<Props> = (props) => {
	const {hookForm} = props;
	const {control} = hookForm;
	const opcionesTiposDePedidos = useObtenerOpcionesTiposDePedidos();
	const cambiarTipoDePedido = useCambiarTipoDePedido();

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
