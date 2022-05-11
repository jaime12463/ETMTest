# language: es
@Pedido @Partidas_abiertas @Sprint29

Característica: Mostrar Partidas generadas
    Como prevendedor 
    Quiero ver las partidas generadas del cliente con colores según la proximidad al vencimiento
    Para gestionar los cobros


Esquema del escenario: N°1 - Partidas generadas
    Dado que se ingresó un cliente
    Y tiene partidas generadas
    Y por configuración es ruta de '<pais>'
    Cuando el cliente no habilita el compromiso de cobro
    Entonces el sistema mostrará en la tarjeta partidas generadas el listado de documentos ordenados por vencimiento ascendente
    Y mostrará de título partidas generadas del cliente
    Y mostrará el icono que indica la leyenda de colores
    Y mostrará el límite de crédito
    Y mostrará el disponible = límite crédito menos la suma de los saldos de los documentos pendientes 
    Y mostrará la deuda pendiente = suma de los saldos de los documentos pendientes 
    Y mostrará para cada documento el número, fecha de vencimiento, monto
    Y mostrará cada documento en '<color>' según '<condicion>'

Ejemplos:
    |pais | color     |  condicion                                                                                                                                              |
    | COL |  Verde    | si la fecha de visita es menor al vencimiento                                                                                                           |
    | COL |  Amarillo | si la fecha del dispositivo es igual o mayor hasta _diasDeGracia días posterior a la fecha de vencimineto                                               |
    | COL |  Rojo     | si la fecha del dispositivo es mayor al vencimiento + _diasDeGracia                                                                                     |
    | MEX |  Verde    | si el porcentaje de avance de días de crédito según _diasCredito y fecha del dispositivo, redondeado para arriba, es menor o igual a _avanceVerde       |
    | MEX |  Amarillo | si el porcentaje de avance de días de crédito según _diasCredito y fecha del dispositivo, redondeado para arriba, mayor o igual a _avanceAmarillo       |
    | MEX |  Rojo     | si la fecha del dispositivo es mayor o igual al vencimiento                                                                                             |
    | -   |  Verde    | si la fecha del dispositivo es menor al vencimiento |
    | -   |  Amarillo | si la fecha del dispositivo es igual al vencimiento |
    | -   |  Rojo     | si la fecha del dispositivo es mayor al vencimiento |


Escenario: N°2 - El cliente no tiene partidas generadas
    Dado que se ingresó un cliente
    Y no tiene partidas generadas
    Cuando el cliente no habilita el compromiso de cobro
    Entonces el sistema mostrará en la tarjeta partidas generadas el texto en rojo "No existen partidas para este cliente"