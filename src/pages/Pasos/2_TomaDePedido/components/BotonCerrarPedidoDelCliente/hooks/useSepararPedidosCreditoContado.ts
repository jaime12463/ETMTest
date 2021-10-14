import {
	ETiposDePago,
	TClienteActual,
	TPedido,
	TPedidoClienteParaEnviar,
	TProductoPedido,
} from 'models';
import {
	useObtenerClienteActual,
	useObtenerConfiguracion,
	useObtenerVisitaActual,
} from 'redux/hooks';

export const useSepararPedidosCreditoContado = () => {
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const configuracion = useObtenerConfiguracion();
	const visitaActual = useObtenerVisitaActual();

	const separarPedidosCreditoContado = (
		pedidosArray: TPedido[]
	): TPedidoClienteParaEnviar[] => {
		let pedidosSeparadosParaEnviar: TPedidoClienteParaEnviar[] = [];

		pedidosArray.forEach((pedido) => {
			let pedidosPorTipoDePago: (TPedido & {tipoPago?: ETiposDePago})[] = [];

			const datosTipoPedido = configuracion.tipoPedidos.find(
				(tipoPedido) => tipoPedido.codigo === pedido.tipoPedido
			);

			const esCondicionCreditoInformal =
				clienteActual.condicion === 'creditoInformal';

			if (!esCondicionCreditoInformal && datosTipoPedido?.esValorizado) {
				pedidosPorTipoDePago.push({
					...pedido,
					ordenDeCompra: visitaActual.ordenDeCompra,
					tipoPago:
						clienteActual.condicion === 'creditoFormal'
							? ETiposDePago.Credito
							: ETiposDePago.Contado,
				});
			}

			if (datosTipoPedido?.esValorizado && esCondicionCreditoInformal) {
				const productosContado = pedido.productos.filter(
					(producto: TProductoPedido) =>
						producto.tipoPago === ETiposDePago.Contado
				);

				if (productosContado.length > 0) {
					const pedidoContado: TPedido = {
						...pedido,
						productos: productosContado,
					};
					pedidosPorTipoDePago.push({
						...pedidoContado,
						tipoPago: ETiposDePago.Contado,
						ordenDeCompra: visitaActual.ordenDeCompra,
					});
				}

				const productosCredito = pedido.productos.filter(
					(producto: TProductoPedido) =>
						producto.tipoPago === ETiposDePago.Credito
				);

				if (productosCredito.length > 0) {
					const pedidoCredito: TPedido = {
						...pedido,
						productos: productosCredito,
					};
					pedidosPorTipoDePago.push({
						...pedidoCredito,
						tipoPago: ETiposDePago.Credito,
						ordenDeCompra: visitaActual.ordenDeCompra,
					});
				}
			}

			if (!datosTipoPedido?.esValorizado && pedido.productos.length) {
				pedidosPorTipoDePago.push(pedido);
			}

			pedidosPorTipoDePago.forEach((pedidoPorTipoDePago) => {
				pedidosSeparadosParaEnviar.push({
					usuario: '',
					enviado: false,
					...pedidoPorTipoDePago,
				});
			});
		});

		return pedidosSeparadosParaEnviar;
	};

	return separarPedidosCreditoContado;
};
