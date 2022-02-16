import {
	TPrecioProducto,
} from 'models';
import { exit } from 'process';

export enum ETiposDeFiltro {
    Pedido="pedido",
    Canje="canje",

}

export type TFuncionDeFiltro = {
   // ( item: TPrecioProducto): boolean
   (producto:TPrecioProducto, codigo:number | string, param: number[] | string[] | undefined): boolean
};

export type TFiltro = {
    activo:boolean;
    func : TFuncionDeFiltro;
    param? : number[] | string[];
};

type TListaDeFiltros = Record<ETiposDeFiltro, TFiltro>;

export  class FiltroProductos 
{
        filtros:TListaDeFiltros= {
            "pedido": { 
                activo:false,
                func: (producto:TPrecioProducto, codigo:number | string, param: number[] | string[] | undefined) =>
                {
                    return ( producto.nombreProducto.toLowerCase().includes(codigo.toString().toLowerCase()) ||  
                             producto.codigoProducto.toString().includes(codigo.toString())) 
                            &&  !producto.promoPush;
                },
                    
            },
            "canje":{ 
                activo:false,
                func: () => 
                { 
                    return true
                },
            },
        };

        

        listaProductos: TPrecioProducto[] | undefined =[];

        constructor(listaProductos: TPrecioProducto[] | undefined){
            console.table(listaProductos);
            this.listaProductos= listaProductos;
            

        }

        agregarFiltro(tipo:ETiposDeFiltro, param?:number[] | string[]) : void
        {
            this.filtros[tipo].activo=true;
            this.filtros[tipo].param=this.filtros[tipo].param;
        }

        quitarFiltro(tipo:ETiposDeFiltro) : void
        {
            this.filtros[tipo].activo=false;
        }

        ejecutar(codigo:number | string) 
        {
            
            return this.listaProductos?.filter ( (producto) => 
            {
                let ret=true;
                Object.values(this.filtros).filter((filtro:TFiltro) => filtro.activo ).forEach( (filtro:TFiltro) => { 
                        ret=filtro.func.apply(this, [producto,codigo, filtro.param]);
                        if (!ret) exit;
                    });
                return ret;
            });
    }
}