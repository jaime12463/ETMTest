import {TConfiguracion} from 'models';
import {useAppSelector} from 'redux/hooks';
import {selectConfiguracion} from 'redux/features/configuracion/configuracionSlice';

export const useObtenerConfiguracion = (): TConfiguracion => {
	const {
		datos: {configuraciones},
	} = useAppSelector(selectConfiguracion);
	const configuracion: TConfiguracion = configuraciones[0];
	return configuracion;
};
