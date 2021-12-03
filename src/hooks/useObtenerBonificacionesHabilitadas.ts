import {useCallback} from 'react';
import {useObtenerDatosCliente} from 'hooks';
import {
	TCliente,
	TDatosClientesProductos,
	TIniciativas,
	TIniciativasCliente,
	TPedidosClientes,
	TBonificaciones,
} from 'models';
import {useObtenerPedidosClientes} from 'redux/hooks';
import {useObtenerDatos} from 'redux/hooks';

export const useObtenerBonificacionesHabilitadas = () => {
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	//const pedidosClientes: TPedidosClientes = useObtenerPedidosClientes();
	const datos: TDatosClientesProductos = useObtenerDatos();

	const obtenerBonificacionesHabilitadas = useCallback(
		(codigoCliente: string) => {
			const datosCliente = obtenerDatosCliente(codigoCliente);
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
