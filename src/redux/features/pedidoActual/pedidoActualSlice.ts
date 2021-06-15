import { createSlice } from '@reduxjs/toolkit';
import { TPedidoCliente, TProductoPedido } from '../../../models';
import { RootState } from '../../store';

const estadoInicial: TPedidoCliente = {
    codigoCliente: "",
    productosPedido: [],
};

export const pedidoActualSlice = createSlice({
    name: 'pedidoActual',
    initialState: estadoInicial,
    reducers: {
        cambiarClienteActual: (state, action) => {
            state.codigoCliente = action.payload.codigoCliente 
        },
        agregarProductoAlPedidoDelCliente: (state, action) => {
            const nuevosProductosPedidoCliente = state.productosPedido.filter(
                (precioProducto: TProductoPedido) => precioProducto.codigoProductoConNombre !== action.payload.productoPedido.codigoProductoConNombre
            );
            state.productosPedido = [...nuevosProductosPedidoCliente, action.payload.productoPedido];
        },
        borrarProductoDelPedidoDelCliente: (state, action) => {
            const nuevosProductosPedidoCliente = state.productosPedido.filter(
                (precioProducto: TProductoPedido) => precioProducto.codigoProductoConNombre !== action.payload.codigoProductoConNombre
            );
            state.productosPedido = [...nuevosProductosPedidoCliente];
        },
    }
})

export const selectPedidoActual = (state: RootState) => state.pedidoActual;
export const { 
    cambiarClienteActual,
    agregarProductoAlPedidoDelCliente, 
    borrarProductoDelPedidoDelCliente, 
} = pedidoActualSlice.actions;
export default pedidoActualSlice.reducer;