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
	ETipoDescuento,
	TPromoOngoingHabilitadas,
	TPromoOngoingAplicadas,
	TCodigoCantidad,
} from 'models';

import {fechaDispositivo, fechaDentroDelRango} from 'utils/methods';
import {validarProductoContraPortafolio} from 'utils/validaciones';

export type TProductosPedidoIndex = Record<
	number,
	TProductoPedido & {aplicado: number}
>;

export type TProductosUsadosEnOtrasPromos = {
	[codigoProducto: number]: number[];
};

export type TPromoOngoingListaProductosAplicados = {
	codigoProducto: number;
	unidadMedida: string;
	cantidad: number;
};

export type TPromoOngoingAplicables = TPromoOngoing & {
	listaProductosAplicados: TPromoOngoingListaProductosAplicados[];
	aplicada: boolean;
	topeTotal: number;
	tipoPago?: ETiposDePago;
};

export type TPromoOngoingAplicablesResultado = {
	promosAplicables: TPromoOngoingAplicables[];
	indiceProductosxPromosManuales: TProductosUsadosEnOtrasPromos;
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

export type TPromoOngoingDisponibilidad = {
	[idPromocion: number]: {
		disponibles: number;
		//aplicadasCredito: number;
		//aplicadasContado:number;
		aplicadas: number;
	};
};

export enum ETipoOrigenDeDatos {
	'Grabadas' = 'Grabadas',
	'VisitaActual' = 'VisitaActual',
}

export type TPromoOngoingAplicadasOrigen = Record<
	ETipoOrigenDeDatos,
	TPromoOngoingAplicadas[]
>;

export type TPromocionesOngoingCalcularResultado = {
	contado: TPromoOngoingAplicablesResultado | undefined;
	credito: TPromoOngoingAplicablesResultado | undefined;
	noAplicable: TPromoOngoing[];
	benficiosParaAgregar: TPromoOngoingAplicadas[];
	disponibles: TPromoOngoingDisponibilidad;
};

export class PromocionesOngoing {
	private static instance: PromocionesOngoing;

	private _cliente: TCliente | undefined = undefined;

	private _listaPromoOngoing: TListaPromoOngoing = {};

	private _promosAplicadasOtrasVisitas: TPromoOngoing[] = [];

	private disponibilidadDeLaPromo: TPromoOngoingDisponibilidad = {
		999999999: {disponibles: 0, aplicadas: 0},
	};

	private _resultado: TPromocionesOngoingCalcularResultado | undefined =
		undefined;

	private listaPromocionesVigentes: TListaPromoOngoingConIndices | undefined;

	private _calculoRealizado: boolean = false;

	/**
	 *
	 * @constructor
	 * @param {TCliente} cliente
	 * @param {TListaPromoOngoing} listaPromociones  - Catalógo de promociones
	 */

	private constructor() {}

	/*propiedades
	public set cliente(cliente:TCliente)
	{
		this._cliente=cliente;
	}

	public set listaPromoOngoing(listaPromociones:TListaPromoOngoing)
	{
		this._listaPromoOngoing=listaPromociones;
	}
*/

	public static getInstance(): PromocionesOngoing {
		if (!PromocionesOngoing.instance) {
			PromocionesOngoing.instance = new PromocionesOngoing();
		}
		// console.log(
		// 	`Recuperando instancia del motor de promociones para el cliente: ${PromocionesOngoing.instance._cliente?.codigoCliente}`
		// );
		return PromocionesOngoing.instance;
	}

	public inicializar(
		cliente: TCliente,
		listaPromociones: TListaPromoOngoing,
		promosAplicadasOtrasVisitas: TPromoOngoing[]
	) {
		this._cliente = cliente;
		this._listaPromoOngoing = listaPromociones;
		this._promosAplicadasOtrasVisitas = promosAplicadasOtrasVisitas;
		this._calculoRealizado = false;

		console.log(
			`Inicializando  motor de promociones para el cliente: ${this._cliente.codigoCliente}`
		);
	}
	/**
	 * Retorna las promociones aplicadas en Contado y Credito, ademas retona las promociones que no cumplen requisitos
	 * @method
	 * @param {TProductoPedido[]} productos  - array de productos
	 * @param {TListaPromoOngoingConIndices} promocionesVigentesCliente - promociones vigentes y con disponibilidad para el cliente
	 */

	/**
	 * Retorna una lista de promociones vigentes y disponibles para el cliente, con un índice ordenado por aplicacion+promocionId
	 * @returns {TListaPromoOngoing}
	 */
	obtenerListaVigentes(): TListaPromoOngoingConIndices {
		let listaPromos: TListaPromoOngoing = {};
		const fDispositivo = fechaDispositivo();
		const indicePorTipoId: string[] = [];
		if (this._cliente != undefined)
			this._cliente.promocionesHabilitadas?.forEach(
				(promo: TPromoOngoingHabilitadas) => {
					const promoDeLaLista = this._listaPromoOngoing[promo.idPromocion];
					if (
						promo.promocionesDisponibles > 0 &&
						promoDeLaLista &&
						fechaDentroDelRango(
							fDispositivo,
							promoDeLaLista.inicioVigenciaPromocion,
							promoDeLaLista.finVigenciaPromocion
						)
					) {
						this.disponibilidadDeLaPromo = {
							...this.disponibilidadDeLaPromo,
							[promo.idPromocion]: {
								disponibles: promo.promocionesDisponibles,
								aplicadas: 0,
							},
						};

						listaPromos = {
							...listaPromos,
							[promo.idPromocion]: promoDeLaLista,
						};
						indicePorTipoId.push(
							`${promoDeLaLista.aplicacion}${promo.idPromocion}`
						);
					}
				}
			);

		this.listaPromocionesVigentes = {
			lista: listaPromos,
			indexPorTipoId: indicePorTipoId.sort(),
			existenPromociones: indicePorTipoId.length > 0,
		};

		return this.listaPromocionesVigentes;
	}

	calcular(
		productos: TProductoPedido[],
		tipos: ETiposDePago[]
	): TPromocionesOngoingCalcularResultado {
		if (this._calculoRealizado && tipos.length == 0 && this._resultado)
			return this._resultado;

		//contadores a cero
		Object.keys(this.disponibilidadDeLaPromo).forEach((promoId) => {
			this.disponibilidadDeLaPromo[Number(promoId)].aplicadas = 0;
		});

		//sumamos grabadas
		this._promosAplicadasOtrasVisitas.forEach((promo: TPromoOngoing) => {
			this.disponibilidadDeLaPromo[promo.promocionID].aplicadas++;
		});

		if (tipos.length === 1) {
			if (tipos[0] == ETiposDePago.Contado) {
				this._resultado?.credito?.promosAplicables
					.filter((promo) => promo.aplicada)
					.forEach((promo: TPromoOngoingAplicables) => {
						this.disponibilidadDeLaPromo[promo.promocionID].aplicadas++;
					});
			} else {
				this._resultado?.contado?.promosAplicables
					.filter((promo) => promo.aplicada)
					.forEach((promo: TPromoOngoingAplicables) => {
						this.disponibilidadDeLaPromo[promo.promocionID].aplicadas++;
					});
			}
		}

		let promocionesContado: TPromoOngoingAplicablesResultado | undefined;
		let promocionesCredito: TPromoOngoingAplicablesResultado | undefined;
		tipos.forEach((tipo) => {
			if (tipo == ETiposDePago.Contado)
				promocionesContado = this.obtenerAplicablesPorTipoDePago(
					productos,
					tipo
				);
			if (tipo == ETiposDePago.Credito)
				promocionesCredito = this.obtenerAplicablesPorTipoDePago(
					productos,
					tipo
				);
		});

		/* .promosAplicables.sort((a, b) => (a.promocionID > b.promocionID ? 1 : -1)); */

		const benficiosParaAgregar = this.formatearBeneficios(
			promocionesContado?.promosAplicables ?? [],
			promocionesCredito?.promosAplicables ?? []
		);

		const promocionesVigentesNoAplicables = Object.values(
			this.listaPromocionesVigentes?.lista ?? {}
		)
			.filter((promocion) =>
				promocionesContado?.promosAplicables.some(
					(promoContado) => promoContado.promocionID === promocion.promocionID
				) ||
				promocionesCredito?.promosAplicables.some(
					(promoCredito) => promoCredito.promocionID === promocion.promocionID
				)
					? false
					: true
			)
			.sort((a, b) => (a.promocionID > b.promocionID ? 1 : -1));

		this._resultado = {
			contado: promocionesContado ?? this._resultado?.contado,
			credito: promocionesCredito ?? this._resultado?.credito,
			noAplicable: promocionesVigentesNoAplicables,
			benficiosParaAgregar,
			disponibles: this.disponibilidadDeLaPromo,
		};

		this._calculoRealizado = true;

		return this._resultado;
	}

	/**
	 * @method
	 * @param {ETiposDePago} tipoDePago  - tipo de pago donde se realiza la aplicación de la promo
	 * @param {number} index - indice del array de promociones
	 */
	aplicarPromo(
		tipoDePago: ETiposDePago,
		index: number,
		promo: TPromoOngoingAplicables
	) {
		if (
			tipoDePago == ETiposDePago.Contado &&
			this._resultado?.contado != undefined
		) {
			this._resultado['contado'].promosAplicables[index] = promo;
		} else if (
			tipoDePago == ETiposDePago.Credito &&
			this._resultado?.credito != undefined
		) {
			this._resultado['credito'].promosAplicables[index] = promo;
		}
	}

	/**
	 * Retorna una lista de promociones ongoing aplicables según sean de creditos o contado
	 * @method
	 * @param {TProductosPedidoIndex} productosPedidos - item's del pedido, se deben enviar filtrados por forma de pago.(creditos o contado)
	 * @returns {TListaPromoOngoing}
	 */
	obtenerAplicablesPorTipoDePago(
		productos: TProductoPedido[],
		tipoDePago: ETiposDePago
	): TPromoOngoingAplicablesResultado {
		let productosPedidos: TProductosPedidoIndex =
			this.obtenerProductosDelPedidoIndex(productos, tipoDePago);
		let productosUsadosEnOtrasPromosAutomaticas: TProductosUsadosEnOtrasPromos =
			{};
		let productosUsadosEnOtrasPromosManuales: TProductosUsadosEnOtrasPromos =
			{};
		let aplicables: TPromoOngoingAplicables[] = [];

		if (!this.listaPromocionesVigentes?.existenPromociones || !productosPedidos)
			return {
				promosAplicables: [],
				indiceProductosxPromosManuales: {},
			};
		// se verifican las promociones ordenadas por Aplicación + promocionID (primero las (A)utomáticas luego las (M)anuales)
		for (let clave of this.listaPromocionesVigentes.indexPorTipoId) {
			const claveAplicacion = clave.substring(0, 1);
			const promocionID = clave.replace(claveAplicacion, '');
			const promo: TPromoOngoing =
				this.listaPromocionesVigentes.lista[Number(promocionID)];
			let materialesRequisitosVerificados: TPromoOngoingMaterialesRequisitosVerificados[] =
				[];
			let multiplo = [];
			let conector: any = 'Y';
			const {disponibles, aplicadas} =
				this.disponibilidadDeLaPromo[promo.promocionID];
			if (disponibles - aplicadas <= 0)
				// descartamos promo por no tener disponibilidad
				continue;
			for (
				let i = 0;
				i < promo.requisitos.length;
				i++ // verificación de requisistos de la promo
			) {
				const materialesVerificados: TPromoOngoingMaterialesRequisitosVerificados =
					this.verificarRequisito(
						promo.promocionID,
						promo.requisitos[i],
						productosPedidos,
						productosUsadosEnOtrasPromosAutomaticas
					);

				if (materialesVerificados.multiplo > 1) continue;

				materialesRequisitosVerificados.push(materialesVerificados);

				multiplo.push(materialesVerificados.multiplo);

				if (promo.requisitos[i].conector)
					conector = promo.requisitos[i].conector?.toUpperCase();
			}
			/** Analisis según conector                         ----------------AND----------------------    ----------------------OR-----------------*/
			const sonValidosLosRequisitos =
				conector == 'Y'
					? multiplo.every((requisito) => requisito > 0)
					: multiplo.some((requisito) => requisito > 0);
			const topeSegunMultiplo: number = Math.min(...multiplo);
			if (sonValidosLosRequisitos) {
				// verificar si el grupo de beneficios se puede aplicar
				let grupoDeBeneficiosResultado = this.verificarBeneficios(
					topeSegunMultiplo,
					promo.beneficios,
					productosPedidos,
					productosUsadosEnOtrasPromosAutomaticas
				);
				let listaProductosAplicados: TPromoOngoingListaProductosAplicados[] =
					[];
				let grupoDeBeneficios: TPromoOngoingGrupoBeneficios[] = [];
				let topeTotal: number = 0;
				if (grupoDeBeneficiosResultado.length > 0) {
					if (promo.aplicacion == EFormaDeAplicacion.Automatica) {
						//realizar asignación automática
						/**
						 * Las promociones automáticas son de asignación Total y otorgan el beneficio del grupo con id más chico
						 */

						productosUsadosEnOtrasPromosAutomaticas =
							this.comprometerProductosUsadosEnPromos(
								materialesRequisitosVerificados,
								productosUsadosEnOtrasPromosAutomaticas
							);

						grupoDeBeneficios.push({
							...grupoDeBeneficiosResultado[0],
						});

						this.disponibilidadDeLaPromo[promo.promocionID].aplicadas++;
					} else {
						grupoDeBeneficios = [...grupoDeBeneficiosResultado];
						productosUsadosEnOtrasPromosManuales =
							this.comprometerProductosUsadosEnPromos(
								materialesRequisitosVerificados,
								productosUsadosEnOtrasPromosManuales
							);
					}

					aplicables.push({
						...{
							...promo,
							beneficios: grupoDeBeneficios,
						},
						listaProductosAplicados: listaProductosAplicados,
						aplicada: promo.aplicacion == EFormaDeAplicacion.Automatica,
						topeTotal: topeTotal,
					});
				}
			}
		}

		return {
			promosAplicables: aplicables,
			indiceProductosxPromosManuales: productosUsadosEnOtrasPromosManuales,
		};
	}

	/**
	 * Retorna la lista de materiales (productos) intervinientes y la cantidad de veces que se cumple el requisito, en función de los materiales (productos) del requisito
	 * @constructor
	 * @param {TPromoOngoingRequisitos} requisito
	 * @param {TProductosPedidoIndex} productosIndex - lista d productos distintos de promoPush, que no se le hayan aplicado descuentos escalonados y que sean de una forma de pago
	 */
	private verificarRequisito(
		promocionID: number,
		requisito: TPromoOngoingRequisitos,
		productosIndex: TProductosPedidoIndex,
		productosUsadosEnOtrasPromos: TProductosUsadosEnOtrasPromos
	): TPromoOngoingMaterialesRequisitosVerificados {
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
					[material]: [promocionID],
				};
			}
		});

		if (requisito.unidadMedida.toLowerCase() == 'unidad') {
			multiplo = Math.trunc(TotalUnidades / requisito.cantidad);
		} else if (requisito.unidadMedida.toLowerCase() == 'subunidad') {
			multiplo = Math.trunc(TotalSubUnidades / requisito.cantidad);
		}

		return {lista, multiplo};
	}

	/**
	 * Retorna un array de grupos de benenficios ordenado por Id, con los materiales validades según corresponda
	 * SI el grupo no tiene ninguna secuencia válida se descarta
	 * @constructor
	 * @param {number} topeSegunMultiplo -  tope según el multiplo resultante de las unidades vendidas  sobre la cantidad del requisito
	 * @param {TPromoOngoingGrupoBeneficios[]} grupoBeneficios  - array de grupos de beneficios de la promo
	 * @param {TProductosPedidoIndex} productosIndex - lista d productos distintos de promoPush y que sean de una forma de pago
	 * @param {TProductosUsadosEnOtrasPromos} productosUsadosEnOtrasPromos - materiales usados en promos aplicadas
	 */

	private verificarBeneficios(
		topeSegunMultiplo: number,
		grupoBeneficios: TPromoOngoingGrupoBeneficios[],
		productosPedidoIndex: TProductosPedidoIndex,
		productosUsadosEnOtrasPromos: TProductosUsadosEnOtrasPromos
	): TPromoOngoingGrupoBeneficios[] {
		let grupoBeneficiosVerificados: TPromoOngoingGrupoBeneficios[] = [];
		grupoBeneficios.forEach((grupo: TPromoOngoingGrupoBeneficios) => {
			let secuencias: TPromoOngoingBeneficiosSecuencia[] = [];
			let grupoValido: boolean = true;
			// si una de las secuencia al validar materiales no queda al menos uno, el grupo se descarta
			for (let secuencia of grupo.secuencias) {
				// se ordenan los beneficios según Sku menor
				let materiales: TCodigoCantidad[] = [];
				const materialesBeneficio = [
					...(secuencia.materialesBeneficio as number[]),
				];

				materialesBeneficio.sort((a, b) => {
					if (a < b) return -1;
					if (a > b) return 1;
					return 0;
				});

				let topeAlprimero = true; // flag para otorgar el tope al primero
				const tope = Math.min(topeSegunMultiplo, secuencia.tope); // nuevo tope
				if (secuencia.formaBeneficio == EFormaBeneficio.Obsequio) {
					materialesBeneficio
						.filter((producto: number) =>
							validarProductoContraPortafolio(
								producto,
								this._cliente?.portafolio ?? []
							)
						)
						.forEach((producto) => {
							materiales.push({
								codigo: producto,
								cantidad: topeAlprimero ? tope : 0,
								tope: tope,
							});
							topeAlprimero = false;
						});
				} else if (
					[
						EFormaBeneficio.DescuentoPorcentaje,
						EFormaBeneficio.DescuentoMonto,
						EFormaBeneficio.Precio,
					].includes(secuencia.formaBeneficio)
				) {
					// solo se toman los productos que esten en el pedido y no hayan sido requisito de una promo aplicada
					let auxtope = tope;
					let auxm = materialesBeneficio.filter(
						(producto: number) =>
							productosPedidoIndex[producto] &&
							productosUsadosEnOtrasPromos[producto] == undefined
					);
					auxm.forEach((producto) => {
						materiales.push({
							codigo: producto,
							cantidad: Math.min(
								auxtope,
								productosPedidoIndex[producto].unidades
							), // Se otorga el minimo entre el resto del tope y la cantidad pedida
							tope:productosPedidoIndex[producto].unidades
						});
						auxtope -= productosPedidoIndex[producto].unidades;
						auxtope = auxtope < 0 ? 0 : auxtope;
					});
				}
				if (materiales.length != materialesBeneficio.length) {
					// si no se pudo validar materiales(productos) para una secuencia se descarta el grupo
					grupoValido = false;
					break;
				}
				secuencias.push({
					...secuencia,
					tope,
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
	}

	/**
	 * Retorna un TProductosPedidoIndex con todos los productos distintos de promoPush, que no se le haya aplicado descuento escalonado y que sean de una forma de pago
	 * @constructor
	 * @param {TProductoPedido[]} productosPedidos - item's del pedido
	 * @param {ETiposDePago} tipoPago - Contado o Crédito
	 */
	private obtenerProductosDelPedidoIndex(
		productosPedidos: TProductoPedido[],
		tipoPago: ETiposDePago,
		aplicadas?: number[]
	): TProductosPedidoIndex {
		return productosPedidos.reduce(
			(
				productosPedidoIndex: TProductosPedidoIndex,
				producto: TProductoPedido
			) => {
				if (
					!producto.promoPush &&
					producto.tipoPago == tipoPago &&
					(producto.descuento?.tipo != ETipoDescuento.escalonado ||
						(producto.descuento?.tipo == ETipoDescuento.escalonado &&
							producto.descuento?.porcentajeDescuento == 0))
				) {
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
	}

	private comprometerProductosUsadosEnPromos(
		materialesRequisitosVerificados: TPromoOngoingMaterialesRequisitosVerificados[],
		productosUsadosEnOtrasPromos: TProductosUsadosEnOtrasPromos
	): TProductosUsadosEnOtrasPromos {
		let nuevaListaDeProductosUsadosEnOtrasPromos: TProductosUsadosEnOtrasPromos =
			{...productosUsadosEnOtrasPromos};
		materialesRequisitosVerificados.forEach(
			(requisitoVerificado: TPromoOngoingMaterialesRequisitosVerificados) => {
				for (const p in requisitoVerificado.lista) {
					if (nuevaListaDeProductosUsadosEnOtrasPromos[p]) {
						nuevaListaDeProductosUsadosEnOtrasPromos[p] = [
							...nuevaListaDeProductosUsadosEnOtrasPromos[p],
							...requisitoVerificado.lista[p],
						];
					} else {
						nuevaListaDeProductosUsadosEnOtrasPromos[p] = [
							...requisitoVerificado.lista[p],
						];
					}
				}
			}
		);
		return nuevaListaDeProductosUsadosEnOtrasPromos;
	}

	private aplicarAutomaticamenteProductos(
		listaMateriales: number[],
		cantidad: number
	): TPromoOngoingListaProductosAplicados[] {
		let listaProductosAplicados: TPromoOngoingListaProductosAplicados[] = [];

		return listaProductosAplicados;
	}

	/**
	 * Retorna las promociones que se aplicaron al cliente en formato TPromoOngoingAplicadas[] para ser despachas al redux
	 * @constructor
	 * @param {TPromoOngoingAplicables[]} promoContado - Array de promociones de contado
	 * @param {	promoCredito: TPromoOngoingAplicables[]} promoCredito  - array de promociones de credito
	 */

	private formatearBeneficios(
		promoContado: TPromoOngoingAplicables[],
		promoCredito: TPromoOngoingAplicables[]
	): TPromoOngoingAplicadas[] {
		const beneficiosPromoContado: TPromoOngoingAplicadas[] = promoContado.map(
			(promo) => ({
				promocionID: promo.promocionID,
				tipoPago: ETiposDePago.Contado,
				descripcion: promo.descripcion,
				aplicacion: promo.aplicacion,
				productos: promo.listaProductosAplicados.map((producto) => ({
					...producto,
					tipoPago: ETiposDePago.Contado,
					descripcion: '',
				})),
			})
		);

		const beneficiosPromoCredito: TPromoOngoingAplicadas[] = promoCredito.map(
			(promo) => ({
				promocionID: promo.promocionID,
				tipoPago: ETiposDePago.Credito,
				descripcion: promo.descripcion,
				aplicacion: promo.aplicacion,
				productos: promo.listaProductosAplicados.map((producto) => ({
					...producto,
					tipoPago: ETiposDePago.Credito,
					descripcion: '',
				})),
			})
		);

		return [...beneficiosPromoCredito, ...beneficiosPromoContado];
	}
}
