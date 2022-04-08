import {FunctionComponent, useState} from 'react';
import {
	TFormTomaDePedido,
	THookForm,
	TPrecioProducto,
	TStateInputFocus,
	TStatePreciosProductos,
	TStateProductoActual,
} from 'models';
import {IconButton, Grid, TextField, Box} from '@mui/material';
import {
	useFiltrarPreciosProductosDelClienteActual,
	useSeleccionarProductoDePrecios,
} from 'hooks';
import {useMostrarAdvertenciaEnDialogo} from 'hooks';
import useEstilos from './useEstilos';
import {useTranslation} from 'react-i18next';
import {BuscarIcon, AgregarIcon, PromocionColor} from 'assests/iconos';
import {useEsPermitidoAgregarProductoAlPedido} from './hooks';
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
	width: '164px',
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

	const handleInputChange = (e: any) => {
		setTextoIngresado(e.target.value);
	};

	return (
		<Box display='flex' justifyContent='space-between' position='relative'>
			<GridAutocomplete
				container
				direction='row'
				flexWrap='nowrap'
				alignItems='center'
			>
				<Grid item xs={12}>
					<TextField
						sx={{
							'& .MuiInput-input': {
								'&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
									appearance: 'none',
								},
							},
							width: '100%',
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
								setTextoIngresado('');
							}
						}}
						onChange={(e) => handleInputChange(e)}
						className={estilos.root}
						InputProps={{disableUnderline: true}}
						placeholder={`${t('general.agregarProductoSKU')}`}
						inputProps={{
							style: {
								fontSize: '12px',
								fontFamily: 'Open Sans',
								lineHeight: '16px',
							},
						}}
						inputRef={(input) => {
							if (inputFocus === 'productoABuscar') {
								input?.focus();
							}
						}}
						data-cy={'codigo-producto-a-buscar'}
					/>
				</Grid>
				<IconButton
					aria-label='search'
					size='small'
					name='boton-+'
					onClick={(e: any) => {
						seleccionarProductoDePrecios({
							productoABuscar: textoIngresado,
						});
					}}
					sx={{
						padding: 0,
						position: 'absolute',
						right: '12px',
						top: '50%',
						transform: 'translateY(-50%)',
					}}
					disabled={!validarEsPermitidoAgregarProductoAlPedido()}
				>
					<AgregarIcon name='boton-+' height='24px' width='24px' />
				</IconButton>
			</GridAutocomplete>
			{/* <Grid item>
				<IconButton>
					<PromocionColor />
				</IconButton>
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
			</Grid> */}
		</Box>
	);
};

export default AutocompleteSeleccionarProducto;
