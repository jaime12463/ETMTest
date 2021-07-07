import {useCallback} from 'react';
import {TPedidoClienteParaEnviar, TPedidosClientes} from 'models';
import {selectPedidosClientes} from 'redux/features/pedidosClientes/pedidosClientesSlice';
import {useAppSelector} from 'redux/hooks';

export const useObtenerPedidosCliente = (codigoCliente: string): TPedidoClienteParaEnviar[] => {

	const pedidosClientes: TPedidosClientes = useAppSelector(selectPedidosClientes);

	const obtenerPedidosCliente = useCallback(
		(): TPedidoClienteParaEnviar[] => {
            let pedidosCliente: TPedidoClienteParaEnviar[] = [];
            if (pedidosClientes[codigoCliente])
                pedidosCliente = pedidosClientes[codigoCliente];
			return pedidosCliente;
		},
		[pedidosClientes, codigoCliente]
	);

    const pedidosCliente = obtenerPedidosCliente();

	return pedidosCliente;
};
