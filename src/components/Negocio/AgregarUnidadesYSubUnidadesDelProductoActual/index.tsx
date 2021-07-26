import React, {FunctionComponent} from 'react';
import {Box, Grid, InputLabel} from '@material-ui/core';
import {FormInput} from 'components/UI';
import {
	TFunctionMostarAvertenciaPorDialogo,
	THookForm,
	TInputsFormularioAgregarProducto,
	TPrecioSinVigencia,
} from 'models';
import {
	useAgregarProductoAlPedidoActual,
	useValidarProductoPermiteSubUnidades,
} from './hooks';
import {useResetLineaActual} from 'hooks';
import {useTranslation} from 'react-i18next';

type Props = {
	hookForm: THookForm<TInputsFormularioAgregarProducto>;
	productoActual: TPrecioSinVigencia;
	setProductoActual: React.Dispatch<React.SetStateAction<TPrecioSinVigencia>>;
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo;
};

const AgregarUnidadesYSubUnidadesDelProductoActual: FunctionComponent<Props> = (
	props
) => {
	const {
		hookForm,
		productoActual,
		mostrarAdvertenciaEnDialogo,
		setProductoActual,
	} = props;

	const {t} = useTranslation();

	const {handleSubmit, control, getValues, setValue} = hookForm;

	const resetLineaActual = useResetLineaActual(setValue, setProductoActual);

	const validarProductoPermiteSubUnidades = useValidarProductoPermiteSubUnidades();

	const agregarProductoAlPedidoActual = useAgregarProductoAlPedidoActual(
		productoActual,
		resetLineaActual,
		mostrarAdvertenciaEnDialogo
	);

	const disabled: boolean = productoActual.codigoProductoConNombre === '';

	const disabledSubUnidades: boolean = !validarProductoPermiteSubUnidades(
		parseInt(getValues('codigoProductoConNombre')?.split(' ')[0])
	);

	const {precioConImpuestoSubunidad, precioConImpuestoUnidad} = productoActual;

	return (
		<Grid container spacing={1}>
			<Grid item xs={6}>
				<Box mb={1}>
					<InputLabel htmlFor='unidades_producto'>
						{t('general.unidades')}
					</InputLabel>
				</Box>
				<FormInput
					onSubmitForm={handleSubmit(agregarProductoAlPedidoActual)}
					onChangeForm={(e: React.FormEvent<HTMLFormElement>) =>
						e.preventDefault()
					}
					name='unidades'
					control={control}
					type='number'
					inputDataCY='cantidad-producto-unidades'
					disabled={disabled}
					id='unidades_producto'
					helperText={'Precio:' + ' ' + precioConImpuestoUnidad}
				/>
			</Grid>
			<Grid item xs={6}>
				<Box mb={1}>
					<InputLabel htmlFor='subUnidades_producto'>
						{t('general.subUnidades')}
					</InputLabel>
				</Box>
				<FormInput
					onSubmitForm={handleSubmit(agregarProductoAlPedidoActual)}
					onChangeForm={(e: React.FormEvent<HTMLFormElement>) =>
						e.preventDefault()
					}
					name='subUnidades'
					control={control}
					type='number'
					inputDataCY='cantidad-producto-subUnidades'
					disabled={disabled || disabledSubUnidades}
					id='subUnidades_producto'
					helperText={'Precio:' + ' ' + precioConImpuestoSubunidad}
				/>
			</Grid>
		</Grid>
	);
};

export default AgregarUnidadesYSubUnidadesDelProductoActual;
