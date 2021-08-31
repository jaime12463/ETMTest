import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
	EEstadosDeUnPedido,
	ETiposDePago,
	TPedidoActual,
	TProductoPedido,
} from 'models';
import {RootState} from 'redux/store';

const estadoInicial: TPedidoActual = {
	codigoPedido: '',
	fechaEntrega: '',
	estado: EEstadosDeUnPedido.Activo,
	tipoPedido: 0,
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
				codigoPedido: string;
				tipoPedido: number;
				estado?: EEstadosDeUnPedido;
				productosPedido?: TProductoPedido[];
			}>
		) => {
			const {
				codigoPedido,
				fechaEntrega,
				tipoPedido,
				estado,
				productosPedido,
			} = action.payload;
			state.codigoPedido = codigoPedido;
			state.fechaEntrega = fechaEntrega;
			state.tipoPedido = tipoPedido;
			if (productosPedido) state.productosPedido = productosPedido;
			if (estado) state.estado = estado;
		},

		resetearPedidoActual: (state) => {
			state.codigoPedido = '';
			state.fechaEntrega = '';
			state.estado = EEstadosDeUnPedido.Activo;
			state.productosPedido = [];
			state.tipoPedido = 0;
		},

		cambiarTipoPagoPoducto: (
			state,
			action: PayloadAction<{codigoProducto: number; tipoPago: ETiposDePago}>
		) => {
			const indexProductoPedido = state.productosPedido.findIndex(
				(precioProducto: TProductoPedido) =>
					precioProducto.codigoProducto === action.payload.codigoProducto
			);
			state.productosPedido[indexProductoPedido].tipoPago =
				action.payload.tipoPago;
		},

		cambiarTipoPagoPoductosDelPedido: (
			state,
			action: PayloadAction<{tipoPago: ETiposDePago}>
		) => {
			state.productosPedido.forEach((producto: TProductoPedido) => {
				producto.tipoPago = action.payload.tipoPago;
			});
		},

		cambiarTipoPedido: (state, action: PayloadAction<{tipoPedido: number}>) => {
			state.tipoPedido = action.payload.tipoPedido;
		},
	},
});

export const selectPedidoActual = (state: RootState) => state.pedidoActual;
export const {
	agregarProductoAlPedidoDelCliente,
	borrarProductoDelPedidoDelCliente,
	inicializarPedidoActual,
	resetearPedidoActual,
	cambiarTipoPagoPoducto,
	cambiarTipoPagoPoductosDelPedido,
	cambiarTipoPedido,
} = pedidoActualSlice.actions;
export default pedidoActualSlice.reducer;
