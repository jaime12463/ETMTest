# language: es

@Pedido @Resumen_pedido @Sprint13

Característica: Mostrar resumen del pedido 
    Como prevendedor 
    Quiero ver el resumen del pedido 
    Para informarle al cliente

Escenario: N°1 - Mostrar resumen
    Dado que estoy en un cliente 
    Cuando selecciono ver resumen del pedido
    Entonces el sistema mostrará la fecha de entrega del pedido
    Y mostrará un listado de los productos ingresados separados por _tipoPedido
    Y por condición de pago, indicando código de producto,
    presentación, cantidad, precio unitario y subtotal de las subunidades 
    Y cantidad, precio unitario, descuento y subtotal de las unidades de cada producto
    Y mostrará la suma de los subtotales como subtotal del pedido para la condición de pago correspondiente
    Y mostrará los compromisos de cobro realizados
    Y mostrará al pié del resumen los totales por condicion de pago, total de descuentos y el total de cargos financieros
