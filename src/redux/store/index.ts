import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import pedidosClientesReducer from 'redux/features/pedidosClientes/pedidosClientesSlice';
import visitaActuallReducer from 'redux/features/visitaActual/visitaActualSlice';
import clienteActualReducer from 'redux/features/clienteActual/clienteActualSlice';
import datosReducer from 'redux/features/datos/datosSlice';
import configuracionReducer from 'redux/features/configuracion/configuracionSlice';
import compromisoDeCobroReducer from 'redux/features/compromisoDeCobro/compromisoDeCobroSlice';

export const store = configureStore({
	reducer: {
		pedidosClientes: pedidosClientesReducer,
		visitaActual: visitaActuallReducer,
		clienteActual: clienteActualReducer,
		datos: datosReducer,
		configuracion: configuracionReducer,
		compromisoDeCobro: compromisoDeCobroReducer,
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
