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
	useManejadorConfirmarEliminarPedidosNoMandatorios,
	useValidarTieneBonificaciones,
} from 'pages/Pasos/2_TomaDePedido/hooks';

import {useTranslation} from 'react-i18next';
import {AvisoIcon} from 'assests/iconos';

export const useBorrarTodoLasPromociones = (
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

	const borrarTodoLasPromociones = useCallback(() => {
		const clienteOtroPedidoMismaFecha = pedidosClienteMismaFechaEntrega.length > 0 ? true : false;

		const clienteTieneCanje = visitaActual.pedidos.canje.productos.length > 0 ? true : false;

		const clienteTieneBoficaciones = validarTieneBonificaciones();

		//CA2:
		if (!clienteOtroPedidoMismaFecha && clienteTieneCanje && (clienteTieneBoficaciones && bonificacionesConVenta)) {
			setConfigAlerta({
				titulo: t('advertencias.borrarPromocionTitulo'),
				mensaje: t('advertencias.borrarPromocionMensajeCanjeBonificacion'),
				tituloBotonAceptar: 'Aceptar',
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
						t('advertencias.promocionEliminadoTitulo'),
						t('advertencias.promocionEliminadoMensajeCanjeBonificacion'),
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
				titulo: t('advertencias.borrarPromocionTitulo'),
				mensaje: t('advertencias.borrarPromocionMensajeCanje'),
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
					dispatch(eliminarCanje());
					mostrarAviso(
						'success',
						t('advertencias.promocionEliminadoTitulo'),
						t('advertencias.promocionEliminadoMensajeCanje'),
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
				titulo: t('advertencias.borrarPromocionTitulo'),
				mensaje: t('advertencias.borrarPromocionMensajeBonificacion'),
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
					dispatch(restablecerBonificaciones());
					mostrarAviso(
						'success',
						t('advertencias.promocionEliminadoTitulo'),
						'Las cantidades de las promociones y de las bonificaciones se han restablecido a cero.',
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
				titulo: t('advertencias.borrarPromocionTitulo'),
				mensaje: t('advertencias.borrarPromocionMensaje'),
				tituloBotonAceptar: 'Aceptar',
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
						t('advertencias.promocionEliminadoTitulo'),
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

	return borrarTodoLasPromociones;
};
