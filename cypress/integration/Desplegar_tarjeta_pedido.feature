# language: es

@Pedido @Desplegar_tarjeta_pedido @Paso2 @Sprint13

Característica: Desplegar tarjeta de pedido
    Como prevendedor
    Quiero quiero desplegar la tarjeta de toma de pedido 
    Para registrar productos 

Escenario: N°1 - Desplegar tarjeta
    Dado que el _tipoPedido cuyo _codigo = "Venta"
    Cuando selecciono desplegar tarjeta
    Entonces el sistema asigna como pedido actual el _tipoPedido.codigo = "Venta"
    Y desplegará la tarjeta
    Y mostrará el panel de ingreso del producto
    Y mostrará las tarjetas de productos en el caso que tenga ingresados productos

#solo pedidos ya registrados
Escenario: N°2 - El cliente es de contado
    Dado que la tarjeta es de _tipoPedido.codigo = "Venta"
    Y el cliente tiene condición de pago contado
    Cuando se selecciono desplegar la tarjeta
    Y el consumido para la fecha de entrega, el informado más los pedidos de contado ya registrados sin contar el pedido en curso, es menor o igual al _montoVentaContadoMaxima
    Entonces el sistema asigna como pedido actual el _tipoPedido.codigo = "Venta"
    Y desplegará la tarjeta 
    Y mostrará el panel de ingreso del producto
    Y el switch Credito en estado off Disabled
    Y mostrará las tarjetas de productos en el caso que tenga ingresados productos

#pedido
Escenario: N°3 - El cliente es de crédito formal y sin credito bloqueado
    Dado que la tarjeta es de _tipoPedido.codigo = "Venta"
    Y el cliente tiene condición de pago crédito formal
    Y _esCreditoBloqueado = false
    Cuando se selecciono desplegar la tarjeta
    Entonces el sistema asigna como pedido actual el _tipoPedido.codigo = "Venta"
    Y desplegará la tarjeta
    Y mostrará el panel de ingreso del producto
    Y el switch en estado On Disabled 
    Y mostrará las tarjetas de productos en el caso que tenga ingresados productos

#solos los pedidos registrados. No considerar el pedido en curso
Esquema del escenario: N°4 - El cliente es de crédito informal sin crédito bloqueado
    Dado que la tarjeta es de _tipoPedido.codigo = "Venta"
    Y el cliente tiene condicion de pago crédito informal
    Y _esCreditoBloqueado = false
    Cuando se selecciono desplegar la tarjeta
    Y '<estadoCredito>' es crédito Disponible mayor a cero
    Y '<estadoPedidoMaximo>' es Pedido máximo cumplido
    Entonces el sistema asigna como pedido actual el _tipoPedido.codigo = "Venta"
    Y mostrará '<estadoPanelIngresoProducto>', '<estadoEncendidoSwitch>' y '<estadoHabilitacionSwitch>' 
    Y mostrará las tarjetas de productos en el caso que tenga ingresados productos

Ejemplos:
|estadoCredito|estadoPedidoMaximo|estadoPanelIngresoProducto|estadoEncendidoSwitch|estadoHabilitacionSwitch|
|     Si      |       No         |Si                        |On                   |enabled                 |  
|     No      |       No         |Si                        |Off                  |disabled                |  
|     Si      |       Si         |Si                        |On                   |disabled                | 

# Para el caso de estadoPanelIngresoProducto en NO, se contempla en Mostrar_tarjeta_toma_pedido que es previo a esta historia de usuario


# solo pedidos ya registrados
Esquema del escenario: N°5 - El cliente es de crédito informal con crédito bloqueado
    Dado que la tarjeta es de _tipoPedido.codigo = "Venta"
    Y el cliente tiene condicion de pago crédito informal
    Y _esCreditoBloqueado = true
    Cuando se selecciono desplegar la tarjeta
    Y el cliente no tiene Pedido máximo cumplido, sin contar el pedido en curso 
    Entonces el sistema asigna como pedido actual el _tipoPedido.codigo = "Venta"
    Y mostrará el panel de ingreso del producto
    Y el switch en estado Off Disabled 
    Y mostrará las tarjetas de productos en el caso que tenga ingresados productos
