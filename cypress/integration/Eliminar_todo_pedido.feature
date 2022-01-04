# language: es

@Pedido @Eliminar_todo @Sprint13 @Sprint19

Característica: Eliminar todo del pedido
    Como prevendedor 
    Quiero borrar todos los artículos ingresados en el pedido
    Para descartar el pedido

Escenario: N°1 - El cliente tiene otro pedido para la misma fecha de entrega
    Dado que el cliente tiene otro pedido registrado para la misma fecha de entrega que el pedido en curso
    Cuando se selecciona borrar todo
    Entonces el sistema mostrará el mensaje informando que todos los productos se borrarán

Escenario: N°2 - El cliente no tiene otro pedido para la misma fecha de entrega y tiene canje ingresado y tiene bonificaciones y _bonificacionesConVenta=true
    Dado que estoy en un pedido que _esMandatorio = true
    Y el cliente no tiene otro pedido para la misma fecha de entrega que el pedido en curso
    Y existen productos cargados en otros pedidos que _esMandatorio = false
    Y que no forman parte de _tipoPedidoEnvasesHabilitados
    Y existe _bonificacionesConVenta_ = true
	Y se registraron bonificaciones
    Cuando selecciono borrar todo
    Entonces el sistema mostrará el mensaje de que también se borrará el canje y se restablecerán las bonificaciones a cero  
    Y al confirmar se borrán los productos del _tipoPedido = "Venta"
    Y se borrará el canje ingresado 
    Y se reestablecerán las bonificaciones a cero.


Esquema del escenario: N°3 - El cliente no tiene otro pedido para la misma fecha de entrega y hay canje y bonificaciones con venta = false
    Dado que el cliente no tiene otro pedido para la misma fecha de entrega
    Y el cliente tiene _tipoPedido = "Canje" ingresado 
    Y que no forman parte de _tipoPedidoEnvasesHabilitados
    Y <condicion>
    Cuando se selecciona borrar todo
    Entonces el sistema mostrará el mensaje de que también se borrará el canje 
    Y al confirmar borrará los productos del _tipoPedido = "Venta"
    Y borrará el canje ingresado

Ejemplos:
    |     condicion                                                      | 
    | _bonificacionesConVenta = false                                    |
    | _bonificacionesConVenta = true y no hay bonificaciones ingresadas  |


Escenario: N°4 - El cliente no tiene otro pedido para la misma fecha de entrega y no hay canje y si hay bonificaciones ingresadas y _bonificacionesConVenta=true
    Dado que el cliente no tiene otro pedido para la misma fecha de entrega
    Y el cliente no tiene _tipoPedido = "Canje" ingresado 
    Y por configuración _bonificacionesConVenta = true
    Y el cliente tiene bonificaciones ingresadas
    Cuando se selecciona borrar todo
    Entonces el sistema mostrará el mensaje de que también se restablecerán las bonificaciones a cero 
    Y al confirmar, se borrarán los productos del _tipoPedido = "Venta"
    Y se restablecerán las bonificaciones a cero