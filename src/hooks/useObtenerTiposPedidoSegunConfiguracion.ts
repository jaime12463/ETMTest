import {TTipoPedido} from 'models';
import {useCallback} from 'react';
import {useObtenerConfiguracion, useObtenerVisitaActual} from 'redux/hooks';
/*
	Retorna un array de tipos de pedido que cumplan la condición de la propiedad enviada como parámetro
*/
export const useObtenerTiposPedidoSegunConfiguracion = (
	propiedad:
		| 'validaPresupuesto'
		| 'esValorizado'
		| 'esMandatorio'
		| 'habilitaPromocion'
		| 'contribuyeAMinimo',
	valor: any
) => {
	const {tipoPedidos} = useObtenerConfiguracion();
	const obtenerTiposPedidoSegunConfiguracion = useCallback(() => {
		return tipoPedidos
			.filter((tipoPedido) => tipoPedido[propiedad] === valor)
			.map((tipoPedido) => tipoPedido.codigo);
	}, [tipoPedidos]);
	return obtenerTiposPedidoSegunConfiguracion;
};
