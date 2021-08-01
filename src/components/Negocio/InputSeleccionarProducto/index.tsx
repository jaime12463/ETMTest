import {Dispatch, FunctionComponent, SetStateAction} from 'react';
import {Dialogo, FormInput} from 'components/UI';
import {
	InputsKeys,
	THookForm,
	TInputsFormularioAgregarProducto,
	TPrecioProducto,
	TPrecioSinVigencia,
} from 'models';
import {IconButton, Grid, InputLabel, Box} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import nombresRutas from 'routes/nombresRutas';
import {useRouteMatch, useHistory} from 'react-router-dom';
import {useSeleccionarProductoDePrecios} from './hooks';
import {useMostrarAdvertenciaEnDialogo} from 'hooks';
import useEstilos from 'components/UI/Estructura/useEstilos';

export type Props = {
	hookForm: THookForm<TInputsFormularioAgregarProducto>;
	preciosProductos: TPrecioProducto[];
	setPreciosProductos: Dispatch<SetStateAction<TPrecioProducto[]>>;
	setProductoActual: Dispatch<SetStateAction<TPrecioSinVigencia>>;
	productoActual: TPrecioSinVigencia;
	inputFocus: InputsKeys;
	setInputFocus: Dispatch<SetStateAction<InputsKeys>>;
};

const InputSeleccionarProducto: FunctionComponent<Props> = (props) => {
	const {
		hookForm,
		productoActual,
		preciosProductos,
		setProductoActual,
		inputFocus,
		setInputFocus,
	} = props;

	const {handleSubmit, control, setValue} = hookForm;

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

	const {codigoProductoConNombre} = productoActual;

	return (
		<>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<Grid container>
				<Grid item xs={12}>
					<Box mb={1}>
						<InputLabel htmlFor='producto_buscar'>Producto</InputLabel>
					</Box>
					<FormInput
						onSubmitForm={handleSubmit(seleccionarProductoDePrecios)}
						onChangeForm={(e: React.FormEvent<HTMLFormElement>) =>
							e.preventDefault()
						}
						control={control}
						name='productoABuscar'
						inputDataCY='codigo-producto'
						helperText={codigoProductoConNombre}
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
						inputProps={{
							autoComplete: 'new-password',
							form: {
								autoComplete: 'off',
							},
						}}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default InputSeleccionarProducto;
