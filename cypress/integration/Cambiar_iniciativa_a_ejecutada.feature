# language: es

@Iniciativa @Ejecutar @Sprint15 @Sprint18

Característica: Ejecutar iniciativa
    Como prevendedor
    Quiero ejecutar una iniciativa
    Para incorporar los productos al pedido

Escenario: N°1 - Agregar producto de la iniciativa al pedido
    Dado que se ingresó al paso 1 - planeación del cliente
    Y se desplegó la tarjeta iniciativas
    Y se desplegó el detalle de una iniciativa
    Y existen grupos de cobertura con los mismos productos de la iniciativa
    Cuando cambio el estado de la iniciativa a ejecutada
    Entonces el sistema marcará en verde la tarjeta de esa iniciativa
    Y mostrará el icono de ejecución
    Y agregará el producto con la cantidad de unidades y subunidades establecidas como un _tipoPedido con _codigo = "Venta"
    Y establecerá al pedido la condición de pago definida para el cliente
    Y habilitará las unidades y subunidades
    Y agregará las mismas cantidades a los mismos productos de coberturas

Escenario: N°3 - Ingresar unidades a la iniciativa
    Dado que se cambió el estado de la iniciativa a ejecutada
    Y tiene _cantidadMáximaUnidades
    Y existen grupos de cobertura con los mismos productos de la iniciativa
    Cuando aumento las unidades
    Entonces el sistema aumentará las unidades en 1
    Y no podrá superar _cantidadMáximaUnidades
    Y cambiará las unidades del producto en el pedido
    Y cambiará las unidades del mismo producto en coberturas
    Y actualizará el disponible de la iniciativa

Escenario: N°4 - Restar unidades a la iniciativa
    Dado que se cambió el estado de la iniciativa a ejecutada
    Y existen grupos de cobertiras con los mismos productos de la iniciativa
    Cuando resto las unidades
    Entonces el sistema restará las unidades en 1 
    Y cambiará las unidades del producto en el pedido
    Y cambiará las unidades del mismo producto en coberturas 
    Y actualizará el disponible de la iniciativa

#
#Escenario: N°5 - Ingresar subunidades a la iniciativa
#    Dado que se cambió el estado de la iniciativa a ejecutada
#    Y el producto _validaSubunidadesMinimas = true
#    Y tiene _subunidadesVentaMinima
#    Y existen grupos de coberturas con los mismos productos de la iniciativa
#    Cuando aumento las subunidades
#    Entonces el sistema aumentará las subunidades según _subunidadesVentaMinima 
#    Y no podrá superar su _presentacion
#    Y cambiará las subunidades del producto en el pedido
#    Y cambiará las subunidades del mismo producto en coberturas 


#Escenario: N°6 - Restar subunidades a la iniciativa
#    Dado que se cambió el estado de la iniciativa a ejecutada
#    Y el producto _validaSubunidadesMinimas = true
#    Y tiene _subunidadesVentaMinima
#    Y existen grupos de coberturas con los mismos productos de la iniciativa
#    Cuando resto las subunidades
#    Entonces el sistema restará las subunidades según _subunidadesVentaMinima 
#    Y cambiará las subunidades del producto en el pedido
#    Y cambiará las subunidades del mismo producto en coberturas 

# Como es un tipo de pedido de venta, se mantienen todas las mismas 
# validaciones del pedido y mensajes 
# no aplican descuentos escalonados / polarizados

# Los indicadores se deberán actualizarse ya que se está agregando un producto a un tipo de pedido de venta. 
