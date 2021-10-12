import { TTipoPedido } from 'models';
import {useObtenerConfiguracion} from 'redux/hooks';

export const useDeterminarDividirPorPago = () => {
	const {TipoPedidoEnvasesHabilitados, tipoPedidos} = useObtenerConfiguracion();
	let dividirPorPago = false;

	const determinarDividirPorPago = (): boolean => {
		let tipoPedido : TTipoPedido;
		TipoPedidoEnvasesHabilitados.find((tipoPedidoEnvase) => {
			tipoPedido = tipoPedidos[tipoPedidoEnvase-1];

			if (tipoPedido.esValorizado)
				dividirPorPago = true;
		});

		return dividirPorPago;
	};

	return determinarDividirPorPago;
};
