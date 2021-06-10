import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { TDatos } from "../../../models";
import { obtenerDatos } from "../../../server";

type TDatosSlice = {
    estado: 'loaded' | 'loading' | 'error' | 'idle',
    datos: TDatos,
}

const estadoInicial: TDatosSlice = {
    estado: 'idle',
    datos: {
        clientes: [],
        productos: [],
    },
};

export const obtenerDatosAsync = createAsyncThunk<TDatos>(
    'datos/obtenerDatosAsync',
    async () => await obtenerDatos()
);

export const datosSlice = createSlice({
    name: 'datos',
    initialState: estadoInicial,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(obtenerDatosAsync.pending, (state) => {
            state.estado = 'loading';
        });
        builder.addCase(obtenerDatosAsync.fulfilled, (state, action) => {
            state.estado = 'loaded';
            state.datos = action.payload;
        });
        builder.addCase(obtenerDatosAsync.rejected, (state, action) => {
            state.estado = 'error';
        });
    },
})

export const selectDatos = (state: RootState) => state.datos;
export default datosSlice.reducer;