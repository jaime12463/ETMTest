# language: es

@Pedido @Desplegar_tarjeta_pedido @Paso2 @Sprint13

Característica: Desplegar tarjeta de pedido
    Como prevendedor
    Quiero desplegar la tarjeta de toma de pedido 
    Para registrar productos 

Antecedentes:
    Dado que estoy en paso 2 - toma de pedido
    Y se despliega la tarjeta toma de pedido que tiene asociado _tipoPedido con _codigo = "Venta"

Escenario: N°1 - Desplegar tarjeta
    Cuando selecciono desplegar tarjeta
    Entonces el sistema mostrará el control para ingresar producto
    Y el control para buscar productos
    Y mostrará las tarjetas de productos en el caso que tenga ingresados productos

#solo pedidos ya registrados
Escenario: N°2 - El cliente es de contado
    Dado el cliente tiene condición de pago contado
    Y el consumido para la fecha de entrega, el informado más los pedidos de contado ya registrados sin contar el pedido en curso y sin los compromisos de pago realizados en la visita actual, es menor o igual al _montoVentaContadoMaxima
    Cuando muestra la tarjeta desplegada
    Entonces el sistema mostrará el switch de condición de pago en contado y deshabilitado
    Y no mostrará el switch en las tarjetas de producto
    

#pedido
Escenario: N°3 - El cliente es de crédito formal y sin credito bloqueado
    Dado que el cliente tiene condición de pago crédito formal
    Y _esCreditoBloqueado = false
    Cuando muestra la tarjeta desplegada
    Entonces el sistema mostrará el switch de condicion de pago en credito y deshabilitado 
    Y no mostrará el switch en las tarjetas de producto

#solos los pedidos registrados. No considerar el pedido en curso
Esquema del escenario: N°4 - El cliente es de crédito informal sin crédito bloqueado
    Dado que el cliente tiene condicion de pago crédito informal
    Y _esCreditoBloqueado = false
    Y '<estadoCredito>' es crédito Disponible mayor a cero
    Y '<estadoPedidoMaximo>' es Pedido máximo cumplido, sin contar el pedido en curso y sin los compromisos de pago realizados en la visita actual
    Cuando muestra la tarjeta desplegada
    Entonces el sistema mostrará el switch de condicion de pago segun '<estadoEncendidoSwitch>' y '<estadoHabilitacionSwitch>' 
    Y mostrará el switch en las tarjetas de producto

Ejemplos:
|estadoCredito|estadoPedidoMaximo|estadoPanelIngresoProducto|estadoEncendidoSwitch   |estadoHabilitacionSwitch|
|     Si      |       No         |Si                        |_condicionDePagoDefault |habilitado              |  
|     No      |       No         |Si                        |Contado                 |deshabilitado           |  
|     Si      |       Si         |Si                        |Credito                 |deshabilitado           | 

# Para el caso de estadoPanelIngresoProducto en NO, se contempla en Mostrar_tarjeta_toma_pedido que es previo a esta historia de usuario
# _condicionDePagoDefault: puede ser contado o crédito, según configuración

# solo pedidos ya registrados
Escenario: N°5 - El cliente es de crédito informal con crédito bloqueado
    Dado que el cliente tiene condicion de pago crédito informal
    Y _esCreditoBloqueado = true
    Y el cliente no tiene Pedido máximo cumplido, sin contar el pedido en curso y sin los compromisos de pago realizados en la visita actual
    Cuando muestra la tarjeta desplegada
    Entonces mostrará el switch de condicion de pago en contado y deshabilitado 
    Y no mostrará el switch en las tarjetas de producto


Esquema del escenario: N°6 - Mostrar switch cuando hay productos
    Dado que se desplegó la tarjeta de toma de pedido
    Cuando '<hayProductosEnElPedido>'
    Entonces el sistema '<mostrarSwitchCondicionPago>' el switch condición de pago

Ejemplos:
|hayProductosEnElPedido    | mostrarSwitchCondicionPago|
|  hay productos en pedido |      mostrará             |
|  no hay productos        |      ocultará             | 
