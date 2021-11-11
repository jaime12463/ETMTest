# language: es

@Pedido @Descuentos @Sprint16

# El _nuevoPrecioUnidad_ se obtiene apicando el _porcentajeDescuentoEscalonado a _precioConImpuestoUnidad
# y el _nuevoPrecioSubunidad_ se obtiene aplicando el _porcentajeDescuentoEscalonado a _precioConImpuestoSubunidad

Característica: Aplicar descuento escalonado
    Como prevendedor
    Quiero que el sistema aplique descuentos escalonados
    Para fidelizar al cliente

Escenario: N°1 – La cantidad de unidades ingresadas es correcta y aplica descuento escalonado
	Dado que se ingresó una cantidad correcta
    Y no se eliminó el descuento
	Y se encuentra informado el _descuentoEscalonado para el _codigoProducto en el _portafolio del cliente
    Y las unidades ingresadas están dentro de un rango de descuento escalonado
    Cuando se acepta el ingreso de unidades en el producto
    Entonces el sistema calculará y mostrará el _nuevoPrecioUnidad_ y _nuevoPrecioSubunidad_
    Y los mostrará en rojo, debajo de los precios originales 
    Y calculará el ahorro para unidades restando el _precioConImpuestoUnidad - _nuevoPrecioUnidad_
	Y calculará el ahorro para subunidades restando el _precioConImpuestoSubunidad - _nuevoPrecioSubunidad_
    Y actualizará los indicadores y totales en base a los nuevos precios
     
# Se da como cantidad ingresada cuando acepta la cantidad manual ingresada o se pierde el foco del campo
# Al guardar el producto, guardar el precio con descuento en los campos de precio de venta. Adicionalmente agregar el precio de lista del portafolio y el monto total de ahorro.

