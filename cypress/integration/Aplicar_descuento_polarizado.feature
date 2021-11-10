# language: es

@Pedido @Cobertura @Desplegar @Sprint16

# El _nuevoPrecioUnidad se obtiene apicando el _procentajeDescuentoPolarizado a _precioConImpuestoUnidad
# y el _nuevoPrecioSubunidad se obtiene aplicando el _procentajeDescuentoPolarizado a _precioConImpuestoSubunidad

Característica: Aplicar descuento polarizado
    Como prevendedor
    Quiero ofrecerle un descuento polarizado al cliente
    Para aplicarle el descuento al producto

Escenario: N°1 - Precio de venta al público fuera de rango
    Dado que se ingresó un precio de venta al público de un producto
    Y el precio de venta no está en rango de descuento polarizado
    Cuando acepta el ingreso del precio al público
    Entonces el sistema no calculará y no aplicará descuento

Escenario: N°2 - Precio de venta al público en rango de descuento
    Dado que se ingresó un precio de venta al público de un producto
    Y tiene un _precioVentaUnidadesDesde <= precio venta público <= _precioVentaUnidadesHasta aplicable
    Cuando acepta el ingreso del precio al público
    Entonces el sistema calculará el _nuevoPrecioUnidad y _nuevoPrecioSubunidad 
    Y los mostrará en rojo, debajo de los precios originales 
    Y calculará el ahorro para unidades restando el _precioConImpuestoUnidad - _nuevoPrecioUnidad
    Y calculará el ahorro para subunidades restando el _precioConImpuestoSubuidad - _nuevoPrecioSubunidad
    Y actualizará los indicadores y totales en base al nuevo precio

# Se debe guardar en la línea del pedido el precio recalculado con el descuento, el monto del ahorro total  
# y la clase de condición del rango aplicado ( _claseCondicionPolarizado )

Escenario: N°3 - Precio de venta al público eliminado
    Dado que se ingresó un precio de venta al público de un producto
    Cuando se borra el precio ingresado
    Entonces el sistema reestablecerá como precio de venta el informado en el portafolio
    Y dejará de mostrar el precio calculado
    Y actualizará los indicadores y totales en base al precio original
