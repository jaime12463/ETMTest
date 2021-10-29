# language: es

@Iniciativa @Ejecutar @Sprint15

Característica: Ejecutar iniciativa
    Como prevendedor
    Quiero ejecutar una iniciativa
    Para incorporar los productos al pedido

Escenario: N°1 - Agregar producto de la iniciativa al pedido
    Dado que se ingresó al paso 1 - planeación del cliente
    Y se desplegó la tarjeta iniciativas
    Y se desplegó el detalle de una iniciativa
    Y no tiene estado
    Cuando cambio el estado de la iniciativa a ejecutada
    Entonces el sistema marcará en verde la tarjeta de esa iniciativa
    Y agregará el producto con la cantidad de unidades y subunidades indicada como un _tipoPedido con _codigo = "Venta"
    Y establecerá al pedido la condición de pago definida para el cliente
    Y registrará la iniciativa indicando usuario, fecha y hora, código de iniciativa, código de cliente, status, producto, unidades y subunidades.

# Los indicadores se deberán actualizar ya que se está agregando el producto de la iniciativa al pedido de venta. 

Escenario: N°2 - Iniciativa con estado Cancelada
    Dado que se ingresó al paso 1 - planeación del cliente
    Y se desplegó la tarjeta iniciativas
    Y se desplegó el detalle de una iniciativa
    Y tiene estado cancelada
    Cuando cambio el estado de la iniciativa a ejecutada
    Entonces el sistema marcará en verde la tarjeta de esa iniciativa
    Y agregará el producto con la cantidad de unidades y subunidades indicada como un _tipoPedido con _codigo = "Venta"
    Y establecerá al pedido la condición de pago definida para el cliente
    Y modificará la iniciativa registrada borrando el motivo de cancelación 
    Y cambiará el status del registro a ejecutada
    Y registrará producto, unidades y subunidades.