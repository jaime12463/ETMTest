import {TImplicitos, TPromoPush} from 'models';
import {useObtenerDatos} from 'redux/hooks';

export const useObtenerImplicitosPromoPush = () => {
	const datos = useObtenerDatos();

	const obtenerImplicitosPromoPush = (
		promoPush : TPromoPush | undefined
	): TImplicitos[] => {
		const {productos} = datos;

		let promoPushConImplicitos : any;
		promoPushConImplicitos = promoPush?.componentes.map(
		(componentes) => {
			let nombreComponenteImplicito1: string | undefined;
			let nombreComponenteImplicito2: string | undefined;

			let {
				implicito1: componenteImplicito1,
				implicito2: componenteImplicito2,
			} = productos[componentes.codigoProducto]
			
			if(componenteImplicito1) {
				nombreComponenteImplicito1 = componenteImplicito1
					? productos[componenteImplicito1].nombre
					: undefined;
			}
			
			if(componenteImplicito2) {
				nombreComponenteImplicito2 = componenteImplicito2
					? productos[componenteImplicito2].nombre
					: undefined;
			}
			
			if(typeof componenteImplicito1 !== 'undefined' && typeof componenteImplicito2 !== 'undefined')
				return {
					codigoImplicito1: componenteImplicito1,
					nombreImplicito1: nombreComponenteImplicito1,
					codigoImplicito2: componenteImplicito2,
					nombreImplicito2: nombreComponenteImplicito2,
				}
		});

		return promoPushConImplicitos;
	};
	return obtenerImplicitosPromoPush;
};
