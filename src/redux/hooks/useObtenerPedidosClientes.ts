import {TPedidosClientes} from 'models';
import {useAppSelector} from 'redux/hooks';
import {selectPedidosClientes} from 'redux/features/pedidosClientes/pedidosClientesSlice';

export const useObtenerPedidosClientes = (): TPedidosClientes => {
	const pedidosClientes: TPedidosClientes = useAppSelector(
		selectPedidosClientes
	);
	return pedidosClientes;
};
