# language: es

@Pedido @PromocionesOngoing @Sprint21

Característica: Mostrar promociones ongoing
    Como prevendedor
    Quiero visualizar las promociones ongoing automáticas y manuales según el pedido en curso 
    Para gestionarle al cliente las promociones

Antecedentes: 
    Dado que se seleccionó el control de promociones ongoing

Escenario: N°1 - Mostrar las promociones ongoing
    Cuando se muestra la pantalla de promociones
    Entonces el sistema mostrará la sección de condición de pago crédito con la lista de promociones a crédito
    Y mostrará la sección de condición de pago contado con la lista de promociones a contado
    Y mostrará la sección de promociones que no cubren el requisito

Escenario: N°2 - Calcular y aplicar promociones automáticas cuando se modifica el pedido
    Dado que se modificaron productos que no son promo push en el pedido
    Y se reiniciaron las promociones para la condición de pago afectada
    Cuando se calculan las promociones para las condiciones de pago
    Y se aplican las promociones automáticas que cumplen con el requisito
    Entonces el sistema agrupará por condición de pago que corresponda
    las promociones automáticas aplicadas ordenadas por _promocionID
    Y agrupará las promociones que no cumplen con el requisito ordenadas por _promocionID

#Modificar un producto que no es promo push: agregar, borrar, modificar cantidades o condición de pago 

Escenario: N°3 - El pedido no se modifica
    Dado se calcularon anteriormente las promociones 
    Y no se modificaron productos que no son promo push en el pedido
    Cuando se muestra la pantalla de promociones
    Entonces el sistema mostrará en cada sección las promociones calculadas anteriormente

#Modificar un producto que no es promo push: agregar, borrar, modificar cantidades o condición de pago 
