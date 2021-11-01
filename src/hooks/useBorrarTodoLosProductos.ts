import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerConfiguracion,
	useObtenerPedidoActual,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {useCallback} from 'react';
import {
	editarProductoDelPedidoActual,
	borrarProductoDelPedidoActual,
	agregarProductoDelPedidoActual,
} from 'redux/features/visitaActual/visitaActualSlice';

import {
	useObtenerProductosMandatoriosVisitaActual,
	useMostrarAdvertenciaEnDialogo,
} from 'hooks';
import {
	validarHayMasProductosMandatorios,
	validarHayMasProductosNoMandatorios,
} from 'utils/validaciones';

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
} from 'pages/Pasos/2_TomaDePedido/hooks';

import {useTranslation} from 'react-i18next';

export const useBorrarTodoLosProductos = (productos: TProductoPedido[]) => {
	const dispatch = useAppDispatch();
	const {t} = useTranslation();
	const configuracion = useObtenerConfiguracion();
	const visitaActual = useObtenerVisitaActual();
	const productosMandatoriosVisitaActual =
		useObtenerProductosMandatoriosVisitaActual();
	const configuracionTipoDePedidoActual = configuracion.tipoPedidos.find(
		(tipoPedido) => tipoPedido.codigo === visitaActual.tipoPedidoActual
	);
	const {mostrarAdvertenciaEnDialogo, mostarDialogo, parametrosDialogo} =
		useMostrarAdvertenciaEnDialogo();

	const manejadorConfirmarEliminarPedidosNoMandatorios =
		useManejadorConfirmarEliminarPedidosNoMandatorios(
			productosMandatoriosVisitaActual.noMandatorios,
			undefined,
			productos
		);

	const pedidoNoMandatorio = configuracion.tipoPedidos.find(
		(tipoPedido) => tipoPedido.esMandatorio === false
	);

	const borrarTodoLosProductos = useCallback(() => {
		if (
			!configuracionTipoDePedidoActual?.esMandatorio ||
			validarHayMasProductosMandatorios(
				productosMandatoriosVisitaActual.mandatorios
			) ||
			!validarHayMasProductosNoMandatorios(
				productosMandatoriosVisitaActual.noMandatorios
			)
		) {
			for (const producto of productos) {
				dispatch(
					borrarProductoDelPedidoActual({
						codigoProducto: producto.codigoProducto,
					})
				);
			}
		} else {
			console.log('entre');
			mostrarAdvertenciaEnDialogo(
				t('advertencias.borrarPedidosNoMandatorios', {
					tipoPedido: pedidoNoMandatorio?.descripcion,
				}),
				'eliminar-pedidosNoMandatorios',
				manejadorConfirmarEliminarPedidosNoMandatorios,
				{
					aceptar: t('general.si'),
					cancelar: t('general.no'),
				}
			);
		}
	}, [productos, mostrarAdvertenciaEnDialogo]);

	return borrarTodoLosProductos;
};
