import React from 'react';
import {limpiarCompromisoDeCobroActual} from 'redux/features/compromisoDeCobro/compromisoDeCobroSlice';
import {useAppDispatch} from 'redux/hooks';

export const useReiniciarCompromisoDeCobro = () => {
	const dispatch = useAppDispatch();
	const reiniciarCompromisoDeCobro = React.useCallback(() => {
		dispatch(limpiarCompromisoDeCobroActual());
	}, []);
	return reiniciarCompromisoDeCobro;
};
