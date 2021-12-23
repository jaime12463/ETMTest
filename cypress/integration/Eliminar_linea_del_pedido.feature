# language: es

@Pedido @Eliminar_producto @Sprint3 @Sprint10 @Sprint12 @Sprint13 @Sprint16 @Sprint17 @Sprint18 @Sprint19

# Sprint12: se modifica mensaje de eliminar pedido no mandatorio.

# UX: https://www.figma.com/proto/4sKBs7Q0Ap07bdHIXsuukt/SFA?node-id=436%3A2150&scaling=scale-down&page-id=436%3A1256

Característica: Eliminar línea del pedido
	Como prevendedor
	Quiero eliminar un producto del pedido
	Para cumplir con las necesidades del cliente

# se elimina borrar ingresando cantidad en 0
# Escenario: N°1 – Eliminar producto del tipo de pedido no mandatorio ingresando cantidades
#	Dado que se seleccionó un producto de un pedido cuyo tipo de pedido _esMandatorio = false
#	Cuando se ingresa cantidad 0 en unidades 
#	Y se ingresa cantidad 0 en subunidades
#	Entonces el sistema eliminará el producto seleccionado del pedido.

Escenario: N°1 - Eliminar producto del tipo de pedido no mandatorio seleccionando eliminar
	Dado que estoy en un pedido cuyo tipo de pedido _esMandatorio = false
	Y tiene productos ingresados
	Cuando se selecciono borrar en la tarjeta del producto
	Entonces el sistema eliminará el producto y la tarjeta.

# se elimina borrar ingresando cantidad en 0
# Escenario: N°3 – El cliente tiene tipos de pedidos mandatorios registrados para la fecha de entrega y quiere eliminar producto del tipo de pedido mandatorio en curso. El prevendedor puede registrar un pedido del tipo no mandatorio
#	Dado que se seleccionó un producto de un pedido cuyo tipo de pedido _esMandatorio = true 
#    Y hay al menos un pedido cuyo tipo de pedido _esMandatorio = true registrado para la fecha de entrega 
#	Cuando se ingresa cantidad 0 en unidades 
#	Y se ingresa cantidad 0 en subunidades
#	Entonces el sistema eliminará el producto seleccionado del pedido.

Escenario: N°2 - El cliente tiene tipos de pedidos mandatorios registrados para la fecha de entrega y quiere eliminar producto del tipo de pedido mandatorio en curso. El prevendedor puede registrar un pedido del tipo no mandatorio
	Dado que estoy en un pedido cuyo tipo de pedido _esMandatorio = true 
    Y hay al menos un pedido cuyo tipo de pedido _esMandatorio = true registrado para la fecha de entrega 
	Cuando se selecciono borrar en la tarjeta del producto
	Entonces el sistema eliminará el producto y la tarjeta.

# se elimina borrar ingresando cantidad en 0
# Esquema del escenario: N°5 – Eliminar producto del tipo de pedido mandatorio sin otro tipo de pedido mandatorio registrado
#	Dado que se seleccionó un producto de un pedido cuyo tipo de producto _esMandatorio = true
#	Y '<esUltimoProducto>'
#	Y '<hayProductosIngresadosPedidosNoMandatorios>' y no son pedidos de _tipoPedidoEnvasesHabilitados
#	Y <_bonificacionesConVenta_>
#	Y '<hayBonificacionesIngresadas>'
#	Cuando se ingresa cantidad 0 en unidades 
#	Y se ingresa cantidad 0 en subunidades
#	Entonces el sistema '<realizaraAccion>'.
#
# Ejemplos:
# |esUltimoProducto|hayProductosIngresadosPedidosNoMandatorios| _bonificacionesConVenta_  | hayBonificacionesIngresadas|realizaraAccion                                                                                                     |
# |     true		 |               true                       |              false        |             -              | Avisa que se borrarán los pedidos no obligatorios y pide confirmación de continuar y no borrará las bonificaciones |
# |     true       |               true                       |              true         |             true           | Avisa que se borrarán los pedidos no obligatorios y pide confirmación de continuar y borrará las bonificaciones    |
# |     true       |               false				        |              false        |              -             | Borrará el producto y no borrará las bonificaciones                                                                |
# |     true       |               false                      |              true         |             true           | Borrará el producto y borrará las bonificaciones                                                                   |
# |     false      |                 -				        |                -          |             -              | Borrará el producto                                                                                                |

# Mensaje: Se borrará el pedido de tipoPedido.descripcion. ¿Desea continuar?
# siendo tipoPedido.descripcion la descripcion del tipoPedido que tiene esMandatorio = false

# Si el usuario confirma, el sistema borra todos los productos de los pedidos no mandatorios en curso.

Esquema del escenario: N°3 - Eliminar producto del tipo de pedido mandatorio sin otro tipo de pedido mandatorio registrado
	Dado que estoy en un pedido cuyo tipo de producto _esMandatorio = true
	Y '<esUltimoProducto>'
	Y '<hayPedidoIngresadoMismaFechaEntrega>'
	Y '<hayProductosIngresadosPedidosNoMandatorios>' y no son pedidos de _tipoPedidoEnvasesHabilitados
	Y <_bonificacionesConVenta_>
	Y '<hayBonificacionesIngresadas>'
	Cuando se selecciono borrar en la tarjeta del producto
	Entonces el sistema '<realizaraAccion>'.

Ejemplos:
|esUltimoProducto|hayPedidoIngresadoMismaFechaEntrega|hayProductosIngresadosPedidosNoMandatorios| _bonificacionesConVenta_  | hayBonificacionesIngresadas|realizaraAccion                                                                                                     |
|     true		 |              false                |               true                       |              false        |             -              | Avisa que se borrará el canje y al confirmar se borra el producto y el canje ingresado                             |
|     true       |              false                |               true                       |              true         |             true           | Avisa que también se borrará el canje y se restablecerán las bonificaciones a cero  y al confirmar se borra el producto, el canje ingresado y se reestablecen las bonificaciones  a cero    |
|     true       |              false                |               false				        |              false        |              -             | Borrará el producto y no borrará las bonificaciones                                                                |
|     true       |              false                |               false                      |              true         |             true           | Avisa que también reestablecerán las bonificaciones a cero y al confirmar se borra el producto y se reestablecen las bonificaciones a cero                                                                   |
|     -          |              -                    |                 -				        |                -          |             -              | Borrará el producto                                                                                                |


Escenario: N°4 - Eliminar producto de promocion
	Dado que estoy en una promocion
	Cuando selecciono el icono de borrar dentro de la tarjeta del producto
	Entonces el sistema inicializará en 0 la cantidad ingresada del producto seleccionado.

Esquema del escenario: N°5 - Eliminar tarjeta con gesto
	Dado que ingresé en un pedido cuyo _tipoPedido = <tipoPedido>
	Cuando se desliza la tarjeta para la izquierda
	Entonces el sistema borrará el producto del pedido
	Y la tarjeta
	Y mostrará el aviso para deshacer el borrado

Ejemplos:
|tipoPedido|
|Venta     |
|Canje     |


#
#Escenario: N°9 - Opción deshacer
#	Dado que se eliminó un producto del pedido
#	Cuando selecciono deshacer
#	Entonces el sistema restaurará la tarjeta eliminada del pedido