# language: es

@Pedido @Sprint8

# sprint 8 UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3

Característica: Cambiar condición de pago
    Como prevendedor 
    Quiero cambiar la condición de pago del pedido
    Para satisfacer las necesidades del cliente 

Escenario: N°1 - El switch está habilitado
    Dado que el switch de condición de pago del pedido está habiltiado
    Cuando cambio el estado
    Entonces el sistema cambia el estado del switch para cada producto del pedido 
    Y muestra los indicadores y totales del pedido actualizados

Escenario: N°2 - El switch no está habilitado
    Dado que el switch de condición de pago del pedido no está habilitiado
    Cuando quiero cambiar el estado
    Entonces el sistema no lo permite
