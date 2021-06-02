export type TClientePedido = {
    CodigoCliente: string,
    Precios: TPrecio[],
};

export type TProductoPedido = {
    codigoProducto: string,
    unidades: number,
    precio: number,
};

export type TPedidoCliente = {
    [codigoCliente: string]: TProductoPedido[];
}

export type TCliente = {
    codigoCliente: string,
    fechas: TFecha[],
    detalles: TDetalle[],
    precios: TPrecio[],
}

export type TFecha = {
    fecha: string,
    secuencia: string,
    fechaDeEntrega: string,
}

export type TDetalle = {
    nombreComercial: string,
}

export type TPrecio = {
    codigoproducto: string,
    nombre: string,
    precioConImpuesto: string,
    iniVig: string,
    finVig: string,
};