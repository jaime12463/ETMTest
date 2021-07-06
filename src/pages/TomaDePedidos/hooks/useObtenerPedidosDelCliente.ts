import {useCallback} from 'react';
import {TPedidoClienteParaEnviar} from 'models';

export const useObtenerPedidosDelCliente = () => {

	const obtenerPedidosDelCliente = useCallback(
		(pedidosClientes: TPedidoClienteParaEnviar[]): number => {
            const pedidosDelCliente: number = 
                pedidosClientes == undefined 
                ? 0 
                : pedidosClientes.reduce((contador, pedido) => {			
                    	return contador + 1;
                	}, 0)			

			return pedidosDelCliente;
		},
		[]
	);
	return obtenerPedidosDelCliente;
};
