import { TPrecio, TFechaEntrega, TConfiguracionPedido } from 'models';

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

export const obtenerPrecioConImpuestoUnidad = (
	preciosProductos: TPrecio[],
	fechaEntrega: string
) => {
	const resultado = preciosProductos.find(
		(precio) =>
			new Date(precio['vigenciaInicioPrecio']) <= new Date(fechaEntrega) &&
			new Date(precio['vigenciaFinPrecio']) >= new Date(fechaEntrega)
	);

	return resultado;
};

export const validarUnidadesMinimasProducto = (
	unidades: number,
	configuracionPedido: TConfiguracionPedido
) => {
	const { cantidadMaximaUnidades } = configuracionPedido;
	if (cantidadMaximaUnidades) {
		if (unidades > cantidadMaximaUnidades) return false;
	}
	return true;
};

export const validarMontoMinimoPedido = (
	montoTotalPedido: number,
	configuracionPedido: TConfiguracionPedido
) => {
	const { montoVentaMinima } = configuracionPedido;
	if (montoVentaMinima) {
		if (montoTotalPedido < montoVentaMinima) return false;
	}
	return true;
};

export const validarVentaSubUnidades = (
	esVentaSubunidadesRuta: boolean, esVentaSubunidades: boolean
) => {
	if (esVentaSubunidadesRuta && esVentaSubunidades)
		return true;
	return false;
}

export const validarSubUnidadesConPresentacion = (
	presentacion: number, subUnidades: number
) => {
	if (presentacion <= subUnidades)
		return false;
	return true;
}