import React from 'react';
import {useAppDispatch} from 'redux/hooks';
import {resetearClienteActual} from 'redux/features/clienteActual/clienteActualSlice';

export const useReiniciarClienteActual = () => {
	const dispatch = useAppDispatch();

	const reiniciarClienteActual = () => {
		dispatch(resetearClienteActual());
	};

	return reiniciarClienteActual;
};
