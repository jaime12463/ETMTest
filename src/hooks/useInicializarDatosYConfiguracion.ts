import {useEffect} from 'react';
import {obtenerDatosClientesProductosAsync} from '../redux/features/datos/datosSlice';
import {obtenerDatosConfiguracionAsync} from '../redux/features/configuracion/configuracionSlice';
import {useAppDispatch} from '../redux/hooks';

export const useInicializarDatosYConfiguracion = () => {
	const dispatch = useAppDispatch();

	return useEffect(() => {
		dispatch(obtenerDatosClientesProductosAsync());
		dispatch(obtenerDatosConfiguracionAsync());
	}, [dispatch]);
};
