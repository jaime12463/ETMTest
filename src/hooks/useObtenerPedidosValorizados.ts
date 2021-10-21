import {useObtenerConfiguracion, useObtenerVisitaActual} from 'redux/hooks';
import {TPedido, TProductoPedido, TTotalPedido} from 'models';
import {useCalcularTotalPedidos} from 'hooks';

export const useObtenerPedidosValorizados = () => {
	const visitaActual = useObtenerVisitaActual();
	const configuracion = useObtenerConfiguracion();
	const ObtenerPedidosValorizados = () => {
		let pedidosValorizados = Object.values(visitaActual.pedidos).filter(
			(pedido: TPedido) =>
				configuracion.tipoPedidos.find(
					(tipoPedido) => tipoPedido.codigo == pedido.tipoPedido
				)?.esValorizado && pedido.fechaEntrega === visitaActual.fechaEntrega
		);

		let productos: TProductoPedido[] = [];

		pedidosValorizados.forEach((pedido) => {
			productos = [...productos, ...pedido.productos];
		});

		let productosConUnidades = productos.filter(
			(productos) => productos.unidades > 0
		);

		return productosConUnidades;
	};

	return ObtenerPedidosValorizados;
};
