import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ETiposDePago, TClienteActual} from 'models';
import {RootState} from 'redux/store';

const estadoInicial: TClienteActual = {
	codigoCliente: '',
	razonSocial: '',
	condicion: 'contado',
	tipoPagoActual: ETiposDePago.Contado,
};

export const clienteActualSlice = createSlice({
	name: 'clienteActual',
	initialState: estadoInicial,
	reducers: {
		inicializarClienteActual: (
			state,
			action: PayloadAction<TClienteActual>
		) => {
			const {codigoCliente, razonSocial, condicion, tipoPagoActual} = action.payload;
			state.codigoCliente = codigoCliente;
			state.razonSocial = razonSocial;
			state.condicion = condicion;
			state.tipoPagoActual = tipoPagoActual;
		},
		resetearClienteActual: (state) => {
			state.codigoCliente = '';
			state.razonSocial = '';
			state.condicion = 'contado';
		},
		cambiarTipoPagoActual: (
			state,
			action: PayloadAction<{tipoPagoActual: ETiposDePago}>
		) => {
			state.tipoPagoActual = action.payload.tipoPagoActual;
		},
	},
});

export const selectClienteActual = (state: RootState) => state.clienteActual;
export const {
	inicializarClienteActual,
	resetearClienteActual,
	cambiarTipoPagoActual,
} = clienteActualSlice.actions;
export default clienteActualSlice.reducer;
