# language: es

@Pedido @PromocionesOngoing @Sprint21 @Sprint22

Característica: Mostrar promociones ongoing
    Como prevendedor
    Quiero visualizar las promociones ongoing automáticas y manuales según el pedido en curso 
    Para gestionarle al cliente las promociones

Antecedentes: 
    Dado que se seleccionó el control de promociones ongoing

Escenario: N°1 - Mostrar las promociones ongoing
    Cuando se muestra la pantalla de promociones
    Entonces el sistema mostrará la sección de condición de pago crédito con la lista de promociones que cumplen requisito a crédito
    Y mostrará la sección de condición de pago contado con la lista de promociones que cumplen requisito a contado
    Y mostrará la sección de promociones que no cubren el requisito
    Y mostrará el control para restabelcer promociones para cada sección de condición de pago

Escenario: N°2 - Calcular promociones y aplicar promociones automáticas cuando se modifica el pedido
    Dado que se modificaron productos que no son promo push en el pedido
    Y se reiniciaron las promociones para la condición de pago afectada
    Cuando se calculan las promociones para las condiciones de pago
    Y se aplican las promociones automáticas que cumplen con el requisito
    Entonces el sistema agrupará, por la condición de pago que corresponda, a las promociones automáticas aplicadas ordenadas por _promocionID
    Y las mostrará con el tag promoción automática, con el borde de tarjeta en verde y el icono verde
    Y el control para ver el detalle de la promoción
    Y agrupará las promociones que no cumplen con el requisito, ordenadas por _promocionID

#Modificar un producto que no es promo push: agregar, borrar, modificar cantidades o condición de pago 

Escenario: N°3 - El pedido no se modifica
    Dado que se calcularon anteriormente las promociones 
    Y no se modificaron productos que no son promo push en el pedido
    Cuando se muestra la pantalla de promociones
    Entonces el sistema mostrará en cada sección las promociones ya calculadas anteriormente

#Modificar un producto que no es promo push: agregar, borrar, modificar cantidades o condición de pago 

Escenario: N°4 - Mostrar promociones manuales en las secciones correspondientes
    Dado que se calcularon promociones manuales para el cliente que cumplen requisito
    Cuando se muestran las promociones manuales en las secciones correspondientes a la condición de pago
    Entonces el sistema mostrará luego de las promociones automáticas aplicadas el _promocionID, _descripcion de las promociones manuales
    Y el control para ver detalle de la promoción
    Y mostrará las promociones ordenadas por _promocionID
    Y mostrará las promociones manuales aplicadas con el borde de tarjeta en verde y el icono verde y el control ver detalle
    Y mostrará las promociones manuales que cumplen requisito pero no se pueden aplicar, sin el control ver detalle

Escenario: N°5 - Mostrar promociones que no cumplen requisito
    Dado que se calcularon promociones que no cumplen con el requisito
    Cuando se muestran las promociones que no cumplen requisito
    Entonces el sistema mostrará el _promocionID, _descripcion de las promociones que no cumplen requisito
    Y mostrará ordenado por _promocionID