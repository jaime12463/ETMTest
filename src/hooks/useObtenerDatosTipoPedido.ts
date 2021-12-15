import {TTipoPedido} from 'models';
import {useCallback} from 'react';
import {useObtenerConfiguracion, useObtenerVisitaActual} from 'redux/hooks';

export const useObtenerDatosTipoPedido = () => {
	const {tipoPedidos} = useObtenerConfiguracion();
	const visitaActual = useObtenerVisitaActual();

	const obtenerDatosTipoPedido = (tipoPedido?: string) => {
		let tipoPedidoSeleccionado = visitaActual.tipoPedidoActual;
		if (tipoPedido) {
			tipoPedidoSeleccionado = tipoPedido;
		}
		const datosTipoPedidoActual: TTipoPedido | undefined = tipoPedidos.find(
			(tipoPedido) => tipoPedido.codigo === tipoPedidoSeleccionado
		);

		return datosTipoPedidoActual;
	};
	return obtenerDatosTipoPedido;
};
