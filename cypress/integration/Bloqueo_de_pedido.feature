# language: es

@Planeacion @Sprint18


Característica: Bloqueo de pedido
    Como prevendedor
    Quiero que se bloquee el pedido según condiciones del cliente
    Para no poder realizar pedido de venta al cliente

Antecedentes:
    Dado que se ingresó un cliente
    Y tiene _esCreditoBloqueado = true

Escenario: N°1 - Se muestra mensaje de error en planeación
    Cuando estamos en planeación
    Entonces el sistema mostrará el mensaje de crédito bloqueado

Escenario: N°2 - El cliente es de condición formal y no avanza a toma de pedido
    Dado que el cliente que se ingresó tiene _condicion = "creditoFormal"
    Cuando estamos en planeación 
    Y cerramos el mensaje de crédito bloqueado
    Entonces el sistema avanzará directamente al paso 3 - Otros
    Y mostrará los pasos 3 y 4 únicamente
    Y mostrará habilitada únicamente la tarjeta de compromiso de cobro
    Y si la ruta posee _bonificacionesConVenta = false, mostrará habilitada la tarjeta de bonificaciones

Escenario: N°3 - El cliente es de condición informal y tiene venta bloqueada, no avanza a toma de pedido
    Dado que el cliente que se ingresó tiene _condicion = "creditoInformal"
    Y tiene _esVentaBloqueado = true
    Cuando estamos en planeación 
    Y cerramos el mensaje de crédito bloqueado
    Entonces el sistema avanzará directamente al paso 3 - Otros
    Y mostrará los pasos 3 y 4 únicamente
    Y mostrará habilitada únicamente la tarjeta de compromiso de cobro
    Y si la ruta posee _bonificacionesConVenta = false, mostrará habilitada la tarjeta de bonificaciones

Escenario: N°4 - El cliente es de condición informal y no tiene venta bloqueada
    Dado que el cliente que se ingresó tiene _condicion = "creditoInformal"
    Y tiene _esVentaBloqueado = false
    Cuando estamos en planeación 
    Y cerramos el mensaje de crédito bloqueado
    Entonces el sistema estalecerá como condición de pago default contado
    Y permancerá en etapa 1 - planeación

# podrá realizar acciones de forma normal (iniciativas, coberturas) pero todo lo ingresado
# se registrará con condición de pago contado

# Aquellos clientes que tengan condición de contado y tengan venta bloqueada, no serán enviados en la ruta
 
