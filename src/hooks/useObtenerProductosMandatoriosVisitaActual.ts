import {useObtenerPedidosClienteMismaFechaEntrega} from 'hooks';
import {
	useObtenerConfiguracion,
	useObtenerVisitaActual,
	useObtenerClienteActual,
} from 'redux/hooks';
import {TPedido, TClienteActual, TPedidoClienteParaEnviar} from 'models';

//TODO: Acomodar para que tome los pedidos cerrados de la misma fecha de entrega, por ahora solo toma del pedido en curso

export const useObtenerProductosMandatoriosVisitaActual = () => {
	const visitaActual = useObtenerVisitaActual();
	const configuracion = useObtenerConfiguracion();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {
		obtenerPedidosClienteMismaFechaEntrega,
	} = useObtenerPedidosClienteMismaFechaEntrega();
	const pedidosClienteMismaFechaEntrega = obtenerPedidosClienteMismaFechaEntrega(
		clienteActual.codigoCliente
	);

	const pedidos: {mandatorios: TPedido[]; noMandatorios: TPedido[]} = {
		mandatorios: [],
		noMandatorios: [],
	};

	Object.values(visitaActual.pedidos).map((pedido: TPedido) => {
		const mandatorio = configuracion.tipoPedidos.find(
			(tipoPedido) => tipoPedido.codigo == pedido.tipoPedido
		)?.esMandatorio;

		if (
			pedido.fechaEntrega === visitaActual.fechaEntrega &&
			pedido.productos.length > 0
		) {
			if (mandatorio) {
				pedidos.mandatorios.push(pedido);
			} else {
				pedidos.noMandatorios.push(pedido);
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
