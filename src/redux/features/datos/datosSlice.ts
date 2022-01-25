import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from 'redux/store';
import {EEstadosFetch, TDatosClientesProductos, TDatosSlice} from 'models';
import {obtenerDatosClientesProductos} from 'server';

const estadoInicial: TDatosSlice = {
	estado: EEstadosFetch.Idle,
	datos: {
		clientes: {},
		productos: {},
		presupuestoTipoPedido: [],
		iniciativas: [],
		bonificaciones: [],
		envases: {},
		familias: {},
		medidas: {},
		marcas: {},
		sabores: {},
		promociones: {},
	},
};

export const obtenerDatosClientesProductosAsync =
	createAsyncThunk<TDatosClientesProductos>(
		'datos/obtenerDatosAsync',
		async () => await obtenerDatosClientesProductos()
	);

export const datosSlice = createSlice({
	name: 'datos',
	initialState: estadoInicial,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(obtenerDatosClientesProductosAsync.pending, (state) => {
			state.estado = EEstadosFetch.Loading;
		});
		builder.addCase(
			obtenerDatosClientesProductosAsync.fulfilled,
			(state, action) => {
				state.estado = EEstadosFetch.Loaded;
				state.datos = action.payload;
			}
		);
		builder.addCase(
			obtenerDatosClientesProductosAsync.rejected,
			(state, action) => {
				state.estado = EEstadosFetch.Error;
			}
		);
	},
});

export const selectDatos = (state: RootState) => state.datos;
export default datosSlice.reducer;
