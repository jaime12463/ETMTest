@Pedido @Pedidos_realizados @Cancelar_pedido @Sprint5

#Comentarios:
#Solo se puede cancelar el pedido si el mismo tiene estado activo.
#Si el pedido a cancelar tiene monto inferior a monto de venta mínima se puede cancelar
#Si el pedido a cancelar tiene monto superior o igual a monto de venta mínima y…
#•	Si hay otro pedido activo, con la misma fecha de entrega, que cumpla con el monto mínimo, se cancela el pedido.
#•	Si no hay otro pedido activo, con la misma fecha de entrega, que cumpla con el monto mínimo, se cancela el pedido y todos los otros pedidos con la misma fecha de entrega.
#Modifica el estado del pedido a: Cancelado.

#Dependencias:
#Ver acciones del pedido

#Cuando se cancela un pedido se cambia el estado a Cancelado.
Característica: Cancelar pedido
	Como prevendedor
	Quiero cancelar un pedido realizado
	Para cumplir con la necesidad del cliente

Antecedentes:
	Dado que se ingresó a pedidos realizados
	Y se seleccionó un pedido

Escenario: N°1 – El prevendedor puede cancelar un pedido activo si el monto del pedido es inferior al monto mínimo
	Dado que el pedido tiene estado Activo 
	Y el <montoDelPedido> es menor a <montoVentaMinimo> 
	Cuando selecciono cancelar el pedido
	Entonces el sistema pedirá confirmación al usuario para cancelar el pedido 
	Y si el usuario confirma mostrará el pedido con estado cancelado en la lista de pedidos del cliente 
#Mensaje: Desea cancelar el pedido? Si / No

Ejemplos:
|montoVentaMinimo|montoDelPedido|
|    1000        |   800        |
|    1000        |   999        |    

Escenario: N°2 – El prevendedor puede cancelar un pedido activo si el pedido cumple con el monto mínimo
	Dado que el <montoDelPedido> a cancelar es mayor o igual que <montoVentaMinimo> 
	Y el cliente tiene otro pedido en estado Activo para la misma fecha de entrega cuyo monto es mayor o igual al <montoVentaMinimo>  
	Cuando selecciono cancelar el pedido
	Entonces el sistema pedirá confirmación al usuario para cancelar el pedido 
	Y si el usuario confirma mostrará el pedido con estado cancelado en la lista de pedidos del cliente 
#Mensaje: Desea cancelar el pedido? Si / No

#Ejemplo de pedidos
#Monto	 Fecha de entrega	Estado
#1100	 29/06/2021	        Activo
#900	 29/06/2021	        Activo
#1000	 29/06/2021	        Activo

Ejemplos:
|montoVentaMinimo|montoDelPedido|
| 1000           |		1100	| 

Escenario: N°3 – El prevendedor puede cancelar todos los pedidos activos para la misma fecha de entrega si el pedido seleccionado es el único para esa fecha de entrega que cumple con el monto mínimo
	Dado que el <montoDelPedido> a cancelar es mayor o igual que montoVentaMinimo> 
	Y el cliente no tiene otro pedido con estado Activo para la misma fecha de entrega cuyo monto es mayor o igual al <montoVentaMinimo>  
	Cuando selecciono cancelar el pedido
	Entonces el sistema pedirá confirmación al usuario para cancelar el pedido 
	Y si el usuario confirma mostrará todos los pedidos con misma fecha de entrega con estado cancelado en la lista de pedidos del cliente 
#Mensaje: Se cancelarán todos los pedidos con fecha de entrega <Fecha de entrega> Desea continuar? Si / No

#Ejemplo de pedidos
#Monto	 Fecha de Entrega	Estado
#1100	 29/06/2021	        Activo
#900	 29/06/2021	        Activo
#1000	 29/06/2021	        Cancelado

|montoVentaMinimo|montoDelPedido|
| 1000           |		1100	| 