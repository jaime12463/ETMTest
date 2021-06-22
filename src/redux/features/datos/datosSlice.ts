import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import {TDatosClientesProductos} from '../../../models';
import {obtenerDatosClientesProductos} from '../../../server';

type TDatosSlice = {
	estado: 'loaded' | 'loading' | 'error' | 'idle';
	datos: TDatosClientesProductos;
};

const estadoInicial: TDatosSlice = {
	estado: 'idle',
	datos: {
		clientes: {},
		productos: {},
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
			state.estado = 'loading';
		});
		builder.addCase(
			obtenerDatosClientesProductosAsync.fulfilled,
			(state, action) => {
				state.estado = 'loaded';
				state.datos = action.payload;
			}
		);
		builder.addCase(
			obtenerDatosClientesProductosAsync.rejected,
			(state, action) => {
				state.estado = 'error';
			}
		);
	},
});

export const selectDatos = (state: RootState) => state.datos;
export default datosSlice.reducer;
