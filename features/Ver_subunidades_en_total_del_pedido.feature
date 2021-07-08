@Pedido @Ver_totales @Ver_subunidades @AddDelSprint1 @Sprint3

# Si vendo 2 caja y 3 botellas el precio es 
# 2 * precioConImpuestoUnidad + 3 *  precioConImpuestoSubunidad

# UX: https://www.figma.com/proto/4sKBs7Q0Ap07bdHIXsuukt/SFA?node-id=436%3A2150&scaling=scale-down&page-id=436%3A1256

Característica: Ver totales del pedido 
	Como prevendedor
	Quiero ver el total de unidades
	Y subunidades 
	Y monto del pedido
	Para informarle al cliente cuánto lleva gastado en el total de cajas/botellas compradas

@Test_dispositivo_1
Esquema del escenario: N°1 - Calcular precio de productos
    Dado el precio de las unidades en $<precioConImpuestoUnidad>
    Y el precio de las subunidades en $<precioConImpuestoSubunidad>
    Cuando se agrega un producto en el pedido
    Entonces el sistema calculará el monto total <unidadesIngresadas> * <precioConImpuestoUnidad> + <subunidadesIngresadas> * <precioConImpuestoSubunidad>
    Y mostrará $<resultado>

Ejemplos:
|<unidadesIngresadas>|<subunidadesIngresadas>|<precioConImpuestoUnidad>|<precioConImpuestoSubunidad>|<resultado>|
|         2          |           3           |            100          |          10                |     230   |