import {FormInput} from 'components/UI';
import {TFormTomaDePedido, THookForm, TStatePreciosProductos} from 'models';
import {useFiltrarPreciosProductosDelClienteActual} from './hooks';
import {useTranslation} from 'react-i18next';

interface Props {
	hookForm: THookForm<TFormTomaDePedido>;
	statePreciosProductos: TStatePreciosProductos;
}

export const FiltroPreciosProductosDelClienteActual: React.VFC<Props> = ({
	statePreciosProductos,
	hookForm,
}) => {
	const {t} = useTranslation();

	const {control, handleSubmit} = hookForm;

	const filtrarPreciosProductosDelClienteActual =
		useFiltrarPreciosProductosDelClienteActual(statePreciosProductos);

	return (
		<FormInput
			onChangeForm={handleSubmit(filtrarPreciosProductosDelClienteActual)}
			control={control}
			name='productoABuscar'
			inputDataCY='producto-a-buscar'
			id='producto_a_buscar'
			label={t('general.buscar')}
			autoFocus
		/>
	);
};
