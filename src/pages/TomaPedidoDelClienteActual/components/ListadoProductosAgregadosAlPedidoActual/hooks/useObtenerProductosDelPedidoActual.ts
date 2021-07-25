import {TProductoPedido, TPedidoActual} from 'models';
import {useObtenerPedidoActual} from 'redux/hooks';

const useObtenerProductosDelPedidoActual = (): TProductoPedido[] => {
	const pedidoActual: TPedidoActual = useObtenerPedidoActual();
	const {productosPedido} = pedidoActual;
	return productosPedido;
};

export default useObtenerProductosDelPedidoActual;
