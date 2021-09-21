import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
	ETiposDePago,
	TVisita,
	TProductoPedido,
	TPresupuestoTipoPedidoTotal,
} from 'models';
import {RootState} from 'redux/store';

const estadoInicial: TVisita = {
	fechaEntrega: '',
	tipoPedidoActual: 0,
	saldoPresupuestoTipoPedido: {},
	pedidos: {},
	mostrarPromoPush: false,
	bloquearPanelCarga: true,
	ordenDeCompra: '',
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

		borrarProductosDeVisitaActual: (
			state,
			action: PayloadAction<{tipoPedidoActual: number}>
		) => {
			state.pedidos[action.payload.tipoPedidoActual].productos = [];
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
				bloquearPanelCarga,
				ordenDeCompra,
			} = action.payload.visitaActual;
			state.pedidos = pedidos;
			state.fechaEntrega = fechaEntrega;
			state.tipoPedidoActual = tipoPedidoActual;
			state.mostrarPromoPush = mostrarPromoPush;
			state.bloquearPanelCarga = bloquearPanelCarga;
			state.ordenDeCompra = ordenDeCompra;
		},

		resetearVisitaActual: (state) => {
			state.pedidos = {};
			state.fechaEntrega = '';
			state.tipoPedidoActual = 0;
			state.mostrarPromoPush = false;
			state.bloquearPanelCarga = true;
			state.ordenDeCompra = '';
			state.saldoPresupuestoTipoPedido = {};
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
		cambiarSaldoPresupuestoTipoPedido: (
			state,
			action: PayloadAction<{
				saldoPresupuestoTipoPedido: TPresupuestoTipoPedidoTotal;
			}>
		) => {
			state.saldoPresupuestoTipoPedido =
				action.payload.saldoPresupuestoTipoPedido;
		},
		cambiarBloquearPanelCarga: (
			state,
			action: PayloadAction<{bloquearPanelCarga: boolean}>
		) => {
			state.bloquearPanelCarga = action.payload.bloquearPanelCarga;
		},
		cambiarOrdenDeCompra: (
			state,
			action: PayloadAction<{ordenDeCompra: string}>
		) => {
			state.ordenDeCompra = action.payload.ordenDeCompra;
		},
	},
});

export const selectVisitaActual = (state: RootState) => state.visitaActual;
export const {
	editarProductoDelPedidoActual,
	borrarProductoDelPedidoActual,
	inicializarVisitaActual,
	resetearVisitaActual,
	borrarProductosDeVisitaActual,
	cambiarTipoPagoPoductoDelPedidoActual,
	cambiarTipoPagoPoductosDelPedidoActual,
	cambiarTipoPedidoActual,
	cambiarMostrarPromoPush,
	cambiarSaldoPresupuestoTipoPedido,
	cambiarBloquearPanelCarga,
	cambiarOrdenDeCompra,
} = visitaActualSlice.actions;
export default visitaActualSlice.reducer;
