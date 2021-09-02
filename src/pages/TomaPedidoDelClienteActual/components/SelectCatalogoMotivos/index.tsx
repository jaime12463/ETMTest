import {FunctionComponent, useState} from 'react';
import Select from 'components/UI/Select';
import {TFormTomaDePedido, THookForm, TStateInputFocus, TStateProductoActual} from 'models';
import {
	useCambiarCatalogoMotivo,
	useObtenerCatalogoMotivos,
} from './hooks';
import { useMostrarAdvertenciaEnDialogo, useResetLineaActual } from 'hooks';
import { useAgregarProductoAlPedidoActual } from 'components/Negocio/InputsUnidadesYSubUnidades/hooks';

type Props = {
	hookForm: THookForm<TFormTomaDePedido>;
	stateInputFocus: TStateInputFocus;
	stateProductoActual: TStateProductoActual
};

export const SelectCatalogoMotivos: FunctionComponent<Props> = (props) => {
	const {hookForm, stateInputFocus, stateProductoActual} = props;
	const itemCatalogoMotivos = useObtenerCatalogoMotivos();
	const cambiarCatalogoMotivo = useCambiarCatalogoMotivo();
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
		stateInputFocus,
		getValues
	);
		
	return (
		<Select
			control={control}
			opciones={itemCatalogoMotivos}
			name='catalogoMotivo'
			dataCY='select-cambiar-catalogo-motivo'
			handleChange={handleSubmit(agregarProductoAlPedidoActual)}
			autoFocus={stateInputFocus.inputFocus == 'catalogoMotivo'}
		/>
	);
};
