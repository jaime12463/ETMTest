import {FunctionComponent, useCallback, useState, useEffect} from 'react';
import {Dialogo, FormInput, Cajon} from 'components/UI';
import {
	TFormTomaDePedido,
	THookForm,
	TPrecioProducto,
	TStateInputFocus,
	TStatePreciosProductos,
	TStateProductoActual,
} from 'models';
import {IconButton, Grid, TextField, Autocomplete} from '@mui/material';
import nombresRutas from 'routes/nombresRutas';
import {useRouteMatch, useHistory} from 'react-router-dom';
import {useSeleccionarProductoDePrecios} from 'hooks';
import {
	useMostrarAdvertenciaEnDialogo,
	useMostrarContenidoEnCajon,
} from 'hooks';
import useEstilos from './useEstilos';
import {useTranslation} from 'react-i18next';
//import {useEsPermitidoAgregarProductoAlPedido} from './hooks';
//import {BuscadorProductosClienteActual} from 'pages/TomaPedidoDelClienteActual/components';
import {BuscarIcon} from 'assests/iconos';
import { useFiltrarPreciosProductosDelClienteActual } from '../InputFiltroPreciosProductosDelClienteActual/hooks';
//import {useFiltrarPreciosProductosDelClienteActual} from './hooks/useFiltrarPreciosProductosDelClienteActual';
import {debounce} from 'lodash';
export type Props = {
	hookForm: THookForm<TFormTomaDePedido>;
	stateProductoActual: TStateProductoActual;
	statePreciosProductos: TStatePreciosProductos;
	stateInputFocus: TStateInputFocus;
};

const ingresoValor = (event: any, newValue: TPrecioProducto | null) => {

	console.log("PASE POR function");
}

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

	const [productoSeleccionado, setProductoSeleccionado] = useState<TPrecioProducto | null>();
	const [textoIngresado, setTextoIngresado] = useState('');

	return (
		<>
			<Grid container>
				<Grid item xs={12}>	
					<Autocomplete
						className={estilos.cajaAutocomplete}
						value={productoSeleccionado}
						onChange={(event: any, nuevoValor: TPrecioProducto | null) => {
							setProductoSeleccionado(nuevoValor);
							//console.log("onChange!", productoSeleccionado);
						}}
						inputValue={textoIngresado}
						onInputChange={(event, newInputValue) => {
							setTextoIngresado(newInputValue);
							//console.log("onInputChange!", textoIngresado);
						}}
						id="autocomplete-seleccionar-producto"
						options={preciosProductos}
						getOptionLabel={(option) => option['codigoProducto'].toString()}
						sx={{ width: 330 }}
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
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default AutocompleteSeleccionarProducto;
