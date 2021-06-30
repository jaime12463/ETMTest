import {useCallback} from 'react';
import {TPedidoClienteParaEnviar} from 'models';

export const useObtenerPedidosDelCliente = () => {

	const obtenerPedidosDelCliente = useCallback(
		(pedidosClientes: TPedidoClienteParaEnviar[], fechaEntrega: string): number => {
            const pedidosDelCliente: number = 
                pedidosClientes == undefined 
                ? 0 
                : pedidosClientes.reduce((contador, pedido) => {			
                    	return pedido.fechaEntrega == fechaEntrega ? contador + 1: contador
                	}, 0)			

			return pedidosDelCliente;
		},
		[]
	);
	return obtenerPedidosDelCliente;
};
