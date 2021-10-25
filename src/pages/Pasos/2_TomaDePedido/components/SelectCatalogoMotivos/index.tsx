import {FunctionComponent} from 'react';
import Select from 'components/UI/Select';
import {
	TFormTomaDePedido,
	THookForm,
	TStateInputFocus,
	TStateProductoActual,
} from 'models';
//import {useObtenerCatalogoMotivos} from './hooks';
import {useMostrarAdvertenciaEnDialogo, useResetLineaActual} from 'hooks';
import {useAgregarProductoAlPedidoActual} from 'components/Negocio/InputsUnidadesYSubUnidades/hooks';
import {Dialogo} from 'components/UI';

type Props = {
	hookForm: THookForm<TFormTomaDePedido>;
	stateInputFocus: TStateInputFocus;
	stateProductoActual: TStateProductoActual;
};

export {};

/* export const SelectCatalogoMotivos: FunctionComponent<Props> = (props) => {
	const {hookForm, stateInputFocus, stateProductoActual} = props;
	const itemCatalogoMotivos = useObtenerCatalogoMotivos();
	const {productoActual, setProductoActual} = stateProductoActual;

	const {handleSubmit, control, setValue, getValues} = hookForm;

	const resetLineaActual = useResetLineaActual(setValue, setProductoActual);

	const {
		mostrarAdvertenciaEnDialogo,
		mostarDialogo,
		parametrosDialogo,
	} = useMostrarAdvertenciaEnDialogo();

	const agregarProductoAlPedidoActual = useAgregarProductoAlPedidoActual(
		productoActual,
		resetLineaActual,
		mostrarAdvertenciaEnDialogo,
		getValues
	);

	return (
		<>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<Select
				control={control}
				opciones={itemCatalogoMotivos}
				name='catalogoMotivo'
				dataCY='select-cambiar-catalogo-motivo'
				handleChange={handleSubmit(agregarProductoAlPedidoActual)}
				autoFocus={stateInputFocus.inputFocus == 'catalogoMotivo'}
				onClick={handleSubmit(agregarProductoAlPedidoActual)}
				disabled={productoActual === null}
				onFocus={() => stateInputFocus.setInputFocus('catalogoMotivo')}
				onClose={handleSubmit(agregarProductoAlPedidoActual)}
			/>
		</>
	);
}; */
