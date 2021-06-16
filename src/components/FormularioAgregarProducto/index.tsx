import React, {Fragment} from 'react';
import {Grid} from '@material-ui/core';
import Input from 'components/Input';
import {useTranslation} from 'react-i18next';
import useEstilos from './useEstilos';
import {TInputsFormularioAgregarProducto} from 'models';
import {Control, UseFormHandleSubmit} from 'react-hook-form';

export type Props = {
	agregarProductoAlPedidoCliente: (
		inputsFormularioAgregarProducto: TInputsFormularioAgregarProducto
	) => void;
	buscarPreciosProductos: (
		inputsFormularioAgregarProducto: TInputsFormularioAgregarProducto
	) => void;
	control: Control<TInputsFormularioAgregarProducto>;
	handleSubmit: UseFormHandleSubmit<TInputsFormularioAgregarProducto>;
};

const FormularioAgregarProducto = ({
	agregarProductoAlPedidoCliente,
	buscarPreciosProductos,
	handleSubmit,
	control,
}: Props) => {
	const estilos = useEstilos();
	const {t} = useTranslation();

	return (
		<Fragment>
			<Grid item xs={12} sm={12}>
				<form
					onChange={handleSubmit(buscarPreciosProductos)}
					onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
				>
					<Input
						label={t('general.buscar')}
						control={control}
						name='productoABuscar'
						inputDataCY='codigo-producto'
					/>
				</form>
			</Grid>
			<Grid item xs={4} sm={4}>
				<form>
					<Input
						label={t('general.producto')}
						name='codigoProductoConNombre'
						control={control}
						disabled
					/>
				</form>
			</Grid>
			<Grid item xs={4} sm={4}>
				<form
					onSubmit={handleSubmit(agregarProductoAlPedidoCliente)}
					onChange={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
				>
					<Input
						label={t('general.unidades')}
						name='unidades'
						control={control}
						type='number'
						inputDataCY='cantidad-producto'
					/>
				</form>
			</Grid>
			<Grid item xs={4} sm={4}>
				<form
					onSubmit={handleSubmit(agregarProductoAlPedidoCliente)}
					onChange={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
				>
					<Input
						label={t('general.subUnidades')}
						name='subUnidades'
						control={control}
						type='number'
					/>
				</form>
			</Grid>
		</Fragment>
	);
};

export default FormularioAgregarProducto;
