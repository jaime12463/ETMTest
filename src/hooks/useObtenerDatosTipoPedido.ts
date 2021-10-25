import {TTipoPedido} from 'models';
import {useCallback} from 'react';
import {useObtenerConfiguracion, useObtenerVisitaActual} from 'redux/hooks';

export const useObtenerDatosTipoPedido = () => {
	const {tipoPedidos} = useObtenerConfiguracion();
	const visitaActual = useObtenerVisitaActual();

	const obtenerDatosTipoPedido = () => {
		const datosTipoPedidoActual: TTipoPedido | undefined = tipoPedidos.find(
			(tipoPedido) => tipoPedido.codigo === visitaActual.tipoPedidoActual
		);

		return datosTipoPedidoActual;
	};
	return obtenerDatosTipoPedido;
};
