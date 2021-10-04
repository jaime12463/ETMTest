# language: es

@Pedido @Toma_pedido @Paso2 @Sprint13

Característica: Mostrar tarjeta de pedido
    Como prevendedor
    Quiero ver la tarjeta de toma del pedido 
    Para saber si puedo registrar pedido 

Escenario: N°1 - Mostrar tarjeta de pedido
    Dado que estamos en el paso 2 - toma de pedido
    Cuando se muestran las tarjetas 
    Entonces el sistema mostrará la tarjeta del _tipoPedido cuyo _codigo = "Venta" cerrada con
    su título, subtitulo y cantidad de items, como la suma de tarjetas de productos que contenga la tarjeta
    Y mostrará el control para desplegar la tarjeta


#solo pedidos ya registrados
Escenario: N°2 - El cliente es de contado y supera el monto de venta contado
    Dado que existe la tarjeta del _tipoPedido cuyo _codigo = "Venta"
    Y el cliente tiene condición de pago contado
    Cuando selecciono desplegar la tarjeta
    Y el consumido para la fecha de entrega, los pedidos de contado ya registrados sin tener en cuenta el pedido en curso y sin los compromisos de pago realizados en la visita actual, es mayor al _montoVentaContadoMaxima
    Entonces el sistema mostrará el mensaje "Excede el monto de venta máxima montoVentaContadoMaxima" 
    Y no desplegará la tarjeta

#pedido
Escenario: N°3 - El cliente es de crédito formal con credito bloqueado
    Dado que existe la tarjeta del _tipoPedido cuyo _codigo = "Venta"     
    Y el cliente tiene condicion de pago crédito formal
    Y _esCreditoBloqueado = true
    Cuando selecciono desplegar la tarjeta
    Entonces el sistema mostrará el mensaje "Crédito bloqueado" 
    Y no desplegará la tarjeta

#solos los pedidos registrados. No considerar el pedido en curso
Escenario: N°4 - El cliente es de crédito informal sin credito bloqueado y sin crédito disponbile
    Dado que existe la tarjeta del _tipoPedido cuyo _codigo = "Venta"  
    Y el cliente tiene condición de pago crédito informal
    Y _esCreditoBloqueado = false
    Y el crédito disponible es igual a cero
    Y el Pedido máximo está cumplido, sin contar el pedido en curso y sin los compromisos de pago realizados en la visita actual
    Cuando selecciono desplegar la tarjeta
    Entonces el sistema mostrará el mensaje "Sin crédito disponible y excede el monto de venta máxima montoVentaContadoMaxima" 
    Y no desplegará la tarjeta

Escenario: N°5 - El cliente es de crédito informal con crédito bloqueado
    Dado que existe la tarjeta del _tipoPedido cuyo _codigo = "Venta"  
    Y el cliente tiene condición de pago crédito informal
    Y _esCreditoBloqueado = true
    Y el Pedido máximo está cumplido, sin contar el pedido en curso y sin los compromisos de pago realizados en la visita actual
    Cuando selecciono desplegar la tarjeta
    Entonces el sistema mostrará el mensaje "Pedido máximo cumplido y crédito bloqueado" 
    Y no desplegará la tarjeta
