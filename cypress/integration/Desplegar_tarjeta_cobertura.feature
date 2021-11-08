# language: es

@Pedido @Cobertura @Desplegar @Sprint16

Característica: Desplegar tarjeta de cobertura
    Como prevendedor 
    Quiero ver las coberturas del cliente
    Para agregar productos al pedido

Escenario: N°1 - Desplegar cobertura
    Dado que estoy en paso 1 - planeación 
    Y el cliente tiene coberturas asignadas
    Cuando selecciono el control desplegar de la tarjeta cobertura
    Entonces el sistema mostrará las coberturas asignadas al cliente
    ordenadas por _secuenciaGrupoCobertura
    Y mostrará _grupoCobertura
    Y mostrará la cantidad total de productos que tiene dicho grupo
    Y mostrará el control para ver el detalle de cada grupo