import {TPrecio, TFechaEntrega, TConfiguracionPedido} from 'models';

export const validarFechaVigenciaProducto = (
	preciosProductos: TPrecio[],
	fechaEntrega: string
) => {
	return preciosProductos.some(
		(precio) =>
			new Date(precio['vigenciaInicioPrecio']) <= new Date(fechaEntrega) &&
			new Date(precio['vigenciaFinPrecio']) >= new Date(fechaEntrega)
	);
};

export const validarUnidadesMinimasProducto = (
	unidades: number,
	configuracionPedido: TConfiguracionPedido
) => {
	const {cantidadMaximaUnidades} = configuracionPedido;
	if (cantidadMaximaUnidades) {
		if (unidades > cantidadMaximaUnidades) return false;
	}
	return true;
};
