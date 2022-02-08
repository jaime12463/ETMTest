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
	cambiarSeQuedaAEditar,
	limpiarProductosSinCantidad,
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

export const useBorrarTodoTomaPedido = (
	stateAlerta: any,
	productos: TProductoPedido[],
	esEnValidarPasos: boolean = false
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

	const {obtenerPedidosClienteMismaFechaEntrega} =
		useObtenerPedidosClienteMismaFechaEntrega();

	const pedidosClienteMismaFechaEntrega =
		obtenerPedidosClienteMismaFechaEntrega(clienteActual.codigoCliente);

	const validarTieneBonificaciones = useValidarTieneBonificaciones();

	const {bonificacionesConVenta} = useObtenerConfiguracion();

	const borrarTodoTomaPedido = useCallback(() => {
		const clienteOtroPedidoMismaFecha =
			pedidosClienteMismaFechaEntrega.length > 0 ? true : false;

		const clienteTieneCanje =
			visitaActual?.pedidos?.canje?.productos?.length > 0 ? true : false;

		const clienteTieneBoficaciones = validarTieneBonificaciones();

		//CA2:
		if (
			!clienteOtroPedidoMismaFecha &&
			clienteTieneCanje &&
			clienteTieneBoficaciones &&
			bonificacionesConVenta
		) {
			setConfigAlerta({
				titulo: esEnValidarPasos
					? t('titulos.tituloProductosSinCargar')
					: t('advertencias.borrarPedidosTitulo'),
				mensaje: esEnValidarPasos
					? t('advertencias.mensajeProductosSinCargarCanjeYBonificacion')
					: t('advertencias.borrarPedidosGeneral'),
				tituloBotonAceptar: esEnValidarPasos
					? t('general.avanzar')
					: 'Eliminar Todos',
				tituloBotonCancelar: esEnValidarPasos
					? t('general.editarCantidades')
					: 'Cancelar',
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
					dispatch(cambiarSeQuedaAEditar({seQueda: false, bordeError: false}));
					mostrarAviso(
						'success',
						esEnValidarPasos
							? t('toast.cambiosGuardados')
							: t('advertencias.productoEliminadoTitulo'),
						esEnValidarPasos
							? undefined
							: t('advertencias.productoEliminadoMensaje'),
						undefined,
						esEnValidarPasos ? 'successpaso2' : 'productoEliminado'
					);
				},
				callbackCancelar: () => {
					if (esEnValidarPasos)
						dispatch(cambiarSeQuedaAEditar({seQueda: true, bordeError: true}));
				},
				iconoMensaje: <AvisoIcon />,
			});

			setAlerta(true);

			return;
		}

		//CA3:
		if (
			!clienteOtroPedidoMismaFecha &&
			clienteTieneCanje &&
			(!clienteTieneBoficaciones || !bonificacionesConVenta)
		) {
			setConfigAlerta({
				titulo: esEnValidarPasos
					? t('titulos.tituloProductosSinCargar')
					: t('advertencias.borrarPedidosTitulo'),
				mensaje: esEnValidarPasos
					? t('advertencias.mensajeProductosSinCargarCanje')
					: t('advertencias.borrarPedidosGeneral'),
				tituloBotonAceptar: esEnValidarPasos
					? t('general.avanzar')
					: 'Eliminar Todos',
				tituloBotonCancelar: esEnValidarPasos
					? t('general.editarCantidades')
					: 'Cancelar',
				callbackAceptar: () => {
					for (const producto of productos) {
						dispatch(
							borrarProductoDelPedidoActual({
								codigoProducto: producto.codigoProducto,
							})
						);
					}
					dispatch(eliminarCanje());
					dispatch(cambiarSeQuedaAEditar({seQueda: false, bordeError: false}));
					mostrarAviso(
						'success',
						esEnValidarPasos
							? t('toast.cambiosGuardados')
							: t('advertencias.productoEliminadoTitulo'),
						esEnValidarPasos
							? undefined
							: t('advertencias.productoEliminadoMensaje'),
						undefined,
						esEnValidarPasos ? 'successpaso2' : 'productoEliminado'
					);
				},
				callbackCancelar: () => {
					if (esEnValidarPasos)
						dispatch(cambiarSeQuedaAEditar({seQueda: true, bordeError: true}));
				},
				iconoMensaje: <AvisoIcon />,
			});
			setAlerta(true);

			return;
		}

		//CA4:
		if (
			!clienteOtroPedidoMismaFecha &&
			!clienteTieneCanje &&
			clienteTieneBoficaciones &&
			bonificacionesConVenta
		) {
			setConfigAlerta({
				titulo: esEnValidarPasos
					? t('titulos.tituloProductosSinCargar')
					: t('advertencias.borrarPedidosTitulo'),
				mensaje: esEnValidarPasos
					? t('advertencias.mensajeProductosSinCargarBonificacion')
					: t('advertencias.borrarPedidosGeneral'),
				tituloBotonAceptar: esEnValidarPasos
					? t('general.avanzar')
					: 'Eliminar Todos',
				tituloBotonCancelar: esEnValidarPasos
					? t('general.editarCantidades')
					: 'Cancelar',
				callbackAceptar: () => {
					for (const producto of productos) {
						dispatch(
							borrarProductoDelPedidoActual({
								codigoProducto: producto.codigoProducto,
							})
						);
					}
					dispatch(restablecerBonificaciones());
					dispatch(cambiarSeQuedaAEditar({seQueda: false, bordeError: false}));
					mostrarAviso(
						'success',
						esEnValidarPasos
							? t('toast.cambiosGuardados')
							: t('advertencias.productoEliminadoTitulo'),
						esEnValidarPasos
							? undefined
							: t('advertencias.productoEliminadoMensaje'),
						undefined,
						esEnValidarPasos ? 'successpaso2' : 'productoEliminado'
					);
				},
				callbackCancelar: () => {
					if (esEnValidarPasos)
						dispatch(cambiarSeQuedaAEditar({seQueda: true, bordeError: true}));
				},
				iconoMensaje: <AvisoIcon />,
			});
			setAlerta(true);

			return;
		}

		//CA1: o default

		setConfigAlerta({
			titulo: esEnValidarPasos
				? t('titulos.tituloProductosSinCargar')
				: t('advertencias.borrarPedidosTitulo'),
			mensaje: esEnValidarPasos
				? t('advertencias.mensajeProductosSinCargar')
				: t('advertencias.borrarPedidos'),
			tituloBotonAceptar: esEnValidarPasos ? t('general.avanzar') : 'Eliminar',
			tituloBotonCancelar: esEnValidarPasos
				? t('general.editarCantidades')
				: 'Cancelar',
			callbackAceptar: () => {
				if (esEnValidarPasos) {
					dispatch(limpiarProductosSinCantidad());
					mostrarAviso(
						'success',
						t('toast.cambiosGuardados'),
						undefined,
						undefined,
						'successpaso2'
					);
				} else {
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
				}
			},
			callbackCancelar: () => {
				if (esEnValidarPasos)
					dispatch(cambiarSeQuedaAEditar({seQueda: true, bordeError: true}));
			},
			iconoMensaje: <AvisoIcon />,
		});
		setAlerta(true);

		return;
	}, [productos]);

	return borrarTodoTomaPedido;
};
