import {useObtenerPedidosClienteMismaFechaEntrega} from 'hooks';
import {
	useObtenerConfiguracion,
	useObtenerVisitaActual,
	useObtenerClienteActual,
} from 'redux/hooks';
import {TPedido, TClienteActual, TPedidoClienteParaEnviar} from 'models';

export const useObtenerProductosMandatoriosVisitaActual = () => {
	const visitaActual = useObtenerVisitaActual();
	const configuracion = useObtenerConfiguracion();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {obtenerPedidosClienteMismaFechaEntrega} =
		useObtenerPedidosClienteMismaFechaEntrega();
	const pedidosClienteMismaFechaEntrega =
		obtenerPedidosClienteMismaFechaEntrega(clienteActual.codigoCliente);

	const pedidos: {
		mandatorios: TPedido[];
		noMandatorios: TPedido[];
	} = {
		mandatorios: [],
		noMandatorios: [],
	};

	Object.values(visitaActual.pedidos).map((pedido: TPedido) => {
		const mandatorio = configuracion.tipoPedidos.find(
			(tipoPedido) => tipoPedido.codigo == pedido.tipoPedido
		)?.esMandatorio;
		const esPedidoEnvasesHabilitados =
			configuracion.tipoPedidoEnvasesHabilitados.includes(pedido.tipoPedido);

		if (
			pedido.fechaEntrega === visitaActual.fechaEntrega &&
			pedido.productos.length > 0
		) {
			if (mandatorio) {
				pedidos.mandatorios.push(pedido);
			} else {
				if (!esPedidoEnvasesHabilitados) pedidos.noMandatorios.push(pedido);
			}
		}
	});

	pedidosClienteMismaFechaEntrega.map((pedido: TPedido) => {
		const mandatorio = configuracion.tipoPedidos.find(
			(tipoPedido) => tipoPedido.codigo == pedido.tipoPedido
		)?.esMandatorio;

		if (
			pedido.fechaEntrega === visitaActual.fechaEntrega &&
			pedido.productos.length > 0
		) {
			if (mandatorio) {
				pedidos.mandatorios.push(pedido);
			}
		}
	});

	return {
		mandatorios: pedidos.mandatorios,
		noMandatorios: pedidos.noMandatorios,
	};
};
