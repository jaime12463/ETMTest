import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { TCliente } from "models";
import { obtenerClientes } from "server";

type TClienteSlicer = {
    estado: 'loaded' | 'loading' | 'error' | 'idle',
    clientes: TCliente[],
}

const estadoInicial: TClienteSlicer = {
    estado: 'idle',
    clientes: [],
};

export const obtenerClientesAsync = createAsyncThunk<TCliente[]>(
    'clientes/obtenerClientesAsync',
    async () => await obtenerClientes()
);


export const clientesSlice = createSlice({
    name: 'clientes',
    initialState: estadoInicial,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(obtenerClientesAsync.pending, (state) => {
            state.estado = 'loading';
        });
        builder.addCase(obtenerClientesAsync.fulfilled, (state, action) => {
            state.estado = 'loaded';
            state.clientes = action.payload;
        });
        builder.addCase(obtenerClientesAsync.rejected, (state, action) => {
            state.estado = 'error';
        });
    },
})

export const selectCliente = (state: RootState) => state.clientes;
export default clientesSlice.reducer;