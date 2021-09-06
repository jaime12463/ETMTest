import {Dispatch, SetStateAction, useCallback, useEffect} from 'react';
import {TPrecioProducto, TClienteActual, TVisita} from 'models';
import {useObtenerPreciosProductosDelCliente} from 'hooks';
import {useObtenerDatosCliente} from 'hooks';
import {useObtenerClienteActual, useObtenerVisitaActual} from 'redux/hooks';

export const useInicializarPreciosProductosDelClienteActual = (
	setPreciosProductos: Dispatch<SetStateAction<TPrecioProducto[]>>
) => {
	const obtenerPreciosProductosDelCliente = useObtenerPreciosProductosDelCliente();
	const visitaActual: TVisita = useObtenerVisitaActual();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);

	const inicializarPreciosProductosDelClienteActual = useCallback(() => {
		let preciosProductosDelCliente: TPrecioProducto[] = [];
		if (datosCliente) {
			preciosProductosDelCliente = obtenerPreciosProductosDelCliente(
				datosCliente,
				visitaActual.fechaEntrega
			);
		}
		setPreciosProductos(preciosProductosDelCliente);
	}, [datosCliente, visitaActual, obtenerPreciosProductosDelCliente]);

	return useEffect(() => {
		inicializarPreciosProductosDelClienteActual();
	}, []);
};
