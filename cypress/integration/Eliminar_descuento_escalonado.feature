# language: es

@Pedido @Descuentos @Sprint16

Característica: Eliminar descuento escalonado
    Como prevendedor
    Quiero eliminar un descuento escalonado del producto
    Para no aplicarle rebajas al cliente

Escenario: N°1 - Eliminar descuento
    Dado que se ingresaron cantidades a un producto
    Y se mostró el control para eliminar el descuento
    Cuando selecciona eliminar descuento
    Entonces el sistema reestablecerá los precios del portafolio
    Y actualizará los indicadores y totales
    Y marcará el producto para que no se vuelva a calcular el descuento escalonado
    Y ocultará los controles relacionados al descuento escalonado

