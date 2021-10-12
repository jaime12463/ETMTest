import {FunctionComponent, useState} from 'react';
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

	/*const filtrarPreciosProductosDelClienteActual = useFiltrarPreciosProductosDelClienteActual(
		statePreciosProductos
	);*/

	preciosProductos.map((producto) => {
		console.log("Producotos", producto);
	});

	return (
		<>
			<Grid container>
				<Grid item xs={12}>	
					<BuscarIcon />			
					<Autocomplete
						className={estilos.cajaAutocomplete}
						disablePortal
						id="combo-box-demo"
						options={top100Films}
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
