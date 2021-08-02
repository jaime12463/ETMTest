import {TEstadoApp} from 'models';
import {useAppSelector} from 'redux/hooks';
import {selectEstadoApp} from 'redux/features/estadoApp/estadoAppSlice';

export const useObtenerEstadoApp = (): TEstadoApp => {
	const estadoApp = useAppSelector(selectEstadoApp);
	return estadoApp;
};
