# language: es
@Pedido @Partidas_abiertas @Sprint29

Característica: Mostrar Partidas generadas
    Como prevendedor 
    Quiero ver si tengo partidas generadas
    Para gestionar los cobros

Escenario: N°1 - Mostrar tarjeta partidas generadas
    Dado que se ingresó un cliente
    Y tiene partidas generadas
    Y el cliente no habilita el compromiso de cobro
    Cuando se muestra la tarjeta de partidas 
    Entonces el sistema mostrará el título "partidas generadas del cliente"
    Y el texto de apoyo "visualiza todas las partidas que tiene tu cliente"

Escenario: N°2 - El cliente no tiene partidas generadas
    Dado que se ingresó un cliente
    Y no tiene partidas generadas
    Cuando el cliente no habilita el compromiso de cobro
    Entonces el sistema mostrará en la tarjeta partidas generadas el texto en rojo "No existen partidas para este cliente"