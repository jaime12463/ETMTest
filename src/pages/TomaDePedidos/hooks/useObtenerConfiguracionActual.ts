import {TConfiguracion} from 'models';
import {useCallback} from 'react';
import {useAppSelector} from 'redux/hooks';
import {selectDatos} from 'redux/features/configuracion/configuracionSlice';

export const useObtenerConfiguracionActual = () => {
	const {
		datos: {configuraciones},
	} = useAppSelector(selectDatos);
	const obtenerConfiguracion = useCallback(() => {
		const configuracion: TConfiguracion | undefined = configuraciones[0];
		return configuracion;
	}, [configuraciones]);
	return obtenerConfiguracion;
};
