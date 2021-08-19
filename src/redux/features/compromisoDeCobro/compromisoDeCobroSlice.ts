import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TCompromisoDeCobro} from 'models';
import {RootState} from 'redux/store';

const estadoInicial: TCompromisoDeCobro = {
	ID: '',
	fechaCreacion: '',
	fechaEntrega: '',
	monto: 0,
	tipoDocumento: '',
};

export const compromisoDeCobroSlice = createSlice({
	name: 'compromisoDeCobro',
	initialState: estadoInicial,
	reducers: {
		agregarCompromisoDeCobro: (
			state,
			action: PayloadAction<TCompromisoDeCobro>
		) => {
			const {
				ID,
				fechaCreacion,
				fechaEntrega,
				monto,
				tipoDocumento,
			} = action.payload;

			state.ID = ID;
			state.fechaCreacion = fechaCreacion;
			state.fechaEntrega = fechaEntrega;
			state.monto = monto;
			state.tipoDocumento = tipoDocumento;
		},
	},
});

export const selectCompromisoDeCobro = (state: RootState) =>
	state.compromisoDeCobro;
export const {agregarCompromisoDeCobro} = compromisoDeCobroSlice.actions;
export default compromisoDeCobroSlice.reducer;
