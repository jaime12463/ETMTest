import { createSlice } from '@reduxjs/toolkit';
import { TPedidosClientes } from 'models';
import { RootState } from 'redux/store';

const estadoInicial: TPedidosClientes = {};

export const pedidosClientesSlice = createSlice({
    name: 'pedidosClientes',
    initialState: estadoInicial,
    reducers: {
        agregarPedidoCliente: (state, action) => {
            const codigoCliente: string = action.payload.codigoCliente;
            if (!state[codigoCliente]) state[codigoCliente] = [];
            const nuevosProductosPedidosClientes = state[codigoCliente].filter(
                (product) => product.codigoProductoConNombre !== action.payload.productosPedido.codigoProductoConNombre
            );
            //hay que comparar que esta en ambos array!!!
            state[codigoCliente] = [...nuevosProductosPedidosClientes, ...action.payload.productoPedido];
        }
    }
})

export const selectPedidosClientes = (state: RootState) => state.pedidosClientes;
export const { agregarPedidoCliente } = pedidosClientesSlice.actions;
export default pedidosClientesSlice.reducer;