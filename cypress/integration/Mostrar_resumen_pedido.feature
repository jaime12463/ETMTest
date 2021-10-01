# language: es

@Pedido @Resumen_pedido @Sprint13

Característica: Mostrar resumen del pedido 
    Como prevendedor 
    Quiero ver el resumen del pedido 
    Para informarle al cliente

Escenario: N°1 - Mostrar resumen
    Dado que estoy en un cliente 
    Y se ingresaron productos al pedido con diferentes condiciones de pago
    Cuando selecciono ver resumen del pedido
    Entonces el sistema mostrará la fecha de entrega del pedido
    Y mostrará un listado de los productos separados por condición de pago, indicando código de producto,
    presentación, cantidad, precio unitario y subtotal de cada producto
    Y mostrará la suma de los subtotales como subtotal del pedido para la condición de pago correspondiente
    
