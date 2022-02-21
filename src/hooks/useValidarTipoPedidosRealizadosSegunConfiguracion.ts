import {useObtenerTiposPedidoSegunConfiguracion} from 'hooks';
import {useCallback} from 'react';
import {useObtenerConfiguracion, useObtenerVisitaActual} from 'redux/hooks';
/*
	Retorna un boolean que indica si existe al menos un producto en los tipos de pedido que cumplan la condicion propiedad
*/
export const useValidarTipoPedidosRealizadosSegunConfiguracion = (
	propiedad: 
	| 'validaPresupuesto'
	| 'esValorizado'
	| 'esMandatorio'
	| 'habilitaPromocion'
	| 'contribuyeAMinimo'
) => {
	let tipoPedidoSegunConfiguracion: boolean = false;

	const obtenerTiposPedidoSegunConfiguracion =
		useObtenerTiposPedidoSegunConfiguracion(propiedad, true);

	const tipoDePedidosConPropiedad = obtenerTiposPedidoSegunConfiguracion();
	const visitaActual = useObtenerVisitaActual();

	const {tipoPedidos} = useObtenerConfiguracion();

	const validarTipoPedidosRealizadosSegunConfiguracion = useCallback(() => {
		tipoDePedidosConPropiedad.forEach((tipoPedido) => {
			if (visitaActual.pedidos[tipoPedido].productos.length > 0)
				tipoPedidoSegunConfiguracion = true;
		});

		return tipoPedidoSegunConfiguracion;

	}, [tipoPedidos]);

	return validarTipoPedidosRealizadosSegunConfiguracion;
};
