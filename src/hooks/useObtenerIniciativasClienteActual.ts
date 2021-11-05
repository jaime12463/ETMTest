import {useCallback} from 'react';
import {useObtenerDatosCliente} from 'hooks';
import {
	TCliente,
	TDatosClientesProductos,
	TIniciativas,
	TIniciativasCliente,
	TPedidosClientes,
} from 'models';
import {
	useObtenerClienteActual,
	useObtenerPedidosClientes,
	useObtenerCompromisoDeCobroActual,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {useObtenerDatos} from 'redux/hooks';

export const useObtenerIniciativasClienteActual = () => {
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const pedidosClientes: TPedidosClientes = useObtenerPedidosClientes();
	const datos: TDatosClientesProductos = useObtenerDatos();

	const obtenerIniciativasClienteActual = useCallback(
		(codigoCliente: string, fechaEntrega: string) => {
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
						iniciativaHabilatada.codigoIniciativa ===
						iniciativa.codigoIniciativa
				)
			);

			const iniciativasParaElCliente: TIniciativasCliente[] =
				iniciativasFiltradas.map((iniciativa) => {
					const iniciativaEnPedido = iniciativasClientePedido.find(
						(iniciativaPedido) =>
							iniciativa.codigoIniciativa === iniciativaPedido.codigoIniciativa
					);

					if (iniciativaEnPedido) {
						return iniciativaEnPedido;
					} else {
						const secuenciaIniciativa = iniciativasHabilitadas?.find(
							(iniciativaHabilatada) =>
								iniciativaHabilatada.codigoIniciativa ===
								iniciativa.codigoIniciativa
						)?.secuencia;

						return {
							...iniciativa,
							estado: 'pendiente',
							motivo: '',
							secuencia: secuenciaIniciativa ?? 0,
							unidadesEjecutadas: iniciativa.unidades,
							subUnidadesEjecutadas: iniciativa.subUnidades,
							fechaEntrega,
						};
					}
				});

			return iniciativasParaElCliente.sort((a, b) => a.secuencia - b.secuencia);
		},
		[]
	);

	return obtenerIniciativasClienteActual;
};
