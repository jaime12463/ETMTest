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
	borrarProductoDelPedidoActual,
	cambiarEstadoIniciativa,
	cambiarSeQuedaAEditar,
} from 'redux/features/visitaActual/visitaActualSlice';
import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerConfiguracion,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {obtenerTotalesPedidosCliente} from 'utils/methods';
import {useMostrarAviso} from './useMostrarAviso';

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
					titulo: t('advertencias.iniciativaSinMotivo'),
					mensaje: t('mensajes.iniciativaSinMotivo'),
					opciones: undefined,
					dataCy: 'clienteNoPortafolio',
				},
			};
		}

		if (iniciativasEjecutadasSinCantidad) {
			return {
				error: iniciativasEjecutadasSinCantidad.length > 0,
				contenidoMensajeModal: {
					titulo: 'Existen tarjtas vacias',
					mensaje:
						'Si avanzas, las tarjetas que no tienen cantidades se eliminaran.',
					tituloBotonAceptar: 'Avanzar',
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
					tituloBotonCancelar: 'Editar Cantidades',
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
					tipo: 'warning',
					titulo: t('advertencias.pedidoMinimoNoAlcanzado'),
					mensaje: t('mensajes.pedidoMinimoNoAlcanzado'),
					opciones: undefined,
					dataCy: 'pedidoMinimoNoAlcanzado',
				},
			};
		}
		if (productosSinModificar) {
			return {
				error: productosSinModificar,
				contenidoMensajeModal: {
					titulo: t('titulos.tituloProductosSinCargar'),
					mensaje: t('advertencias.mensajeProductosSinCargar'),
					tituloBotonAceptar: t('general.avanzar'),
					tituloBotonCancelar: t('general.editarCantidades'),
					callbackAceptar: () => {
						venta.productos.map((producto) => {
							if (producto.unidades === 0 && producto.subUnidades === 0) {
								dispatch(
									borrarProductoDelPedidoActual({
										codigoProducto: producto.codigoProducto,
									})
								);
							}
						});
						dispatch(
							cambiarSeQuedaAEditar({seQueda: false, bordeError: false})
						);
						mostrarAviso(
							'success',
							t('avisos.cambiosGuardados'),
							undefined,
							undefined,
							'successpaso2'
						);
					},
					callbackCancelar: () => {
						dispatch(cambiarSeQuedaAEditar({seQueda: true, bordeError: true}));
					},
					iconoMensaje: <AvisoIcon />,
				},
			};
		}
	}
	if (pasoActual === 2) {
		const CanjeSinMotivo = visitaActual.pedidos.canje.productos.some(
			(producto) => producto.catalogoMotivo === ''
		);
		//TODO IDIOMA

		if (CanjeSinMotivo) {
			return {
				error: CanjeSinMotivo,
				contenidoMensajeAviso: {
					tipo: 'error',
					titulo: 'Canje sin motivo',
					mensaje: 'Es necesario agregar el motivo del canje',
					opciones: undefined,
					dataCy: 'canjeSinMotivo',
				},
			};
		}
	}

	return {error: false};
};
