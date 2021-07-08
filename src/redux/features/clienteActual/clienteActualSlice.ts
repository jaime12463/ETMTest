import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TClienteActual} from 'models';
import {RootState} from 'redux/store';

const estadoInicial: TClienteActual = {
	codigoCliente: '',
	fechaEntrega: '',
	razonSocial: '',
};

export const clienteActualSlice = createSlice({
	name: 'clienteActual',
	initialState: estadoInicial,
	reducers: {
		inicializarClienteActual: (
			state,
			action: PayloadAction<TClienteActual>
		) => {
			const {codigoCliente, fechaEntrega, razonSocial} = action.payload;
			state.codigoCliente = codigoCliente;
			state.fechaEntrega = fechaEntrega;
			state.razonSocial = razonSocial;
		},
		resetearClienteActual: (state) => {
			state.fechaEntrega = '';
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
