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
} from 'models';
import {
	useValidarAgregarProductoAlPedidoCliente,
	useManejadorConfirmarEliminarPedidosNoMandatorios,
} from '.';

import {useTranslation} from 'react-i18next';
import {
	useCalularPruductoEnPromoOnGoing,
	useObtenerProductosMandatoriosVisitaActual,
} from 'hooks';

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

	const productosMandatoriosVisitaActual =
		useObtenerProductosMandatoriosVisitaActual();
	const manejadorConfirmarEliminarPedidosNoMandatorios =
		useManejadorConfirmarEliminarPedidosNoMandatorios(
			productosMandatoriosVisitaActual.noMandatorios,
			productoActual?.codigoProducto
		);

	const clienteActual: TClienteActual = useObtenerClienteActual();
	const configuracion = useObtenerConfiguracion();

	const visitaActual = useObtenerVisitaActual();

	const {productos}: TPedido = useObtenerPedidoActual();

	const agregarProductoAlPedidoActual = useCallback(
		(
			inputs: any,
			obtenerCalculoDescuentoProducto?: any,
			configruacion: TConfiguracionAgregarPedido = {actualizaDescuento: false}
		) => {
			const {unidades, subUnidades, catalogoMotivo, infoDescuento} = inputs;

			const unidadesParseado: number = unidades !== '' ? parseInt(unidades) : 0;

			const subUnidadesParseado: number =
				subUnidades !== '' ? parseInt(subUnidades) : 0;

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
						unidades: unidadesParseado - calularPruductoEnPromoOnGoing(),
						subUnidades: subUnidadesParseado,
					},
					stateInfoDescuento
				);
			}

			const preciosNeto = infoDescuento
				? {
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
						unidad:
							productoActual.precioConDescuentoUnidad ??
							productoActual.precioConImpuestoUnidad,
						subUnidad:
							productoActual.precioConDescuentoSubunidad ??
							productoActual.precioConImpuestoSubunidad,
				  };
			dispatch(
				agregarProductoDelPedidoActual({
					productoPedido: {
						...productoActual,
						unidades: unidadesParseado,
						subUnidades: subUnidadesParseado,
						total:
							preciosNeto.unidad * unidadesParseado +
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
				})
			);
		},
		[productoActual, validarAgregarProductoAlPedidoCliente, dispatch]
	);
	return agregarProductoAlPedidoActual;
};
