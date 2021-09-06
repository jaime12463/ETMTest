import {useObtenerConfiguracion, useObtenerVisitaActual} from 'redux/hooks';
import {TPedido, TProductoPedido, TTotalPedido} from 'models';
import {useCalcularTotalPedidos} from 'hooks';

export const useObtenerTotalPedidosVisitaActual = () => {
	const visitaActual = useObtenerVisitaActual();
	const configuracion = useObtenerConfiguracion();
	const obtenerTotalPedidosVisitaActual = (
		soloMontoMinimo?: boolean
	): TTotalPedido => {
		let pedidosValorizados = Object.values(visitaActual.pedidos).filter(
			(pedido: TPedido) =>
				configuracion.tipoPedidos.find(
					(tipoPedido) => tipoPedido.codigo == pedido.tipoPedido
				)?.esValorizado && pedido.fechaEntrega === visitaActual.fechaEntrega
		);

		if (soloMontoMinimo) {
			pedidosValorizados.filter(
				(pedido) =>
					configuracion.tipoPedidos.find(
						(tipoPedido) => tipoPedido.codigo == pedido.tipoPedido
					)?.contribuyeAMinimo
			);
		}

		let productos: TProductoPedido[] = [];

		pedidosValorizados.forEach((pedido) => {
			productos = [...productos, ...pedido.productos];
		});

		const calcularTotalPedidos = useCalcularTotalPedidos();

		return calcularTotalPedidos(productos);
	};

	return obtenerTotalPedidosVisitaActual;
};
