import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from 'redux/store';
import {obtenerDatosConfiguracion} from 'server';
import {
	EEstadosFetch,
	TDatosConfiguracionesSlice,
	TConfiguracion,
	TDatosConfiguracion,
} from 'models';

const estadoInicial: TDatosConfiguracionesSlice = {
	estado: EEstadosFetch.Idle,
	datos: {
		configuraciones: {
			habilitaRequisitoConDescuentoAutomatico: true,
			maximoGrupoCoberturaAMostrar: 0,
			esFrecuenciaAbierta: false,
			habilitaOrdenDeCompra: false,
			habilitaCancelarIniciativa: false,
			bonificacionesConVenta: true,
			habilitaCompromisoDeCobro: true,
			tipoPedidoEnvasesHabilitados: [],
			tipoPedidos: [],
			motivosCancelacionIniciativas: [],
			tiempoToastEnSegundos: 0,
			condicionDePagoDefault: 'contado',
		},
	},
};

export const obtenerDatosConfiguracionAsync =
	createAsyncThunk<TDatosConfiguracion>(
		'configuracion/obtenerDatosConfiguracionAsync',
		async () => await obtenerDatosConfiguracion()
	);

export const datosSlice = createSlice({
	name: 'configuracion',
	initialState: estadoInicial,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(obtenerDatosConfiguracionAsync.pending, (state) => {
			state.estado = EEstadosFetch.Loading;
		});
		builder.addCase(
			obtenerDatosConfiguracionAsync.fulfilled,
			(state, action) => {
				state.estado = EEstadosFetch.Loaded;
				state.datos = action.payload;
			}
		);
		builder.addCase(
			obtenerDatosConfiguracionAsync.rejected,
			(state, action) => {
				state.estado = EEstadosFetch.Error;
			}
		);
	},
});

export const selectConfiguracion = (state: RootState) => state.configuracion;
export default datosSlice.reducer;
