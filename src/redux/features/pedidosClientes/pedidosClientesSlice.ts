import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TPedidosClientes, TProductoPedido} from 'models';
import {RootState} from 'redux/store';

const estadoInicial: TPedidosClientes = {};

export const pedidosClientesSlice = createSlice({
	name: 'pedidosClientes',
	initialState: estadoInicial,
	reducers: {
		agregarPedidoCliente: (
			state,
			action: PayloadAction<{
				codigoCliente: string;
				productosPedido: TProductoPedido[];
			}>
		) => {
			const codigoCliente: string = action.payload.codigoCliente;
			if (!state[codigoCliente]) state[codigoCliente] = [];
			//TODO: Al re guardar va a duplicar los datos
			state[codigoCliente] = [...action.payload.productosPedido];
		},
	},
});

export const selectPedidosClientes = (state: RootState) =>
	state.pedidosClientes;
export const {agregarPedidoCliente} = pedidosClientesSlice.actions;
export default pedidosClientesSlice.reducer;
