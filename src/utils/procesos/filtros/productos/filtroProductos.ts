import {TAtributos, TPrecioProducto, TProductos} from 'models';
import {exit} from 'process';

export enum ETiposDeFiltro {
	Venta = 'venta',
	// Canje = 'canje',
    NoPromoPush='noPromoPush'
}

export type TFuncionDeFiltro = {
	// ( item: TPrecioProducto): boolean
	(
		producto: TPrecioProducto,
		codigo: number | string,
		param?: number[] | string[]
	): boolean;
};

export type TFiltro = {
	orden:number;
	activo: boolean;
	func: TFuncionDeFiltro;
	param?: number[] | string[];
};

type TListaDeFiltros = Record<ETiposDeFiltro, TFiltro>;


type TAtributosProductos ={ 
	[tipo:string]:number[];
};

/**
 * Retorna las promociones que se aplicaron al cliente en formato TPromoOngoingAplicadas[] para ser despachas al redux
 * @class
 * @param {TPromoOngoingAplicables[]} promoContado - Array de promociones de contado
 * @param {	promoCredito: TPromoOngoingAplicables[]} promoCredito  - array de promociones de credito
 */
export class FiltroProductos {
	filtros: TListaDeFiltros = {
		venta: {
			orden:20,
			activo: false,
			func: (
				producto: TPrecioProducto,
				codigo: number | string,
				param?: number[] | string[]
			) => {
				return (
					(producto.nombreProducto
						.toLowerCase()
						.includes(codigo.toString().toLowerCase()) ||
						producto.codigoProducto.toString().includes(codigo.toString())) &&
					!producto.promoPush
				);
			},
		},
        noPromoPush: {
			orden:10,
			activo: true,
			func: (
				producto: TPrecioProducto,
				codigo: number | string,
				param?: number[] | string[]
			) => {
				return (!producto.promoPush);
			},
		}
		//ToDo
		// canje: {
		// 	activo: false,
		// 	func: () => {
		// 		return true;
		// 	},
		// },
	};

	private portafolioProductos: TPrecioProducto[] | undefined;

	private atributosDelLosProductos: TAtributosProductos | undefined;
	/**
	 * Crea una instancia de filtro de productos
	 * @constructor
	 * @param {TPrecioProducto[]} portafolioProductos - Portafolio del  cliente
	 */
	constructor( portafolioProductos?: TPrecioProducto[],  filtrosDefault?:ETiposDeFiltro[] ) {
		this.portafolioProductos = portafolioProductos;
		filtrosDefault?.forEach((filtroActivar)=> this.agregarFiltro(filtroActivar));
	}

	obtenerAtributos(){

		if(this.atributosDelLosProductos!=undefined)
			return this.atributosDelLosProductos;
		
		
		let obj:TAtributosProductos={
			sabor: [],
			familia: [],
			medida: [],
			marca:[],
			envase:[]
		};	
		this.portafolioProductos?.forEach((producto) => {
			if ( producto.atributos != undefined)
			{
				obj.sabor.push( producto.atributos.sabor);
				obj.familia.push( producto.atributos.familia);
				obj.medida.push( producto.atributos.medida);
				obj.marca.push( producto.atributos.marca);
				obj.envase.push( producto.atributos.envase);
			}

		})
		
		this.atributosDelLosProductos=obj;
		return this.atributosDelLosProductos;
	}


	/**
     * Activa un filtro para la ejecución
     * @param {ETiposDeFiltro} tipo - tipo de filtro
	 * @param {number[] | string[]} param - Opcional lista de valores donde debe encontrarse alguna de las propiedades del producto
     * @return void.
     */
	agregarFiltro(tipo: ETiposDeFiltro, param?: number[] | string[]): void {
		this.filtros[tipo].activo = true;
		this.filtros[tipo].param = this.filtros[tipo].param;
	}

	/**
     * Desactiva un filtro para la ejecución
     * @param {ETiposDeFiltro} tipo - tipo de filtro
     * @return void.
     */
	quitarFiltro(tipo: ETiposDeFiltro): void {
		this.filtros[tipo].activo = false;
	}

	/**
     * Ejecuta la lista de fltros activos
     * @param { number | string} codigo - Parcial o Total de caracteres intervinientes en el código de producto
     * @return void.
     */
	ejecutar(codigo: number | string) {
		const  filtros=Object.values(this.filtros).filter((filtro: TFiltro) => filtro.activo).sort((e1,e2)=> e1.orden>e2.orden ? -1 : 1);
		return this.portafolioProductos?.filter((producto) => {
			let ret = true;
			for( let filtro of filtros)
			{
				ret = filtro.func.apply(this, [producto, codigo, filtro.param]);
				if (!ret) break;
			}
			
			return ret;
		});
	}
}
