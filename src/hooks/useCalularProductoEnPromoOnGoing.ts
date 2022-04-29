import {EFormaBeneficio, ETiposDePago, TCodigoCantidad} from 'models';
import {useObtenerVisitaActual} from 'redux/hooks';

export interface TInfoBeneficioProductoPromoOngoing {
	cantidad: number;
	valorBeneficio: number;
	formaBeneficio: EFormaBeneficio;
	tipoPago: ETiposDePago;
	unidadMedida: string;
}

export const useCalularProductoEnPromoOnGoing = () => {
	const visitaActual = useObtenerVisitaActual();

	const calularPruductoEnPromoOnGoing = (
		codigoProducto: number
	): TInfoBeneficioProductoPromoOngoing => {
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
					infoBeneficio.tipoPago = promocion.tipoPago!;
					infoBeneficio.unidadMedida = secuencia.unidadMedida;

					return;
				}
			});
		});

		return infoBeneficio;
	};

	return calularPruductoEnPromoOnGoing;
};
