import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsToOrderReducer from 'redux/features/productsToOrder/productsToOrderSlice';
import actualCustumerReducer from 'redux/features/actualCustumer/actualCustumerSlice';

export const store = configureStore({
  reducer: {
    productsToOrder: productsToOrderReducer,
    actualCustumer: actualCustumerReducer,
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