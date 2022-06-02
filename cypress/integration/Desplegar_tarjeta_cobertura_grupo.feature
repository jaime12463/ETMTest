# language: es

@Pedido @Cobertura @Detalle @Sprint16

Característica: Desplegar detalle de cobertura
    Como prevendedor 
    Quiero ver los productos de la cobertura
    Para agregar productos al pedido

Escenario: N°1 - Desplegar detalle de cobertura
    Dado que se desplegó la tarjeta coberturas
    Cuando selecciono el control ver grupo
    Entonces el sistema mostrará en la cabecera el total de items
    Y mostrará el control para filtrar productos por atributos
    Y mostrará los productos asignados al grupo ordenados por código de producto
    Y mostrará el código de producto, el _nombre, el precio unidad, el precio subunidad
    Y mostrará las cantidades en 0
    Y deshabilitará el control - de las cantidades
    Y habilitará el control + de las cantidades
    

# filtro igual al ingreso de producto. Se muestran atriutos de los productos que están en coberturas.

Escenario: N°2 - Desplegar detalle de cobertura con producto existente en pedido
    Dado que se desplegó la tarjeta coberturas
    Y que existe el producto de la cobertura en el pedido
    Cuando selecciono el control ver grupo
    Entonces el sistema mostrará los productos asignados al grupo ordenados por código de producto
    Y mostrará el código de producto, el _nombre, el precio unidad, el precio subunidad
    Y mostrará las cantidades ingresadas al pedido para ese producto
    Y habilitará el control + de las cantidades, cuando sean mayor a 0
    Y habilitará el control - de las cantidades, cuando sean mayor a 0

Escenario: N°3 - Desplegar detalle de cobertura sin edición
    Dado que se avanzó al paso 2 - Toma de pedido
    Y se regresó al paso 1 - planeación
    Y se desplegó la tarjeta de coberturas
    Cuando selecciono el control ver grupo
    Entonces el sistema mostrará los productos asignados al grupo ordenados por código de producto
    Y mostrará el código de producto, el _nombre, el precio unidad, el precio subunidad
    Y mostrará los valores cargados en la etapa 1 - planeación
    Y no permitirá la edición de las tarjetas
    
# similar a iniciativas, cuando volvemos de toma de pedido al paso 1, no se pueden editar las
# coberturas. Se muestran con lo cargado en dicho paso.    
