import {TTipoPedido} from 'models';
import {useCallback} from 'react';
import {useObtenerConfiguracion, useObtenerPedidoActual} from 'redux/hooks';

export const useObtenerDatosTipoPedido = () => {
	const {tipoPedidos} = useObtenerConfiguracion();
	const pedidoActual = useObtenerPedidoActual();
	const obtenerDatosTipoPedido = useCallback(() => {
		const datosTipoPedidoActual: TTipoPedido | undefined = tipoPedidos.find(
			(tipoPedido) => tipoPedido.codigo === pedidoActual.tipoPedido
		);
		return datosTipoPedidoActual;
	}, []);
	return obtenerDatosTipoPedido;
};
