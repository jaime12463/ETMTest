import {useAppSelector} from 'redux/hooks';
import {selectVisitaActual} from 'redux/features/visitaActual/visitaActualSlice';

export const useObtenerMostrarPromoPush = () => {
	const prueba = 0;
	const {mostrarPromoPush} = useAppSelector(selectVisitaActual);

	return mostrarPromoPush;
};
