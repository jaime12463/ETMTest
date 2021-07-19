# language: es

@Pedido @Guardar_pedido @Sprint7 @Sprint8

# Agregar botón para guardar el pedido. Los pedidos deben registrarse con un id.
# Registrar en cabecera: número de pedido, código de cliente, fecha de entrega, 
# fecha y hora de registro, tipo de operación, total unidades, total subunidades, 
# monto total del pedido, código de usuario, estado
# Registrar detalle: código de producto, unidades, subunidades, 
# precio unitario de unidad, precio unitario de subunidad, 
# monto subtotal de la línea de producto 
#codigo de usuario: “SFA01”
#estado: Activo (Default), Cancelado

# sprint 7 UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA_S4?node-id=86%3A3&scaling=scale-down&page-id=86%3A2

# el pedido máximo se evalúa solo sobre los de contado. 
# Cuando guarda el pedido tiene que generar una o dos cabeceras según la condición de pago de los productos ingresados

# Agregar botón para guardar el pedido. Los pedidos deben registrarse con un id.
# Registrar en cabecera por cada condición de pago que tenga productos registrados: número de pedido, código de cliente, fecha de entrega, fecha y hora de registro, tipo de operación, condición de pago, total unidades, total subunidades, 
# monto total del pedido, código de usuario, estado
# Registrar detalle: código de producto, unidades, subunidades, 
# precio unitario de unidad, precio unitario de subunidad, 
# monto subtotal de la línea de producto, condición de pago
# codigo de usuario: “SFA01”
# estado: Activo (Default), Cancelado
# condición de pago: Crédito, Contado
# tipo de operación: “Venta”

# sprint 8 UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3


Característica: Guardar pedido
    Como prevendedor
    Quiero guardar el pedido realizado
    Para luego informar a central la venta realizada

Antecedentes:
	Dado un pedido ingresado 

Esquema del escenario: N°1 – El cliente de contado o crédito formal no tiene pedidos activos para la fecha de entrega y el pedido cumple el mínimo y no excede el máximo
	Dado que el cliente no tiene pedidos en estado Activo para la misma fecha de entrega del pedido a guardar
	Y la suma de < montoDelPedido > a guardar es mayor o igual <montoVentaMinimo> 
	Y la suma de <montoProductoContado> es menor o igual a <montoVentaMaximo>
	Y la condición de crédito del cliente es distinta de crédito informal
	Cuando guardo el pedido
	Entonces el sistema guardará el pedido y lo mostrará en la lista de pedidos del cliente
	
Ejemplos:	
|montoDelPedido|montoVentaMinimo|montoProductoContado|montoVentaMaximo|
|         1000            |           900                   |                1000                   |               2000              |
|         1100            |           900                   |                0                          |               2000              |

Esquema del escenario: N°2 – El cliente de crédito informal no tiene pedidos activos para la fecha de entrega y no excede el límite de crédito y el pedido cumple el mínimo y no excede el máximo
	Dado que el cliente no tiene pedidos en estado Activo para la misma fecha de entrega del pedido a guardar
	Y la suma de < montoDelPedido > a guardar es mayor o igual <montoVentaMinimo> 
	Y la suma de <montoProductoContado> es menor o igual a <montoVentaMaximo>
	Y la condición de crédito del cliente es igual crédito informal 
	Y el <creditoDisponible> es mayor o igual a cero
	Cuando guardo el pedido
	Entonces el sistema guardará el pedido y lo mostrará en la lista de pedidos del cliente

Ejemplos:
|montoDelPedido|montoVentaMinimo|montoProductoContado|montoVentaMaximo|creditoDisponible|
|         1000            |           900                   |                1000       |               2000              |1000|
|         1100            |           900                   |                500        |               2000              | 0|
|         1000            |           900                   |                    0      |              2000              | 1|

#Se asume que el monto de los pedidos de crédito son iguales a motnoDelPedido – montoProductoContado. Para este ejemplo

Esquema del escenario: N°3 – El total del pedido no cumple con el pedido mínimo 
	Dado que el cliente no tiene pedidos en estado Activo para la misma fecha de entrega del pedido a guardar
	Y el <montoDelPedido> a guardar es menor al <montoVentaMinimo> 
	Cuando guardo el pedido
	Entonces el sistema Mostrará mensaje “El pedido no alcanza el monto de venta mínima < montoVentaMinimo >” y permanecerá en la pantalla  
	
Ejemplos:
| montoVentaMinimo|montoDelPedido|
|    1000         |   999        | 


Esquema del escenario: N°4 – El pedido de contado excede con el pedido máximo 
	Dado que la suma de los montos de los otros pedidos con condición de pago contado en estado Activo y misma fecha de entrega, <montosDePedidosContado>, más la suma de <montoProductoContado> es mayor a <montoVentaMaximo>
	Cuando guardo el pedido
	Entonces el sistema Mostrará mensaje “El pedido excede el monto de venta máxima <montoVentaMaximo>” y permanecerá en la pantalla  
	
# Dados los siguientes otros pedidos del cliente con misma fecha de entrega del pedido a guardar
# Montos del pedido	Fecha de entrega	Condición de pago 	Estado
#    1200	           30/06/2021	    	Contado		Activo
#    1200	           30/06/2021	    	Crédito			Activo
#    1600	           30/06/2021	    	Contado		Cancelado

Ejemplos:
| montoVentaMaximo|montosDePedidosContado| montoProductoContado |
|     2000        		|    1200       		     | 801      		          |

Esquema del escenario: N°5 – El pedido a guardar no necesita cumplir el pedido mínimo ya que hay otros pedidos para la fecha entrega, los productos de contado no superan el monto máximo y el cliente no es de crédito informal, por lo que no valida el crédito
	Dado que el cliente tiene otros pedidos activos para la fecha de entrega 
	Y la suma de los montos de los pedidos de contado en estado Activo y misma fecha de entrega, <montosDePedidosContado>, más la suma de <montoProductoContado> es menor o igual a <montoVentaMaximo> 
	Y el cliente no tiene condición de pago igual a crédito informal
	Cuando guardo el pedido
	Entonces el sistema guardará el pedido y volverá a la pantalla de cliente

#Dados los siguientes otros pedidos del cliente con misma fecha de entrega del pedido a guardar
#Montos del pedido	Fecha de entrega	Estado
#    1200	           30/06/2021	    Activo
#    1600	           30/06/2021	    Cancelado

Ejemplos:
| montosDePedidosContado |montoProductoContado|montoVentaMaximo| 
|         1000                                |                1000                   |               2000              |          


Esquema del escenario: N°6 – El pedido a guardar no necesita cumplir el pedido mínimo ya que hay otros pedidos activos, los productos de contado no superan el monto máximo y el cliente de crédito informal no supero el crédito disponible
	Dado que el cliente tiene otros pedidos activos para la fecha de entrega 
	Y la suma de los montos de los pedidos de contado en estado Activo y misma fecha de entrega, <montosDePedidosContado>, más la suma de <montoProductoContado> es menor o igual a <montoVentaMaximo> 
	Y el cliente tiene condición de pago crédito informal  
	Y el <creditoDisponible> es mayor o igual a cero
	Cuando guardo el pedido
	Entonces el sistema guardará el pedido y volverá a la pantalla de cliente

Ejemplos:
 |montosDePedidosContado|montoProductoContado|montoVentaMaximo|creditoDisponible
|         1000                               |                1000                   |               2000              |900|
|         1100                               |                500                     |               2000              | 600|
|         1000                               |                     0                     |               2000              | 0|
#Se asume que el monto de los pedidos de crédito son iguales a montoDelPedido – montoProductoContado. Para este ejemplo

Escenario: N°7 – El cliente es de crédito informal y el pedido a guardar a crédito excede el crédito disponible
	Dado que el cliente tiene condición de pago crédito informal 
	Y se ingresaron productos con condición de pago crédito
	Y el crédito disponible es menor a cero
	Cuando guardo el pedido
	Entonces el sistema Mostrará mensaje “El pedido excede el crédito disponible” y permanecerá en la pantalla  
