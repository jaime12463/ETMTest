import {TCodigoCantidad, TProductoPedido, EFormaBeneficio, ETipoProducto} from 'models';
import {useObtenerVisitaActual} from 'redux/hooks';
import {useObtenerDatosProducto} from '.';
import {ETiposDePago} from 'models/redux';

export const useCalcularEnvasesDeObsequios = () => {
	const visitaActual = useObtenerVisitaActual();
	const obtenerDatosProducto = useObtenerDatosProducto();

	const calcularEnvasesDeObsequios = () => {
		const medidaUnidad = 'Unidad';
		const medidaSubunidad = 'Subunidad';

		let promosConvertidasAProducto: TProductoPedido[] = [];
		visitaActual.promosOngoing.forEach((promo) => {
			promo.beneficios.forEach((beneficio) => {
				for (const secuencia of beneficio.secuencias) {
					//Solo calculo envases cuando es tipo Obsequio
					if (secuencia.formaBeneficio !== EFormaBeneficio.Obsequio) continue;

					for (const material of secuencia.materialesBeneficio) {
						const {codigo, cantidad} = material as TCodigoCantidad;
						if (cantidad === 0) continue;

						const {implicito1, implicito2, tipoProducto} = obtenerDatosProducto(
							Number(codigo)
						);
						
						if (tipoProducto=== ETipoProducto.Envase) continue;

						let datosImplicito1, datosImplicito2;
						if (implicito1) datosImplicito1 = obtenerDatosProducto(implicito1);
						if (implicito2) datosImplicito2 = obtenerDatosProducto(implicito2);

						const productoConvertido: TProductoPedido = {
							codigoProducto: Number(codigo),
							unidades: secuencia.unidadMedida === medidaUnidad ? cantidad : 0,
							subUnidades:
								secuencia.unidadMedida === medidaSubunidad ? cantidad : 0,
							tipoPago: promo.tipoPago ? promo.tipoPago : ETiposDePago.Contado,
							codigoImplicito1: implicito1,
							nombreImplicito1: datosImplicito1 ? datosImplicito1.nombre : '',
							codigoImplicito2: implicito2,
							nombreImplicito2: datosImplicito2 ? datosImplicito2.nombre : '',
							nombreProducto: '',
							presentacion: 0,
							subunidadesVentaMinima: 0,
							esVentaSubunidades: false,
							precioConImpuestoUnidad: 0,
							precioConImpuestoSubunidad: 0,
							tipoProducto: 0,
							total: 0,
							preciosBase: {
								unidad: 0,
								subUnidad: 0,
							},
							preciosNeto: {
								unidad: 0,
								subUnidad: 0,
							},
							preciosPromo: {
								unidad: 0,
								subUnidad: 0,
							},
							catalogoMotivo: '',
						};
						promosConvertidasAProducto =
							promosConvertidasAProducto.concat(productoConvertido);
					}
				}
			});
		});

		return promosConvertidasAProducto;
	};
	return calcularEnvasesDeObsequios;
};
