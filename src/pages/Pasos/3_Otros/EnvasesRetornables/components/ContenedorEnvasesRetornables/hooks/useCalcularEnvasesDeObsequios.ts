import {TProductoPedido} from 'models';
import {useObtenerVisitaActual} from 'redux/hooks';
import {useObtenerDatosProducto} from '.';

export const useCalcularEnvasesDeObsequios = () => {
	const visitaActual = useObtenerVisitaActual();
	const obtenerDatosProducto = useObtenerDatosProducto();

	const calcularEnvasesDeObsequios = () => {
		const medidaUnidad = 'Unidad';
		const medidaSubunidad = 'Subunidad';

		let promosConvertidasAProducto: TProductoPedido[] = [];
		// TODO ALONSO: Descomentar luego de que el tipado sea NO opcionable
		/*visitaActual.promosOngoing.forEach((promo) => {
			promo.listaProductosAplicados.forEach((producto) => {
				const {implicito1, implicito2} = obtenerDatosProducto(
					producto.codigoProducto
				);
				let datosImplicito1, datosImplicito2;
				if (implicito1) datosImplicito1 = obtenerDatosProducto(implicito1);
				if (implicito2) datosImplicito2 = obtenerDatosProducto(implicito2);
				const productoConvertido: TProductoPedido = {
					codigoProducto: producto.codigoProducto,
					unidades:
						producto.unidadMedida === medidaUnidad ? producto.cantidad : 0,
					subUnidades:
						producto.unidadMedida === medidaSubunidad ? producto.cantidad : 0,
					tipoPago: promo.tipoPago,
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
					catalogoMotivo: '',
				};
				promosConvertidasAProducto =
					promosConvertidasAProducto.concat(productoConvertido);
			});
		});*/

		return promosConvertidasAProducto;
	};
	return calcularEnvasesDeObsequios;
};
