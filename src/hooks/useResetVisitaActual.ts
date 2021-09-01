import {useCallback} from 'react';
import {resetearVisitaActual} from 'redux/features/visitaActual/visitaActualSlice';
import {useAppDispatch} from 'redux/hooks';

export const useResetVisitaActual = () => {
	const dispatch = useAppDispatch();
	const resetVisitaActual = useCallback(() => {
		dispatch(resetearVisitaActual());
	}, []);
	return resetVisitaActual;
};
