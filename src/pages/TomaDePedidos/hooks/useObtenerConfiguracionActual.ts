import {TConfiguracion} from 'models';
import {useCallback} from 'react';
import {useAppSelector} from 'redux/hooks';
import {selectConfiguracion} from 'redux/features/configuracion/configuracionSlice';

export const useObtenerConfiguracionActual = () => {
	const {
		datos: {configuraciones},
	} = useAppSelector(selectConfiguracion);
	const obtenerConfiguracion = useCallback(() => {
		const configuracion: TConfiguracion | undefined = configuraciones[0];
		return configuracion;
	}, [configuraciones]);
	return obtenerConfiguracion;
};
