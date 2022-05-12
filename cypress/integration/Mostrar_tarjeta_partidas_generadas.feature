# language: es
@Pedido @Partidas_abiertas @Sprint29

Característica: Mostrar Partidas generadas
    Como prevendedor 
    Quiero ver las partidas generadas del cliente con colores según la proximidad al vencimiento
    Para gestionar los cobros


Esquema del escenario: N°1 - Partidas generadas
    Dado que se ingresó un cliente
    Y tiene partidas generadas
    Y el cliente no habilita el compromiso de cobro
    Cuando se despliega la tarjeta
    Entonces el sistema mostrará en la tarjeta partidas generadas el listado de documentos ordenados por vencimiento ascendente
    Y mostrará de título partidas generadas del cliente
    Y mostrará el icono que indica la leyenda de colores
    Y mostrará el límite de crédito
    Y mostrará el disponible = límite crédito menos la suma de los saldos de los documentos pendientes 
    Y mostrará la deuda pendiente = suma de los saldos de los documentos pendientes 
    Y mostrará para cada documento el número, fecha de vencimiento, monto
    Y mostrará cada documento en '<color>' según '<condicion>'

Ejemplos:
    | color     |  condicion                                                                                                                                                |
    |  Verde    | si diasWarningDesde y diasWarningHasta >= 0 y la fecha del dispositivo < fecha de vencimiento - diasWarningDesde                                          |
    |  Verde    | si diasWarningDesde y diasWarningHasta < 0 y la fecha del dispositivo < fecha de vencimiento + diasWarningDesde                                           |
    |  Amarillo | si diasWarningDesde y diasWarningHasta >= 0 y fecha de vencimiento - diasWarningDesde <= fecha del dispositivo <= fecha de vencimiento + diasWarningHasta |
    |  Amarillo | si diasWarningDesde y diasWarningHasta < 0 y fecha de vencimiento + diasWarningDesde <= fecha del dispositivo <= fecha de vencimiento + diasWarningHasta  |
    |  Rojo     | si la fecha del dispositivo > fecha de vencimiento + diasWarningHasta                                                                                     |

#En la lista mostrar número de documento, vencimiento y saldo 


Escenario: N°2 - El cliente no tiene partidas generadas
    Dado que se ingresó un cliente
    Y no tiene partidas generadas
    Cuando el cliente no habilita el compromiso de cobro
    Entonces el sistema mostrará en la tarjeta partidas generadas el texto en rojo "No existen partidas para este cliente"