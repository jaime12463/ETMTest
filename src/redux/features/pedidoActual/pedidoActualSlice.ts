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
				estado?: EEstadosDeUnPedido;
				productosPedido?: TProductoPedido[];
			}>
		) => {
			const {
				codigoPedido,
				fechaEntrega,
				estado,
				productosPedido,
			} = action.payload;
			state.codigoPedido = codigoPedido;
			state.fechaEntrega = fechaEntrega;
			if (productosPedido) state.productosPedido = productosPedido;
			if (estado) state.estado = estado;
		},

		resetearPedidoActual: (state) => {
			state.codigoPedido = '';
			state.fechaEntrega = '';
			state.estado = EEstadosDeUnPedido.Activo;
			state.productosPedido = [];
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
	},
});

export const selectPedidoActual = (state: RootState) => state.pedidoActual;
export const {
	agregarProductoAlPedidoDelCliente,
	borrarProductoDelPedidoDelCliente,
	inicializarPedidoActual,
	resetearPedidoActual,
	cambiarTipoPagoPoducto,
} = pedidoActualSlice.actions;
export default pedidoActualSlice.reducer;
