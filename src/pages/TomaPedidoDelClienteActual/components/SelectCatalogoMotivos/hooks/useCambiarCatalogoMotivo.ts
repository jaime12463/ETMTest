import {ChangeEvent, useCallback} from 'react';
import {cambiarCatalogoMotivo} from 'redux/features/visitaActual/visitaActualSlice';
import {useAppDispatch} from 'redux/hooks';

export const useCambiarCatalogoMotivo = () => {
	const dispatch = useAppDispatch();
	const cambiarCatalogoMotivo = useCallback((e: ChangeEvent<any>) => {
		//dispatch(cambiarCatalogoMotivo({catalogoMotivo: parseInt(e.target.value)}));
	}, []);
	return cambiarCatalogoMotivo;
};
