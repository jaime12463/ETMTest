import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ETiposDePago, TVisita, TProductoPedido} from 'models';
import {RootState} from 'redux/store';

const estadoInicial: TVisita = {
	fechaEntrega: '',
	tipoPedidoActual: 0,
	pedidos: {},
	mostrarPromoPush: false,
};

export const visitaActualSlice = createSlice({
	name: 'visitaActual',
	initialState: estadoInicial,
	reducers: {
		editarProductoDelPedidoActual: (
			state,
			action: PayloadAction<{productoPedido: TProductoPedido}>
		) => {
			const productosPedidoClienteFiltrados = state.pedidos[
				state.tipoPedidoActual
			].productos.filter(
				(precioProducto: TProductoPedido) =>
					precioProducto.codigoProducto !==
					action.payload.productoPedido.codigoProducto
			);
			state.pedidos[state.tipoPedidoActual].productos = [
				...productosPedidoClienteFiltrados,
				action.payload.productoPedido,
			];
		},

		borrarProductoDelPedidoActual: (
			state,
			action: PayloadAction<{codigoProducto: number}>
		) => {
			const productosPedidoClienteFiltrados = state.pedidos[
				state.tipoPedidoActual
			].productos.filter(
				(precioProducto: TProductoPedido) =>
					precioProducto.codigoProducto !== action.payload.codigoProducto
			);
			state.pedidos[state.tipoPedidoActual].productos = [
				...productosPedidoClienteFiltrados,
			];
		},

		inicializarVisitaActual: (
			state,
			action: PayloadAction<{
				visitaActual: TVisita;
			}>
		) => {
			const {
				pedidos,
				fechaEntrega,
				tipoPedidoActual,
				mostrarPromoPush,
			} = action.payload.visitaActual;
			state.pedidos = pedidos;
			state.fechaEntrega = fechaEntrega;
			state.tipoPedidoActual = tipoPedidoActual;
			state.mostrarPromoPush = mostrarPromoPush;
		},

		resetearVisitaActual: (state) => {
			state.pedidos = {};
			state.fechaEntrega = '';
			state.tipoPedidoActual = 0;
			state.mostrarPromoPush = false;
		},

		cambiarTipoPagoPoductoDelPedidoActual: (
			state,
			action: PayloadAction<{codigoProducto: number; tipoPago: ETiposDePago}>
		) => {
			const indexProductoPedido = state.pedidos[
				state.tipoPedidoActual
			].productos.findIndex(
				(precioProducto: TProductoPedido) =>
					precioProducto.codigoProducto === action.payload.codigoProducto
			);
			state.pedidos[state.tipoPedidoActual].productos[
				indexProductoPedido
			].tipoPago = action.payload.tipoPago;
		},

		cambiarTipoPagoPoductosDelPedidoActual: (
			state,
			action: PayloadAction<{tipoPago: ETiposDePago}>
		) => {
			state.pedidos[state.tipoPedidoActual].productos.forEach(
				(producto: TProductoPedido) => {
					producto.tipoPago = action.payload.tipoPago;
				}
			);
		},

		cambiarTipoPedidoActual: (
			state,
			action: PayloadAction<{tipoPedido: number}>
		) => {
			state.tipoPedidoActual = action.payload.tipoPedido;
		},

		cambiarMostrarPromoPush: (
			state,
			action: PayloadAction<{mostrarPromoPush: boolean}>
		) => {
			state.mostrarPromoPush = action.payload.mostrarPromoPush;
		},
	},
});

export const selectVisitaActual = (state: RootState) => state.visitaActual;
export const {
	editarProductoDelPedidoActual,
	borrarProductoDelPedidoActual,
	inicializarVisitaActual,
	resetearVisitaActual,
	cambiarTipoPagoPoductoDelPedidoActual,
	cambiarTipoPagoPoductosDelPedidoActual,
	cambiarTipoPedidoActual,
	cambiarMostrarPromoPush,
} = visitaActualSlice.actions;
export default visitaActualSlice.reducer;
