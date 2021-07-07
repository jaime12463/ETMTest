import {TProductoPedido, TTotalPedido} from '../models';
import {useMemo} from 'react';

export const useCalcularTotalPedidos = (
	productosPedido: TProductoPedido[]
): TTotalPedido => {
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
		() => productosPedido.reduce(reducerSumarProductos, TotalInicial),
		[productosPedido]
	);
	return totalPedido;
};
