import {
	useAppDispatch,
	useObtenerConfiguracion,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {useCallback, useEffect} from 'react';
import {borrarProductoDelPedidoActual} from 'redux/features/visitaActual/visitaActualSlice';
import {Dialogo} from 'components/UI';

import {
	useObtenerProductosMandatoriosVisitaActual,
	useMostrarAdvertenciaEnDialogo,
} from 'hooks';
import {
	validarHayMasProductosMandatorios,
	validarHayMasProductosNoMandatorios,
} from 'utils/validaciones';

import {TProductoPedido, TFunctionMostarAvertenciaPorDialogo} from 'models';

import {
	useValidarAgregarProductoAlPedidoCliente,
	useManejadorConfirmarEliminarPedidosNoMandatorios,
} from 'pages/Pasos/2_TomaDePedido/hooks';

import {useTranslation} from 'react-i18next';

import React from 'react';
import Modal from 'components/UI/Modal';
import {AvisoIcon} from 'assests/iconos';

export const useBorrarTodoLosProductos = (
	// mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo,
	stateAlerta: any,
	productos: TProductoPedido[]
) => {
	const dispatch = useAppDispatch();
	const {t} = useTranslation();
	const configuracion = useObtenerConfiguracion();
	const visitaActual = useObtenerVisitaActual();

	const {setAlerta, setConfigAlerta} = stateAlerta;

	const productosMandatoriosVisitaActual =
		useObtenerProductosMandatoriosVisitaActual();
	const configuracionTipoDePedidoActual = configuracion.tipoPedidos.find(
		(tipoPedido) => tipoPedido.codigo === visitaActual.tipoPedidoActual
	);
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
			setConfigAlerta({
				titulo: 'Se borraran los pedidos de canje',
				mensaje: t('advertencias.borrarPedidosNoMandatorios', {
					tipoPedido: pedidoNoMandatorio?.descripcion,
				}),
				tituloBotonAceptar: 'Si',
				tituloBotonCancelar: 'No',
				callbackAceptar: () => manejadorConfirmarEliminarPedidosNoMandatorios(),
				iconoMensaje: <AvisoIcon />,
			});
			setAlerta((prevState: boolean) => !prevState);
		}
	}, [productos, pedidoNoMandatorio]);

	return borrarTodoLosProductos;
};
