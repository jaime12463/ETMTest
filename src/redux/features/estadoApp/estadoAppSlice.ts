import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {EEstadosApp, TEstadoApp} from 'models';
import {RootState} from 'redux/store';

const estadoInicial: TEstadoApp = {
	estado: EEstadosApp.PrimerInicio,
};

export const estadoAppSlice = createSlice({
	name: 'estadoApp',
	initialState: estadoInicial,
	reducers: {
		setEstado: (state, action: PayloadAction<EEstadosApp>) => {
			state.estado = action.payload;
		},
	},
});

export const selectEstadoApp = (state: RootState) => state.estadoApp;
export const {setEstado} = estadoAppSlice.actions;
export default estadoAppSlice.reducer;
