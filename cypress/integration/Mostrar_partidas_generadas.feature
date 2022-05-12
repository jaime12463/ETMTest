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
Ejemplos:
    |pais | color     |  condicion                                                                                                                      |
    | COL |  Verde    | si la fecha de visita es menor al vencimiento                                                                                   |
    | COL |  Amarillo | si la fecha del dispositivo es igual o mayor hasta _diasDeGracia días posterior a la fecha de vencimineto                       |
    | COL |  Rojo     | si la fecha del dispositivo es mayor al vencimiento + _diasDeGracia                                                             |
    | MEX |  Verde    | si el porcentaje de días transcurridos de los días de crédito, redondeado para arriba, es menor a _porcentajeAvance          |
    | MEX |  Amarillo | si el porcentaje de días transcurridos de los días de crédito, redondeado para arriba, mayor o igual a _porcentajeAvance     |
    | MEX |  Rojo     | si la fecha del dispositivo es mayor o igual al vencimiento                                                                     |
    | -   |  Verde    | si la fecha del dispositivo es menor al vencimiento                                                                             |
    | -   |  Amarillo | si la fecha del dispositivo es igual al vencimiento                                                                             |
    | -   |  Rojo     | si la fecha del dispositivo es mayor al vencimiento                                                                             |

#En la lista mostrar número de documento, vencimiento y saldo 

# MEX: Ej. si son 10 días de crédito y el porcentaje de avance es 50 
# cuando pase menos del 50% del tiempo de esos 10 días seguimos en verde. (de 1 a 4 días) 
# Si el tiempo transcurrido de los 10 días, es el 50% o más va amarillo  (de 5 a 9 días)
# Si la fecha del dispositivo es la misma que la fecha de vencimiento, rojo. (10 días) 
# El redondeo ej: 4.2 entonces se toma como 5. 


Escenario: N°2 - El cliente no tiene partidas generadas
    Dado que se ingresó un cliente
    Y no tiene partidas generadas
    Cuando el cliente no habilita el compromiso de cobro
    Entonces el sistema mostrará en la tarjeta partidas generadas el texto en rojo "No existen partidas para este cliente"