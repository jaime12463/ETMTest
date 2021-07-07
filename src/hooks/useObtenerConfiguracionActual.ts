import {TConfiguracion} from 'models';
import {useAppSelector} from 'redux/hooks';
import {selectConfiguracion} from 'redux/features/configuracion/configuracionSlice';

export const useObtenerConfiguracionActual = () => {
	const {
		datos: {configuraciones},
	} = useAppSelector(selectConfiguracion);
	const configuracionActual: TConfiguracion = configuraciones[0];
	return configuracionActual;
};
