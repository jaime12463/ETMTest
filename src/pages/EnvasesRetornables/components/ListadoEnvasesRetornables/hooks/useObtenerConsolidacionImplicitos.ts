import {useCallback} from 'react';
import {TConsolidadoImplicitos, TImplicitos, TProductoPedido} from 'models';
import { useObtenerImplicitosPromoPush, useObtenerDatosProducto } from '.';

export const useObtenerConsolidacionImplicitos = () => {
	const obtenerImplicitosPromoPush = useObtenerImplicitosPromoPush();
	const obtenerDatosProducto = useObtenerDatosProducto();
	const representacionUnidades = 'CAJ';
	const representacionSubunidades = 'BOT';
	
	const obtenerConsolidacionImplicitos = useCallback((productosPedido: TProductoPedido[]) => {
			const incrementarImplicitos = 
				(consolidadoImplicitos: TConsolidadoImplicitos[], codigoImplicito: number | undefined, nombreImplicito: string | undefined, unidades:number, subUnidades:number) => {
				let flatAgregado= false;
				consolidadoImplicitos.forEach((consolidado) => {
					if(codigoImplicito === consolidado.codigoImplicito) {
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
			let consolidado: TConsolidadoImplicitos[] = [];
			
			productosPedido.forEach((pedido) => {		
				const {
					unidades,
					subUnidades,
					promoPush,
				} = pedido;

				if(promoPush) {					
					promoPush.componentes.map((componente) => {
						let implicitosPromoPush: TImplicitos[] = obtenerImplicitosPromoPush(componente.codigoProducto);
						let unidadesImplicito = 0, subUnidadesImplicito = 0;

						if(componente.unidadMedida === representacionUnidades) {
							unidadesImplicito = unidades *  componente.cantidad;
							subUnidadesImplicito = 0;
						}

						if(componente.unidadMedida === representacionSubunidades) {
							unidadesImplicito = 0;
							subUnidadesImplicito = unidades *  componente.cantidad;
						}

						implicitosPromoPush.map((implicito, posicion) => {
							if(implicito.codigoImplicito)
							{
								if(posicion === 1)	subUnidadesImplicito = 0; //Implicito2

								incrementarImplicitos(
									consolidadoImplicitos, implicito.codigoImplicito, implicito.nombreImplicito, unidadesImplicito, subUnidadesImplicito);
							}
						});
						
						let {codigoProducto, nombre, tipoProducto} = obtenerDatosProducto(componente.codigoProducto);
						//TODO: Revisar esto. TipoProducto 5 es Envases 
						if(tipoProducto === 5)
							incrementarImplicitos(
								consolidadoImplicitos, codigoProducto, nombre, (-unidadesImplicito), (-subUnidadesImplicito));
					});
				}
				else {
					if(typeof pedido.codigoImplicito1 !== 'undefined')
						incrementarImplicitos(consolidadoImplicitos, pedido.codigoImplicito1, pedido.nombreImplicito1, unidades, subUnidades);
						
					if(typeof pedido.codigoImplicito2 !== 'undefined')
						incrementarImplicitos(consolidadoImplicitos, pedido.codigoImplicito2, pedido.nombreImplicito2, unidades, 0);
				}
			});

			consolidado = consolidadoImplicitos.map((implicito) => {
				let {presentacion} = obtenerDatosProducto(implicito.codigoImplicito);
				let unidadesSinExceso= 0, subUnidadesSinExceso = 0;

				if(implicito.subUnidades >= presentacion) {
					subUnidadesSinExceso = (implicito.subUnidades % presentacion);
					unidadesSinExceso = implicito.unidades + ~~(implicito.subUnidades / presentacion);

					return {
						...implicito,
						unidades: unidadesSinExceso,
						subUnidades: subUnidadesSinExceso,
					};
				}
				else 
					return implicito;
			});


			return consolidado;
		},
		[]
	);
	return obtenerConsolidacionImplicitos;
};