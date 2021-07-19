# language: es

@Pedido @Sprint8

# sprint 8 UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3

Característica: Cambiar condición de pago del producto
    Como prevendedor 
    Quiero cambiar la condición de pago de un producto
    Para satisfacer las necesidades del cliente

Escenario: N°1 - El switch está habilitado
    Dado que el switch de condición de pago del pedido está habilitado
    Cuando cambio el estado del switch de un producto
    Entonces el sistema muestra los indicadores y totales del pedido actualizados

Escenario: N°2 - El switch no está habilitado
    Dado que el switch de condición de pago del pedido está deshabilitado
    Cuando quiero cambiar el estado del switch de un producto
    Entonces el sistema no lo permite
