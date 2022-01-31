import {
	TCliente,
	TPortafolio,
	TPedido,
	TProductoPedido,
	TPromoOngoing,
	TListaPromoOngoing,
	TPromoOngoingRequisitos,
	ETiposDePago,
	TPromoOngoingGrupoBeneficios,
	TPromoOngoingBeneficiosSecuencia,
	EFormaBeneficio,
	EFormaDeAplicacion,
	EFormaDeAsignacion,
	TPromoOngoingHabilitadas,
} from 'models';

import {fechaDispositivo, fechaDentroDelRango} from 'utils/methods';
import {validarProductoContraPortafolio} from 'utils/validaciones';

export type TProductosPedidoIndex = Record<
	number,
	TProductoPedido & {aplicado: number}
>;

export type TProductosUsadosEnOtrasPromos = {
	[codidoProducto: number]: boolean;
};

export type TPromoOngoingListaProductosAplicados = {
	codigoProducto: number;
	cantidad: number;
};

export type TPromoOngoingAplicables = TPromoOngoing & {
	productosAplicados: TPromoOngoingListaProductosAplicados[];
	aplicada: boolean;
	topeTotal: number;
};

export type TListaPromoOngoingConIndices = {
	lista: TListaPromoOngoing;
	indexPorTipoId: string[];
	existenPromociones: boolean;
};

export type TPromoOngoingMaterialesRequisitosVerificados = {
	lista: TProductosUsadosEnOtrasPromos;
	multiplo: number;
};

/**
 * Retorna una lista de promociones vigentes y disponibles para el cliente, con un índice ordenado por aplicacion+promocionId
 * @constructor
 * @param {TCliente} cliente - cliente sobre el que se esta ralizando la operación
 * @param {TListaPromoOngoing} listaPromociones - lista completa de promociones
 * @returns {TListaPromoOngoing}
 */
export const obtenerlistaPromocionesVigentes = (
	cliente: TCliente,
	listaPromociones: TListaPromoOngoing
): TListaPromoOngoingConIndices => {
	let listaPromos: TListaPromoOngoing = {};
	const fDispositivo = fechaDispositivo();
	const indicePorTipoId: string[] = [];
	cliente.promocionesHabilitadas?.forEach((promo: TPromoOngoingHabilitadas) => {
		const promoDeLaLista = listaPromociones[promo.idPromocion];
		if (
			promo.promocionesDisponibles > 0 &&
			promoDeLaLista &&
			fechaDentroDelRango(
				fDispositivo,
				promoDeLaLista.inicioVigenciaPromocion,
				promoDeLaLista.finVigenciaPromocion
			)
		) {
			listaPromos = {
				...listaPromos,
				[promo.idPromocion]: listaPromociones[promo.idPromocion],
			};
			indicePorTipoId.push(
				`${listaPromociones[promo.idPromocion].aplicacion}${promo.idPromocion}`
			);
		}
	});
	return {
		lista: listaPromos,
		indexPorTipoId: indicePorTipoId.sort(),
		existenPromociones: indicePorTipoId.length > 0,
	};
};

/**
 * Retorna una lista de promociones ongoing aplicables según sean de creditos o contado
 * @constructor
 * @param {TProductosPedidoIndex} productosPedidos - item's del pedido, se deben enviar filtrados por forma de pago.(creditos o contado)
 * @param {TListaPromoOngoing} listaPromocionesVigentes -promociones vigentes y con disponibilidad para el cliente
 * @returns {TListaPromoOngoing}
 */
export const obtenerPromocionesOngoingAplicables = (
	cliente: TCliente,
	productosPedidos: TProductosPedidoIndex,
	listaPromocionesVigentes: TListaPromoOngoingConIndices
) => {
	let productosUsadosEnOtrasPromos: TProductosUsadosEnOtrasPromos = {};
	let aplicables: TPromoOngoingAplicables[] = [];
	
	if ( !listaPromocionesVigentes.existenPromociones || !productosPedidos ) return aplicables;

	for (let clave of listaPromocionesVigentes.indexPorTipoId) {
		const claveAplicacion = clave.substring(0, 1);
		const promocionID = clave.replace(claveAplicacion, '');
		const promo: TPromoOngoing =
			listaPromocionesVigentes.lista[Number(promocionID)];
		let materialesRequisitosVerificados: TPromoOngoingMaterialesRequisitosVerificados[] =
			[];
		let multiplo = [];
		let conector: any = 'Y';

		for (
			let i = 0;
			i < promo.requisitos.length;
			i++ // verificación de requisistos de la promo
		) {
			materialesRequisitosVerificados.push(
				verificarRequisito(
					promo.requisitos[i],
					productosPedidos,
					productosUsadosEnOtrasPromos
				)
			);
			multiplo.push(
				materialesRequisitosVerificados[
					materialesRequisitosVerificados.length - 1
				].multiplo
			);
			if (promo.requisitos[i].conector)
				conector = promo.requisitos[i].conector?.toUpperCase();
		}
		/** Analisis según conector                         ----------------AND----------------------    ----------------------OR-----------------*/
		const sonValidosLosRequisitos =
			conector == 'Y'
				? multiplo.every((requisito) => requisito > 0)
				: multiplo.some((requisito) => requisito > 0);
		if (sonValidosLosRequisitos) {
			// verificar si el grupo de beneficios se puede aplicar
			let grupoDeBeneficiosResultado = verificarBeneficios(
				cliente,
				promo.beneficios,
				productosPedidos
			);
			let grupoDeBeneficios: TPromoOngoingGrupoBeneficios[] = [];
			let cantidadDeVecesQueSePuedeAplicar: number = 0;
			if (grupoDeBeneficiosResultado.length > 0) {
				materialesRequisitosVerificados.forEach(
					(
						requisitoVerificado: TPromoOngoingMaterialesRequisitosVerificados
					) => {
						productosUsadosEnOtrasPromos = {
							...productosUsadosEnOtrasPromos,
							...requisitoVerificado.lista,
						};
					}
				);
				//ToDo: para las automáticas ver el beneficio por default
				grupoDeBeneficios.push({
					...grupoDeBeneficiosResultado[0],
					secuencias: [
						{
							...grupoDeBeneficiosResultado[0].secuencias[0],
							materialesBeneficio: [
								grupoDeBeneficiosResultado[0].secuencias[0].materialesBeneficio[0],
							],
						},
					],
				});
				cantidadDeVecesQueSePuedeAplicar = Math.min();
				
				if (promo.aplicacion == EFormaDeAplicacion.Automatica) {
					//realizar asignación automática
					/**
					 * Las promociones automáticas son de asignación Total y otorgan el beneficio del grupo con id más chico
					 */
					
				}
				aplicables.push({
					...{
						...promo,
						beneficios: grupoDeBeneficios,
					},
					productosAplicados: [], //ToDo
					aplicada: promo.aplicacion == EFormaDeAplicacion.Automatica,
					topeTotal: 0,
				});
			}
		}
	}
	return aplicables;
};

export const aplicarAutomaticamenteProductos = (
	listaMateriales: number[],
	cantidad: number
): TPromoOngoingListaProductosAplicados[] => {
	let listaProductosAplicados: TPromoOngoingListaProductosAplicados[] = [];

	return listaProductosAplicados;
};

/**
 * Retorna un TProductosPedidoIndex con todos los productos distintos de promoPush y que sean de una forma de pago
 * @constructor
 * @param {TProductoPedido[]} productosPedidos - item's del pedido
 * @param {ETiposDePago} tipoPago - Contado o Crédito
 */
export const obtenerProductosDelPedidoIndex = (
	productosPedidos: TProductoPedido[],
	tipoPago: ETiposDePago,
	aplicadas?: number[]
): TProductosPedidoIndex => {
	return productosPedidos.reduce(
		(
			productosPedidoIndex: TProductosPedidoIndex,
			producto: TProductoPedido
		) => {
			if (!producto.promoPush && producto.tipoPago == tipoPago) {
				return {
					...productosPedidoIndex,
					[producto['codigoProducto']]: {...producto, aplicado: 0},
				};
			} else {
				return {
					...productosPedidoIndex,
				};
			}
		},
		{}
	);
};

/**
 * Retorna la lista de materiales (productos) intervinientes y la cantidad de veces que se cumple el requisito, en función de los materiales (productos) del requisito
 * @constructor
 * @param {TPromoOngoingRequisitos} requisito
 * @param {TProductosPedidoIndex} productosIndex - lista d productos distintos de promoPush y que sean de una forma de pago
 */
const verificarRequisito = (
	requisito: TPromoOngoingRequisitos,
	productosIndex: TProductosPedidoIndex,
	productosUsadosEnOtrasPromos: TProductosUsadosEnOtrasPromos
): TPromoOngoingMaterialesRequisitosVerificados => {
	let multiplo = 0;

	let TotalUnidades = 0;
	let TotalSubUnidades = 0;
	let lista: TProductosUsadosEnOtrasPromos = {};
	requisito.materiales.forEach((material) => {
		if (productosIndex[material] && !productosUsadosEnOtrasPromos[material]) {
			TotalUnidades +=
				productosIndex[material].unidades - productosIndex[material].aplicado;
			TotalSubUnidades +=
				productosIndex[material].subUnidades -
				productosIndex[material].aplicado;
			lista = {
				...lista,
				[material]: true,
			};
		}
	});

	if (requisito.unidadMedida.toLowerCase() == 'unidad') {
		multiplo = Math.trunc(TotalUnidades / requisito.cantidad);
	} else if (requisito.unidadMedida.toLowerCase() == 'subunidad') {
		multiplo = Math.trunc(TotalSubUnidades / requisito.cantidad);
	}

	return {lista, multiplo};
};

/**
 * Retorna un array de grupos de benenficios ordenado por Id, con los materiales validades según corresponda
 * @constructor
 * @param {TCliente} cliente
 * @param {TPromoOngoingGrupoBeneficios[]} grupoBeneficios  - array de grupos de beneficios de la promo
 * @param {TProductosPedidoIndex} productosIndex - lista d productos distintos de promoPush y que sean de una forma de pago
 */

const verificarBeneficios = (
	cliente: TCliente,
	grupoBeneficios: TPromoOngoingGrupoBeneficios[],
	productosPedidoIndex: TProductosPedidoIndex
): TPromoOngoingGrupoBeneficios[] => {
	let grupoBeneficiosVerificados: TPromoOngoingGrupoBeneficios[] = [];
	grupoBeneficios.forEach((grupo: TPromoOngoingGrupoBeneficios) => {
		let materiales: number[] = [];
		let secuencias: TPromoOngoingBeneficiosSecuencia[] = [];
		let grupoValido: boolean = true;
		// si una de las secuencia al validar materiales no queda al menos uno, el grupo se descarta
		for (let secuencia of grupo.secuencias) {
			if (secuencia.formaBeneficio == EFormaBeneficio.Obsequio) {
				materiales = secuencia.materialesBeneficio.filter((producto: number) =>
					validarProductoContraPortafolio(producto, cliente.portafolio)
				);
			} //if ([EFormaBeneficio.DescuentoPorcentaje , EFormaBeneficio.DescuentoMonto , EFormaBeneficio.Precio].includes(secuencia.formaBeneficio))
			else {
				materiales = secuencia.materialesBeneficio.filter(
					(producto: number) => productosPedidoIndex[producto]
				);
			}
			if (materiales.length == 0) {
				// si no se pudo validar materiales(productos) para una secuencia se descarta el grupo
				grupoValido = false;
				break;
			}
			secuencias.push({
				...secuencia,
				materialesBeneficio: materiales,
			});
		}

		if (grupoValido) {
			grupoBeneficiosVerificados.push({
				...grupo,
				secuencias: secuencias,
			});
		}
	});
	return grupoBeneficiosVerificados.sort(
		(a: TPromoOngoingGrupoBeneficios, b: TPromoOngoingGrupoBeneficios) => {
			if (a.grupoBeneficioID < b.grupoBeneficioID) {
				return -1;
			}
			if (a.grupoBeneficioID > b.grupoBeneficioID) {
				return 1;
			}
			return 0;
		}
	);
};
