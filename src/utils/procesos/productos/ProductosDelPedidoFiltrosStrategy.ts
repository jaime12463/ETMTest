import { ETiposDePago, TProductoPedido } from "models/redux";
import {ETipoDescuento, TConfiguracion} from 'models';
import Producto from "pages/Pasos/1_Planeacion/Iniciativas/TarjetaIniciativas/Producto";

export type TProductosPedidoIndex = Record<
	number,
	TProductoPedido & {aplicado: number}
>;

export class ProductosDelPedidoFiltrados{



    	/**
	 * Retorna un TProductosPedidoIndex con todos los productos distintos de promoPush, que no se le haya aplicado descuento escalonado y que sean de una forma de pago
	 * @constructor
	 * @param {TProductoPedido[]} productosPedidos - item's del pedido
	 * @param {ETiposDePago} tipoPago - Contado o Crédito
     * @param {TConfiguracion} configuracion
	 */
	static obtenerListaIndex(
		productosPedidos: TProductoPedido[],
		tipoDePago: ETiposDePago,
		configuracion?: TConfiguracion
	): TProductosPedidoIndex {

        
        const condicionesDeFiltrado = new ProductosDelPedidoFiltrosCondiciones(configuracion, tipoDePago);

		return productosPedidos.reduce(
			(
				productosPedidoIndex: TProductosPedidoIndex,
				producto: TProductoPedido
			) => {
				if ( condicionesDeFiltrado.validar(producto) ) {
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

}

export class ProductosDelPedidoFiltrosCondiciones {
   
    private _validar: Function = () => false ;
    private _tipoDePago: ETiposDePago | undefined;
    constructor(configuracion?: TConfiguracion, tipoDePago?: ETiposDePago ){

        this._validar =  (configuracion?.habilitaRequisitoConDescuentoAutomatico) 
                        ? this.default
                        : this.sinDecuentosAutomaticos;
            
        this._tipoDePago= tipoDePago;
    }

    private queNOSeaPromoPush= (producto: TProductoPedido) => !producto.promoPush;

    private queSeaDelTipoDePago= (producto: TProductoPedido, tipoPago?: ETiposDePago) => producto.tipoPago=== tipoPago;

    private queNOSeaDescuentoEscalonado= (producto: TProductoPedido) => 
        (producto.descuento?.tipo != ETipoDescuento.escalonado ||
                (producto.descuento?.tipo == ETipoDescuento.escalonado &&
                    producto.descuento?.porcentajeDescuento == 0));
    
    private queNOSeaDescuentoAutomatico= (producto: TProductoPedido ) =>
     (producto.descuento?.tipo != ETipoDescuento.automatico ||
        (producto.descuento?.tipo == ETipoDescuento.automatico &&
            producto.descuento?.porcentajeDescuento == 0));



    private default = (producto: TProductoPedido) =>
            this.queNOSeaPromoPush(producto) && 
            this.queSeaDelTipoDePago(producto, this._tipoDePago) && 
            this.queNOSeaDescuentoEscalonado(producto)

    

    private sinDecuentosAutomaticos = (producto: TProductoPedido) => this.default(producto) && 
                                                                        this.queNOSeaDescuentoAutomatico(producto);

    
    public validar = (producto: TProductoPedido)  => this._validar(producto)
    
}