import {Dispatch, FunctionComponent, SetStateAction} from 'react';
import {Grid} from '@material-ui/core';
import {Dialogo, FormInput} from 'components/UI';
import {
	InputsKeys,
	THookForm,
	TInputsFormularioAgregarProducto,
	TStateProductoActual,
} from 'models';
import {
	useAgregarProductoAlPedidoActual,
	useObtenerEsPermitidoSubUnidades,
} from './hooks';
import {useMostrarAdvertenciaEnDialogo, useResetLineaActual} from 'hooks';
import {useTranslation} from 'react-i18next';

type Props = {
	hookForm: THookForm<TInputsFormularioAgregarProducto>;
	stateProductoActual: TStateProductoActual;
	inputFocus: InputsKeys;
	setInputFocus: Dispatch<SetStateAction<InputsKeys>>;
};

const AgregarUnidadesYSubUnidadesDelProductoActual: FunctionComponent<Props> = (
	props
) => {
	const {hookForm, stateProductoActual, inputFocus, setInputFocus} = props;

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
		inputFocus,
		setInputFocus
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
						helperText={`$ ${precioConImpuestoUnidad}`}
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
						helperText={`$ ${precioConImpuestoSubunidad}`}
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

export default AgregarUnidadesYSubUnidadesDelProductoActual;
