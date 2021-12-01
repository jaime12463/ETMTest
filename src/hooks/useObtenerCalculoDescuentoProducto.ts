import {
	TInfoDescuentos,
	TPedidoDelProducto,
	TPrecioProducto,
	TProductoPedido,
	TStateInfoDescuentos,
} from 'models';
import {useCallback} from 'react';

export const useObtenerCalculoDescuentoProducto = (
	producto: TProductoPedido
) => {
	const obtenerCalculoDescuentoProducto = (
		valoresIngresados: {
			inputPolarizado: number | undefined;
			unidades: number;
			subUnidades: number;
		},
		stateInfoDescuento: TStateInfoDescuentos
	) => {
		const {infoDescuento, setInfoDescuento} = stateInfoDescuento;

		if (
			infoDescuento.tipo === 'polarizado' &&
			valoresIngresados.inputPolarizado !== undefined
		) {
			const descuento = producto.descuentoPolarizado?.find(
				(descuentoPolarizado) => {
					if (!valoresIngresados.inputPolarizado) return false;
					if (
						valoresIngresados.inputPolarizado >=
							descuentoPolarizado.precioVentaAlPublicoDesde &&
						valoresIngresados.inputPolarizado <=
							descuentoPolarizado.precioVentaAlPublicoHasta
					) {
						return true;
					}
				}
			);
			if (descuento) {
				setInfoDescuento({
					...infoDescuento,
					porcentajeDescuento: descuento.porcentajeDescuentoPolarizado,
					inputPolarizado: valoresIngresados.inputPolarizado,
				});
			} else {
				setInfoDescuento({
					...infoDescuento,
					porcentajeDescuento: 0,
					inputPolarizado: valoresIngresados.inputPolarizado,
				});
			}
		} else if (infoDescuento.tipo === 'escalonado') {
			const descuento = producto.descuentoEscalonado?.find(
				(descuentoEscalonado) => {
					if (
						valoresIngresados.unidades >= descuentoEscalonado.unidadesDesde &&
						valoresIngresados.unidades <= descuentoEscalonado.unidadesHasta
					) {
						return true;
					}
				}
			);

			if (descuento) {
				setInfoDescuento({
					...infoDescuento,
					porcentajeDescuento: descuento.porcentajeDescuentoEscalonado,
					inputPolarizado: 0,
				});
			} else {
				setInfoDescuento({
					...infoDescuento,
					porcentajeDescuento: 0,
					inputPolarizado: 0,
				});
			}
		}
	};

	return obtenerCalculoDescuentoProducto;
};
