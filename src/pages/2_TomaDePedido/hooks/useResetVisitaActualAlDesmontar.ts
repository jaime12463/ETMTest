import {useResetVisitaActual} from 'hooks';
import {useEffect} from 'react';

export const useResetVisitaActualAlDesmontar = () => {
	const reseTPedido = useResetVisitaActual();
	useEffect(() => {
		return () => {
			reseTPedido();
		};
	}, []);
};
