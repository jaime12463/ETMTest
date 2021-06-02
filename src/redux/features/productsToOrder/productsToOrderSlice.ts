import { createSlice } from '@reduxjs/toolkit';
import { TPedidoCliente } from 'models';
import { RootState } from 'redux/store';

const initialState: TPedidoCliente = {};

export const productsToOrderSlice = createSlice({
    name: 'productsToOrder',
    initialState,
    reducers: {
        addProductToOrder: (state, action) => {
            const codigoCliente: string = action.payload.codigoCliente;
            if (!state[codigoCliente]) state[codigoCliente] = [];
            const newCustumerOrderProducts = state[codigoCliente].filter(
                (product) => product.codigoProducto !== action.payload.productToOrder.codigoProducto
            );
            state[codigoCliente] = [...newCustumerOrderProducts, action.payload.productToOrder];
        },
        deleteProductToOrder: (state, action) => {
            const codigoCliente: string = action.payload.codigoCliente;
            const newCustumerOrderProducts = state[codigoCliente].filter(
                (product) => product.codigoProducto !== action.payload.codigoProducto
            );
            state[codigoCliente] = newCustumerOrderProducts;
            if (newCustumerOrderProducts.length === 0) delete state[codigoCliente]
        }
    }
})

export const selectProductsToOrder = (state: RootState) => state.productsToOrder;
export const { addProductToOrder, deleteProductToOrder } = productsToOrderSlice.actions;
export default productsToOrderSlice.reducer;
