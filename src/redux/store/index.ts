import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import pedidosClientesReducer from 'redux/features/pedidosClientes/pedidosClientesSlice';
import pedidoActualReducer from 'redux/features/pedidoActual/pedidoActualSlice';
import clienteActualReducer from 'redux/features/clienteActual/clienteActualSlice';
import datosReducer from 'redux/features/datos/datosSlice';
import configuracionReducer from 'redux/features/configuracion/configuracionSlice';
import estadoAppReducer from 'redux/features/estadoApp/estadoAppSlice';

export const store = configureStore({
	reducer: {
		pedidosClientes: pedidosClientesReducer,
		pedidoActual: pedidoActualReducer,
		clienteActual: clienteActualReducer,
		datos: datosReducer,
		configuracion: configuracionReducer,
		estadoApp: estadoAppReducer,
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
