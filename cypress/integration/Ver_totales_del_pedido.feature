# UX: https://www.figma.com/proto/4sKBs7Q0Ap07bdHIXsuukt/SFA?node-id=436%3A2150&scaling=scale-down&page-id=436%3A1256
# language: es

Característica: ver totales del pedido
    Como prevendedor
    Quiero ver el total de unidades y monto del pedido 
    Para informarle al cliente cuánto lleva gastado en el total de cajas compradas

@Test_dispositivo_1
Esquema del escenario: N°1 - Calcular precio de productos
    Dado el precio de las unidades es $ "<precioConImpuestoUnidad>"
    Y me encuentro en la ventana de un nuevo pedido
    Cuando se ingresan "<unidadesIngresadas>" unidades a un producto en el pedido
    Entonces el sistema mostrará el resultado "<resultado>"

Ejemplos:
|unidadesIngresadas|subunidadesIngresadas|precioConImpuestoUnidad|resultado|
|         2        |          3          |          100          | 200.00  |
|         3        |          3          |          100          | 300.00  |