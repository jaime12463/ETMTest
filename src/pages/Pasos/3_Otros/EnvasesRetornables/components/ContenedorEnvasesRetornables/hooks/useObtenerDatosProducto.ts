import {TProducto} from 'models';
import {useObtenerDatos} from 'redux/hooks';

export const useObtenerDatosProducto = () => {
	const datos = useObtenerDatos();

	const obtenerDatosProducto = (
		codigoProducto : number
	): TProducto => {
		const {productos} = datos;

		return productos[codigoProducto];
	};
	return obtenerDatosProducto;
};
