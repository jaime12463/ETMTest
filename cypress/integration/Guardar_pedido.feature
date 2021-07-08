# language: es

@Pedido @Guardar_pedido @Sprint7

# Agregar botón para guardar el pedido. Los pedidos deben registrarse con un id.
# Registrar en cabecera: número de pedido, código de cliente, fecha de entrega, 
# fecha y hora de registro, tipo de operación, total unidades, total subunidades, 
# monto total del pedido, código de usuario, estado
# Registrar detalle: código de producto, unidades, subunidades, 
# precio unitario de unidad, precio unitario de subunidad, 
# monto subtotal de la línea de producto 
#codigo de usuario: “SFA01”
#estado: Activo (Default), Cancelado

# UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA_S4?node-id=86%3A3&scaling=scale-down&page-id=86%3A2

Característica: guardar pedido
    Como prevendedor
    Quiero guardar el pedido realizado
    Para luego informar a central la venta realizada

Antecedentes:
	Dado un pedido ingresado 
Esquema del escenario: N°1 – El cliente no tiene pedidos activos para la fecha de entrega 
	Dado que el cliente no tiene pedidos en estado Activo para la misma fecha de entrega del pedido a guardar
	Y el <montoDelPedido> a guardar es mayor o igual <montoVentaMinimo> 
	Y menor o igual a <montoVentaMaximo>
	Cuando guardo el pedido
	Entonces el sistema guardará el pedido y lo mostrará en la lista de pedidos del cliente
	
#Dados los siguientes pedidos ingresados al cliente:
#Montos del pedido	 Fecha de entrega	Estado
#   999	                 30/06/2021	    Cancelado
#   1000	             30/06/2021	    Cancelado

Ejemplos:
| montoVentaMinimo|montoVentaMaximo|montoDelPedido                                                                                                  
|    1000         |  2000          | 1000		  | 
|    1000         |  2000          | 1500		  | 
|    1000         |  2000          | 2000 		  | 

Esquema del escenario: N°2 – El pedido no cumple con el pedido mínimo 
	Dado que el cliente no tiene pedidos en estado Activo para la misma fecha de entrega del pedido a guardar
	Y el <montoDelPedido> a guardar es menor al <montoVentaMinimo> 
	Cuando guardo el pedido
	Entonces el sistema Mostrará mensaje “El pedido no alcanza el monto de venta mínima < montoVentaMinimo >” y permanecerá en la pantalla  
	
#Dados los siguientes pedidos ingresados al cliente:
#Montos del pedido	 Fecha de entrega	Estado
#   999	             30/06/2021	    Cancelado
#   1000	             30/06/2021	    Cancelado

Ejemplos:
| montoVentaMinimo|montoDelPedido|
|    1000         |   999        | 



Esquema del escenario: N°3 – El pedido no cumple con el pedido máximo 
	Dado que la suma de los montos de los otros pedidos en estado Activo para la misma fecha de entrega, <montosDePedidos>, más el monto del pedido a guardar <montoPedido>, es mayor a <montoVentaMaximo>
	Cuando guardo el pedido
	Entonces el sistema Mostrará mensaje “El pedido excede el monto de venta máxima <montoVentaMaximo>” y permanecerá en la pantalla  
	
#Dados los siguientes otros pedidos del cliente con misma fecha de entrega del pedido a guardar
#Montos del pedido	Fecha de entrega	Estado
#    1200	           30/06/2021	    	Activo
#    1600	           30/06/2021	    	Cancelado

Ejemplos:
| montoVentaMaximo|montosDePedidos|montoPedido|
|     2000        |    1200       | 801       |

Esquema del escenario: N°4 – El pedido a guardar no necesita cumplir el pedido mínimo ya que hay otro activo que sí lo cumple y no supera el monto máximo
	Dado que el cliente tiene al menos otro pedido en estado Activo para la misma fecha de entrega cuyo monto es mayor a <montoVentaMinimo>
	Y la suma de los montos de los pedidos en estado Activo para la misma fecha de 	entrega, <montosDePedidos>, más el monto del pedido a guardar <montoPedido>, es menor o igual a <montoVentaMaximo>
	Cuando guardo el pedido
	Entonces el sistema guardará el pedido y lo mostrará en la lista de pedidos del cliente

#Dados los siguientes otros pedidos del cliente con misma fecha de entrega del pedido a guardar
#Montos del pedido	Fecha de entrega	Estado
#    1200	           30/06/2021	    Activo
#    1600	           30/06/2021	    Cancelado

Ejemplos:
| montoVentaMinimo|montoVentaMaximo|montosDePedidos|montoPedido|
|    1000         |    2000        |    1200       | 200       |
|    1000         |    2000        |    1200       | 800       |
