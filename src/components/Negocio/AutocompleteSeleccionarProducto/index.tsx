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
// import {debounce} from 'lodash';


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

	const {preciosProductos} = statePreciosProductos;

	/*const [options, setOptions] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const getOptionsDelayed = useCallback(
	  debounce((text, callback) => {
		setOptions([]);
		//getOptionsAsync(text).then(callback);

		setTimeout(() => {
			preciosProductos.filter(
				(o) => o.title.toLowerCase().indexOf(query.toLowerCase()) > -1
			);
		}, 1500);


	  }, 200),
	  []
	);
	
	useEffect(() => {
		getOptionsDelayed(inputValue, (filteredOptions: any) => {
		  setOptions(filteredOptions);
		});
	  }, [inputValue, getOptionsDelayed]);*/

	return (
		<>
			<Grid container>
				<Grid item xs={12}>	
					<BuscarIcon />			
					<Autocomplete
						className={estilos.cajaAutocomplete}
						disablePortal
						id="combo-box-demo"
						options={preciosProductos}
						getOptionLabel={(option) => option.nombreProducto}
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
						//onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
						
						/*InputProps={{
							endAdornment: (
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
								>
									<BuscarIcon />
								</IconButton>
							),
						}}*/
					/>
				</Grid>
			</Grid>
		</>
	);
};

const top100Films = [
	{ label: 'The Shawshank Redemption', year: 1994 },
  ];

export default AutocompleteSeleccionarProducto;
