@Pedido @Validar_cierre_pedido @Validar_pedido_minimo @Sprint3

# Se agrega botón de Cierre de pedido. 
# Si el cliente tiene definido un pedido mínimo y el monto del pedido no cumple pedido 
# mínimo se muestra el mensaje: “No cumple pedido mínimo de $ < montoVentaMínima >” 
# y permanece en la pantalla.
# Caso contrario, blanquea la pantalla y deja el cursor para el ingreso de un nuevo cliente. 
# En esta etapa se valida individualmente por pedido ya que no se guardan los pedidos. 
# En futuras etapas se verá si se tienen en cuenta pedidos levantados 
# para la misma fecha de entrega.
# Nuevo dato del cliente: montoVentaMínima.

Característica: Validar pedido mínimo
	Como prevendedor
	Quiero que al cerrar el pedido el sistema me avise cuando no cumpla con el pedido mínimo del cliente
	Para avisar al cliente que su pedido no puede ser despachado

Antecedentes:
	Dado que se ingresó el pedido 
	Y el cliente tiene un monto mínimo definido <montoVentaMínima> 

@Test_dispositivo_1	
Esquema del escenario: N°1 – El pedido no cumple con el pedido mínimo
	Cuando cierro el pedido 
	Y el total del pedido es de valor <monto> menor que <montoVentaMínima> 
	Entonces el sistema mostrará el mensaje “El pedido no cumple con el monto mínimo de venta $<montoVentaMínima>” 
	Y permanece en la pantalla para que el usuario pueda ingresar más productos para cumplir con el pedido mínimo.

Ejemplos:
| monto | montoVentaMínima| 
|   99  |     100         | 
|    9  |      10         | 

Esquema del escenario: N°2 – Cumple con pedido mínimo
Cuando el total del pedido es de valor <monto> mayor o igual que <montoVentaMínima> 
Entonces el sistema confirmará el pedido
Y permitirá ingresar un nuevo pedido.

Ejemplos:
| monto | montoVentaMínima| 
| 100   |      100        | 
| 120   |       10        | 

Escenario: N°3 – Cliente sin monto de venta mínimo
Dado que el cliente no tiene configurado un monto de venta mínimo 
Cuando se cierra el pedido 
Entonces el sistema confirmará el pedido
Y permitirá ingresar un nuevo pedido.