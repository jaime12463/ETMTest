import {TVisita} from 'models';
import {useAppSelector} from 'redux/hooks';
import {selectVisitaActual} from 'redux/features/visitaActual/visitaActualSlice';

export const useObtenerVisitaActual = (): TVisita => {
	const visitaActual: TVisita = useAppSelector(selectVisitaActual);
	return visitaActual;
};
