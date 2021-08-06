import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TClienteActual} from 'models';
import {RootState} from 'redux/store';

const estadoInicial: TClienteActual = {
	codigoCliente: '',
	razonSocial: '',
	condicion: 'contado'
};

export const clienteActualSlice = createSlice({
	name: 'clienteActual',
	initialState: estadoInicial,
	reducers: {
		inicializarClienteActual: (
			state,
			action: PayloadAction<TClienteActual>
		) => {
			const {codigoCliente, razonSocial, condicion} = action.payload;
			state.codigoCliente = codigoCliente;
			state.razonSocial = razonSocial;
			state.condicion = condicion;
		},
		resetearClienteActual: (state) => {
			state.codigoCliente = '';
			state.razonSocial = '';
		},
	},
});

export const selectClienteActual = (state: RootState) => state.clienteActual;
export const {
	inicializarClienteActual,
	resetearClienteActual,
} = clienteActualSlice.actions;
export default clienteActualSlice.reducer;
