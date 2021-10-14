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
import {IconButton, Grid, TextField, Autocomplete, Paper} from '@mui/material';
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
import {BuscarIcon, AgregarIcon} from 'assests/iconos';
import { useFiltrarPreciosProductosDelClienteActual } from '../InputFiltroPreciosProductosDelClienteActual/hooks';
//import {useFiltrarPreciosProductosDelClienteActual} from './hooks/useFiltrarPreciosProductosDelClienteActual';

export type Props = {
	hookForm: THookForm<TFormTomaDePedido>;
	stateProductoActual: TStateProductoActual;
	statePreciosProductos: TStatePreciosProductos;
	stateInputFocus: TStateInputFocus;
};

const filtrarOpciones = () => {

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
	const [opciones, setOpciones] = useState<TPrecioProducto[]> (preciosProductos);

	/*useEffect(() => {
		if(textoIngresado.length >= 3)
		{
			//setOpciones(preciosProductos);

			const opcionesFiltradas = preciosProductos.filter(					
				(o: TPrecioProducto) => o.codigoProducto.toString().toLowerCase().indexOf(textoIngresado.toLowerCase()) > -1);
			console.log("opcionesFiltradas", opcionesFiltradas);

			setOpciones(opcionesFiltradas);

			console.log("opciones", opciones);
		}

		if(textoIngresado.length === 0)
		{
			setOpciones(preciosProductos);
		}

	}, [textoIngresado]);

	useEffect(() => {			
		setOpciones(preciosProductos);
		console.log("opciones", opciones);
	}, []);*/

	return (
		<>
			<Grid container>
				<Grid item xs={12}>	
					<Grid className={estilos.cajaAutocomplete} style={{ display: "flex" }}>
						<IconButton
							aria-label='search'
							size='small'
							onClick={() =>
								console.log("Boton lupa")
							}
						>
							<BuscarIcon />
						</IconButton>
						<Autocomplete
							options={preciosProductos}
							value={productoSeleccionado}
							onChange={(event: any, nuevoValor: TPrecioProducto | null) => {
								setProductoSeleccionado(nuevoValor);
							}}
							inputValue={textoIngresado}
							onInputChange={(event, newInputValue) => {
								setTextoIngresado(newInputValue);
							}}
							id="autocomplete-seleccionar-producto"
							getOptionLabel={(option) => option['codigoProducto'].toString()}
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
						/>
						<IconButton
							aria-label='search'
							size='small'
							onClick={() =>
								console.log("Boton mas")
							}
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
