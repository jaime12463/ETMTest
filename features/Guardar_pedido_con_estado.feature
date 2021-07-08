@Pedido @Validar_cierre_pedido @Validar_pedido_minimo @Sprint5

Característica: Guardar pedido en estado activo
	Como vendedor
	Quiero que el pedido se guarde en estado activo 
	Para saber qué pedidos serán entregados al cliente

# A REVISAR TODOS LOS ESCENARIOS CON EL EQUIPO

Antecedentes:
	Dado un pedido ingresado 

Esquema del escenario: N°1 – El cliente no tiene pedidos activos para la fecha de entrega 
	Dado que el cliente no tiene pedidos en estado Activo para la misma fecha de entrega del pedido a guardar
	Y el <montoDelPedido> a guardar es mayor o igual <montoVentaMinimo> 
	Y menor o igual a <montoVentaMaximo>
	Cuando guardo el pedido
	Entonces el sistema <realizaraAccion> 
	
#Dados los siguientes pedidos ingresados al cliente:
#Montos del pedido	 Fecha de entrega	Estado
#   999	                 30/06/2021	    Cancelado
#   1000	             30/06/2021	    Cancelado

Ejemplos:
| montoVentaMinimo|montoVentaMaximo|montoDelPedido|realizaraAccion                                                                                                      |
|    1000         |  2000          | 999		  | Mostrará mensaje “El pedido no alcanza el monto de venta mínima < montoVentaMinimo >” y permanecerá en la pantalla  |
|    1000         |  2000          | 1000		  | guardará el pedido y lo mostrará en la lista de pedidos del cliente                                                 |
|    1000         |  2000          | 1500		  | guardará el pedido y lo mostrará en la lista de pedidos del cliente                                                 |
|    1000         |  2000          | 2000 		  | guardará el pedido y lo mostrará en la lista de pedidos del cliente                                                 |
|    1000         |  2000          | 2001    	  | Mostrará mensaje “El pedido excede el monto de venta máxima < montoVentaMinimo >” y permanecerá en la pantalla      |

Esquema del escenario: N°2 – El cliente tiene al menos otro pedido activo que cumple con la venta mínima para la fecha de entrega y la suma de los pedidos no excede la venta máxima 
	Dado que el cliente tiene al menos otro pedido en estado Activo para la misma fecha de entrega cuyo monto es mayor a <montoVentaMinimo>
	Y la suma de los montos de los pedidos en estado Activo para la misma fecha de 	entrega, <montosDePedidos>, más el monto del pedido a guardar <montoPedido>, es menor a <montoVentaMaximo>
	Cuando guardo el pedido
	Entonces el sistema guardará el pedido y lo mostrará en la lista de pedidos del cliente

#Como ya tiene al menos un pedido activo para la fecha de entrega no hace falta validar pedido mínimo porque ya está cumplido
#Dados los siguientes otros pedidos del cliente con misma fecha de entrega del pedido a guardar
#Montos del pedido	Fecha de entrega	Estado
#    1200	           30/06/2021	    Activo
#    1600	           30/06/2021	    Cancelado

Ejemplos:
| montoVentaMinimo|montoVentaMaximo|montosDePedidos|montoPedido|
|    1000         |    2000        |    1200       | 200       |
|    1000         |    2000        |    1200       | 800       |
|    1000         |    2000        |    1200       | 801       |

Esquema del escenario: N°2 – El cliente no tiene otros pedidos activos que cumplan con la venta mínima para la fecha de entrega y la suma de los pedidos no excede la venta máxima 
	Dado que el cliente no tiene otros pedido en estado Activo para la misma fecha de entrega del pedido a guardar, que cumpla con la venta mínima
	Y <montoPedido> sea menor a <montoVentaMinimo>
	Y la suma de los montos de los pedidos en estado Activo para la misma fecha de entrega, <montosDePedidos>, más el monto del pedido a guardar <montoPedido>, es mayor a <montoVentaMaximo>
	Cuando guardo el pedido
	Entonces el sistema guardará el pedido 
	Y lo mostrará en la lista de pedidos del cliente

#Este sería el caso en que estoy editando el pedido que se creó cumpliendo la venta mínima
#Dados los siguientes otros pedidos del cliente con misma fecha de entrega del pedido a guardar
#Montos del pedido	Fecha de entrega	Estado
#   800	               30/06/2021	    Activo
#   1600	           30/06/2021	    Cancelado

Ejemplos:
| montoVentaMinimo|montoVentaMaximo|montosDePedidos|montoPedido|
|    1000         |    2000        |     800       | 999	   |
|    1000         |    2000        |     800       | 1000      |
|    1000         |    2000        |     800       | 1200      |
|    1000         |    2000        |     800       | 1201      |

Esquema del escenario: N°3 – El cliente tiene otros pedidos activos para la fecha de entrega y la suma de los pedidos excede la venta máxima 
	Dado que el cliente tiene al menos otro pedido en estado Activo para la misma fecha de entrega del pedido a guardar
	Y la suma de los montos de los otros pedidos en estado Activo para la misma fecha de entrega, <montosDePedidos>, más el monto del pedido a guardar <montoPedido>, es mayor o igual a <montoVentaMaximo>
	Cuando guardo el pedido
	Entonces el sistema mostrará el mensaje 
	Y permanecerá en la pantalla
	
#Mensaje: “El pedido excede el monto de venta máxima < montoVentaMaximo >”.

#Como ya tiene al menos otro pedido activo para la fecha de entrega no hace falta validar pedido mínimo porque ya está cumplido
#Dados los siguientes pedidos:
#Monto venta máximo	Montos de pedidos	Fecha de entrega	Estado
#   2000	             1200	           30/06/2021	    Activo
#   2000	             1600	           30/06/2021	    Cancelado

Ejemplos:
|montoVentaMaximo|montosDePedidos|montoPedido|
|    2000        |    801        | 1200      |
|    2000        |    1000       | 1001      |