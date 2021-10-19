# language: es

@Pedido @Toma_pedido @Paso2 @Sprint13

Característica: Mostrar tarjeta de pedido
    Como prevendedor
    Quiero ver la tarjeta de toma del pedido 
    Para saber si puedo registrar pedido 

Escenario: N°1 - Mostrar tarjeta de pedido
    Dado que estamos en el paso 2 - toma de pedido
    Cuando se muestran las tarjetas 
    Entonces el sistema mostrará la tarjeta toma de pedido asociada al _tipoPedido cuyo _codigo = "Venta" cerrada con
    su título, subtitulo y cantidad de items igual a la cantidad de productos ingresados en el pedido
    Y mostrará el control para desplegar la tarjeta

# producto ingresado = producto que tenga en sus cantidades > 0

#pedido
Escenario: N°2 - El cliente es de contado y supera el monto de venta contado
    Dado que estamos en el paso 2 - toma de pedido
    Y el cliente tiene condición de pago contado
    Y el consumido para la fecha de entrega, los pedidos de contado ya registrados sin tener en cuenta el pedido en curso y sin los compromisos de pago realizados en la visita actual, es mayor al _montoVentaContadoMaxima
    Cuando se muestran las tarjetas
    Entonces el sistema mostrará en la tarjeta de toma de pedido cerrada el mensaje "Excede el monto de venta máxima montoVentaContadoMaxima" 
    Y no mostrará el control para desplegar la tarjeta

#pedido
Escenario: N°3 - El cliente es de crédito formal con credito bloqueado
    Dado que estamos en el paso 2 - toma de pedido
    Y el cliente tiene condicion de pago crédito formal
    Y _esCreditoBloqueado = true
    Cuando se muestran las tarjetas 
    Entonces el sistema mostrará en la tarjeta de toma de pedido cerrada el mensaje "Crédito bloqueado" 
    Y no mostrará el control para desplegar la tarjeta

#solos los pedidos registrados. No considerar el pedido en curso
Escenario: N°4 - El cliente es de crédito informal sin credito bloqueado y sin crédito disponbile
    Dado que estamos en el paso 2 - toma de pedido  
    Y el cliente tiene condición de pago crédito informal
    Y _esCreditoBloqueado = false
    Y el crédito disponible es igual a cero
    Y el Pedido máximo está cumplido, sin contar el pedido en curso y sin los compromisos de pago realizados en la visita actual
    Cuando se muestran las tarjetas 
    Entonces el sistema mostrará en la tarjeta de toma de pedido cerrada el mensaje "Sin crédito disponible y excede el monto de venta máxima montoVentaContadoMaxima" 
    Y no mostrará el control para desplegar la tarjeta

Escenario: N°5 - El cliente es de crédito informal con crédito bloqueado
    Dado que estamos en el paso 2 - toma de pedido   
    Y el cliente tiene condición de pago crédito informal
    Y _esCreditoBloqueado = true
    Y el Pedido máximo está cumplido, sin contar el pedido en curso y sin los compromisos de pago realizados en la visita actual
    Cuando se muestran las tarjetas 
    Entonces el sistema mostrará en la tarjeta de toma de pedido cerrada el mensaje "Pedido máximo cumplido y crédito bloqueado" 
    Y no mostrará el control para desplegar la tarjeta
