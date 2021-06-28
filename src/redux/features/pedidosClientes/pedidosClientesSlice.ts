import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
	TPedidoCliente,
	TPedidoClienteParaEnviar,
	TPedidosClientes,
	TProductoPedido,
} from 'models';
import {RootState} from 'redux/store';

const estadoInicial: TPedidosClientes = {};

export const pedidosClientesSlice = createSlice({
	name: 'pedidosClientes',
	initialState: estadoInicial,
	reducers: {
		agregarPedidoCliente: (state, action: PayloadAction<TPedidoCliente>) => {
			const {
				codigoCliente,
				productosPedido,
				fechaEntrega,
			}: TPedidoCliente = action.payload;
			if (!state[codigoCliente]) state[codigoCliente] = [];
			const pedidoCliente: TPedidoClienteParaEnviar = {
				productosPedido,
				fechaEntrega,
				enviado: false,
			};
			state[codigoCliente].push(pedidoCliente);
		},
	},
});

export const selectPedidosClientes = (state: RootState) =>
	state.pedidosClientes;
export const {agregarPedidoCliente} = pedidosClientesSlice.actions;
export default pedidosClientesSlice.reducer;
