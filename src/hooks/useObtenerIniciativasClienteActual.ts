import {useCallback} from 'react';
import {useObtenerDatosCliente} from 'hooks';
import {
	TCliente,
	TDatosClientesProductos,
	TIniciativas,
	TIniciativasCliente,
	TPedidosClientes,
} from 'models';
import {useObtenerPedidosClientes} from 'redux/hooks';
import {useObtenerDatos} from 'redux/hooks';

export const useObtenerIniciativasClienteActual = () => {
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const pedidosClientes: TPedidosClientes = useObtenerPedidosClientes();
	const datos: TDatosClientesProductos = useObtenerDatos();

	const obtenerIniciativasClienteActual = useCallback(
		(
			codigoCliente: string,
			fechaEntrega: string,
			fechaVisitaPlanificada: string
		) => {
			const datosCliente = obtenerDatosCliente(codigoCliente);
			if (!datosCliente) return [];

			const iniciativasGenerales: TIniciativas[] = datos.iniciativas;
			const {iniciativasHabilitadas}: TCliente = datosCliente;
			if (!iniciativasHabilitadas) return [];
			let iniciativasClientePedido: TIniciativasCliente[] = [];

			if (pedidosClientes[codigoCliente]) {
				iniciativasClientePedido = pedidosClientes[
					codigoCliente
				].iniciativas.filter(
					(iniciativa) =>
						iniciativa.fechaEntrega === fechaEntrega &&
						iniciativa.estado !== 'pendiente'
				);
			}

			const iniciativasFiltradas = iniciativasGenerales.filter((iniciativa) =>
				iniciativasHabilitadas.find(
					(iniciativaHabilatada) =>
						iniciativaHabilatada.idActividadIniciativa ===
							iniciativa.idActividadIniciativa &&
						iniciativa.finVigenciaIniciativa >= fechaVisitaPlanificada
				)
			);

			let iniciativasParaElCliente: TIniciativasCliente[] = [];

			iniciativasFiltradas.forEach((iniciativa) => {
				const iniciativaEnPedido = iniciativasClientePedido.find(
					(iniciativaPedido) =>
						iniciativa.idActividadIniciativa ===
						iniciativaPedido.idActividadIniciativa
				);

				if (!iniciativaEnPedido) {
					const secuenciaIniciativa = iniciativasHabilitadas?.find(
						(iniciativaHabilatada) =>
							iniciativaHabilatada.idActividadIniciativa ===
							iniciativa.idActividadIniciativa
					)?.secuenciaCliente;

					iniciativasParaElCliente.push({
						...iniciativa,
						estado: 'pendiente',
						motivo: '',
						secuencia: secuenciaIniciativa ?? 0,
						fechaEntrega,
						unidadesEjecutadas: iniciativa.unidadVentaIniciativa,
						subUnidadesEjecutadas: iniciativa.subunidadVentaIniciativa,
					});
				}
			});

			return iniciativasParaElCliente.sort((a, b) => a.secuencia - b.secuencia);
		},
		[]
	);

	return obtenerIniciativasClienteActual;
};
