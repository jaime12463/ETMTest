import {EEstadosDeUnPedido, TPedido, TPedidos, TTipoPedido} from 'models';
import {useCallback} from 'react';
import {useObtenerConfiguracion} from 'redux/hooks';
import {v4 as uuidv4} from 'uuid';

export const useInicializarPedidos = () => {
	const configuraciones = useObtenerConfiguracion();
	const inicializarPedidos = useCallback((fechaEntrega: string) => {
		const pedidos: TPedidos = {};
		configuraciones.tipoPedidos.forEach((tipoPedido: TTipoPedido) => {
			const pedido: TPedido = {
				codigoPedido: uuidv4(),
				estado: EEstadosDeUnPedido.Activo,
				tipoPedido: tipoPedido.codigo,
				fechaEntrega,
				productos: [],
			};
			pedidos[tipoPedido.codigo] = pedido;
		});
		return pedidos;
	}, []);
	return inicializarPedidos;
};
