import {EFormaBeneficio, TCodigoCantidad} from 'models';
import {useObtenerVisitaActual} from 'redux/hooks';

export interface TInfoBeneficioProductoPromoOngoing {
	cantidad: number;
	valorBeneficio: number;
	formaBeneficio: EFormaBeneficio;
}

export const useCalularPruductoEnPromoOnGoing = (codigoProducto: number) => {
	const visitaActual = useObtenerVisitaActual();

	const calularPruductoEnPromoOnGoing =
		(): TInfoBeneficioProductoPromoOngoing => {
			const {promosOngoing} = visitaActual;
			let infoBeneficio = {} as TInfoBeneficioProductoPromoOngoing;
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
