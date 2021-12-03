import {useCallback} from 'react';
import {useObtenerDatosCliente} from 'hooks';
import {
	TCliente,
	TDatosClientesProductos,
	TPedidosClientes,
	TBonificaciones,
	TClienteActual,
} from 'models';
import {useObtenerClienteActual, useObtenerPedidosClientes} from 'redux/hooks';
import {useObtenerDatos} from 'redux/hooks';

export const useObtenerBonificacionesHabilitadas = () => {
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	//const pedidosClientes: TPedidosClientes = useObtenerPedidosClientes();
	const datos: TDatosClientesProductos = useObtenerDatos();
	const clienteActual: TClienteActual = useObtenerClienteActual();

	const obtenerBonificacionesHabilitadas = useCallback(
		(codigoCliente?: string) => {
			const datosCliente = obtenerDatosCliente(
				codigoCliente ?? clienteActual.codigoCliente
			);
			if (!datosCliente) return [];

			const BonificacionesGenerales: TBonificaciones[] = datos.bonificaciones;
			const {bonificacionesHabilitadas}: TCliente = datosCliente;

			const BonificacionesClienteActual: TBonificaciones[] =
				BonificacionesGenerales.filter((bonificacion) =>
					bonificacionesHabilitadas?.find(
						(el) => bonificacion.idBonificacion === el.idBonificacion
					)
				);

			return BonificacionesClienteActual;
		},
		[]
	);
	return obtenerBonificacionesHabilitadas;
};
