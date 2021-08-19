import {TPedidosClientes} from 'models';
import {useAppSelector} from 'redux/hooks';
import {selectPedidosClientes} from 'redux/features/pedidosClientes/pedidosClientesSlice';

export const useObtenerCompromisosDeCobroCliente = (): TPedidosClientes => {
	const pedidosClientes: TPedidosClientes = useAppSelector(
		selectPedidosClientes
	);
	return pedidosClientes;
};
