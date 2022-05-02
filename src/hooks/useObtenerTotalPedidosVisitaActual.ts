import {
	useObtenerClienteActual,
	useObtenerConfiguracion,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {TPedido, TProductoPedido, TTotalPedido} from 'models';
import {useCalcularTotalPedidos, useObtenerDatosCliente} from 'hooks';

export const useObtenerTotalPedidosVisitaActual = () => {
	const visitaActual = useObtenerVisitaActual();
	const clienteActual = useObtenerClienteActual();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
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
			pedidosValorizados = pedidosValorizados.filter(
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

		const productosFinales = productos.filter((producto) => {
			return (
				(producto.unidadesDisponibles &&
					producto.unidades <= producto.unidadesDisponibles) ||
				(datosCliente?.configuracionPedido.cantidadMaximaUnidades &&
					producto.unidades <=
						datosCliente.configuracionPedido.cantidadMaximaUnidades)
			);
		});

		const calcularTotalPedidos = useCalcularTotalPedidos();
		return calcularTotalPedidos(productosFinales);
	};

	return obtenerTotalPedidosVisitaActual;
};
