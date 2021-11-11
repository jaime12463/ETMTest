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
} from 'models';
import {
	useValidarAgregarProductoAlPedidoCliente,
	useManejadorConfirmarEliminarPedidosNoMandatorios,
} from '../../hooks';
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
	setGetValues: any
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
		(inputs: any) => {
			const {unidades, subUnidades, catalogoMotivo, tipoDePago} = inputs;

			const unidadesParseado: number = unidades !== '' ? parseInt(unidades) : 0;

			const subUnidadesParseado: number =
				subUnidades !== '' ? parseInt(subUnidades) : 0;

			if (!productoActual) return;

			const esValidoAgregarProductoAlPedidoCliente: boolean =
				validarAgregarProductoAlPedidoCliente(inputs);

			const {codigoProducto} = productoActual;

			const productoBuscado = productos.find((producto) => {
				return producto.codigoProducto === codigoProducto;
			});

			if (!esValidoAgregarProductoAlPedidoCliente)
				return setGetValues({
					unidades: getValues.unidades - 1,
					subUnidades: 0,
					productoABuscar: '',
					tipoDePedido: visitaActual.tipoPedidoActual,
					catalogoMotivo: catalogoMotivo,
				});

			// console.log(getValues.tipoPago);
			// console.log(tipoPago);
			if (unidadesParseado > 0 || subUnidadesParseado > 0) {
				dispatch(
					agregarProductoDelPedidoActual({
						productoPedido: {
							...productoActual,
							unidades: unidadesParseado,
							subUnidades: subUnidadesParseado,
							total:
								productoActual.precioConImpuestoUnidad * unidadesParseado +
								productoActual.precioConImpuestoSubunidad * subUnidadesParseado,
							tipoPago: productoBuscado ? productoBuscado.tipoPago : tipoDePago,
							catalogoMotivo,
							estado: 'activo',
						},
					})
				);
			} else {
				if (
					!configuracionTipoDePedidoActual?.esMandatorio ||
					validarHayMasProductosMandatorios(
						productosMandatoriosVisitaActual.mandatorios
					) ||
					!validarHayMasProductosNoMandatorios(
						productosMandatoriosVisitaActual.noMandatorios
					)
				) {
					dispatch(borrarProductoDelPedidoActual({codigoProducto}));
				} else {
					mostrarAdvertenciaEnDialogo(
						t('advertencias.borrarPedidosNoMandatorios', {
							tipoPedido: pedidoNoMandatorio?.descripcion,
						}),
						'eliminar-linea-pedido',
						manejadorConfirmarEliminarPedidosNoMandatorios,
						{
							aceptar: t('general.si'),
							cancelar: t('general.no'),
						}
					);
				}
			}
		},
		[productoActual, validarAgregarProductoAlPedidoCliente, dispatch]
	);
	return agregarProductoAlPedidoActual;
};
