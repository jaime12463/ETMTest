import {useCallback} from 'react';
import {TConsolidadoImplicitos, TProductoPedido} from 'models';

export const useObtenerConsolidacionImplicitos = () => {
	const obtenerConsolidacionImplicitos = useCallback((productosPedido: TProductoPedido[]) => {
			const incrementarImplicitos = (consolidadoImplicitos: TConsolidadoImplicitos[], codigoImplicito: number | undefined, nombreImplicito: string | undefined, unidades:number, subUnidades:number) => {
				let flatAgregado= false;
				consolidadoImplicitos.forEach((consolidado) => {
					if(codigoImplicito === consolidado.codigoImplicito)
					{
						consolidado.unidades= consolidado.unidades + unidades;
						consolidado.subUnidades= consolidado.subUnidades + subUnidades;
						flatAgregado= true;
						return true;
					}
				});
				if(flatAgregado == false)
					consolidadoImplicitos.push({
						codigoImplicito: codigoImplicito,
						nombreImplicito: nombreImplicito,
						unidades: unidades,
						subUnidades: subUnidades
					});
			}

			const consolidadoImplicitos: TConsolidadoImplicitos[] = [];
			productosPedido.forEach((pedido) => {
				if(pedido.unidades !== 0 && typeof pedido.codigoImplicito1 !== 'undefined')
					incrementarImplicitos(consolidadoImplicitos, pedido.codigoImplicito1, pedido.nombreImplicito1, pedido.unidades, 0);
				if(pedido.subUnidades !== 0 && typeof pedido.codigoImplicito2 !== 'undefined')
					incrementarImplicitos(consolidadoImplicitos, pedido.codigoImplicito2, pedido.nombreImplicito2, 0, pedido.subUnidades);
			});

			return consolidadoImplicitos;
		},
		[]
	);
	return obtenerConsolidacionImplicitos;
};