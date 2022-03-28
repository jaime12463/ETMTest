import {
	useObtenerBonificacionesHabilitadas,
	useObtenerDatosCliente,
	useObtenerIniciativasClienteActual,
} from 'hooks';
import {TCliente, TPedidos, TPedidosClientes} from 'models';
import {useCallback} from 'react';
import {inicializarVisitaActual} from 'redux/features/visitaActual/visitaActualSlice';
import {
	useAppDispatch,
	useObtenerConfiguracion,
	useObtenerDatos,
	useObtenerPedidosClientes,
} from 'redux/hooks';
import {useInicializarPedidos} from '.';
import {v4 as uuidv4} from 'uuid';
import {PromocionesOngoing} from 'utils/procesos/promociones/PromocionesOngoing';

export const useInicializarVisitaActual = () => {
	const dispatch = useAppDispatch();
	const inicializarPedidos = useInicializarPedidos();
	const configuracion = useObtenerConfiguracion();
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const iniciativasClienteActual = useObtenerIniciativasClienteActual();
	const obtenerBonificacionesHabilitadas =
		useObtenerBonificacionesHabilitadas();
	const datos = useObtenerDatos();
	const pedidosCliente: TPedidosClientes = useObtenerPedidosClientes();

	const useInicializarPedidoActual = useCallback(
		(
			fechaEntrega: string,
			codigoCliente: string,
			fechaVisitaPlanificada: string
		) => {
			const datosCliente: TCliente | undefined =
				obtenerDatosCliente(codigoCliente);
			const pedidos: TPedidos = inicializarPedidos(fechaEntrega, codigoCliente);

			const tiposPedidos = configuracion.tipoPedidos;

			const tipoPedidoActual: string = tiposPedidos[0]?.codigo;

			const mostrarPromoPush: boolean = false;

			const bloquearPanelCarga: boolean = false;

			const promocionesOngoing = PromocionesOngoing.getInstance();

			if (datosCliente !== undefined)
				promocionesOngoing.inicializar(
					datosCliente,
					datos?.promociones,
					pedidosCliente[codigoCliente]?.promocionesOngoing ?? [],
					configuracion
				);

			dispatch(
				inicializarVisitaActual({
					visitaActual: {
						fechaEntrega,
						pedidos,
						tipoPedidoActual,
						mostrarPromoPush,
						saldoPresupuestoTipoPedido: {},
						bloquearPanelCarga,
						ordenDeCompra: '',
						iniciativas: iniciativasClienteActual(
							codigoCliente,
							fechaEntrega,
							fechaVisitaPlanificada
						),
						bonificaciones: obtenerBonificacionesHabilitadas(
							codigoCliente,
							fechaVisitaPlanificada
						).map((bonificaciones) => ({
							numeroPedido: uuidv4(),
							codigoCliente,
							idBonificacion: bonificaciones.idBonificacion,
							fechaCreacion: fechaVisitaPlanificada,
							codigoUsuario: '',
							ruta: '',
							detalle: [],
							fechaEntrega: fechaEntrega,
						})),
						promosOngoing: [],
						coberturasEjecutadas: [],
						pasoATomaPedido: false,
						seQuedaAEditar: {
							seQueda: false,
							bordeError: false,
						},
						fechaVisitaPlanificada,
						envasesConError: 0,
						avisos: {
							limiteCredito: 0,
							cambiosPasoActual: false,
							calculoPromociones: false,
							cambioElPedidoSinPromociones: {contado: false, credito: false},
						},
						clienteBloqueado: false,
					},
				})
			);
		},
		[dispatch]
	);

	return useInicializarPedidoActual;
};
