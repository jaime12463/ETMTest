@Pedido @Ver_totales @Sprint1
Característica: ver totales del pedido
    Como prevendedor
    Quiero ver el total de unidades y monto del pedido 
    Para informarle al cliente cuánto lleva gastado en el total de cajas compradas

@Test_dispositivo_1
Esquema del escenario: N°1 - Calcular precio de productos
    Dado el precio de las unidades en $<precioConImpuestoUnidad>
    Cuando se agrega un producto en el pedido
    Entonces el sistema calculará el monto total <unidadesIngresadas> * <precioConImpuestoUnidad>
    Y mostrará $<resultado>

Ejemplos:
|<unidadesIngresadas>|<subunidadesIngresadas>|<precioConImpuestoUnidad>|<resultado>|
|         2          |           3           |            100          |     200   |