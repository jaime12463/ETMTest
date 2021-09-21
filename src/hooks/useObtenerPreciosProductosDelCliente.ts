import {useCallback} from 'react';
import {useObtenerDatos} from 'redux/hooks';
import {
	TPrecioProducto,
	TCliente,
	TProducto,
	TPortafolio,
	TPrecio,
} from 'models';
import {validarFechaVigenciaProducto} from 'utils/validaciones';
import {
	useObtenerPrecioVigenteDelProducto,
	useObtenerDatosTipoPedido,
} from 'hooks';

export const useObtenerPreciosProductosDelCliente = () => {
	const datos = useObtenerDatos();
	const obtenerPrecioVigenteDelProducto = useObtenerPrecioVigenteDelProducto();

	const obtenerPreciosProductosDelCliente = useCallback(
		(clienteEncontrado: TCliente, fechaEntrega: string): TPrecioProducto[] => {
			let preciosProductosDelCliente: TPrecioProducto[] = [];

			const productosPortafolioVigentes: TPortafolio[] = clienteEncontrado.portafolio.filter(
				(producto) => {
					if (validarFechaVigenciaProducto(producto.precios, fechaEntrega))
						return producto;
				}
			);

			preciosProductosDelCliente = productosPortafolioVigentes.map(
				(productoFiltrado: TPortafolio) => {
					const {productos} = datos;
					const {
						precios,
						codigoProducto,
						esVentaSubunidades,
						unidadesDisponibles,
					} = productoFiltrado;

					const producto: TProducto = productos[codigoProducto];

					const {
						implicito1: codigoImplicito1,
						implicito2: codigoImplicito2,
						nombre: nombreProducto,
						presentacion,
						subunidadesVentaMinima,
						promoPush,
						tipoProducto,
					} = producto;

					const nombreImplicito1: string | undefined = codigoImplicito1
						? productos[codigoImplicito1].nombre
						: undefined;
					const nombreImplicito2: string | undefined = codigoImplicito2
						? productos[codigoImplicito2].nombre
						: undefined;

					const precioVigenteDelProducto:
						| TPrecio
						| undefined = obtenerPrecioVigenteDelProducto(
						precios,
						fechaEntrega
					);

					const {
						precioConImpuestoUnidad,
						precioConImpuestoSubunidad,
						descuento,
						componentes,
					} = {
						...precioVigenteDelProducto,
					};

					return {
						nombreProducto,
						codigoProducto,
						esVentaSubunidades,
						precioConImpuestoUnidad: precioConImpuestoUnidad ?? 0, //Este caso nunca seria posible
						precioConImpuestoSubunidad: precioConImpuestoSubunidad ?? 0, //Este caso nunca seria posible
						presentacion,
						subunidadesVentaMinima,
						codigoImplicito1,
						nombreImplicito1,
						codigoImplicito2,
						nombreImplicito2,
						unidadesDisponibles,
						promoPush,
						descuento,
						componentes,
						tipoProducto,
					};
				}
			);

			return preciosProductosDelCliente;
		},
		[datos]
	);
	return obtenerPreciosProductosDelCliente;
};
