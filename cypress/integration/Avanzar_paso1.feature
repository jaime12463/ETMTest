# language: es

@Planeacion @Iniciativas @Sprint15

Característica: concluir planeación
    Como prevendedor
    Quiero finalizar la planeación
    Para comenzar a tomar el pedido al cliente

Escenario: N°1 - Registro de iniciativas canceladas, avanzar al paso 2 - Toma de pedido
    Dado que se ingresaron iniciativas con estado cancelada
    Cuando avanzo al paso 2 - Toma de pedido
    Entonces el sistema registrará la iniciativa indicando usuario, fecha y hora, código de iniciativa, código de cliente, status y motivo de cancelación

Escenario: N°2 - Registro de iniciativas ejecutadas, avanzar al paso 2 - Toma de pedido
    Dado que se ingresaron iniciativas con estado ejecutada
    Cuando avanzo al paso 2 - Toma de pedido
    Entonces el sistema registrará la iniciativa indicando usuario, fecha y hora, código de iniciativa, código de cliente, status, producto, unidades y subunidades.