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
	TPromoOngoingAplicadas,
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

export type TPromoOngoingDisponibilidad ={
    [idPromocion:number]:
    { 
        disponibles :number;
        aplicadas: number;
    }
}

export class PromocionesOngoing {

    private static instance: PromocionesOngoing;

    private cliente:TCliente;

    private listaPromoOngoing: TListaPromoOngoing;

    private disponibilidadDeLaPromo:TPromoOngoingDisponibilidad={
        999999999:{disponibles: 0, aplicadas:0}
    };

    private listaPromocionesVigentes: TListaPromoOngoingConIndices | undefined ;

    /**
     * 
     * @constructor
     * @param {TCliente} cliente
     * @param {TListaPromoOngoing} listaPromociones  - Catalógo de promociones
     */

    private constructor (clienteActual: TCliente, listaPromociones: TListaPromoOngoing)
    {   
        this.cliente=clienteActual;
        this.listaPromoOngoing= listaPromociones;
    }


    public static getInstance(clienteActual: TCliente, listaPromociones: TListaPromoOngoing): PromocionesOngoing {
        if (!PromocionesOngoing.instance) {
            PromocionesOngoing.instance = new PromocionesOngoing(clienteActual, listaPromociones);
        }

        return  PromocionesOngoing.instance;
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
    obtenerListaVigentes(): TListaPromoOngoingConIndices
    {
        let listaPromos: TListaPromoOngoing = {};
        const fDispositivo = fechaDispositivo();
        const indicePorTipoId: string[] = [];
        this.cliente.promocionesHabilitadas?.forEach((promo: TPromoOngoingHabilitadas) => {
            const promoDeLaLista = this.listaPromoOngoing[promo.idPromocion];
            if (
                promo.promocionesDisponibles > 0 &&
                promoDeLaLista &&
                fechaDentroDelRango(
                    fDispositivo,
                    promoDeLaLista.inicioVigenciaPromocion,
                    promoDeLaLista.finVigenciaPromocion
                )
            ) {
                this.disponibilidadDeLaPromo={
                    ...this.disponibilidadDeLaPromo,
                    [promo.idPromocion]:{ disponibles: promo.promocionesDisponibles, aplicadas:0}
                };

                listaPromos = {
                    ...listaPromos,
                    [promo.idPromocion]: promoDeLaLista,
                };
                indicePorTipoId.push(
                    `${promoDeLaLista.aplicacion}${promo.idPromocion}`
                );
            }
        });

        this.listaPromocionesVigentes = {
            lista: listaPromos,
            indexPorTipoId: indicePorTipoId.sort(),
            existenPromociones: indicePorTipoId.length > 0,
        };

        return this.listaPromocionesVigentes;
    }


    calcular(
        productos: TProductoPedido[]
    )  {

        for ( let promo in this.disponibilidadDeLaPromo)
        {
            this.disponibilidadDeLaPromo[promo].aplicadas=0;
        }

        const promocionesContado = this.obtenerAplicablesPorTipoDePago(
            this.obtenerProductosDelPedidoIndex(productos, ETiposDePago.Contado)
        );

        const promocionesCredito = this.obtenerAplicablesPorTipoDePago(
            this.obtenerProductosDelPedidoIndex(productos, ETiposDePago.Credito)
        );

        /* .promosAplicables.sort((a, b) => (a.promocionID > b.promocionID ? 1 : -1)); */

        const benficiosParaAgregar = this.formatearBeneficios(
            promocionesContado.promosAplicables,
            promocionesCredito.promosAplicables
        );

        const promocionesVigentesNoAplicables = Object.values(
            this.listaPromocionesVigentes?.lista ?? {}
        )
            .filter((promocion) =>
                promocionesContado.promosAplicables.some(
                    (promoContado) => promoContado.promocionID === promocion.promocionID
                ) ||
                promocionesCredito.promosAplicables.some(
                    (promoCredito) => promoCredito.promocionID === promocion.promocionID
                )
                    ? false
                    : true
            )
            .sort((a, b) => (a.promocionID > b.promocionID ? 1 : -1));

        return {
            contado: promocionesContado,
            credito: promocionesCredito,
            noAplicable: promocionesVigentesNoAplicables,
            benficiosParaAgregar,
            disponibles:this.disponibilidadDeLaPromo,
        };
    };

    
    /**
 * Retorna una lista de promociones ongoing aplicables según sean de creditos o contado
 * @method
 * @param {TProductosPedidoIndex} productosPedidos - item's del pedido, se deben enviar filtrados por forma de pago.(creditos o contado)
 * @returns {TListaPromoOngoing}
 */
    obtenerAplicablesPorTipoDePago  (
        productosPedidos: TProductosPedidoIndex,
    ): TPromoOngoingAplicablesResultado
    {
        let productosUsadosEnOtrasPromosAutomaticas: TProductosUsadosEnOtrasPromos ={};
	    let productosUsadosEnOtrasPromosManuales: TProductosUsadosEnOtrasPromos = {};
	    let aplicables: TPromoOngoingAplicables[] = [];

        if (!this.listaPromocionesVigentes?.existenPromociones || !productosPedidos)
            return {
                promosAplicables: [],
                indiceProductosxPromosManuales: {}
            };

            for (let clave of this.listaPromocionesVigentes.indexPorTipoId) {
                const claveAplicacion = clave.substring(0, 1);
                const promocionID = clave.replace(claveAplicacion, '');
                const promo: TPromoOngoing = this.listaPromocionesVigentes.lista[Number(promocionID)];
                let materialesRequisitosVerificados: TPromoOngoingMaterialesRequisitosVerificados[] =[];
                let multiplo = [];
                let conector: any = 'Y';
                const {disponibles, aplicadas} =this.disponibilidadDeLaPromo[promo.promocionID];
                if ( (disponibles - aplicadas) <=0 ) // descartamos promo por no tener disponibilidad
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
                if (sonValidosLosRequisitos ) {
                    // verificar si el grupo de beneficios se puede aplicar
                    let grupoDeBeneficiosResultado = this.verificarBeneficios(
                        promo.beneficios,
                        productosPedidos
                    );
                    let listaProductosAplicados: TPromoOngoingListaProductosAplicados[] = [];
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
                                secuencias: [
                                    {
                                        ...grupoDeBeneficiosResultado[0].secuencias[0],
                                        materialesBeneficio: [
                                            grupoDeBeneficiosResultado[0].secuencias[0]
                                                .materialesBeneficio[0],
                                        ],
                                    },
                                ],
                            });
                            topeTotal = Math.min(
                                grupoDeBeneficiosResultado[0].secuencias[0].cantidad *
                                    Math.min(...multiplo),
                                grupoDeBeneficiosResultado[0].secuencias[0].tope
                            );
        
                           

                            this.disponibilidadDeLaPromo[promo.promocionID].aplicadas++; 

                        } else {
                            productosUsadosEnOtrasPromosManuales =
                                this.comprometerProductosUsadosEnPromos(
                                    materialesRequisitosVerificados,
                                    productosUsadosEnOtrasPromosManuales
                                );
                        }
                        
                        //Beneficio por default
                        listaProductosAplicados.push({
                            codigoProducto:
                                grupoDeBeneficiosResultado[0].secuencias[0]
                                    .materialesBeneficio[0],
                            unidadMedida:
                                grupoDeBeneficiosResultado[0].secuencias[0].unidadMedida,
                            cantidad: topeTotal,
                        });


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
     * @param {TProductosPedidoIndex} productosIndex - lista d productos distintos de promoPush y que sean de una forma de pago
     */
    private  verificarRequisito (
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
    };


    /**
     * Retorna un array de grupos de benenficios ordenado por Id, con los materiales validades según corresponda
     * @constructor
     * @param {TPromoOngoingGrupoBeneficios[]} grupoBeneficios  - array de grupos de beneficios de la promo
     * @param {TProductosPedidoIndex} productosIndex - lista d productos distintos de promoPush y que sean de una forma de pago
     */

    private verificarBeneficios (
        grupoBeneficios: TPromoOngoingGrupoBeneficios[],
        productosPedidoIndex: TProductosPedidoIndex
    ): TPromoOngoingGrupoBeneficios[] {
        let grupoBeneficiosVerificados: TPromoOngoingGrupoBeneficios[] = [];
        grupoBeneficios.forEach((grupo: TPromoOngoingGrupoBeneficios) => {
            let materiales: number[] = [];
            let secuencias: TPromoOngoingBeneficiosSecuencia[] = [];
            let grupoValido: boolean = true;
            // si una de las secuencia al validar materiales no queda al menos uno, el grupo se descarta
            for (let secuencia of grupo.secuencias) {
                if (secuencia.formaBeneficio == EFormaBeneficio.Obsequio) {
                    materiales = secuencia.materialesBeneficio.filter((producto: number) =>
                        validarProductoContraPortafolio(producto, this.cliente.portafolio)
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

    /**
     * Retorna un TProductosPedidoIndex con todos los productos distintos de promoPush y que sean de una forma de pago
     * @constructor
     * @param {TProductoPedido[]} productosPedidos - item's del pedido
     * @param {ETiposDePago} tipoPago - Contado o Crédito
     */
    private  obtenerProductosDelPedidoIndex(
        productosPedidos: TProductoPedido[],
        tipoPago: ETiposDePago,
        aplicadas?: number[]
    ): TProductosPedidoIndex{
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

    private comprometerProductosUsadosEnPromos  (
        materialesRequisitosVerificados: TPromoOngoingMaterialesRequisitosVerificados[],
        productosUsadosEnOtrasPromos: TProductosUsadosEnOtrasPromos
    ): TProductosUsadosEnOtrasPromos  {
        let nuevaListaDeProductosUsadosEnOtrasPromos: TProductosUsadosEnOtrasPromos ={...productosUsadosEnOtrasPromos};
        materialesRequisitosVerificados.forEach((requisitoVerificado: TPromoOngoingMaterialesRequisitosVerificados) => 
            {
                for ( const p in requisitoVerificado.lista)
                {
                    if (nuevaListaDeProductosUsadosEnOtrasPromos[p])
                    {
                        nuevaListaDeProductosUsadosEnOtrasPromos[p]=[...nuevaListaDeProductosUsadosEnOtrasPromos[p],...requisitoVerificado.lista[p]];
                    }else{
                        nuevaListaDeProductosUsadosEnOtrasPromos[p]=[...requisitoVerificado.lista[p]];
                    }
                }
                
            }
        );
        return nuevaListaDeProductosUsadosEnOtrasPromos;
    };

    private  aplicarAutomaticamenteProductos (
        listaMateriales: number[],
        cantidad: number
    ): TPromoOngoingListaProductosAplicados[] {
        let listaProductosAplicados: TPromoOngoingListaProductosAplicados[] = [];
    
        return listaProductosAplicados;
    };


    /**
     * Retorna las promociones que se aplicaron al cliente en formato TPromoOngoingAplicadas[] para ser despachas al redux
     * @constructor
     * @param {TPromoOngoingAplicables[]} promoContado - Array de promociones de contado
     * @param {	promoCredito: TPromoOngoingAplicables[]} promoCredito  - array de promociones de credito
     */

    private formatearBeneficios (
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
    };




}