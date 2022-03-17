import {useFiltrarPreciosProductosDelClienteActual} from 'hooks';
import {TPrecioProducto} from 'models';

export const useObtenerProductoPorCodigo = () => {
	const preciosProductosDelCliente =
		useFiltrarPreciosProductosDelClienteActual();

	const obtenerProductoPorCodigo = (
		codigo: number
	): TPrecioProducto | undefined =>
		preciosProductosDelCliente?.find(
			(producto) => producto.codigoProducto === codigo
		);

	return obtenerProductoPorCodigo;
};
