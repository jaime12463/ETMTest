import {FunctionComponent} from 'react';
import {Grid} from '@material-ui/core';
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

type Props = {
	hookForm: THookForm<TFormTomaDePedido>;
	stateProductoActual: TStateProductoActual;
	stateInputFocus: TStateInputFocus;
};

const InputsUnidadesYSubUnidades: FunctionComponent<Props> = (props) => {
	const {hookForm, stateProductoActual, stateInputFocus} = props;

	const {inputFocus, setInputFocus} = stateInputFocus;

	const {productoActual, setProductoActual} = stateProductoActual;

	const {handleSubmit, control, setValue} = hookForm;

	const {precioConImpuestoSubunidad, precioConImpuestoUnidad} = {
		...productoActual,
	};

	const {t} = useTranslation();

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
		{inputFocus, setInputFocus}
	);

	const esPermitidoSubUnidades = useObtenerEsPermitidoSubUnidades(
		productoActual
	);

	return (
		<>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<Grid container spacing={1}>
				<Grid item xs={6}>
					<FormInput
						onSubmitForm={handleSubmit(agregarProductoAlPedidoActual)}
						labelForm={t('general.unidades')}
						name='unidades'
						control={control}
						type='number'
						inputDataCY='cantidad-producto-unidades'
						disabled={productoActual === null}
						id='unidades_producto'
						helperText={`${t('general.signoMoneda')} ${precioConImpuestoUnidad?.toFixed(2) ?? '0.00'}`}
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
						labelForm={t('general.subUnidades')}
						name='subUnidades'
						control={control}
						type='number'
						inputDataCY='cantidad-producto-subUnidades'
						disabled={productoActual === null || !esPermitidoSubUnidades}
						id='subUnidades_producto'
						helperText={`${t('general.signoMoneda')} ${precioConImpuestoSubunidad?.toFixed(2) ?? '0.00'}`}
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

export default InputsUnidadesYSubUnidades;
