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
} from './index';

import {
	validarHayMasProductosMandatorios,
	validarHayMasProductosNoMandatorios,
} from 'utils/validaciones';
import {useTranslation} from 'react-i18next';
import {useObtenerProductosMandatoriosVisitaActual} from 'hooks';

export const useAgregarProductoAlPedidoActual = (
	codigoProducto: number,
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo
) => {
	const dispatch = useAppDispatch();
	const {t} = useTranslation();

	/* 	const validarAgregarProductoAlPedidoCliente =
		useValidarAgregarProductoAlPedidoCliente(
			mostrarAdvertenciaEnDialogo,
			productoActual,
			getValues,
			resetLineaActual
		); */

	const productosMandatoriosVisitaActual =
		useObtenerProductosMandatoriosVisitaActual();

	/* 	const manejadorConfirmarEliminarPedidosNoMandatorios =
		useManejadorConfirmarEliminarPedidosNoMandatorios(
			productosMandatoriosVisitaActual.noMandatorios,
			codigoProducto
		); */

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
		(productoActual: TProductoPedido | undefined) => {
			if (!productoActual) return;

			/* 			const esValidoAgregarProductoAlPedidoCliente: boolean =
				validarAgregarProductoAlPedidoCliente(inputs); */

			const {codigoProducto} = productoActual;

			/* 			if (!esValidoAgregarProductoAlPedidoCliente) return; */

			if (productoActual.unidades > 0 || productoActual.subUnidades > 0) {
				dispatch(
					editarProductoDelPedidoActual({productoPedido: productoActual})
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
					/* 					mostrarAdvertenciaEnDialogo(
						t('advertencias.borrarPedidosNoMandatorios', {
							tipoPedido: pedidoNoMandatorio?.descripcion,
						}),
						'eliminar-linea-pedido',
						manejadorConfirmarEliminarPedidosNoMandatorios,
						{
							aceptar: t('general.si'),
							cancelar: t('general.no'),
						}
					); */
				}
			}
		},
		[dispatch]
	);
	return agregarProductoAlPedidoActual;
};
