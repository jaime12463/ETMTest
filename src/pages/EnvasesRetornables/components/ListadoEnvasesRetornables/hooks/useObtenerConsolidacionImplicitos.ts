import {useCallback} from 'react';
import {TConsolidadoImplicitos, TImplicitos, TProducto, TProductoPedido} from 'models';
import { useObtenerImplicitosPromoPush, useObtenerDatosProducto } from '.';

export const useObtenerConsolidacionImplicitos = () => {
	const obtenerImplicitosPromoPush = useObtenerImplicitosPromoPush();
	const obtenerDatosProducto = useObtenerDatosProducto();
	const representacionUnidades = 'CAJ';
	const representacionSubunidades = 'BOT';
	
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
						codigoImplicito: codigoImplicito|| 0,
						nombreImplicito: nombreImplicito|| '',
						unidades: unidades,
						subUnidades: subUnidades
					});
			}

			const consolidadoImplicitos: TConsolidadoImplicitos[] = [];
			//const implicitosEnvasesRetorno: TConsolidadoImplicitos[] = [];
			//const implicitosPromoPushCon: TConsolidadoImplicitos[] = [];
			
			productosPedido.forEach((pedido, x) => {		
				const {
					unidades,
					subUnidades,
					promoPush,
				} = pedido;

				if(promoPush)
				{
					console.log("pedido promo", x, " : ", pedido);
					console.log("Unidades ingresadas:", unidades, "Subunidades ingresadas:", subUnidades);
					
					promoPush.componentes.map((componente) => {
						let implicitosPromoPush: TImplicitos[] = obtenerImplicitosPromoPush(componente.codigoProducto);
						let unidadesImplicito = 0, subUnidadesImplicito = 0;

						if(componente.unidadMedida === representacionUnidades)
						{
							unidadesImplicito = unidades *  componente.cantidad;
							subUnidadesImplicito = 0;
						}

						if(componente.unidadMedida === representacionSubunidades)
						{
							unidadesImplicito = 0;
							subUnidadesImplicito = unidades *  componente.cantidad;
						}

						console.log("-----------Informacion de componente: ", componente.codigoProducto);
						console.log("_UnidadMedida", componente.unidadMedida , "_Cantidad", componente.cantidad);

						console.log("implicitosPromoPush obtencion", implicitosPromoPush);

						implicitosPromoPush.map((implicito, posicion) => {
							if(implicito.codigoImplicito)
							{
								if(posicion === 1) //Implicito2
									subUnidadesImplicito = 0;
								incrementarImplicitos(
									consolidadoImplicitos, implicito.codigoImplicito, implicito.nombreImplicito, unidadesImplicito, subUnidadesImplicito);
							}
						});
						
						let {codigoProducto, nombre, tipoProducto}  = obtenerDatosProducto(componente.codigoProducto);
						
						//TODO: Revisar esto. TipoProducto 5 es Envases 
						if(tipoProducto === 5)
							incrementarImplicitos(
								consolidadoImplicitos, codigoProducto, nombre, (-unidadesImplicito), (-subUnidadesImplicito));
					});
				}
				else
				{
					if(typeof pedido.codigoImplicito1 !== 'undefined')
						incrementarImplicitos(consolidadoImplicitos, pedido.codigoImplicito1, pedido.nombreImplicito1, pedido.unidades, pedido.subUnidades);
						
					if(typeof pedido.codigoImplicito2 !== 'undefined')
						incrementarImplicitos(consolidadoImplicitos, pedido.codigoImplicito2, pedido.nombreImplicito2, pedido.unidades, 0);
				}
			});

			return consolidadoImplicitos;
		},
		[]
	);
	return obtenerConsolidacionImplicitos;
};