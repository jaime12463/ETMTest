import {Grid} from '@mui/material';
import {Dialogo, FormInput} from 'components/UI';
import {
	THookForm,
	TFormTomaDePedido,
	TStateProductoActual,
	TStateInputFocus,
} from 'models';
import {
	useAgregarProductoAlPedidoActual,
	useObtenerEsPermitidoSubUnidades,
} from './hooks';
import {useMostrarAdvertenciaEnDialogo, useResetLineaActual} from 'hooks';
import {useTranslation} from 'react-i18next';

interface Props {
	hookForm: THookForm<TFormTomaDePedido>;
	stateProductoActual: TStateProductoActual;
	stateInputFocus: TStateInputFocus;
}

export const InputsUnidadesYSubUnidades: React.VFC<Props> = ({
	hookForm,
	stateProductoActual,
	stateInputFocus,
}) => {
	const {inputFocus, setInputFocus} = stateInputFocus;

	const {productoActual, setProductoActual} = stateProductoActual;

	const {handleSubmit, control, setValue, getValues} = hookForm;

	const {t} = useTranslation();

	const resetLineaActual = useResetLineaActual(setValue, setProductoActual);

	const {mostrarAdvertenciaEnDialogo, mostarDialogo, parametrosDialogo} =
		useMostrarAdvertenciaEnDialogo();

	const agregarProductoAlPedidoActual = useAgregarProductoAlPedidoActual(
		productoActual,
		resetLineaActual,
		mostrarAdvertenciaEnDialogo,
		getValues
	);

	const esPermitidoSubUnidades =
		useObtenerEsPermitidoSubUnidades(productoActual);

	return (
		<>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<Grid container spacing={1}>
				<Grid item xs={6}>
					<FormInput
						onSubmitForm={handleSubmit(agregarProductoAlPedidoActual)}
						onClick={() => setInputFocus('unidades')}
						labelForm={t('general.unidades')}
						name='unidades'
						control={control}
						type='number'
						inputDataCY='cantidad-producto-unidades'
						disabled={productoActual === null}
						id='unidades_producto'
						inputRef={(input) => {
							if (inputFocus === 'unidades') {
								input?.focus();
							}
						}}
					/>
				</Grid>
				<Grid item xs={6}>
					<FormInput
						onSubmitForm={handleSubmit(agregarProductoAlPedidoActual)}
						onClick={() => setInputFocus('subUnidades')}
						labelForm={t('general.subUnidades')}
						name='subUnidades'
						control={control}
						type='number'
						inputDataCY='cantidad-producto-subUnidades'
						disabled={productoActual === null || !esPermitidoSubUnidades}
						id='subUnidades_producto'
						inputRef={(input) => {
							if (inputFocus === 'subUnidades') {
								input?.focus();
							}
						}}
					/>
				</Grid>
			</Grid>
		</>
	);
};
