import {useFiltrarPreciosProductosDelClienteActual} from 'hooks';
import {TPrecioProducto} from 'models';

export const useObtenerProductoPorCodigo = (
	codigo: number
): TPrecioProducto | undefined => {
	const preciosProductosDelCliente =
		useFiltrarPreciosProductosDelClienteActual();

	return preciosProductosDelCliente?.find(
		(producto) => producto.codigoProducto === codigo
	);
};
