import {useCallback} from 'react';
import {useObtenerTiposPedidoSegunConfiguracion} from 'hooks';
import {useObtenerVisitaActual} from 'redux/hooks';

export const useValidarPedidoMinimoVisitaActual = () => {
	const obtenerTiposPedidoSegunConfiguracion =
		useObtenerTiposPedidoSegunConfiguracion('contribuyeAMinimo', true);

	//pedidosContribuyeAlMinimo tengo un array de tipoPedido que tienen contribuye al minimo en true
	const pedidosContribuyeAlMinimo = obtenerTiposPedidoSegunConfiguracion();
	const visitaActual = useObtenerVisitaActual();

	const validarPedidoMinimoVisitaActual = useCallback((): boolean => {
		pedidosContribuyeAlMinimo.forEach((tipoPedido) => {
			if (visitaActual.pedidos[tipoPedido].productos.length > 0) return true;
		});

		return false;
	}, [visitaActual.pedidos]);
	return validarPedidoMinimoVisitaActual;
};
