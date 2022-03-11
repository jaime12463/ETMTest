import {TCodigoCantidad} from 'models';
import {TPedido} from 'models/redux';
import {useCallback} from 'react';
import {useObtenerVisitaActual} from 'redux/hooks';

export const useCalularPruductoEnPromoOnGoing = (codigoProducto: number) => {
	const visitaActual = useObtenerVisitaActual();

	const calularPruductoEnPromoOnGoing = useCallback(() => {
		const {promosOngoing} = visitaActual;
		let cantidad = 0;
		// Se busca el producto en las promociones ongoing del redux
		promosOngoing.forEach((promocion) => {
			promocion.beneficios[0].secuencias.forEach((secuencia) => {
				let materiales = secuencia?.materialesBeneficio as TCodigoCantidad[];

				let productoEncontrado = materiales.find(
					(producto) => producto.codigo === codigoProducto
				);

				if (productoEncontrado) {
					cantidad = productoEncontrado.cantidad;
					return;
				}
			});
		});

		return cantidad;
	}, [codigoProducto]);

	return calularPruductoEnPromoOnGoing;
};
