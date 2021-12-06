import {useCallback} from 'react';
import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerConfiguracion,
	useObtenerPedidoActual,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {
	editarProductoDelPedidoActual,
	borrarProductoDelPedidoActual,
	agregarProductoDelPedidoActual,
} from 'redux/features/visitaActual/visitaActualSlice';
import {
	TClienteActual,
	TFormTomaDePedido,
	TFunctionMostarAvertenciaPorDialogo,
	TPedido,
	TPrecioProducto,
	TStateInputFocus,
	TProductoPedido,
	TStateInfoDescuentos,
} from 'models';
import {
	useValidarAgregarProductoAlPedidoCliente,
	useManejadorConfirmarEliminarPedidosNoMandatorios,
} from '.';
import {UseFormGetValues} from 'react-hook-form';

import {
	validarHayMasProductosMandatorios,
	validarHayMasProductosNoMandatorios,
} from 'utils/validaciones';
import {useTranslation} from 'react-i18next';
import {useObtenerProductosMandatoriosVisitaActual} from 'hooks';

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

	const configuracionTipoDePedidoActual = configuracion.tipoPedidos.find(
		(tipoPedido) => tipoPedido.codigo === visitaActual.tipoPedidoActual
	);

	const pedidoNoMandatorio = configuracion.tipoPedidos.find(
		(tipoPedido) => tipoPedido.esMandatorio === false
	);

	const {productos}: TPedido = useObtenerPedidoActual();

	const agregarProductoAlPedidoActual = useCallback(
		(inputs: any, obtenerCalculoDescuentoProducto?: any) => {
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
						unidades: unidadesParseado,
						subUnidades: subUnidadesParseado,
					},
					stateInfoDescuento
				);
			}

			console.log();

			const preciosNeto = infoDescuento
				? {
						unidad:
							(productoActual.preciosBase.unidad *
								(100 - infoDescuento.porcentajeDescuento)) /
							100,
						subUnidad:
							(productoActual.preciosBase.subUnidad *
								(100 - infoDescuento.porcentajeDescuento)) /
							100,
				  }
				: {
						unidad: productoActual.precioConImpuestoUnidad,
						subUnidad: productoActual.precioConImpuestoSubunidad,
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
