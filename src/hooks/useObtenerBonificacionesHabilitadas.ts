import {useCallback} from 'react';
import {useObtenerDatosCliente} from 'hooks';
import {
	TCliente,
	TDatosClientesProductos,
	TPedidosClientes,
	TBonificaciones,
	TClienteActual,
	TVisita,
	TBonificacionesCliente,
} from 'models';
import {
	useObtenerClienteActual,
	useObtenerPedidosClientes,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {useObtenerDatos} from 'redux/hooks';

export const useObtenerBonificacionesHabilitadas = () => {
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const pedidosClientes: TPedidosClientes = useObtenerPedidosClientes();
	const datos: TDatosClientesProductos = useObtenerDatos();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const visitaActual: TVisita = useObtenerVisitaActual();

	const obtenerBonificacionesHabilitadas = useCallback(
		(
			codigoCliente?: string,
			fechaVisitaPlanificada?: string,
			fechaEntrega?: string
		) => {
			const codigoClienteActual = codigoCliente ?? clienteActual.codigoCliente;
			const fechaActual =
				fechaVisitaPlanificada ?? visitaActual.fechaVisitaPlanificada;
			const fechaEntregaActual = fechaEntrega ?? visitaActual.fechaEntrega;
			const datosCliente = obtenerDatosCliente(codigoClienteActual);

			if (!datosCliente) return [];

			const BonificacionesGenerales: TBonificaciones[] = datos.bonificaciones;
			const {bonificacionesHabilitadas}: TCliente = datosCliente;
			let bonificacionesEnPedido: {
				idBonificacion: number | null;
				total: number;
			}[] = [];

			if (pedidosClientes[codigoClienteActual]) {
				pedidosClientes[codigoClienteActual].bonificaciones.forEach(
					(bonificacion) => {
						const bonificacionExistente = bonificacionesEnPedido.find(
							(el) => el.idBonificacion === bonificacion.idBonificacion
						);
						if (bonificacionExistente) {
							bonificacionExistente.total = bonificacionExistente.total + 1;
						} else {
							bonificacionesEnPedido.push({
								idBonificacion: bonificacion.idBonificacion,
								total: 1,
							});
						}
					}
				);
			}

			const bonificacionesClienteActual: TBonificaciones[] =
				BonificacionesGenerales.filter((bonificacion) => {
					const bonificacionDisponible = bonificacionesHabilitadas?.find(
						(el) =>
							bonificacion.idBonificacion === el.idBonificacion &&
							el.bonificacionesDisponibles > 0
					);
					if (
						bonificacionDisponible &&
						bonificacion.vigenciaInicioBonificacion <= fechaActual &&
						bonificacion.vigenciaFinBonificacion >= fechaActual
					) {
						const bonificacionTotal = bonificacionesEnPedido.find(
							(el) => el.idBonificacion === bonificacion.idBonificacion
						);
						if (
							bonificacionTotal &&
							bonificacionTotal.total >=
								Number(bonificacionDisponible.bonificacionesDisponibles)
						) {
							return false;
						} else {
							return true;
						}
					}
					return false;
				});

			return bonificacionesClienteActual;
		},
		[]
	);
	return obtenerBonificacionesHabilitadas;
};
