import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TPedidoCliente, TProductoPedido} from '../../../models';
import {RootState} from '../../store';

const estadoInicial: TPedidoCliente = {
	codigoCliente: '',
	productosPedido: [],
	fechaEntrega: '',
};

export const pedidoActualSlice = createSlice({
	name: 'pedidoActual',
	initialState: estadoInicial,
	reducers: {
		cambiarClienteActual: (state, action: PayloadAction<string>) => {
			state.codigoCliente = action.payload;
		},
		agregarProductoAlPedidoDelCliente: (
			state,
			action: PayloadAction<TProductoPedido>
		) => {
			const productosPedidoClienteFiltrados = state.productosPedido.filter(
				(precioProducto: TProductoPedido) =>
					precioProducto.codigoProducto !== action.payload.codigoProducto
			);
			state.productosPedido = [
				...productosPedidoClienteFiltrados,
				action.payload,
			];
		},
		agregarProductosAlPedidoDelCliente: (
			state,
			action: PayloadAction<TProductoPedido[]>
		) => {
			state.productosPedido = [...action.payload];
		},
		borrarProductoDelPedidoDelCliente: (
			state,
			action: PayloadAction<number>
		) => {
			const productosPedidoClienteFiltrados = state.productosPedido.filter(
				(precioProducto: TProductoPedido) =>
					precioProducto.codigoProducto !== action.payload
			);
			state.productosPedido = [...productosPedidoClienteFiltrados];
		},
		cambiarFechaEntrega: (state, action: PayloadAction<string>) => {
			state.fechaEntrega = action.payload;
		},
		resetearPedidoActual: (state) => {
			state.fechaEntrega = '';
			state.codigoCliente = '';
			state.productosPedido = [];
		},
	},
});

export const selectPedidoActual = (state: RootState) => state.pedidoActual;
export const {
	cambiarClienteActual,
	agregarProductoAlPedidoDelCliente,
	borrarProductoDelPedidoDelCliente,
	cambiarFechaEntrega,
	resetearPedidoActual,
	agregarProductosAlPedidoDelCliente,
} = pedidoActualSlice.actions;
export default pedidoActualSlice.reducer;
