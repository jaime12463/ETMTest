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
	useValidarTieneBonificaciones,
} from '../hooks';
import {useTranslation} from 'react-i18next';
import {AvisoIcon} from 'assests/iconos';

export const useBorrarLinea = (
	stateAlerta: any
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

	const {
		obtenerPedidosClienteMismaFechaEntrega,
	} = useObtenerPedidosClienteMismaFechaEntrega();

	const pedidosClienteMismaFechaEntrega = obtenerPedidosClienteMismaFechaEntrega(
		clienteActual.codigoCliente
	);

	const validarTieneBonificaciones =
		useValidarTieneBonificaciones();

	const {bonificacionesConVenta} = useObtenerConfiguracion();

	const borrarLinea = useCallback((productoaBorrar: TProductoPedido) => {
		const clienteOtroPedidoMismaFecha = pedidosClienteMismaFechaEntrega.length > 0 ? true : false;

		const clienteTieneCanje = visitaActual.pedidos.canje.productos.length > 0 ? true : false;

		const clienteTieneBoficaciones = validarTieneBonificaciones();

		const esUltimoProducto = visitaActual.pedidos.venta.productos.length === 1 ? true : false;

		//CA2:
		if (
			esUltimoProducto &&
			!clienteOtroPedidoMismaFecha && 
			clienteTieneCanje && 
			(clienteTieneBoficaciones && bonificacionesConVenta)
		) {
			setConfigAlerta({
				titulo: t('advertencias.borrarLineaPedidosTitulo'),
				mensaje: t('advertencias.borrarLineaPedidosMensajeCanjeBonificacion'),
				tituloBotonAceptar: 'Aceptar',
				tituloBotonCancelar: 'Cancelar',
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
				callbackCancelar: () => {
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
				tituloBotonAceptar: 'Eliminar',
				tituloBotonCancelar: 'Cancelar',
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
				callbackCancelar: () => {
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
			(clienteTieneBoficaciones && bonificacionesConVenta)
		) {
			setConfigAlerta({
				titulo: t('advertencias.borrarLineaPedidosTitulo'),
				mensaje: t('advertencias.borrarLineaPedidosMensajeBonificacion'),
				tituloBotonAceptar: 'Eliminar',
				tituloBotonCancelar: 'Cancelar',
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
				callbackCancelar: () => {
				},
				iconoMensaje: <AvisoIcon />,
			});
			setAlerta(true);

			return;
		}

		//CA1:
		if (!esUltimoProducto || clienteOtroPedidoMismaFecha ) {
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
			return;
		}

		if(esUltimoProducto) {
			setConfigAlerta({
				titulo: t('advertencias.borrarLineaPedidosTitulo'),
				mensaje: t('advertencias.borrarLineaPedidosMensajeUnico'),
				tituloBotonAceptar: 'Aceptar',
				tituloBotonCancelar: 'Cancelar',
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
				callbackCancelar: () => {
				},
				iconoMensaje: <AvisoIcon />,
			});
			setAlerta(true);
		}

	}, [visitaActual.pedidos]);

	return borrarLinea;
};
