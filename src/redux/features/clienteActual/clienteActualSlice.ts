import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const initialState = {
    codigoCliente: ""
};

export const clienteActualSlice = createSlice({
    name: 'clienteActual',
    initialState,
    reducers: {
        establecerClienteActual: (state, action) => {
            state.codigoCliente = action.payload.codigoCliente
        },
    }
})

export const selectClienteActual = (state: RootState) => state.clienteActual;
export const { establecerClienteActual } = clienteActualSlice.actions;
export default clienteActualSlice.reducer;
