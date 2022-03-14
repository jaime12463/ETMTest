import {EFormaBeneficio, TCodigoCantidad} from 'models';
import {TPedido} from 'models/redux';
import {useCallback} from 'react';
import {useObtenerVisitaActual} from 'redux/hooks';

interface TInfoBeneficioProductoPromoOngoin {
	cantidad: number;
	valorBeneficio: number;
	formaBeneficio: EFormaBeneficio;
}

export const useCalularPruductoEnPromoOnGoing = (codigoProducto: number) => {
	const visitaActual = useObtenerVisitaActual();

	const calularPruductoEnPromoOnGoing =
		(): TInfoBeneficioProductoPromoOngoin => {
			const {promosOngoing} = visitaActual;
			let infoBeneficio = {} as TInfoBeneficioProductoPromoOngoin;
			// Se busca el producto en las promociones ongoing del redux
			promosOngoing.forEach((promocion) => {
				promocion.beneficios[0].secuencias.forEach((secuencia) => {
					let materiales = secuencia?.materialesBeneficio as TCodigoCantidad[];

					let productoEncontrado = materiales.find(
						(producto) => producto.codigo === codigoProducto
					);

					if (productoEncontrado) {
						infoBeneficio.cantidad = productoEncontrado.cantidad;
						infoBeneficio.valorBeneficio = secuencia.valorBeneficio;
						infoBeneficio.formaBeneficio = secuencia.formaBeneficio;

						return;
					}
				});
			});

			return infoBeneficio;
		};

	return calularPruductoEnPromoOnGoing;
};
