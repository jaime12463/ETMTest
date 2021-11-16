# language: es

@Pedido @Coberturas @Paso1 @Sprint16

Característica: Mostrar tarjeta de coberturas
    Como prevendedor
    Quiero ver la tarjeta de coberturas
    Para ingresar productos al pedido de venta

Escenario: N°1 - Mostrar tarjeta coberturas
    Dado que se ingresó un cliente que tiene coberturas asignadas
    Cuando estamos en el paso 1 - planeación 
    Entonces el sistema mostrará la tarjeta de coberturas con su título
    Y el control para desplegar la tarjeta.

Escenario: N°2 - Mostrar aviso en tarjeta de coberturas
    Dado que se ingresó un cliente que no tiene coberturas asignadas
    Cuando estamos en el paso 1 - planeación
    Entonces el sistema mostrará la tarjeta de coberturas con su título
    Y no mostrará el control para desplegar la tarjeta
    Y mostrará el aviso "No existen coberturas para mostrar" en rojo