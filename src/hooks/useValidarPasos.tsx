import React, {useEffect} from 'react';
import {AvisoIcon} from 'assests/iconos';

import {Configuracion} from 'components/UI/Modal';
import {
	useObtenerDatosCliente,
	useObtenerPedidosClienteMismaFechaEntrega,
	useObtenerTotalPedidosVisitaActual,
} from 'hooks';
import {TCliente, TClienteActual} from 'models';
import {useTranslation} from 'react-i18next';
import {
	cambiarEstadoIniciativa,
	cambiarSeQuedaAEditar,
	limpiarProductosSinCantidad,
} from 'redux/features/visitaActual/visitaActualSlice';
import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerConfiguracion,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {obtenerTotalesPedidosCliente} from 'utils/methods';
import {useMostrarAviso} from './useMostrarAviso';
import {useBorrarTodoTomaPedido} from 'pages/Pasos/2_TomaDePedido/hooks';

interface ValidarPasos {
	error: boolean;
	contenidoMensajeModal?: Configuracion;
	contenidoMensajeAviso?: {
		tipo: 'default' | 'error' | 'success' | 'warning' | 'info';
		titulo: string;
		mensaje?: string;
		opciones?: any;
		dataCy?: string;
	};
}

export const useValidarPasos = (pasoActual: number): ValidarPasos => {
	const {t} = useTranslation();
	const visitaActual = useObtenerVisitaActual();
	const [configAlerta, setConfigAlerta] = React.useState({
		titulo: '',
		mensaje: '',
		tituloBotonAceptar: '',
		tituloBotonCancelar: '',
		iconoMensaje: <></>,
		callbackAceptar: () => {},
	});

	const [alerta, setAlerta] = React.useState<boolean>(false);
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const {venta} = visitaActual.pedidos;
	const dispatch = useAppDispatch();
	const mostrarAviso = useMostrarAviso();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const obtenerTotalPedidosVisitaActual = useObtenerTotalPedidosVisitaActual();
	const {obtenerPedidosClienteMismaFechaEntrega} =
		useObtenerPedidosClienteMismaFechaEntrega();
	const datosCliente: TCliente | undefined = obtenerDatosCliente(
		clienteActual.codigoCliente
	);
	const {tipoPedidos} = useObtenerConfiguracion();
	const pedidosClienteMismaFechaEntrega =
		obtenerPedidosClienteMismaFechaEntrega(clienteActual.codigoCliente);
	const totalesPedidoCliente = obtenerTotalesPedidosCliente({
		pedidosClienteMismaFechaEntrega,
		tipoPedidos,
	});
	const borrarTodoTomaPedido = useBorrarTodoTomaPedido(
		{setAlerta, setConfigAlerta},
		venta?.productos,
		true
	);

	React.useEffect(() => {
		borrarTodoTomaPedido();
	}, [visitaActual.pedidos, venta]);
	//const borrado = borrarTodoTomaPedido();

	if (pasoActual === 0) {
		const iniciativasCanceladasSinMotivo = visitaActual.iniciativas.some(
			(iniciativa) =>
				iniciativa.estado === 'cancelada' && iniciativa.motivo === ''
		);

		const iniciativasEjecutadasSinCantidad = visitaActual.iniciativas.filter(
			(iniciativa) =>
				iniciativa.estado === 'ejecutada' &&
				iniciativa.unidadesEjecutadas === 0 &&
				iniciativa.subUnidadesEjecutadas === 0
		);

		if (iniciativasCanceladasSinMotivo) {
			return {
				error: iniciativasCanceladasSinMotivo,
				contenidoMensajeAviso: {
					tipo: 'error',
					titulo: t('toast.iniciativaSinMotivoTitulo'),
					mensaje: t('toast.iniciativaSinMotivoMensaje'),
					opciones: undefined,
					dataCy: 'clienteNoPortafolio',
				},
			};
		}

		if (iniciativasEjecutadasSinCantidad) {
			return {
				error: iniciativasEjecutadasSinCantidad.length > 0,
				contenidoMensajeModal: {
					titulo: t('modal.tarjetasVaciasTitulo'),
					mensaje: t('modal.tarjetasVaciasMensaje'),
					tituloBotonAceptar: t('general.avanzar'),
					callbackAceptar: () => {
						iniciativasEjecutadasSinCantidad.map((iniciativa) => {
							dispatch(
								cambiarEstadoIniciativa({
									estado: 'pendiente',
									codigoIniciativa: iniciativa.idMaterialIniciativa,
								})
							);
						});
					},
					tituloBotonCancelar: t('general.editarCantidades'),
					callbackCancelar: () =>
						dispatch(cambiarSeQuedaAEditar({seQueda: false, bordeError: true})),
					iconoMensaje: <AvisoIcon />,
				},
			};
		}
	}
	if (pasoActual === 1) {
		const productosSinModificar = venta?.productos?.some(
			(producto) => producto.unidades === 0 && producto.subUnidades === 0
		);

		if (visitaActual.seQuedaAEditar.bordeError) {
			return {
				error: true,
				contenidoMensajeAviso: {
					tipo: 'error',
					titulo: t('toast.excedeMayorPermitidoTitulo'),
					mensaje: t('toast.excedeMayorPermitidoMensaje'),
					opciones: undefined,
					dataCy: 'excede-disponible',
				},
			};
		}

		if (productosSinModificar) {
			const pedidoConUnidadesYSubUnidades = venta.productos.some(
				(producto) => producto.unidades > 0 || producto.subUnidades > 0
			);

			if (!pedidoConUnidadesYSubUnidades) {
				return {
					error: productosSinModificar,
					contenidoMensajeModal: configAlerta,
				};
			} else {
				return {
					error: productosSinModificar,
					contenidoMensajeModal: {
						titulo: t('titulos.tituloProductosSinCargar'),
						mensaje: t('advertencias.mensajeProductosSinCargar'),
						tituloBotonAceptar: t('general.avanzar'),
						tituloBotonCancelar: t('general.editarCantidades'),
						callbackAceptar: () => {
							dispatch(limpiarProductosSinCantidad());
							dispatch(
								cambiarSeQuedaAEditar({seQueda: false, bordeError: false})
							);
							mostrarAviso(
								'success',
								t('toast.cambiosGuardados'),
								undefined,
								undefined,
								'successpaso2'
							);
						},
						callbackCancelar: () => {
							dispatch(
								cambiarSeQuedaAEditar({seQueda: true, bordeError: true})
							);
						},
						iconoMensaje: <AvisoIcon />,
					},
				};
			}
		}
	}
	if (pasoActual === 2) {
		const canjeSinMotivo = visitaActual.pedidos.canje.productos.some(
			(producto) => producto.catalogoMotivo === ''
		);

		if (
			!datosCliente?.informacionCrediticia.esBloqueadoVenta &&
			datosCliente?.configuracionPedido.ventaMinima?.montoVentaMinima &&
			totalesPedidoCliente +
				(obtenerTotalPedidosVisitaActual().totalPrecio ?? 0) <
				datosCliente?.configuracionPedido.ventaMinima?.montoVentaMinima
		) {
			return {
				error: true,
				contenidoMensajeAviso: {
					tipo: 'error',
					titulo: t('toast.pedidoMinimoNoAlcanzadoTitulo'),
					mensaje: t('toast.pedidoMinimoNoAlcanzadoMensaje'),
					opciones: undefined,
					dataCy: 'pedidoMinimoNoAlcanzado',
				},
			};
		}

		if (visitaActual.envasesConError > 0) {
			return {
				error: true,
				contenidoMensajeAviso: {
					tipo: 'error',
					titulo: t('toast.cantidadSuperiorEnvasesTitulo'),
					mensaje: t('toast.cantidadSuperiorEnvasesMensaje'),
					opciones: undefined,
					dataCy: 'cantidad-superior-envases',
				},
			};
		}

		if (canjeSinMotivo) {
			return {
				error: canjeSinMotivo,
				contenidoMensajeAviso: {
					tipo: 'error',
					titulo: t('toast.canjeSinMotivoTitulo'),
					mensaje: t('toast.canjeSinMotivoMensaje'),
					opciones: undefined,
					dataCy: 'canjeSinMotivo',
				},
			};
		}
	}

	return {error: false};
};
