# language: es

@Pedido @sprint8

# Credito disponible
# Condición de pago:
# {contado}
# {crédito formal} Puede cerrar el pedido con crédito excedido 
# {crédito informal} No puede cerrar el pedido con crédito excedido. Tiene habilitada venta de contado


# sprint 8 UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3

Característica: Mostrar pantalla ingreso del pedido
    Como prevendedor
    Quiero ver la pantalla del pedido 
    Para saber qué tipo de pedido puedo registrar al cliente 


Esquema del escenario: N°1 - El cliente es de contado 
    Dado que el cliente tiene condición de pago contado 
    Y el consumido para la fecha de entrega (consumido informado más pedidos de contado ya registrados) es <condicion> al monto de venta contado máxima
    Cuando ingreso a registrar un pedido 
    Entonces El sistema <mostraraControles> 

Ejemplos:
|condicion    |mostraraControles|
|Menor o igual|	mostrará habilitado el panel de ingreso de producto y el switch Credito en estado off Disabled|
|Mayor        |	mostrará deshabilitado el panel de ingreso de producto y el switch Credito en estado off Disabled|

Escenario: N°2 - El cliente es de crédito formal
    Dado que el cliente tiene condición de pago crédito formal 
    Cuando ingreso a registrar un pedido 
    Entonces el sistema mostrará habilitado el panel de ingreso de producto
    Y el switch Credito en estado on Disabled

Esquema del escenario: N°3 - El cliente es de crédito informal
    Dado que el cliente tiene condición de pago contado 
    Cuando <estadoCredito> es crédito Disponible mayor a cero 
    Y <estadoPedidoMaximo> es Pedido máximo cumplido 
    Cuando ingreso a registrar un pedido 
    Entonces el sistema <mostraraControles>

Ejemplos:
|estadoCredito|estadoPedidoMaximo|mostraraControles                                              |
|     Si	  | 	  No	     | habilitará panel de ingreso y switch en estado On enebled     |
|     No	  |	      No	     | habilitará panel de ingreso y switch en estado Off disabled   |
|     Si	  |	      Si	     | habilitará panel de ingreso y switch en estado On disabled    |
|     No      |		  Si         | No habilitará panel de ingreso y switch en estado On disabled |
