import {TPrecio} from 'models';

export const useObtenerPrecioVigenteDelProducto = () => {
	const obtenerPrecioVigenteDelProducto = (
		preciosProductos: TPrecio[],
		fechaEntrega: string
	): TPrecio | undefined => {
		const precioProducto: TPrecio | undefined = preciosProductos.find(
			(precio) =>
				new Date(precio['vigenciaInicioPrecio']) <= new Date(fechaEntrega) &&
				new Date(precio['vigenciaFinPrecio']) >= new Date(fechaEntrega)
		);

		return precioProducto;
	};
	return obtenerPrecioVigenteDelProducto;
};
