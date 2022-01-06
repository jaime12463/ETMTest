import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerConfiguracion,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {useCallback} from 'react';
import {
	borrarProductoDelPedidoActual,
	restablecerBonificaciones,
	eliminarCanje,
} from 'redux/features/visitaActual/visitaActualSlice';
import {
	useObtenerProductosMandatoriosVisitaActual,
	useMostrarAviso,
	useObtenerPedidosClienteMismaFechaEntrega,
} from 'hooks';

import {TProductoPedido} from 'models';

import {
	useValidarAgregarProductoAlPedidoCliente,
	useManejadorConfirmarEliminarPedidosNoMandatorios,
	useValidarProductoPermiteSubUnidades,
	useValidarTieneBonificaciones,
} from 'pages/Pasos/2_TomaDePedido/hooks';

import {useTranslation} from 'react-i18next';
import {AvisoIcon} from 'assests/iconos';

export const useBorrarTodoLosProductos = (
	// mostrarAdvertenciaEnDialogo: TFunctionMostarAvertenciaPorDialogo,
	stateAlerta: any,
	productos: TProductoPedido[],
) => {
	const dispatch = useAppDispatch();
	const {t} = useTranslation();
	const configuracion = useObtenerConfiguracion();
	const visitaActual = useObtenerVisitaActual();
	const clienteActual = useObtenerClienteActual();
	const mostrarAviso = useMostrarAviso();
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

	const {
		obtenerPedidosClienteMismaFechaEntrega,
	} = useObtenerPedidosClienteMismaFechaEntrega();

	const pedidosClienteMismaFechaEntrega = obtenerPedidosClienteMismaFechaEntrega(
		clienteActual.codigoCliente
	);

	const validarTieneBonificaciones =
		useValidarTieneBonificaciones();

	const {bonificacionesConVenta} = useObtenerConfiguracion();

	const borrarTodoLosProductos = useCallback(() => {
		const clienteOtroPedidoMismaFecha = pedidosClienteMismaFechaEntrega.length > 0 ? true : false;

		const clienteTieneCanje = visitaActual.pedidos.canje.productos.length > 0 ? true : false;

		const clienteTieneBoficaciones = validarTieneBonificaciones();

		//CA2:
		if (!clienteOtroPedidoMismaFecha && clienteTieneCanje && (clienteTieneBoficaciones && bonificacionesConVenta)) {
			setConfigAlerta({
				titulo: t('advertencias.borrarPedidosTitulo'),
				mensaje: t('advertencias.borrarPedidosGeneral'),
				tituloBotonAceptar: 'Eliminar todos',
				tituloBotonCancelar: 'Cancelar',
				callbackAceptar: () => {
					for (const producto of productos) {
						dispatch(
							borrarProductoDelPedidoActual({
								codigoProducto: producto.codigoProducto,
							})
						);
					}
					dispatch(eliminarCanje());
					dispatch(restablecerBonificaciones());
					mostrarAviso(
						'success',
						t('advertencias.productoEliminadoTitulo'),
						t('advertencias.productoEliminadoMensaje'),
						undefined,
						'productoEliminado'
					);
				},
				iconoMensaje: <AvisoIcon />,
			});
			setAlerta(true);

			return;
		}

		//CA3:
		if (!clienteOtroPedidoMismaFecha && clienteTieneCanje && (!clienteTieneBoficaciones || !bonificacionesConVenta)) {
			setConfigAlerta({
				titulo: t('advertencias.borrarPedidosTitulo'),
				mensaje: t('advertencias.borrarPedidosGeneral'),
				tituloBotonAceptar: 'Eliminar todos',
				tituloBotonCancelar: 'Cancelar',
				callbackAceptar: () => {
					for (const producto of productos) {
						dispatch(
							borrarProductoDelPedidoActual({
								codigoProducto: producto.codigoProducto,
							})
						);
					}
					dispatch(eliminarCanje());
					mostrarAviso(
						'success',
						t('advertencias.productoEliminadoTitulo'),
						t('advertencias.productoEliminadoMensaje'),
						undefined,
						'productoEliminado'
					);
				},
				iconoMensaje: <AvisoIcon />,
			});
			setAlerta(true);

			return;
		}

		//CA4:
		if (!clienteOtroPedidoMismaFecha && !clienteTieneCanje && (clienteTieneBoficaciones && bonificacionesConVenta)) {
			setConfigAlerta({
				titulo: t('advertencias.borrarPedidosTitulo'),
				mensaje: t('advertencias.borrarPedidosGeneral'),
				tituloBotonAceptar: 'Eliminar todos',
				tituloBotonCancelar: 'Cancelar',
				callbackAceptar: () => {
					for (const producto of productos) {
						dispatch(
							borrarProductoDelPedidoActual({
								codigoProducto: producto.codigoProducto,
							})
						);
					}
					dispatch(restablecerBonificaciones());
					mostrarAviso(
						'success',
						t('advertencias.productoEliminadoTitulo'),
						t('advertencias.productoEliminadoMensaje'),
						undefined,
						'productoEliminado'
					);
				},
				iconoMensaje: <AvisoIcon />,
			});
			setAlerta(true);

			return;
		}

		//CA1: o default
		//if (clienteOtroPedidoMismaFecha) {
			setConfigAlerta({
				titulo: t('advertencias.borrarPedidosTitulo'),
				mensaje: t('advertencias.borrarPedidos'),
				tituloBotonAceptar: 'Eliminar',
				tituloBotonCancelar: 'Cancelar',
				callbackAceptar: () => {
					for (const producto of productos) {
						dispatch(
							borrarProductoDelPedidoActual({
								codigoProducto: producto.codigoProducto,
							})
						);
					}
					mostrarAviso(
						'success',
						t('advertencias.productoEliminadoTitulo'),
						undefined,
						undefined,
						'productoEliminado'
					);
				},
				iconoMensaje: <AvisoIcon />,
			});
			setAlerta(true);

			return;
		//}

		//Logica anterior:
		/*if (
			validarHayMasProductosMandatorios(
				productosMandatoriosVisitaActual.mandatorios
			) ||
			!validarHayMasProductosNoMandatorios(
				productosMandatoriosVisitaActual.noMandatorios
			)
		) {
			mostrarAviso(
				'success',
				'Productos Borrados',
				undefined,
				undefined,
				'productoEliminado'
			);
			if (configuracion.bonificacionesConVenta) {
				dispatch(restablecerBonificaciones());
			}
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
		}*/
	}, [productos, pedidoNoMandatorio]);

	return borrarTodoLosProductos;
};
