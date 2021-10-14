import {TTipoPedido} from 'models';
import {useObtenerConfiguracion} from 'redux/hooks';

export const useDeterminarDividirPorPago = () => {
	const {tipoPedidoEnvasesHabilitados, tipoPedidos} = useObtenerConfiguracion();
	let dividirPorPago = false;

	const determinarDividirPorPago = (): boolean => {
		/* 		let tipoPedido : TTipoPedido;
		tipoPedidoEnvasesHabilitados.find((tipoPedidoEnvase) => {
			tipoPedido = tipoPedidos[tipoPedidoEnvase-1];

			if (tipoPedido.esValorizado)
				dividirPorPago = true;
		}); */
		// REVISAR URGENTE

		return true;
	};

	return determinarDividirPorPago;
};
