import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import pedidosClientesReducer from 'redux/features/pedidosClientes/pedidosClientesSlice';
import clienteActualReducer from 'redux/features/clienteActual/clienteActualSlice';
import clientesReducer from 'redux/features/clientes/clientesSlice';

export const store = configureStore({
  reducer: {
    pedidosClientes: pedidosClientesReducer,
    clienteActual: clienteActualReducer,
    clientes: clientesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;