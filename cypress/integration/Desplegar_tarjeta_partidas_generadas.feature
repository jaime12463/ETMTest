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
    Y mostrará el scroll del listado al haber más de 7 documentos
    Y mostrará de título "partidas generadas del cliente"
    Y mostrará el icono que indica la leyenda de colores: verde partidas abiertas, amarrillo partidas a punto de vencer, rojo partidas vencidas
    Y mostrará el límite de crédito
    Y mostrará el disponible = límite crédito menos la suma de los saldos de los documentos pendientes 
    Y mostrará la deuda pendiente = suma de los saldos de los documentos pendientes 
    Y mostrará para cada documento el número, fecha de vencimiento, monto
    Y mostrará cada documento en '<color>' según '<condicion>'

Ejemplos:
    | color     |  condicion                                                                                                                               |
    |  Verde    | si la fecha del dispositivo < fecha de vencimiento + diasAlertaVencimientoDesde                                                          |
    |  Amarillo | si la fecha de vencimiento + diasAlertaVencimientoDesde <= fecha del dispositivo <= fecha de vencimiento + diasAlertaVencimientoHasta    |
    |  Rojo     | si la fecha del dispositivo > fecha de vencimiento + diasAlertaVencimientoHasta                                                          |
        
#En la lista mostrar número de documento, vencimiento y saldo 