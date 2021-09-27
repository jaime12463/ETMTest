import {FunctionComponent, useState} from 'react';
import {Dialogo, FormInput, Cajon} from 'components/UI';
import {
	TFormTomaDePedido,
	THookForm,
	TStateInputFocus,
	TStatePreciosProductos,
	TStateProductoActual,
} from 'models';
import {IconButton, Grid} from '@mui/material';
import nombresRutas from 'routes/nombresRutas';
import {useRouteMatch, useHistory} from 'react-router-dom';
import {useSeleccionarProductoDePrecios} from 'hooks';
import {
	useMostrarAdvertenciaEnDialogo,
	useMostrarContenidoEnCajon,
} from 'hooks';
import useEstilos from './useEstilos';
import {useTranslation} from 'react-i18next';
import {useEsPermitidoAgregarProductoAlPedido} from './hooks';
import {BuscadorProductosClienteActual} from 'pages/TomaPedidoDelClienteActual/components';

export type Props = {
	hookForm: THookForm<TFormTomaDePedido>;
	stateProductoActual: TStateProductoActual;
	statePreciosProductos: TStatePreciosProductos;
	stateInputFocus: TStateInputFocus;
};

const InputSeleccionarProducto: FunctionComponent<Props> = (props) => {
	const {
		stateProductoActual,
		statePreciosProductos,
		stateInputFocus,
		hookForm,
	} = props;

	const {setProductoActual} = stateProductoActual;

	const {preciosProductos} = statePreciosProductos;

	const {inputFocus, setInputFocus} = stateInputFocus;

	const {handleSubmit, control, setValue} = hookForm;

	const {t} = useTranslation();

	const {mostrarAdvertenciaEnDialogo, mostarDialogo, parametrosDialogo} =
		useMostrarAdvertenciaEnDialogo();

	const {
		mostrarCajon,
		mostrarContenidoEnCajon,
		parametrosCajon,
		setMostrarCajon,
	} = useMostrarContenidoEnCajon();

	const seleccionarProductoDePrecios = useSeleccionarProductoDePrecios(
		setProductoActual,
		setValue,
		preciosProductos,
		setInputFocus,
		mostrarAdvertenciaEnDialogo
	);

	const {validarEsPermitidoAgregarProductoAlPedido} =
		useEsPermitidoAgregarProductoAlPedido();

	return (
		<>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			{mostrarCajon.bottom && <Cajon {...parametrosCajon} />}
			<Grid container>
				<Grid item xs={12}>
					<FormInput
						onSubmitForm={handleSubmit(seleccionarProductoDePrecios)}
						labelForm={t('general.producto')}
						control={control}
						name='productoABuscar'
						inputDataCY='codigo-producto-a-buscar'
						disabled={!validarEsPermitidoAgregarProductoAlPedido()}
						id='producto_buscar'
						inputRef={(input) => {
							if (inputFocus === 'productoABuscar') {
								input?.focus();
							}
						}}
						onClick={() => setInputFocus('productoABuscar')}
						InputProps={{
							endAdornment: (
								<IconButton
									aria-label='search'
									size='small'
									onClick={() =>
										mostrarContenidoEnCajon(
											<BuscadorProductosClienteActual
												seleccionarProductoDePrecios={
													seleccionarProductoDePrecios
												}
												setMostrarCajon={setMostrarCajon}
											/>
										)
									}
								>
									Icono Buscar
								</IconButton>
							),
						}}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default InputSeleccionarProducto;
