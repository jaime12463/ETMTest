import {TPrecioProducto} from 'models';
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

	listaProductos: TPrecioProducto[] | undefined;

	constructor(listaProductos?: TPrecioProducto[]) {
		//console.table(listaProductos);
		this.listaProductos = listaProductos;
	}

	agregarFiltro(tipo: ETiposDeFiltro, param?: number[] | string[]): void {
		this.filtros[tipo].activo = true;
		this.filtros[tipo].param = this.filtros[tipo].param;
	}

	quitarFiltro(tipo: ETiposDeFiltro): void {
		this.filtros[tipo].activo = false;
	}

	ejecutar(codigo: number | string) {
		const  filtros=Object.values(this.filtros).filter((filtro: TFiltro) => filtro.activo).sort((e1,e2)=> e1.orden>e2.orden ? -1 : 1);
		return this.listaProductos?.filter((producto) => {
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
