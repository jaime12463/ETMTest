export type TDatosClientesProductos = {
    clientes: TClientes,
    productos: TProductos,
}

export type TClientes = {
    [codigoCliente: string]: TCliente;
}

export type TProductos = {
    [codigoProducto: string]: TProducto;
}

export type TCliente = {
    montoPedidoMínimo: number;
    visitasPlanificadas: TVisitaPlanificada[],
    fechasEntrega: TFechaEntrega[],
    detalles: TDetalle[],
    portafolio: TPortafolio[],
}

export type TProducto = {
    nombre: string,
    presentacion: number,
};

export type TVisitaPlanificada = {
    dia: string,
    secuencia: number,
}

export type TFechaEntrega = {
    fechaVisita: string,
    fechaEntrega: string,
}

export type TDetalle = {
    nombreComercial: string,
}

export type TPortafolio = {
    codigoProducto: string,
    botelleo: boolean,
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

export type TProductosPedidos = TProductoPedido[];

export type TProductoPedidoConPrecios = {
    codigoProducto: string,
    unidades: number,
    subUnidades: number,
    precioConImpuestoUnidad: number,
    precioConImpuestoSubunidad: number,
};

export type TPreciosProductos = TPrecioProducto[];

export type TPrecioProducto = {
    codigoProducto: string,
    nombre: string,
    presentacion: number,
    precios: TPrecios,
}

export type TDatosConfiguracion = {
    configuraciones: TConfiguraciones
}

export type TConfiguraciones = TConfiguracion[];

export type TConfiguracion = {
    esFrecuenciaAbierta: boolean,
    esVentaSubunidadesRuta: boolean
}