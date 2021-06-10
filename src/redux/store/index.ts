import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import pedidosClientesReducer from 'redux/features/pedidosClientes/pedidosClientesSlice';
import pedidoActualReducer from 'redux/features/pedidoActual/pedidoActualSlice';
import datosReducer from 'redux/features/datos/datosSlice';

export const store = configureStore({
  reducer: {
    // pedidosClientes: pedidosClientesReducer,
    pedidoActual: pedidoActualReducer,
    datos: datosReducer,
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