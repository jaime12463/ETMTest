# UX: https://www.figma.com/proto/4sKBs7Q0Ap07bdHIXsuukt/SFA?node-id=436%3A2150&scaling=scale-down&page-id=436%3A1256
# language: es

Característica: Ver totales del pedido 
	Como prevendedor
	Quiero ver el total de unidades
	Y subunidades 
	Y monto del pedido
	Para informarle al cliente cuánto lleva gastado en el total de cajas/botellas compradas

@Test_dispositivo_1
Esquema del escenario: N°1 - Calcular precio de productos
    Dado está habilitada la venta en subunidades
    Y el producto tiene habilitada la venta de subunidades
    Y el precio de las unidades es $ "<precioConImpuestoUnidad>"
    Y el precio de las subunidades es $ "<precioConImpuestoSubunidad>"
    Cuando se ingresan "<unidadesIngresadas>" unidades y "<subunidadesIngresadas>" subunidades a un producto en el pedido
    Entonces el sistema mostrará el resultado "<resultado>"

Ejemplos:
|unidadesIngresadas|subunidadesIngresadas|precioConImpuestoUnidad|precioConImpuestoSubunidad|resultado|
|         2        |           3         |            100        |          10              | 230.00  |

