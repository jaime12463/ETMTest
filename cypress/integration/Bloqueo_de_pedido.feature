# language: es

@Planeacion @Sprint18 @Sprint24


Característica: Bloqueo de pedido
    Como prevendedor
    Quiero que se bloquee el pedido según condiciones del cliente
    Para no poder realizar pedido de venta al cliente


Escenario: N°1 - El cliente tiene venta bloqueada y deshabilitado compromiso de cobro, no importa la condicion de pago
    Dado que el cliente tiene _esVentaBloqueado = true
    Y la ruta posee _habilitaCompromisoDeCobro = false
    Cuando estamos en planeación
    Entonces el sistema mostrará las tarjetas sin poder desplegarse
    Y se muestran con los subtitulos en rojo
    Y mostrará el mensaje que el cliente está bloqueado con el control para finalizar la visita

Escenario: N°2 - El cliente tiene venta bloqueada y compromiso de cobro habilitado, no importa la condicion de pago
    Dado que el cliente tiene _esVentaBloqueado = true
    Y _habilitaCompromisoDeCobro = true
    Y estamos en planeación con las tarjetas que no se puede desplegar
    Y se muestran con los subtitulos en rojo
    Cuando cerramos el mensaje de crédito bloqueado
    Y avanzamos al paso 3
    Entonces el sistema mostrará el aviso para continuar o para salir
    Y si avanza avanzará al paso 3 - Otros
    Y mostrará los pasos 3 y 4 únicamente
    Y no habilitará el ingreso de bonificaciones
    Y mostrará habilitado el ingreso de compromiso de cobro

Escenario: N°3 - El cliente es de condición informal y tiene crédito bloqueado
    Dado que el cliente que se ingresó tiene _condicion = "creditoInformal"
    Y tiene _esCreditoBloqueado = true
    Y tiene _esVentaBloqueado = false
    Cuando estamos en planeación 
    Y cerramos el mensaje de crédito bloqueado
    Entonces el sistema estalecerá como condición de pago default contado para el switch en toma de pedido
    Y permancerá en etapa 1 - planeación 
    Y podrá realizar pedido a únicamente a contado

# podrá realizar acciones de forma normal (iniciativas, coberturas) pero todo lo ingresado
# se registrará con condición de pago contado


Escenario: N°4 - El cliente es de condición formal y con credito bloqueado y compromiso de cobro habilitado
    Dado que el cliente tiene _condicion = "creditoFormal"
    Y tiene _esCreditoBloqueado = true
    Y tiene _esVentaBloqueado = false
    Y _habilitaCompromisoDeCobro = true
    Y estamos en planeación con las tarjetas que no se pueden desplegar
    Y se muestran con los subtitulos en rojo
    Cuando cerramos el mensaje de crédito bloqueado
    Y avanzamos a paso 3
    Entonces el sistema mostrará el aviso para continuar o para salir
    Y si avanza avanzará al paso 3 - Otros
    Y mostrará los pasos 3 y 4 únicamente
    Y no habilitará el ingreso de bonificaciones
    Y mostrará habilitado el ingreso de compromiso de cobro     
 
Escenario: N°5 - El cliente es de condicion formal y con credito bloqueado y deshabilitado compromiso de cobro
    Dado que el cliente que se ingresó tiene _condicion = "creditoFormal"
    Y la ruta posee _habilitaCompromisoDeCobro = false
    Y tiene _esCreditoBloqueado = true
    Entonces el sistema mostrará las tarjetas sin poder desplegarse
    Y se muestran con los subtitulos en rojo
    Y mostrará el mensaje que el cliente está bloqueado con el control para finalizar la visita


# Aquellos clientes que tengan condición de contado y tengan venta bloqueada, no serán enviados en la ruta
 
