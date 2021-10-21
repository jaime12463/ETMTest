import {FunctionComponent, useCallback, useState, useEffect} from 'react';
import {
	TFormTomaDePedido,
	THookForm,
	TInputFiltrarPreciosProductos,
	TPrecioProducto,
	TStateInputFocus,
	TStatePreciosProductos,
	TStateProductoActual,
} from 'models';
import {IconButton, Grid, TextField, Autocomplete, Paper} from '@mui/material';
import {
	useFiltrarPreciosProductosDelClienteActual,
	useSeleccionarProductoDePrecios,
} from 'hooks';
import {useMostrarAdvertenciaEnDialogo} from 'hooks';
import useEstilos from './useEstilos';
import {useTranslation} from 'react-i18next';
import {BuscarIcon, AgregarIcon} from 'assests/iconos';
import {useEsPermitidoAgregarProductoAlPedido} from './hooks';
import {Dialogo} from 'components/UI';
import {BuscadorProductosClienteActual} from 'pages/Pasos/2_TomaDePedido/components';
import {styled} from '@mui/material/styles';

export type Props = {
	hookForm: THookForm<TFormTomaDePedido>;
	stateProductoActual: TStateProductoActual;
	statePreciosProductos: TStatePreciosProductos;
	stateInputFocus: TStateInputFocus;
};

const GridAutocomplete = styled(Grid)(() => ({
	borderRadius: '20px',
	boxShadow: '0px 2px 15px rgba(0, 0, 0, 0.15)',
	height: '32px',
	padding: '0 12px',
	marginBottom: '28px',
}));

const AutocompleteSeleccionarProducto: FunctionComponent<Props> = (props) => {
	const {
		stateProductoActual,
		statePreciosProductos,
		stateInputFocus,
		hookForm,
	} = props;

	const {t} = useTranslation();

	const estilos = useEstilos();

	const {preciosProductos, setPreciosProductos} = statePreciosProductos;

	const {handleSubmit, control, setValue} = hookForm;

	const {setProductoActual} = stateProductoActual;

	const {inputFocus, setInputFocus} = stateInputFocus;

	const {mostrarAdvertenciaEnDialogo, mostarDialogo, parametrosDialogo} =
		useMostrarAdvertenciaEnDialogo();

	let preciosProductosDelClienteActual =
		useFiltrarPreciosProductosDelClienteActual();

	const seleccionarProductoDePrecios = useSeleccionarProductoDePrecios(
		setProductoActual,
		setValue,
		preciosProductosDelClienteActual,
		setInputFocus,
		mostrarAdvertenciaEnDialogo
	);

	const {validarEsPermitidoAgregarProductoAlPedido} =
		useEsPermitidoAgregarProductoAlPedido();

	const [productoSeleccionado, setProductoSeleccionado] =
		useState<TPrecioProducto | null>();
	const [textoIngresado, setTextoIngresado] = useState<string>('');
	const [opciones, setOpciones] = useState<TPrecioProducto[]>([]); //(preciosProductos);

	useEffect(() => {
		if (textoIngresado.length >= 3 && preciosProductosDelClienteActual) {
			const lista = preciosProductosDelClienteActual.filter(
				(item) =>
					item.nombreProducto
						.toLowerCase()
						.indexOf(textoIngresado.toLowerCase()) > -1 ||
					item.codigoProducto.toString() == textoIngresado
			);
			setOpciones(lista);
		} else if (textoIngresado.length === 0) {
			setOpciones([]);
		}
	}, [textoIngresado]);

	const handleInputChangue = (
		event: any,
		newInputValue: string,
		reason: string
	) => {
		if (event) {
			if (reason === 'clear') {
				setTextoIngresado('');
			} else if (
				(reason === 'reset' && event.type === 'click') ||
				reason === 'input'
			) {
				setTextoIngresado(newInputValue);
			}
		}
	};

	return (
		<>
			<GridAutocomplete
				container
				direction='row'
				flexWrap='nowrap'
				alignItems='center'
				marginTop='18px'
			>
				<Grid item>
					<IconButton
						aria-label='search'
						size='small'
						disabled={!validarEsPermitidoAgregarProductoAlPedido()}
						onClick={() => {
							seleccionarProductoDePrecios({
								productoABuscar: productoSeleccionado?.codigoProducto
									? productoSeleccionado?.codigoProducto.toString()
									: '',
							});
						}}
					>
						<BuscarIcon height='18px' width='18px' />
					</IconButton>
				</Grid>
				<Grid item xs={12}>
					<Autocomplete
						filterOptions={(x) => x}
						options={opciones}
						getOptionLabel={(option) =>
							`${option['codigoProducto'].toString()} - ${
								option['nombreProducto']
							}`
						}
						//value={productoSeleccionado}

						onChange={(event: any, nuevoValor: TPrecioProducto | null) => {
							setProductoSeleccionado(nuevoValor);
						}}
						inputValue={textoIngresado}
						onInputChange={(event, newInputValue, reason) =>
							handleInputChangue(event, newInputValue, reason)
						}
						id='autocomplete-seleccionar-producto'
						fullWidth
						renderInput={(params) => (
							<TextField
								{...params}
								variant='standard'
								onClick={() => {
									setInputFocus('productoABuscar');
								}}
								className={estilos.root}
								InputProps={{...params.InputProps, disableUnderline: true}}
								placeholder={`${t('general.agregarProductoSKU')}`}
								inputRef={(input) => {
									if (inputFocus === 'productoABuscar') {
										input?.focus();
									}
								}}
							/>
						)}
						disabled={!validarEsPermitidoAgregarProductoAlPedido()}
					/>
				</Grid>
				<Grid item>
					<IconButton
						aria-label='search'
						size='small'
						name='boton-+'
						onClick={(e: any) => {
							handleInputChangue(e, '', 'clear');
							seleccionarProductoDePrecios({
								productoABuscar: productoSeleccionado?.codigoProducto
									? productoSeleccionado?.codigoProducto.toString()
									: '',
							});
						}}
						disabled={!validarEsPermitidoAgregarProductoAlPedido()}
					>
						<AgregarIcon name='boton-+' height='15px' width='15px' />
					</IconButton>
				</Grid>
			</GridAutocomplete>
		</>
	);
};

export default AutocompleteSeleccionarProducto;
