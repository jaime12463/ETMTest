import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
	TPedidoActual,
	TClienteActual,
	TPedidoClienteParaEnviar,
	TPedidosClientes,
} from 'models';
import {RootState} from 'redux/store';

const estadoInicial: TPedidosClientes = {};

export const pedidosClientesSlice = createSlice({
	name: 'pedidosClientes',
	initialState: estadoInicial,
	reducers: {
		agregarPedidoCliente: (
			state,
			action: PayloadAction<{
				pedidoActual: TPedidoActual;
				clienteActual: TClienteActual;
			}>
		) => {
			const {
				codigoPedido,
				productosPedido,
				fechaEntrega,
				estado,
			}: TPedidoActual = action.payload.pedidoActual;
			const {codigoCliente}: TClienteActual = action.payload.clienteActual;
			if (!state[codigoCliente]) state[codigoCliente] = [];
			const pedidoCliente: TPedidoClienteParaEnviar = {
				productosPedido,
				fechaEntrega,
				estado,
				usuario: 'SFA01',
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
