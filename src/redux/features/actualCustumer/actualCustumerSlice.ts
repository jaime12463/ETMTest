import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const initialState = {
    codigoCliente: ""
};

export const actualCustumerSlice = createSlice({
    name: 'actualCustumer',
    initialState,
    reducers: {
        setActualCustumer: (state, action) => {
            state.codigoCliente = action.payload.codigoCliente
        },
    }
})

export const selectActualCustumer = (state: RootState) => state.actualCustumer;
export const { setActualCustumer } = actualCustumerSlice.actions;
export default actualCustumerSlice.reducer;
