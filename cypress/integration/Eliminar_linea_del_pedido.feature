# language: es

@Pedido @Eliminar_producto @Sprint3 @Sprint10

# UX: https://www.figma.com/proto/4sKBs7Q0Ap07bdHIXsuukt/SFA?node-id=436%3A2150&scaling=scale-down&page-id=436%3A1256

Característica: Eliminar línea del pedido
	Como prevendedor
	Quiero eliminar un producto del pedido
	Para cumplir con las necesidades del cliente

Escenario: N°1 – Eliminar producto del tipo de pedido no mandatorio
	Dado que se seleccionó un producto de un pedido cuyo tipo de pedido _esMandatorio = false
	Cuando se ingresa cantidad 0 en unidades 
	Y se ingresa cantidad 0 en subunidades
	Entonces el sistema eliminará el producto seleccionado del pedido.

Escenario: N°2 – El cliente tiene tipos de pedidos mandatorios registrados para la fecha de entrega y quiere eliminar producto del tipo de pedido mandatorio en curso. El prevendedor puede registrar un pedido del tipo no mandatorio
	Dado que se seleccionó un producto de un pedido cuyo tipo de pedido _esMandatorio = true 
    Y hay al menos un pedido cuyo tipo de pedido _esMandatorio = true registrado para la fecha de entrega 
	Cuando se ingresa cantidad 0 en unidades 
	Y se ingresa cantidad 0 en subunidades
	Entonces el sistema eliminará el producto seleccionado del pedido.

Escenario: N°3 – El cliente no tiene tipos de pedidos mandatorios para la fecha de entrega y quiere eliminar producto del tipo de pedido mandatorio en curso habiendo otro obligatorio en curso. No interesa si es el ultimo producto del pedido u otro.
	Dado que se seleccionó un producto de un pedido cuyo tipo de pedido _esMandatorio = true 
	Y hay productos ingresados en al menos un pedido en curso cuyo tipo de pedido _esMandatorio = true 
	Cuando se ingresa cantidad 0 en unidades 
	Y se ingresa cantidad 0 en subunidades
	Entonces el sistema eliminará el producto seleccionado del pedido.

Esquema del escenario: N°4 – Eliminar producto del tipo de pedido mandatorio sin otro tipo de pedido mandatorio registrado
	Dado que se seleccionó un producto de un pedido cuyo tipo de producto _esMandatorio = true
	Y '<esUltimoProducto>'
	Y '<hayProductosIngresadosPedidosNoMandatorios>'
	Cuando se ingresa cantidad 0 en unidades 
	Y se ingresa cantidad 0 en subunidades
	Entonces el sistema '<realizaraAccion>'.

Ejemplos:
|esUltimoProducto|hayProductosIngresadosPedidosNoMandatorios| realizaraAccion                                                                      |
|     true		 |               true                       | Avisa que se borrarán los pedidos no obligatorios y pide confirmación de continuar   |
|     true       |               false				        | Borrará el producto                                                                  |
|     false      |                 -				        | Borrará el producto                                                                  |

#Si el usuario confirma, el sistema borra el producto todos los productos de los tipos de en curso.
