export {};
import {useCallback} from 'react';
import {useObtenerDatosCliente} from 'hooks';
import {TCliente, TDatosClientesProductos, TBonificaciones} from 'models';
import {useObtenerDatos} from 'redux/hooks';

export const useInicializarBonificacionesClienteActual = () => {
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	//const pedidosClientes: TPedidosClientes = useObtenerPedidosClientes();
	const datos: TDatosClientesProductos = useObtenerDatos();

	const inicializarBonificacionesClienteActual = useCallback(
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
	return inicializarBonificacionesClienteActual;
};
