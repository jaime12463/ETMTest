# language: es

@Pedido @Ver_totales @Sprint1

# UX: https://www.figma.com/proto/4sKBs7Q0Ap07bdHIXsuukt/SFA?node-id=436%3A2150&scaling=scale-down&page-id=436%3A1256

Característica: Ver totales del pedido
    Como prevendedor
    Quiero ver el total de unidades y monto del pedido 
    Para informarle al cliente cuánto lleva gastado en el total de cajas compradas

Esquema del escenario: N°1 - Calcular precio de productos
    Dado el precio de las unidades en $<precioConImpuestoUnidad>
    Cuando se agrega un producto en el pedido
    Entonces el sistema calculará el monto total <unidadesIngresadas> * <precioConImpuestoUnidad> + <subunidadesIngresadas> * <precioConImpuestoSubunidad>
    Y mostrará las subunidades ingresadas
    Y mostrará $<resultado>

Ejemplos:
|<unidadesIngresadas>|<subunidadesIngresadas>|<precioConImpuestoUnidad>|<precioConImpuestoSubunidad>|<resultado>|
|         2          |           3           |            100          |          10                |     230   |
