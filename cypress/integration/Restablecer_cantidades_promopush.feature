# language: es

@Pedido @Restablecer_promopush

Característica: Restablecer cantidades a cero promo push
    Como prevendedor
    Quiero restablecer las promo push a cero y conocer sus dependencias 
    Para saber como queda la visita


Escenario: N°1 - Restablecer cantidades a cero teniendo otros pedidos para la misma fecha de entrega
    Dado que existen otros pedidos para la misma fecha de entrega de la visita actualizará
    Y existen productos en el pedido de la visita actual
    Cuando se selecciona restablecer cantidades a cero
    Entonces el sistema mostrará el mensaje informando que las promopush se restablecerán a cero
    Y si confirma, se volverán a cero las cantidades de las promopush ingresadas
    Y se eliminarán del pedido los productos de promo push ingresados.

Escenario: N°2 - El pedido en curso solo tiene promo push y el cliente no tiene otro pedido para la misma fecha de entrega y hay canje y bonificaciones
    Dado que el cliente no tiene otro pedido para la misma fecha de entrega
    Y los únicos productos del pedido en curso son de promo push
    Y el cliente tiene _tipoPedido = "Canje" ingresado
    Y por configuración _bonificacionesConVenta = true 
    Y el cliente tiene bonificaciones ingresadas
    Cuando se selecciona restablecer cantidades a cero
    Entonces el sistema mostrará el mensaje de que también se borrará el canje y que se restablecerán las bonificaciones a cero 
    Y al confirmar se restablecen a cero las promociones
    Y se borrarán los productos promo push del _tipoPedido = "Venta"
    Y se borrará el canje ingresado 
    Y se reestablecerán las bonificaciones a cero.


Esquema del escenario: N°3 - El pedido en curso solo tiene promo push y el cliente no tiene otro pedido para la misma fecha de entrega y hay canje y bonificaciones con venta = false
    Dado que el cliente no tiene otro pedido para la misma fecha de entrega
    Y los únicos productos del pedido en curso son de promo push
    Y el cliente tiene _tipoPedido = "Canje" ingresado 
    Y <condicion>
    Cuando se selecciona restablecer cantidades a cero
    Entonces el sistema mostrará el mensaje de que también se borrará el canje 
    Y al confirmar restablecerá las promo push a cero 
    Y borrará el canje ingresado
    Y se borrarán los productos promo push del _tipoPedido = "Venta"

Ejemplos:
    |     condicion                                                      | 
    | _bonificacionesConVenta = false                                    |
    | _bonificacionesConVenta = true y no hay bonificaciones ingresadas  |


Escenario: N°4 - El pedido en curso solo tiene promo push y el cliente no tiene otro pedido para la misma fecha de entrega y no hay canje y si hay bonificaciones ingresadas y _bonificacionesConVenta=true
    Dado que el cliente no tiene otro pedido para la misma fecha de entrega
    Y los únicos productos del pedido en curso son de promo push
    Y el cliente no tiene _tipoPedido = "Canje" ingresado 
    Y por configuración _bonificacionesConVenta = true
    Y el cliente tiene bonificaciones ingresadas
    Cuando se selecciona restablecer cantidades a cero
    Entonces el sistema mostrará el mensaje de que también se restablecerán las bonificaciones a cero 
    Y al confirmar, se restablecerán las promo push a cero  
    Y se restablecerán las bonificaciones a cero
    Y se borrarán los productos promo push del _tipoPedido = "Venta"
