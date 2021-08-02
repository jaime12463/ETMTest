import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
	TPedidoActual,
	TClienteActual,
	TPedidoClienteParaEnviar,
	TPedidosClientes,
	EEstadosDeUnPedido,
} from 'models';
import {RootState} from 'redux/store';

const estadoInicial: TPedidosClientes = {};

export const pedidosClientesSlice = createSlice({
	name: 'pedidosClientes',
	initialState: estadoInicial,
	reducers: {
		cancelarPedidoDelCliente: (
			state,
			action: PayloadAction<{
				codigoPedido: string;
				codigoCliente: string;
			}>
		) => {
			const {codigoCliente, codigoPedido} = action.payload;

			const pedidoACancelar = state[codigoCliente].map((pedido) => {
				if (pedido.codigoPedido === codigoPedido) {
					pedido.estado = EEstadosDeUnPedido.Cancelado;
				}
			});
		},

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
				codigoPedido,
				productosPedido,
				fechaEntrega,
				estado,
				usuario: 'SFA01',
				enviado: false,
			};
			state[codigoCliente].push(pedidoCliente);
		},
		modificarPedidoCliente: (
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
			const pedidosClienteActual = state[codigoCliente];
			const pedidosClienteFiltrandoElModificado = pedidosClienteActual.filter(
				(pedidoCliente: TPedidoClienteParaEnviar) =>
					pedidoCliente.codigoPedido !== codigoPedido
			);
			const pedidoClienteModificado: TPedidoClienteParaEnviar = {
				codigoPedido,
				productosPedido,
				fechaEntrega,
				estado,
				usuario: 'SFA01',
				enviado: false,
			};
			pedidosClienteFiltrandoElModificado.push(pedidoClienteModificado);
			state[codigoCliente] = pedidosClienteFiltrandoElModificado;
		},
	},
});

export const selectPedidosClientes = (state: RootState) =>
	state.pedidosClientes;
export const {
	agregarPedidoCliente,
	modificarPedidoCliente,
	cancelarPedidoDelCliente,
} = pedidosClientesSlice.actions;
export default pedidosClientesSlice.reducer;
