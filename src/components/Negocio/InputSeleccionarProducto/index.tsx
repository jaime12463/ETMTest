import {FunctionComponent} from 'react';
import {Dialogo, FormInput} from 'components/UI';
import {
	TFormTomaDePedido,
	THookForm,
	TStateInputFocus,
	TStatePreciosProductos,
	TStateProductoActual,
} from 'models';
import {IconButton, Grid} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import nombresRutas from 'routes/nombresRutas';
import {useRouteMatch, useHistory} from 'react-router-dom';
import {useSeleccionarProductoDePrecios} from 'hooks';
import {useMostrarAdvertenciaEnDialogo} from 'hooks';
import useEstilos from './useEstilos';
import {useTranslation} from 'react-i18next';

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

	const {productoActual, setProductoActual} = stateProductoActual;

	const {preciosProductos} = statePreciosProductos;

	const {inputFocus, setInputFocus} = stateInputFocus;

	const {handleSubmit, control, setValue} = hookForm;

	const {t} = useTranslation();

	const {path} = useRouteMatch();

	const history = useHistory();

	const estilos = useEstilos();

	const {
		mostrarAdvertenciaEnDialogo,
		mostarDialogo,
		parametrosDialogo,
	} = useMostrarAdvertenciaEnDialogo();

	const seleccionarProductoDePrecios = useSeleccionarProductoDePrecios(
		setProductoActual,
		setValue,
		preciosProductos,
		setInputFocus,
		mostrarAdvertenciaEnDialogo
	);

	const {nombreProducto} = {...productoActual};

	return (
		<>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<Grid container>
				<Grid item xs={12}>
					<FormInput
						onSubmitForm={handleSubmit(seleccionarProductoDePrecios)}
						labelForm={t('general.producto')}
						control={control}
						name='productoABuscar'
						inputDataCY='codigo-producto-a-buscar'
						helperText={nombreProducto}
						FormHelperTextProps={{
							className: estilos.helperText,
						}}
						id='producto_buscar'
						inputRef={(input) => {
							if (inputFocus === 'productoABuscar') {
								input?.focus();
							}
						}}
						InputProps={{
							endAdornment: (
								<IconButton
									aria-label='search'
									size='small'
									onClick={() =>
										history.push(`${path}${nombresRutas.preciosProductos}`)
									}
								>
									<SearchIcon />
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
