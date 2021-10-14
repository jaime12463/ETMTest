import {FunctionComponent, useCallback, useState, useEffect} from 'react';
import {
	TFormTomaDePedido,
	THookForm,
	TPrecioProducto,
	TStateInputFocus,
	TStatePreciosProductos,
	TStateProductoActual,
} from 'models';
import {IconButton, Grid, TextField, Autocomplete, Paper} from '@mui/material';
import {useFiltrarPreciosProductosDelClienteActual, useSeleccionarProductoDePrecios} from 'hooks';
import {
	useMostrarAdvertenciaEnDialogo,
	useMostrarContenidoEnCajon,
} from 'hooks';
import useEstilos from './useEstilos';
import {useTranslation} from 'react-i18next';
import {BuscarIcon, AgregarIcon} from 'assests/iconos';
import { useEsPermitidoAgregarProductoAlPedido } from './hooks';
import { Cajon, Dialogo } from 'components/UI';
import {BuscadorProductosClienteActual} from 'pages/Pasos/2_TomaDePedido/components';

export type Props = {
	hookForm: THookForm<TFormTomaDePedido>;
	stateProductoActual: TStateProductoActual;
	statePreciosProductos: TStatePreciosProductos;
	stateInputFocus: TStateInputFocus;
};	

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

	let preciosProductosDelClienteActual: TPrecioProducto[] | undefined = [];

	preciosProductosDelClienteActual = useFiltrarPreciosProductosDelClienteActual(
		statePreciosProductos
	);

	const {validarEsPermitidoAgregarProductoAlPedido} =
		useEsPermitidoAgregarProductoAlPedido();

	const [productoSeleccionado, setProductoSeleccionado] = useState<TPrecioProducto | null>();
	const [textoIngresado, setTextoIngresado] = useState('');
	const [opciones, setOpciones] = useState<TPrecioProducto[]> (preciosProductos);

	return (
		<>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			{mostrarCajon.bottom && <Cajon {...parametrosCajon} />}
			<Grid container>
				<Grid item xs={12}>	
					<Grid 
						className={estilos.cajaAutocomplete} 
						style={{ display: "flex" }}
					>
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
							disabled={!validarEsPermitidoAgregarProductoAlPedido()}
						>
							<BuscarIcon />
						</IconButton>
						<Autocomplete
							options={preciosProductosDelClienteActual ?? preciosProductos}
							getOptionLabel={(option) => 
								option['codigoProducto'].toString() + ' - ' + option['nombreProducto']}
							value={productoSeleccionado}
							onChange={(event: any, nuevoValor: TPrecioProducto | null) => {
								setProductoSeleccionado(nuevoValor);
							}}
							inputValue={textoIngresado}
							onInputChange={(event, newInputValue) => {
								setTextoIngresado(newInputValue);
							}}
							id="autocomplete-seleccionar-producto"
							sx={{ width: 250}}
							renderInput={
								(params) => 
									<TextField 
										{...params} 
										label={`${t('general.agregarProductoSKU')}`} 
										variant="standard"
										className={estilos.textSeleccionar}
										InputProps={{ ...params.InputProps, disableUnderline: true }}
									/>
								}
							disabled={!validarEsPermitidoAgregarProductoAlPedido()}
						/>
						<IconButton
							aria-label='search'
							size='small'
							onClick={() =>
								console.log("Boton mas")
							}
							disabled={!validarEsPermitidoAgregarProductoAlPedido()}
						>
							<AgregarIcon/>
						</IconButton>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default AutocompleteSeleccionarProducto;
