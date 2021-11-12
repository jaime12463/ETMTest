import {useObtenerVisitaActual, useObtenerConfiguracion} from 'redux/hooks';
import {useObtenerProductosMandatoriosVisitaActual} from 'hooks';
import {TPrecioProducto, TFunctionMostarAvertenciaPorDialogo} from 'models';
import {useManejadorConfirmarEliminarPedidosNoMandatorios} from '../hooks';
import {useCallback} from 'react';

import {
	validarHayMasProductosMandatorios,
	validarHayMasProductosNoMandatorios,
} from 'utils/validaciones';
import {useTranslation} from 'react-i18next';

export const useValidarBorrarPedido = (
	mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo
) => {
	const visitaActual = useObtenerVisitaActual();
	const {t} = useTranslation();
	const configuracion = useObtenerConfiguracion();
	const configuracionTipoDePedidoActual = configuracion.tipoPedidos.find(
		(tipoPedido) => tipoPedido.codigo === visitaActual.tipoPedidoActual
	);
	const pedidoNoMandatorio = configuracion.tipoPedidos.find(
		(tipoPedido) => tipoPedido.esMandatorio === false
	);
	const productosMandatoriosVisitaActual =
		useObtenerProductosMandatoriosVisitaActual();

	console.log(
		validarHayMasProductosMandatorios(
			productosMandatoriosVisitaActual.mandatorios
		)
	);

	const validarBorrarPedido = useCallback(
		(aviso, cambiarEstadoProducto, producto) => {
			if (
				!configuracionTipoDePedidoActual?.esMandatorio ||
				validarHayMasProductosMandatorios(
					productosMandatoriosVisitaActual.mandatorios
				) ||
				!validarHayMasProductosNoMandatorios(
					productosMandatoriosVisitaActual.noMandatorios
				)
			) {
				aviso({borrarProductosNoMandatorios: false});
			} else {
				mostrarAdvertenciaEnDialogo(
					t('advertencias.borrarPedidosNoMandatorios', {
						tipoPedido: pedidoNoMandatorio?.descripcion,
					}),
					'eliminar-linea-pedido',
					(oprimioBotonAceptar) => {
						if (oprimioBotonAceptar) {
							aviso({
								borrarProductosNoMandatorios: true,
								productosNoMandatorios:
									productosMandatoriosVisitaActual.noMandatorios,
							});
						} else {
							cambiarEstadoProducto(producto, 'activo');
						}
					},
					{
						aceptar: t('general.si'),
						cancelar: t('general.no'),
					}
				);
			}
		},
		[pedidoNoMandatorio, productosMandatoriosVisitaActual]
	);

	return validarBorrarPedido;
};
