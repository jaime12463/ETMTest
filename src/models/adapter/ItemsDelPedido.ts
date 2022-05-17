import { TProductoPedido } from "models";
import { RegistrosBase } from "./RegistrosBase";

export class  ItemsDelPedido// extends RegistrosBase
{
    private static  registrosBase= new RegistrosBase();

    constructor(){}

    private static  generarId(key1:string, key2:string):string{
        return  this.registrosBase.generarId( [key1, key2], '-' );
    }
    public static crear(item: TProductoPedido ):TProductoPedido{
        let  id:string | undefined = item.id;
        let uuid:string | undefined = item.uuid;
        const fechaActualizacion:string = this.registrosBase.generarFechaActualizacion();
        
        if(id==undefined)
            id= this.generarId( 
                (item.codigoPromo==undefined) ? "0" : item.codigoPromo.toString(),
                item.codigoProducto.toString()
            );
        
            if(uuid==undefined)
                uuid=this.registrosBase.generarUUID();


        return {
                id,
                fechaActualizacion,
                uuid,
                ...item
            };
    }

    public static obtenerId(codigoProducto:number):string{

        return this.generarId('0',codigoProducto.toString());
    }
}