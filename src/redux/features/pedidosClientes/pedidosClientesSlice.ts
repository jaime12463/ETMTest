// import { createSlice } from '@reduxjs/toolkit';
// import { TPedidoCliente } from 'models';
// import { RootState } from 'redux/store';

// const estadoInicial: TPedidoCliente = {};

// export const pedidosClientesSlice = createSlice({
//     name: 'pedidosClientes',
//     initialState: estadoInicial,
//     reducers: {
//         agregarPedidoCliente: (state, action) => {
//             const codigoCliente: string = action.payload.codigoCliente;
//             if (!state[codigoCliente]) state[codigoCliente] = [];
//             const nuevosProductosPedidosClientes = state[codigoCliente].filter(
//                 (product) => product.codigoProducto !== action.payload.productoPedido.codigoProducto
//             );
//             state[codigoCliente] = [...nuevosProductosPedidosClientes, action.payload.productoPedido];
//         },
//         borrarPedidoCliente: (state, action) => {
//             const codigoCliente: string = action.payload.codigoCliente;
//             const nuevosProductosPedidosClientes = state[codigoCliente].filter(
//                 (product) => product.codigoProducto !== action.payload.codigoProducto
//             );
//             state[codigoCliente] = nuevosProductosPedidosClientes;
//             if (nuevosProductosPedidosClientes.length === 0) delete state[codigoCliente];
//         }
//     }
// })

// export const selectPedidosClientes = (state: RootState) => state.pedidosClientes;
// export const { agregarPedidoCliente, borrarPedidoCliente } = pedidosClientesSlice.actions;
// export default pedidosClientesSlice.reducer;
export {}