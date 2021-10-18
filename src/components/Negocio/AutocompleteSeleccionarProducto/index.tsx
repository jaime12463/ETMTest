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

	const seleccionarProductoDePrecios = useSeleccionarProductoDePrecios(
		setProductoActual,
		setValue,
		preciosProductos,
		setInputFocus,
		mostrarAdvertenciaEnDialogo
	);

	let preciosProductosDelClienteActual: TPrecioProducto[] | undefined = [];

	preciosProductosDelClienteActual = useFiltrarPreciosProductosDelClienteActual(
		statePreciosProductos
	);

	const {validarEsPermitidoAgregarProductoAlPedido} =
		useEsPermitidoAgregarProductoAlPedido();

	const [productoSeleccionado, setProductoSeleccionado] =
		useState<TPrecioProducto | null>();
	const [textoIngresado, setTextoIngresado] = useState<string>('');
	const [opciones, setOpciones] = useState<TPrecioProducto[]>([]); //(preciosProductos);

	useEffect(() => {
		console.log('éntre en effect - texto ingresado', textoIngresado);
		if (textoIngresado.length >= 3) {
			const lista = preciosProductos.filter(
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

	return (
		<>
			<GridAutocomplete
				container
				direction='row'
				flexWrap='nowrap'
				alignItems='center'
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
						value={productoSeleccionado}
						onChange={(event: any, nuevoValor: TPrecioProducto | null) => {
							setProductoSeleccionado(nuevoValor);
						}}
						inputValue={textoIngresado}
						onInputChange={(event, newInputValue) => {
							console.log('pase auto auto');
							setTextoIngresado(newInputValue);
						}}
						id='autocomplete-seleccionar-producto'
						fullWidth
						renderInput={(params) => (
							<TextField
								{...params}
								variant='standard'
								className={estilos.textSeleccionar}
								InputProps={{...params.InputProps, disableUnderline: true}}
								placeholder={`${t('general.agregarProductoSKU')}`}
							/>
						)}
						disabled={!validarEsPermitidoAgregarProductoAlPedido()}
					/>
				</Grid>
				<Grid item>
					<IconButton
						aria-label='search'
						size='small'
						onClick={() => {
							seleccionarProductoDePrecios({
								productoABuscar: productoSeleccionado?.codigoProducto
									? productoSeleccionado?.codigoProducto.toString()
									: '',
							});
						}}
						disabled={!validarEsPermitidoAgregarProductoAlPedido()}
					>
						<AgregarIcon height='15px' width='15px' />
					</IconButton>
				</Grid>
			</GridAutocomplete>
		</>
	);
};

export default AutocompleteSeleccionarProducto;
