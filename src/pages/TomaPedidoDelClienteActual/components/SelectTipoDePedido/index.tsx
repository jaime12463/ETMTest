import {FunctionComponent} from 'react';
import Select from 'components/UI/Select';
import {TFormTomaDePedido, THookForm} from 'models';
import {useObtenerOpcionesTiposDePedidos} from './hooks';

type Props = {
	hookForm: THookForm<TFormTomaDePedido>;
};

export const SelectTipoDePedido: FunctionComponent<Props> = (props) => {
	const {hookForm} = props;
	const opcionesTiposDePedidos = useObtenerOpcionesTiposDePedidos();

	return (
		<Select
			control={hookForm.control}
			opciones={opcionesTiposDePedidos}
			name='tipoDePedido'
		/>
	);
};
