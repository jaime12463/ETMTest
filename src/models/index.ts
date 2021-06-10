export type TDatos = {
    clientes: TClientes,
    productos: TProductos,
}

export type TClientes = TCliente[];

export type TProductos = TProducto[];

export type TProducto = {
    codigoProducto: string,
    nombre: string,
    presentacion: number,
};

export type TCliente = {
    codigoCliente: string,
    detalles: TDetalle[],
    visitasPlanificadas: TVisitaPlanificada[],
    fechasEntrega: TFechaEntrega[],
    configuracionPedido: TConfiguracionPedido[],
    portafolio: TPortafolio[],
}

export type TDetalle = {
    nombreComercial: string,
}

export type TVisitaPlanificada = {
    dia: string,
    secuencia: number,
}

export type TFechaEntrega = {
    fechaVisita: string,
    fechaEntrega: string,
}

export type TConfiguracionPedido = {
    montoVentaMinima?: number,
    UnidadesMaximasVenta?: number,
}

export type TPortafolio = {
    codigoProducto: string,
    esVentaBotellas: boolean,
    precios: TPrecios,
}

export type TPrecios = TPrecio[];

export type TPrecio = {
    precioConImpuestoUnidad: number,
    precioConImpuestoSubunidad: number,
    vigenciaInicioPrecio: string,
    vigenciaFinPrecio: string,
};

export type TPedidosClientes = {
    [codigoCliente: string]: TProductosPedidos;
}

export type TPedidoCliente = {
    codigoCliente: string,
    productosPedido: TProductosPedidos,
}

export type TProductoPedido = {
    codigoProducto: string,
    unidades: number,
    subUnidades: number,
    total: number,
};

export type TProductoPedidoConPrecios = {
    codigoProducto: string,
    unidades: number,
    subUnidades: number,
    precioConImpuestoUnidad: number,
    precioConImpuestoSubunidad: number,
};

export type TProductosPedidos = TProductoPedido[];

export type TPrecioProducto = {
    codigoProducto: string,
    nombre: string,
    presentacion: number,
    precios: TPrecios,
}

export type TPreciosProductos = TPrecioProducto[];