# language: es
@Pedido @sprint8 @sprint9
Característica: Mostrar pantalla ingreso del pedido
    Como prevendedor
    Quiero ver la pantalla del pedido 
    Para saber qué tipo de pedido puedo registrar al cliente 

# Según su condición de pago:
# {contado}: Solo puede comprar de contado
# {crédito formal} Solo puede comprar a crédito si no tiene el crédito bloqueado. Puede cerrar el pedido con crédito excedido 
# {crédito informal} Puede comprar de contado y puede comprar a crédito si no tiene el crédito bloqueado. No puede cerrar el pedido con crédito excedido. 

# sprint 8 UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3

Esquema del escenario: N°1 - El cliente es de contado
    Dado que el cliente tiene condición de pago contado
    Y el consumido para la fecha de entrega, el informado más los pedidos de contado ya registrados, es '<condicion>' al monto de venta contado-máxima
    Cuando ingreso a registrar un pedido
    Entonces el sistema mostrará '<estadoPanelIngresoProducto>'
    Y el switch Credito en estado off Disabled

Ejemplos:
|condicion    |estadoPanelIngresoProducto     |
|Menor o igual| Si                            |
|Mayor        | No                            |

Esquema del escenario: N°2 - El cliente es de crédito formal
    Dado que el cliente tiene condición de pago crédito formal y '<esCreditoBloqueado>'
    Cuando ingreso a registrar un pedido 
    Entonces el sistema mostrará '<estadoPanelIngresoProducto>'
    Y el switch en estado On Disabled 

Ejemplos:
|esCreditoBloqueado|estadoPanelIngresoProducto |
|     Si           | No                        |
|     No           | Si                        |

Esquema del escenario: N°3 - El cliente es de crédito informal sin crédito bloqueado
    Dado que el cliente tiene condición de pago crédito informal y esCreditoBloqueado = false
    Cuando '<estadoCredito>' es crédito Disponible mayor a cero
    Y '<estadoPedidoMaximo>' es Pedido máximo cumplido
    Cuando ingreso a registrar un pedido
    Entonces el sistema mostrará '<estadoPanelIngresoProducto>', '<estadoEncendidoSwitch>' y '<estadoHabilitacionSwitch>'

Ejemplos:
|estadoCredito|estadoPedidoMaximo|estadoPanelIngresoProducto|estadoEncendidoSwitch|estadoHabilitacionSwitch|
|     Si      |       No         |Si                        |On                   |enabled                 |
|     No      |       No         |Si                        |Off                  |disabled                | 
|     Si      |       Si         |Si                        |On                   |disabled                | 
|     No      |       Si         |No                        |On                   |disabled                |

Esquema del escenario: N°4 - El cliente es de crédito informal con crédito bloqueado
    Dado que el cliente tiene condición de pago creditoInformal y esCreditoBloqueado = true 
    Cuando '<estadoPedidoMaximo>' es Pedido máximo cumplido 
    Cuando ingreso a registrar un pedido
    Entonces el sistema '<estadoPanelIngresoProducto>', '<estadoEncendidoSwitch>' y '<estadoHabilitacionSwitch>'

Ejemplos:
| estadoPedidoMaximo | estadoPanelIngresoProducto|estadoEncendidoSwitch|estadoHabilitacionSwitch|
|         No         | Si                        |Off                   |disabled               |
|         Si         | No                        |On                    |disabled               | 