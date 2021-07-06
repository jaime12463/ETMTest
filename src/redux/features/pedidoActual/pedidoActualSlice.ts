import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TPedidoCliente, TProductoPedido} from '../../../models';
import {RootState} from '../../store';

const estadoInicial: TPedidoCliente = {
	codigoCliente: '',
	fechaEntrega: '',
	razonSocial: '',
	productosPedido: [],
};

export const pedidoActualSlice = createSlice({
	name: 'pedidoActual',
	initialState: estadoInicial,
	reducers: {
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
		inicializarPedidoActual: (
			state,
			action: PayloadAction<{
				fechaEntrega: string;
				codigoCliente: string;
				razonSocial: string;
			}>
		) => {
			const {codigoCliente, fechaEntrega, razonSocial} = action.payload;
			state.codigoCliente = codigoCliente;
			state.fechaEntrega = fechaEntrega;
			state.razonSocial = razonSocial;
		},
		resetearPedidoActual: (state) => {
			state.fechaEntrega = '';
			state.codigoCliente = '';
			state.razonSocial = '';
			state.productosPedido = [];
		},
	},
});

export const selectPedidoActual = (state: RootState) => state.pedidoActual;
export const {
	agregarProductoAlPedidoDelCliente,
	borrarProductoDelPedidoDelCliente,
	inicializarPedidoActual,
	resetearPedidoActual,
} = pedidoActualSlice.actions;
export default pedidoActualSlice.reducer;
