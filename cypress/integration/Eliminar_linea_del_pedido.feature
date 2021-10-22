# language: es

@Pedido @Eliminar_producto @Sprint3 @Sprint10 @Sprint12 @Sprint13

# Sprint12: se modifica mensaje de eliminar pedido no mandatorio.

# UX: https://www.figma.com/proto/4sKBs7Q0Ap07bdHIXsuukt/SFA?node-id=436%3A2150&scaling=scale-down&page-id=436%3A1256

Característica: Eliminar línea del pedido
	Como prevendedor
	Quiero eliminar un producto del pedido
	Para cumplir con las necesidades del cliente

Escenario: N°1 – Eliminar producto del tipo de pedido no mandatorio ingresando cantidades
	Dado que se seleccionó un producto de un pedido cuyo tipo de pedido _esMandatorio = false
	Cuando se ingresa cantidad 0 en unidades 
	Y se ingresa cantidad 0 en subunidades
	Entonces el sistema eliminará el producto seleccionado del pedido.

Escenario: N°2 – Eliminar producto del tipo de pedido no mandatorio seleccionando eliminar
	Dado que estoy en un pedido cuyo tipo de pedido _esMandatorio = false
	Y tiene productos ingresados
	Cuando se selecciono borrar en la tarjeta del producto
	Entonces el sistema eliminará el producto y la tarjeta.

Escenario: N°3 – El cliente tiene tipos de pedidos mandatorios registrados para la fecha de entrega y quiere eliminar producto del tipo de pedido mandatorio en curso. El prevendedor puede registrar un pedido del tipo no mandatorio
	Dado que se seleccionó un producto de un pedido cuyo tipo de pedido _esMandatorio = true 
    Y hay al menos un pedido cuyo tipo de pedido _esMandatorio = true registrado para la fecha de entrega 
	Cuando se ingresa cantidad 0 en unidades 
	Y se ingresa cantidad 0 en subunidades
	Entonces el sistema eliminará el producto seleccionado del pedido.

Escenario: N°4 – El cliente tiene tipos de pedidos mandatorios registrados para la fecha de entrega y quiere eliminar producto del tipo de pedido mandatorio en curso. El prevendedor puede registrar un pedido del tipo no mandatorio
	Dado que estoy en un pedido cuyo tipo de pedido _esMandatorio = true 
    Y hay al menos un pedido cuyo tipo de pedido _esMandatorio = true registrado para la fecha de entrega 
	Cuando se selecciono borrar en la tarjeta del producto
	Entonces el sistema eliminará el producto y la tarjeta.

Esquema del escenario: N°5 – Eliminar producto del tipo de pedido mandatorio sin otro tipo de pedido mandatorio registrado
	Dado que se seleccionó un producto de un pedido cuyo tipo de producto _esMandatorio = true
	Y '<esUltimoProducto>'
	Y '<hayProductosIngresadosPedidosNoMandatorios>' y no son pedidos de _tipoPedidoEnvasesHabilitados
	Cuando se ingresa cantidad 0 en unidades 
	Y se ingresa cantidad 0 en subunidades
	Entonces el sistema '<realizaraAccion>'.

Ejemplos:
|esUltimoProducto|hayProductosIngresadosPedidosNoMandatorios| realizaraAccion                                                                      |
|     true		 |               true                       | Avisa que se borrarán los pedidos no obligatorios y pide confirmación de continuar   |
|     true       |               false				        | Borrará el producto                                                                  |
|     false      |                 -				        | Borrará el producto                                                                  |

# Mensaje: Se borrará el pedido de tipoPedido.descripcion. ¿Desea continuar?
# siendo tipoPedido.descripcion la descripcion del tipoPedido que tiene esMandatorio = false

# Si el usuario confirma, el sistema borra todos los productos de los pedidos no mandatorios en curso.

Esquema del escenario: N°6 – Eliminar producto del tipo de pedido mandatorio sin otro tipo de pedido mandatorio registrado
	Dado que estoy en un pedido cuyo tipo de producto _esMandatorio = true
	Y '<esUltimoProducto>'
	Y '<hayProductosIngresadosPedidosNoMandatorios>' y no son pedidos de _tipoPedidoEnvasesHabilitados
	Cuando se selecciono borrar en la tarjeta del producto
	Entonces el sistema '<realizaraAccion>'.

Ejemplos:
|esUltimoProducto|hayProductosIngresadosPedidosNoMandatorios| realizaraAccion                                                                      |
|     true		 |               true                       | Avisa que se eliminarán todos de los pedidos no obligatorios y pide confirmación de continuar   |
|     true       |               false				        | borrará el producto y la tarjeta                                                                |
|     false      |                 -				        | borrará el producto y la tarjeta                                                      |


Escenario: N°7 - Eliminar producto de promocion
	Dado que estoy en una promocion
	Cuando selecciono el icono de borrar dentro de la tarjeta del producto
	Entonces el sistema inicializará en 0 la cantidad ingresada del producto seleccionado.