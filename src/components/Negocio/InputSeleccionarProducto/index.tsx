import {Dispatch, FunctionComponent, SetStateAction} from 'react';
import {Center, FormInput} from 'components/UI';
import {
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
import {useResetLineaActual} from 'hooks';

export type Props = {
	hookForm: THookForm<TInputsFormularioAgregarProducto>;
	preciosProductos: TPrecioProducto[];
	setPreciosProductos: Dispatch<SetStateAction<TPrecioProducto[]>>;
	setProductoActual: Dispatch<SetStateAction<TPrecioSinVigencia>>;
	productoActual: TPrecioSinVigencia;
};

const InputSeleccionarProducto: FunctionComponent<Props> = (props) => {
	const {hookForm, productoActual, preciosProductos, setProductoActual} = props;

	const {handleSubmit, control, setValue} = hookForm;
	const {path} = useRouteMatch();
	const history = useHistory();

	const resetLineaActual = useResetLineaActual(setValue, setProductoActual);

	const seleccionarProductoDePrecios = useSeleccionarProductoDePrecios(
		setProductoActual,
		setValue,
		preciosProductos,
		resetLineaActual
	);

	const {codigoProductoConNombre} = productoActual;

	return (
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
					id='producto_buscar'
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
	);
};

export default InputSeleccionarProducto;
