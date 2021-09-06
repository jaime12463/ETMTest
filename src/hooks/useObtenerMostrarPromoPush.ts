import {useAppSelector} from 'redux/hooks';
import {selectVisitaActual} from 'redux/features/visitaActual/visitaActualSlice';

export const useObtenerMostrarPromoPush = () => {
	const {mostrarPromoPush} = useAppSelector(selectVisitaActual);

	return mostrarPromoPush;
};
