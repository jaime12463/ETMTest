import {TImplicitos} from 'models';
import {useObtenerDatos} from 'redux/hooks';

export const useObtenerImplicitosPromoPush = () => {
	const datos = useObtenerDatos();

	const obtenerImplicitosPromoPush = (
		codigoProducto : number
	): TImplicitos[] => {
		const {productos} = datos;

		let promoPushConImplicitos : TImplicitos[] = [];
		let nombreComponenteImplicito: string | undefined;

		let {
			implicito1: componenteImplicito1,
			implicito2: componenteImplicito2,
		} = productos[codigoProducto]
		
		if(componenteImplicito1) {
			nombreComponenteImplicito = componenteImplicito1
				? productos[componenteImplicito1].nombre
				: undefined;
			promoPushConImplicitos.push({
				codigoImplicito: componenteImplicito1,
				nombreImplicito: nombreComponenteImplicito,
			});
		}
		
		if(componenteImplicito2) {
			nombreComponenteImplicito = componenteImplicito2
				? productos[componenteImplicito2].nombre
				: undefined;
			promoPushConImplicitos.push({
				codigoImplicito: componenteImplicito2,
				nombreImplicito: nombreComponenteImplicito,
			});
		}

		return promoPushConImplicitos;
	};
	return obtenerImplicitosPromoPush;
};
