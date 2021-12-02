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
			esFrecuenciaAbierta: false,
			habilitaOrdenDeCompra: false,
			bonificacionesConVenta: true,
			tipoPedidoEnvasesHabilitados: [],
			tipoPedidos: [],
			motivosCancelacionIniciativas: [],
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
