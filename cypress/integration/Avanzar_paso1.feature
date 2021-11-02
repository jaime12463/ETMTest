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
    Y avanzará al paso 2 - Toma de pedido

Escenario: N°2 - Registro de iniciativas ejecutadas, avanzar al paso 2 - Toma de pedido
    Dado que se ingresaron iniciativas con estado ejecutada
    Cuando avanzo al paso 2 - Toma de pedido
    Entonces el sistema registrará la iniciativa indicando usuario, fecha y hora, código de iniciativa, código de cliente, status, producto, unidades y subunidades.
    Y avanzará al paso 2 - Toma de pedido

Escenario: N°3 - Iniciativas canceladas no finalizadas
    Dado que se cambiaron estados de iniciativas a canceladas
    Y no se seleccionaron motivos
    Cuando avanzao al paso 2 - Toma de pedido
    Entonces el sistema mostrará un mensaje de alerta indicando que hay iniciativas sin completar
    Y dará la opción de editar 
    Y dará la opción de continuar 
    
# Iniciativa sin completar: ej. Tiene estado cancelada y no tiene motivo seleccionado.    
# Editar: No avanzará al paso 2 - Toma de pedido y mostrará la primer iniciativa sin completar para continuar la carga
# Continuar: Dejará con estado pendiente las iniciativas sin completar y continuará al paso 2 - Toma de pedido