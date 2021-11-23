import {
	TInfoDescuentos,
	TPrecioProducto,
	TProductoPedido,
	TStateInfoDescuentos,
} from 'models';
import {useCallback} from 'react';

export const useObtenerCalculoDescuentoProducto = (
	producto: TProductoPedido | TPrecioProducto
) => {
	const obtenerCalculoDescuentoProducto = (
		valorIngresado: number,
		stateInfoDescuento: TStateInfoDescuentos
	) => {
		const {infoDescuento, setInfoDescuento} = stateInfoDescuento;

		if (infoDescuento.tipo === 'polarizado') {
			//const valorIngresado = Number(infoDescuento.inputPolarizado);

			const descuento = producto.descuentoPolarizado?.find(
				(descuentoPolarizado) => {
					if (
						valorIngresado >= descuentoPolarizado.precioVentaAlPublicoDesde &&
						valorIngresado <= descuentoPolarizado.precioVentaAlPublicoHasta
					) {
						return true;
					}
				}
			);
			if (descuento) {
				setInfoDescuento({
					...infoDescuento,
					porcentajeDescuento: descuento.porcentajeDescuentoPolarizado,
					inputPolarizado: valorIngresado,
				});
			} else {
				setInfoDescuento({
					...infoDescuento,
					porcentajeDescuento: 0,
					inputPolarizado: valorIngresado,
				});
			}
		}
	};

	return obtenerCalculoDescuentoProducto;
};
