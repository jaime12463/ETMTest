import {useObtenerDatos} from 'redux/hooks';

export const useObtenerAtributos = () => {
	const {envases, familias, sabores, marcas, medidas} = useObtenerDatos();

	return {
		envases: Object.values(envases).sort((a, b) =>
			a.descripcion.localeCompare(b.descripcion)
		),
		familias: Object.values(familias).sort((a, b) =>
			a.descripcion.localeCompare(b.descripcion)
		),
		sabores: Object.values(sabores).sort((a, b) =>
			a.descripcion.localeCompare(b.descripcion)
		),
		marcas: Object.values(marcas).sort((a, b) =>
			a.descripcion.localeCompare(b.descripcion)
		),
		medidas: Object.values(medidas).sort((a, b) => {
			const medidasA = a.descripcion.split(' ');
			const medidasB = b.descripcion.split(' ');

			if (medidasA[1] === medidasB[1]) {
				return a.descripcion.localeCompare(b.descripcion);
			}

			return b.descripcion.localeCompare(a.descripcion);
		}),
	};
};
