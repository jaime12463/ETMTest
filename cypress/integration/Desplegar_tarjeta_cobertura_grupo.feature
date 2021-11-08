# language: es

@Pedido @Cobertura @Detalle @Sprint16

Característica: Desplegar detalle de cobertura
    Como prevendedor 
    Quiero ver los productos de la cobertura
    Para agregar productos al pedido

Escenario: N°1 - Desplegar detalle de cobertura
    Dado que se desplegó la tarjeta coberturas
    Cuando selecciono el control ver grupo
    Entonces el sistema mostrará los productos asignados al grupo
    ordenados por código de producto
    Y mostrará el código de producto, el _nombre, el precio unidad, el precio subunidad
    Y mostrará las cantidades en 0
    Y deshabilitará el control - de las cantidades
    Y habilitará el control + de las cantidades

Escenario: N°2 - Desplegar detalle de cobertura con producto existente en pedido
    Dado que se desplegó la tarjeta coberturas
    Y que existe el producto de la cobertura en el pedido
    Cuando selecciono el control ver grupo
    Entonces el sistema mostrará los productos asignados al grupo
    ordenados por código de producto
    Y mostrará el código de producto, el _nombre, el precio unidad, el precio subunidad
    Y mostrará las cantidades ingresadas al pedido para ese producto
    Y habilitará el control + de las cantidades, cuando sean mayor a 0
    Y habilitará el control - de las cantidades, cuando sean mayor a 0
