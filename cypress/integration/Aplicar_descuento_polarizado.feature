# language: es

@Pedido @Descuentos @Sprint16

# El _nuevoPrecioUnidad_ se obtiene apicando el _porcentajeDescuentoPolarizado a _precioConImpuestoUnidad
# y el _nuevoPrecioSubunidad_ se obtiene aplicando el _porcentajeDescuentoPolarizado a _precioConImpuestoSubunidad

Característica: Aplicar descuento polarizado
    Como prevendedor
    Quiero ofrecerle un descuento polarizado al cliente
    Para aplicarle el descuento al producto

Escenario: N°1 - Precio de venta al público fuera de rango
    Dado que se ingresó un precio de venta al público de un producto
    Y el precio de venta no está en rango de descuento polarizado
    Cuando acepta el ingreso del precio al público
    Entonces el sistema no calculará y no aplicará descuento
    Y mostrará el icono en gris

Escenario: N°2 - Precio de venta al público en rango de descuento
    Dado que se ingresó un precio de venta al público de un producto
    Y tiene un _precioVentaAlPublicoDesde <= precio venta público <= _precioVentaAlPublicoDesde aplicable
    Cuando acepta el ingreso del precio al público
    Entonces el sistema calculará el _nuevoPrecioUnidad_ y _nuevoPrecioSubunidad_ 
    Y los mostrará en rojo, debajo de los precios originales 
    Y calculará el ahorro para unidades restando el _precioConImpuestoUnidad - _nuevoPrecioUnidad_
    Y calculará el ahorro para subunidades restando el _precioConImpuestoSubunidad - _nuevoPrecioSubunidad_
    Y actualizará los indicadores y totales en base al nuevo precio
    Y mostrará el icono verde de ok

# Se debe guardar en la línea del pedido el precio recalculado con el descuento, el monto del ahorro total  
# y la clase de condición del rango aplicado ( _claseCondicionPolarizado )

Escenario: N°3 - Precio de venta al público eliminado
    Dado que se ingresó un precio de venta al público de un producto
    Cuando se borra el precio ingresado
    Entonces el sistema reestablecerá como precio de venta el informado en el portafolio
    Y dejará de mostrar el precio calculado
    Y actualizará los indicadores y totales en base al precio original
    Y no mostrará icono de ingreso de precio


# Las acciones de cálculo y descuentos, deben aplicarse cuando se acepta el precio ingresado 
# o cambia el foco del input del precio