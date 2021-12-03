import {
	useObtenerBonificacionesHabilitadas,
	useObtenerDatosCliente,
	useObtenerIniciativasClienteActual,
} from 'hooks';
import {TDatosClientesProductos, TPedidos} from 'models';
import {useCallback} from 'react';
import {inicializarVisitaActual} from 'redux/features/visitaActual/visitaActualSlice';
import {useAppDispatch, useObtenerConfiguracion} from 'redux/hooks';
import {useInicializarPedidos} from '.';
import {v4 as uuidv4} from 'uuid';

export const useInicializarVisitaActual = () => {
	const dispatch = useAppDispatch();
	const inicializarPedidos = useInicializarPedidos();
	const configuracion = useObtenerConfiguracion();
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const iniciativasClienteActual = useObtenerIniciativasClienteActual();
	const obtenerBonificacionesHabilitadas =
		useObtenerBonificacionesHabilitadas();

	const useInicializarPedidoActual = useCallback(
		(
			fechaEntrega: string,
			codigoCliente: string,
			fechaVisitaPlanificada: string
		) => {
			const datosCliente = obtenerDatosCliente(codigoCliente);
			const pedidos: TPedidos = inicializarPedidos(fechaEntrega, codigoCliente);

			const tiposPedidos = configuracion.tipoPedidos;

			const tipoPedidoActual: string = tiposPedidos[0]?.codigo;

			const mostrarPromoPush: boolean = false;

			const bloquearPanelCarga: boolean = false;

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
						bonificaciones: obtenerBonificacionesHabilitadas(codigoCliente).map(
							(bonificaciones) => ({
								numeroPedido: uuidv4(),
								codigoCliente,
								idBonificacion: bonificaciones.idBonificacion,
								fechaCreacion: '',
								codigoUsuario: '',
								ruta: '',
								detalle: [],
							})
						), // Inicializar bonificaciones disponibles
						coberturasEjecutadas: [],
						pasoATomaPedido: false,
						seQuedaAEditar: {
							seQueda: false,
							bordeError: false,
						},
						fechaVisitaPlanificada,
					},
				})
			);
		},
		[dispatch]
	);

	return useInicializarPedidoActual;
};
