import {
	TPedido,
    TPromoOngoing,
    TListaPromoOngoing
} from 'models';



export const obtenerPromocionesOngoingAplicables = (pedido: TPedido, vigentes:TListaPromoOngoing, aplicadas: number[])  =>
{
    /*
    let aplicables:TListaPromoOngoing = Object.keys(vigentes).reduce(
        (acumulado: TListaPromoOngoing, promoId: number) => {

        return 
        {
            ...acumulado,
            vigentes[promoId]
        };
    });
    */

    let aplicables:TListaPromoOngoing={};
    for ( let promoId in vigentes)
    {
        const promo:TPromoOngoing=vigentes[promoId];
        // filtrar pedido según requisitos
        
        aplicables=
        {
            ...aplicables,
            [promoId]:promo
        }
    }
};

