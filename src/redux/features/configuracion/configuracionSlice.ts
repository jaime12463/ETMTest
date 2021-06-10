import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { obtenerDatosConfiguracion } from "../../../server";
import { TDatosConfiguracion } from 'models';

type TDatosConfiguracionesSlice = {
    estado: 'loaded' | 'loading' | 'error' | 'idle',
    datos: TDatosConfiguracion,
}

const estadoInicial: TDatosConfiguracionesSlice = {
    estado: 'idle',
    datos: {
        configuraciones: [],
    },
};

export const obtenerDatosConfiguracionAsync = createAsyncThunk<TDatosConfiguracion>(
    'configuracion/obtenerDatosConfiguracionAsync',
    async () => await obtenerDatosConfiguracion()
);

export const datosSlice = createSlice({
    name: 'configuracion',
    initialState: estadoInicial,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(obtenerDatosConfiguracionAsync.pending, (state) => {
            state.estado = 'loading';
        });
        builder.addCase(obtenerDatosConfiguracionAsync.fulfilled, (state, action) => {
            state.estado = 'loaded';
            state.datos = action.payload;
        });
        builder.addCase(obtenerDatosConfiguracionAsync.rejected, (state, action) => {
            state.estado = 'error';
        });
    },
})

export const selectDatos = (state: RootState) => state.configuracion;
export default datosSlice.reducer;