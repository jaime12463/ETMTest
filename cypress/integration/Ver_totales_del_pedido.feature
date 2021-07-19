# language: es

@Pedido @Ver_totales @Sprint1 @Sprint8

# UX: https://www.figma.com/proto/4sKBs7Q0Ap07bdHIXsuukt/SFA?node-id=436%3A2150&scaling=scale-down&page-id=436%3A1256

# sprint 8 UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3

Característica: Ver totales del pedido
    Como prevendedor
    Quiero ver los totales del pedido
    Para mantener informado al cliente durante la venta

Esquema del escenario: N°1 - Calcular totales 
    Dado que se registraron productos en el pedido con <condiciónDePago>
    Cuando quiero ver los totales
    Entonces el sistema calculará para cada <condicionPago> el <totalUnidades> como la suma de Unidades, <totalSubunidades> como la suma de las subunidades y <monto> como
 unidades * precio con Impuesto de la unidadad + subunidades * precio con impuesto de la subunidad, de los productos de la misma <condicionPago> 
    Y mostrará los totales en pantalla

#Dados los siguientes productos ingresados
#|unidades|subunidades|<precioConImpuestoUnidad>|<precioConImpuestoSubunidad>|< condiciónDePago >|
#|         2          |           3           |            100          |          10                |     credito   |
#|         5          |           0           |            50            |          5                  |     credito   |
#|         4          |           2           |            100          |          10                |     contado   |

Ejemplos:
|totalUnidades|totalSubunidades|monto|condicionPago|
|4		      |2		       |420	 | contado|
|7		      |3		       |480	 | crédito|
