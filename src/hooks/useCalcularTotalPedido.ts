import {TPedidoCliente, TProductoPedido, TTotalPedido} from 'models';
import {useMemo} from 'react';
import {selectPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {useAppSelector} from 'redux/hooks';

export const useCalcularTotalPedido = (): TTotalPedido => {
	const pedidoActual: TPedidoCliente = useAppSelector(selectPedidoActual);
	const TotalInicial: TTotalPedido = {
		totalUnidades: 0,
		totalPrecio: 0,
		totalSubUnidades: 0,
	};
	const reducerSumarProductos = (
		total: TTotalPedido,
		productoPedido: TProductoPedido
	): TTotalPedido => ({
		totalUnidades: total.totalUnidades + productoPedido.unidades,
		totalSubUnidades: total.totalSubUnidades + productoPedido.subUnidades,
		totalPrecio: total.totalPrecio + productoPedido.total,
	});
	const totalPedido: TTotalPedido = useMemo(
		() =>
			pedidoActual.productosPedido.reduce(reducerSumarProductos, TotalInicial),
		[pedidoActual]
	);
	return totalPedido;
};
