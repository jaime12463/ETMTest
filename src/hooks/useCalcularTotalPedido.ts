import {useObtenerPedidoActual} from 'redux/hooks';
import {TPedido, TProductoPedido, TTotalPedido, ETiposDePago} from 'models';
import {useCallback, useMemo} from 'react';

export const useCalcularTotalPedido = (): (() => TTotalPedido) => {
	const pedidoActual: TPedido = useObtenerPedidoActual();
	const TotalInicial: TTotalPedido = {
		totalUnidades: 0,
		totalPrecio: 0,
		totalSubUnidades: 0,
		totalContado: {
			totalUnidades: 0,
			totalPrecio: 0,
			totalSubUnidades: 0,
		},
		totalCredito: {
			totalUnidades: 0,
			totalPrecio: 0,
			totalSubUnidades: 0,
		},
	};
	const reducerSumarProductos = (
		total: TTotalPedido,
		productoPedido: TProductoPedido
	): TTotalPedido => ({
		totalUnidades: total.totalUnidades + productoPedido.unidades,
		totalSubUnidades: total.totalSubUnidades + productoPedido.subUnidades,
		totalPrecio: total.totalPrecio + productoPedido.total,
		totalContado: {
			totalUnidades:
				productoPedido.tipoPago === ETiposDePago.Contado
					? total.totalContado.totalUnidades + productoPedido.unidades
					: total.totalContado.totalUnidades,
			totalSubUnidades:
				productoPedido.tipoPago === ETiposDePago.Contado
					? total.totalContado.totalSubUnidades + productoPedido.subUnidades
					: total.totalContado.totalSubUnidades,
			totalPrecio:
				productoPedido.tipoPago === ETiposDePago.Contado
					? total.totalContado.totalPrecio + productoPedido.total
					: total.totalContado.totalPrecio,
		},
		totalCredito: {
			totalUnidades:
				productoPedido.tipoPago === ETiposDePago.Credito
					? total.totalCredito.totalUnidades + productoPedido.unidades
					: total.totalCredito.totalUnidades,
			totalSubUnidades:
				productoPedido.tipoPago === ETiposDePago.Credito
					? total.totalCredito.totalSubUnidades + productoPedido.subUnidades
					: total.totalCredito.totalSubUnidades,
			totalPrecio:
				productoPedido.tipoPago === ETiposDePago.Credito
					? total.totalCredito.totalPrecio + productoPedido.total
					: total.totalCredito.totalPrecio,
		},
	});
	const obtenerTotalPedidos = useCallback((): TTotalPedido => {
		return pedidoActual.productos.reduce(reducerSumarProductos, TotalInicial);
	}, [pedidoActual]);
	return obtenerTotalPedidos;
};
