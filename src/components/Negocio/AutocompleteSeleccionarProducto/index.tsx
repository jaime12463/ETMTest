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

	/* 	useEffect(() => {
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
	}, [textoIngresado]); */

	const handleInputChangue = (e: any) => {
		setTextoIngresado(e.target.value);
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
								productoABuscar: textoIngresado,
							});
						}}
					>
						<BuscarIcon height='18px' width='18px' />
					</IconButton>
				</Grid>
				<Grid item xs={12}>
					<TextField
						sx={{
							'& .MuiInput-input': {
								'&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
									appearance: 'none',
								},
							},
						}}
						type='number'
						variant='standard'
						value={textoIngresado}
						onClick={() => {
							setInputFocus('productoABuscar');
						}}
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								seleccionarProductoDePrecios({
									productoABuscar: textoIngresado,
								});
							}
						}}
						onChange={(e) => handleInputChangue(e)}
						className={estilos.root}
						InputProps={{disableUnderline: true}}
						placeholder={`${t('general.agregarProductoSKU')}`}
						inputRef={(input) => {
							if (inputFocus === 'productoABuscar') {
								input?.focus();
							}
						}}
					/>
				</Grid>
				<Grid item>
					<IconButton
						aria-label='search'
						size='small'
						name='boton-+'
						onClick={(e: any) => {
							seleccionarProductoDePrecios({
								productoABuscar: textoIngresado,
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
