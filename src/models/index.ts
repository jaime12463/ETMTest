export type TPrecio = {
    Codigoproducto: string,
    PrecioConImpuesto: string,
    PrecioSinImpuesto: string,
    IVA: string,
    IEPS: string,
    ClaseCondicion: string,
    DescuentosPiramide: string,
    Ini_Vig: string,
    Ini_Fin: string,
};

export type TCliente = {
    CodigoCliente: string,
    Precios: TPrecio[],
};

export type TProductoSolicitado = {
    producto: string,
    unidades: number,
    precio: number,
};