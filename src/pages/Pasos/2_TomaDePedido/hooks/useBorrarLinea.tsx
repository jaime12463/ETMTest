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
	cambiarAvisos,
} from 'redux/features/visitaActual/visitaActualSlice';
import {
	useObtenerProductosMandatoriosVisitaActual,
	useMostrarAviso,
	useObtenerPedidosClienteMismaFechaEntrega,
} from 'hooks';
import {ETiposDePago, TProductoPedido} from 'models';
import {useValidarTieneBonificaciones} from '../hooks';
import {useTranslation} from 'react-i18next';
import {AvisoIcon} from 'assests/iconos';

export const useBorrarLinea = (stateAlerta: any) => {
	const dispatch = useAppDispatch();
	const {t} = useTranslation();
	const visitaActual = useObtenerVisitaActual();
	const clienteActual = useObtenerClienteActual();
	const mostrarAviso = useMostrarAviso();
	const {setAlerta, setConfigAlerta} = stateAlerta;

	const {obtenerPedidosClienteMismaFechaEntrega} =
		useObtenerPedidosClienteMismaFechaEntrega();

	const pedidosClienteMismaFechaEntrega =
		obtenerPedidosClienteMismaFechaEntrega(clienteActual.codigoCliente);

	const validarTieneBonificaciones = useValidarTieneBonificaciones();

	const {bonificacionesConVenta} = useObtenerConfiguracion();

	const borrarLinea = useCallback(
		(productoaBorrar: TProductoPedido) => {
			const clienteOtroPedidoMismaFecha =
				pedidosClienteMismaFechaEntrega.length > 0;

			const clienteTieneCanje = visitaActual.pedidos.canje.productos.length > 0;

			const clienteTieneBoficaciones = validarTieneBonificaciones();

			const esUltimoProducto =
				visitaActual.pedidos.venta.productos.length === 1;

			//CA2:
			if (
				esUltimoProducto &&
				!clienteOtroPedidoMismaFecha &&
				clienteTieneCanje &&
				clienteTieneBoficaciones &&
				bonificacionesConVenta
			) {
				setConfigAlerta({
					titulo: t('advertencias.borrarLineaPedidosTitulo'),
					mensaje: t('advertencias.borrarLineaPedidosMensajeCanjeBonificacion'),
					tituloBotonAceptar: t('general.aceptar'),
					tituloBotonCancelar: t('general.cancelar'),
					callbackAceptar: () => {
						dispatch(
							borrarProductoDelPedidoActual({
								codigoProducto: productoaBorrar.codigoProducto,
							})
						);
						dispatch(eliminarCanje());
						dispatch(restablecerBonificaciones());
						mostrarAviso(
							'success',
							t('advertencias.productoUnicoEliminadoTitulo'),
							t('advertencias.lineaBorradaConCanjeBonificacion'),
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
			if (
				esUltimoProducto &&
				!clienteOtroPedidoMismaFecha &&
				clienteTieneCanje &&
				(!clienteTieneBoficaciones || !bonificacionesConVenta)
			) {
				setConfigAlerta({
					titulo: t('advertencias.borrarLineaPedidosTitulo'),
					mensaje: t('advertencias.borrarLineaPedidosMensajeCanje'),
					tituloBotonAceptar: t('general.eliminar'),
					tituloBotonCancelar: t('general.cancelar'),
					callbackAceptar: () => {
						dispatch(
							borrarProductoDelPedidoActual({
								codigoProducto: productoaBorrar.codigoProducto,
							})
						);
						dispatch(eliminarCanje());
						mostrarAviso(
							'success',
							t('advertencias.productoUnicoEliminadoTitulo'),
							t('advertencias.lineaBorradaConCanje'),
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
			if (
				esUltimoProducto &&
				!clienteOtroPedidoMismaFecha &&
				!clienteTieneCanje &&
				clienteTieneBoficaciones &&
				bonificacionesConVenta
			) {
				setConfigAlerta({
					titulo: t('advertencias.borrarLineaPedidosTitulo'),
					mensaje: t('advertencias.borrarLineaPedidosMensajeBonificacion'),
					tituloBotonAceptar: t('general.eliminar'),
					tituloBotonCancelar: t('general.cancelar'),
					callbackAceptar: () => {
						dispatch(
							borrarProductoDelPedidoActual({
								codigoProducto: productoaBorrar.codigoProducto,
							})
						);
						dispatch(restablecerBonificaciones());
						mostrarAviso(
							'success',
							t('advertencias.productoUnicoEliminadoTitulo'),
							t('advertencias.lineaBorradaConBonificacion'),
							undefined,
							'productoEliminado'
						);
					},
					iconoMensaje: <AvisoIcon />,
				});
				setAlerta(true);

				return;
			}

			if (!esUltimoProducto || clienteOtroPedidoMismaFecha) {
				setConfigAlerta({
					titulo: t('advertencias.borrarLineaPedidosTitulo'),
					mensaje: t('advertencias.borrarLineaPedidosMensajeUnico'),
					tituloBotonAceptar: t('general.aceptar'),
					tituloBotonCancelar: t('general.cancelar'),
					callbackAceptar: () => {
						dispatch(
							borrarProductoDelPedidoActual({
								codigoProducto: productoaBorrar.codigoProducto,
							})
						);
						mostrarAviso(
							'success',
							t('advertencias.productoUnicoEliminadoTitulo'),
							undefined,
							undefined,
							'productoEliminado'
						);
						if (productoaBorrar.tipoPago === ETiposDePago.Credito) {
							dispatch(
								cambiarAvisos({
									calculoPromociones: true,
									cambioElPedidoSinPromociones: {credito: true, contado: false},
								})
							);
						}

						if (productoaBorrar.tipoPago === ETiposDePago.Contado) {
							dispatch(
								cambiarAvisos({
									calculoPromociones: true,
									cambioElPedidoSinPromociones: {credito: false, contado: true},
								})
							);
						}
					},
					iconoMensaje: <AvisoIcon />,
				});
				setAlerta(true);
			}

			if (esUltimoProducto) {
				setConfigAlerta({
					titulo: t('advertencias.borrarLineaPedidosTitulo'),
					mensaje: t('advertencias.borrarLineaPedidosMensajeUnico'),
					tituloBotonAceptar: t('general.aceptar'),
					tituloBotonCancelar: t('general.cancelar'),
					callbackAceptar: () => {
						dispatch(
							borrarProductoDelPedidoActual({
								codigoProducto: productoaBorrar.codigoProducto,
							})
						);
						mostrarAviso(
							'success',
							t('advertencias.productoUnicoEliminadoTitulo'),
							undefined,
							undefined,
							'productoEliminado'
						);
					},
					iconoMensaje: <AvisoIcon />,
				});
				setAlerta(true);
			}
		},
		[visitaActual.pedidos]
	);

	return borrarLinea;
};
