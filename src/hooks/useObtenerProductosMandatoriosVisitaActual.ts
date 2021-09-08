import {useObtenerConfiguracion, useObtenerVisitaActual} from 'redux/hooks';
import {TPedido, TProductoPedido, TTotalPedido} from 'models';

//TODO: Acomodar para que tome los pedidos cerrados de la misma fecha de entrega, por ahora solo toma del pedido en curso

export const useObtenerProductosMandatoriosVisitaActual = () => {
	const visitaActual = useObtenerVisitaActual();
	const configuracion = useObtenerConfiguracion();

	let pedidosMandatorios = Object.values(visitaActual.pedidos).filter(
		(pedido: TPedido) =>
			configuracion.tipoPedidos.find(
				(tipoPedido) => tipoPedido.codigo == pedido.tipoPedido
			)?.esMandatorio &&
			pedido.fechaEntrega === visitaActual.fechaEntrega &&
			pedido.productos.length > 0
	);
	let pedidosNoMandatorios = Object.values(visitaActual.pedidos).filter(
		(pedido: TPedido) =>
			configuracion.tipoPedidos.find(
				(tipoPedido) => tipoPedido.codigo == pedido.tipoPedido
			)?.esMandatorio === false &&
			pedido.fechaEntrega === visitaActual.fechaEntrega &&
			pedido.productos.length > 0
	);

	return {mandatorios: pedidosMandatorios, noMandatorios: pedidosNoMandatorios};
};
