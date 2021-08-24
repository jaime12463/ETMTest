# language: es

@Pedido @Ver_totales @Sprint1 @Sprint8

# Dados los siguientes productos ingresados
# unidades subunidades precioConImpuestoUnidad precioConImpuestoSubunidad condiciónDePago 
#   2          3           100                       10                     credito   
#   5          0           50                         5                     credito 
#   4          2           100                        10                    contado   

# UX: https://www.figma.com/proto/4sKBs7Q0Ap07bdHIXsuukt/SFA?node-id=436%3A2150&scaling=scale-down&page-id=436%3A1256

# sprint 8 UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3

Característica: Ver totales del pedido
    Como prevendedor
    Quiero ver los totales del pedido
    Para mantener informado al cliente durante la venta

Antecedentes:
	Dado que estoy en el ingreso del pedido

@Test_dispositivo_1
Esquema del escenario: N°1 - Calcular totales para cliente de Crédito Informal
    Dado que se registraron productos en el pedido
        |codigoProducto|cantidadUnidades|cantidadSubunidades|condicionPago|precioConImpuestoUnidad|precioConImpuestoSubunidad|
        |17640         |4	            |3                  | contado     |105                    |8.75                      |
        |1885          |7	            |3                  | credito     |105                    |8.75                      |
    Entonces el sistema calculará para cada Condición de Pago el Total de Unidades como la suma de Unidades, y el Total de Subunidades como la suma de las Subunidades
    Y el Total Monto como unidades * precio con Impuesto de la Unidadad + Subunidades * precio con impuesto de la Subunidad, de los productos de la misma condición de pago
    Entonces el sistema mostrará los totales de '<totalUnidadesContado>' Unidades y '<totalSubunidadesContado>' Subunidades para Contado
    Y los totales de '<totalUnidadesCredito>' Unidades y '<totalSubunidadesCredito>' Subunidades para Crédito
    Y los montos de '<totalMontoContado>' para Contado y '<totalMontoCredito>' para Crédito

Ejemplos:
|totalUnidadesContado|totalSubunidadesContado|totalUnidadesCredito|totalSubunidadesCredito|totalMontoContado|totalMontoCredito|
|4		             |3		                 |7                   |3                      |446.25           |761.25           |

