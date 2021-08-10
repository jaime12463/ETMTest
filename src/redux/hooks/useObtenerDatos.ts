import {TDatosClientesProductos} from 'models';
import {useAppSelector} from 'redux/hooks';
import {selectDatos} from 'redux/features/datos/datosSlice';

export const useObtenerDatos = (): TDatosClientesProductos => {
	const {datos} = useAppSelector(selectDatos);
	return datos;
};
