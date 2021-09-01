import {FunctionComponent} from 'react';
import Select from 'components/UI/Select';
import {TFormTomaDePedido, THookForm} from 'models';
import {
	useCambiarCatalogoMotivo,
	useObtenerCatalogoMotivos,
} from './hooks';

type Props = {
	hookForm: THookForm<TFormTomaDePedido>;
};

export const SelectCatalogoMotivos: FunctionComponent<Props> = (props) => {
	const {hookForm} = props;
	const {control} = hookForm;
	const itemCatalogoMotivos = useObtenerCatalogoMotivos();
	const cambiarCatalogoMotivo = useCambiarCatalogoMotivo();
	{/*handleChange={cambiarTipoDePedido}*/}

	return (
		<Select
			control={control}
			opciones={itemCatalogoMotivos}
			name='catalogoMotivo'
			dataCY='select-cambiar-catalogo-motivo'
			handleChange={cambiarCatalogoMotivo}
		/>
	);
};
