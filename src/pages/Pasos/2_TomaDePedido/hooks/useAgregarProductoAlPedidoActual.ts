import {useCallback} from 'react';
import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerConfiguracion,
	useObtenerPedidoActual,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {agregarProductoDelPedidoActual} from 'redux/features/visitaActual/visitaActualSlice';
import {
	TClienteActual,
	TFunctionMostarAvertenciaPorDialogo,
	TPedido,
	TProductoPedido,
	TStateInfoDescuentos,
	TConfiguracionAgregarPedido,
	EFormaBeneficio,
	ETipoDescuento,
} from 'models';
import {useValidarAgregarProductoAlPedidoCliente} from '.';

import {useTranslation} from 'react-i18next';
import {useCalularPruductoEnPromoOnGoing} from 'hooks';

export const useAgregarProductoAlPedidoActual = (
	productoActual: TProductoPedido | null,
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo,
	getValues: any,
	setGetValues: any,
	stateInfoDescuento?: TStateInfoDescuentos
) => {
	const dispatch = useAppDispatch();
	const {t} = useTranslation();

	const validarAgregarProductoAlPedidoCliente =
		useValidarAgregarProductoAlPedidoCliente(
			mostrarAdvertenciaEnDialogo,
			productoActual,
			getValues
		);

	const calularPruductoEnPromoOnGoing = useCalularPruductoEnPromoOnGoing(
		productoActual?.codigoProducto ?? 0
	);

	const clienteActual: TClienteActual = useObtenerClienteActual();

	const visitaActual = useObtenerVisitaActual();

	const {productos}: TPedido = useObtenerPedidoActual();

	const agregarProductoAlPedidoActual = useCallback(
		(
			inputs: any,
			obtenerCalculoDescuentoProducto?: any,
			configuracion: TConfiguracionAgregarPedido = {actualizaDescuento: false}
		) => {
			const {unidades, subUnidades, catalogoMotivo, infoDescuento} = inputs;

			const unidadesParseado: number = unidades !== '' ? parseInt(unidades) : 0;

			const subUnidadesParseado: number =
				subUnidades !== '' ? parseInt(subUnidades) : 0;

			const infoBeneficio = calularPruductoEnPromoOnGoing();

			if (!productoActual) return;

			const esValidoAgregarProductoAlPedidoCliente: boolean =
				validarAgregarProductoAlPedidoCliente(inputs);

			if (!esValidoAgregarProductoAlPedidoCliente)
				return setGetValues({
					unidades: productoActual.unidades,
					subUnidades: productoActual.subUnidades,
					productoABuscar: '',
					tipoDePedido: visitaActual.tipoPedidoActual,
					catalogoMotivo: catalogoMotivo,
				});

			const {codigoProducto} = productoActual;

			const productoBuscado = productos.find((producto) => {
				return producto.codigoProducto === codigoProducto;
			});

			if (obtenerCalculoDescuentoProducto) {
				obtenerCalculoDescuentoProducto(
					{
						inputPolarizado: undefined,
						unidades: unidadesParseado,
						subUnidades: subUnidadesParseado,
					},
					stateInfoDescuento
				);
			}

			// unidadesSinPromoOngoing toma el valor de unidadesParseado - las unidades que se agregan en las promoOngoing, si no hay promoOngoing, toma el valor de unidadesParseado
			const unidadesSinPromoOngoing = infoBeneficio.cantidad
				? unidadesParseado - infoBeneficio.cantidad
				: unidadesParseado;

			const preciosNeto = infoDescuento
				? {
						// Precios del producto con algún descuento aplicado. No incluye PromoOngoing
						unidad:
							((productoActual.precioConDescuentoUnidad ??
								productoActual.precioConImpuestoUnidad) *
								(100 - infoDescuento.porcentajeDescuento)) /
							100,
						subUnidad:
							((productoActual.precioConDescuentoSubunidad ??
								productoActual.precioConImpuestoSubunidad) *
								(100 - infoDescuento.porcentajeDescuento)) /
							100,
				  }
				: {
						// Precios del producto sin descuentos aplicados. No incluye PromoOngoing
						unidad:
							productoActual.precioConDescuentoUnidad ??
							productoActual.precioConImpuestoUnidad,
						subUnidad:
							productoActual.precioConDescuentoSubunidad ??
							productoActual.precioConImpuestoSubunidad,
				  };

			// Se hace una copia de los precios para manejar las PromoOngoing. Si tiene descuento automático toma los valores por defecto.
			const preciosPromo =
				infoDescuento && infoDescuento.tipo !== ETipoDescuento.automatico
					? {...preciosNeto}
					: {
							unidad: productoActual.precioConImpuestoUnidad,
							subUnidad: productoActual.precioConImpuestoSubunidad,
					  };

			if (infoBeneficio) {
				// Si el descuento de promoOngoin es descuento porcentaje
				if (
					infoBeneficio.formaBeneficio === EFormaBeneficio.DescuentoPorcentaje
				) {
					// Si el descuento del producto es tipo polarizado o automático
					if (
						!productoActual.descuento?.tipo ||
						productoActual.descuento?.tipo !== ETipoDescuento.escalonado
					) {
						preciosPromo.unidad *= (100 - infoBeneficio.valorBeneficio) / 100;
						preciosPromo.subUnidad *=
							(100 - infoBeneficio.valorBeneficio) / 100;
					}
				}

				// Si el descuento de promoOngoin es descuento monto
				if (infoBeneficio.formaBeneficio === EFormaBeneficio.DescuentoMonto) {
					// Si el descuento del producto es tipo polarizado o automático
					if (
						!productoActual.descuento?.tipo ||
						productoActual.descuento?.tipo !== ETipoDescuento.escalonado
					) {
						preciosPromo.unidad -= infoBeneficio.valorBeneficio;
						preciosPromo.subUnidad =
							preciosPromo.unidad / productoActual.presentacion;
					}
				}

				// Si el descuento de promoOngoin es precio recupero
				if (infoBeneficio.formaBeneficio === EFormaBeneficio.Precio) {
					// Si el descuento del producto es tipo polarizado o automático
					if (
						!productoActual.descuento?.tipo ||
						productoActual.descuento?.tipo !== ETipoDescuento.escalonado
					) {
						preciosPromo.unidad = infoBeneficio.valorBeneficio;
						preciosPromo.subUnidad =
							infoBeneficio.valorBeneficio / productoActual.presentacion;
					}
				}
			}

			dispatch(
				agregarProductoDelPedidoActual({
					productoPedido: {
						...productoActual,
						unidades: unidadesParseado,
						subUnidades: subUnidadesParseado,
						total:
							preciosNeto.unidad * unidadesSinPromoOngoing +
							preciosPromo.unidad * (infoBeneficio.cantidad ?? 0) +
							preciosNeto.subUnidad * subUnidadesParseado,
						tipoPago: productoBuscado
							? productoBuscado.tipoPago
							: clienteActual.tipoPagoActual,
						catalogoMotivo,
						estado: 'activo',
						preciosBase: {
							unidad: productoActual.precioConImpuestoUnidad,
							subUnidad: productoActual.precioConImpuestoSubunidad,
						},
						preciosNeto,
						descuento: infoDescuento ?? productoActual.descuento,
					},
					configuracion,
				})
			);
		},
		[productoActual, validarAgregarProductoAlPedidoCliente, dispatch]
	);
	return agregarProductoAlPedidoActual;
};
