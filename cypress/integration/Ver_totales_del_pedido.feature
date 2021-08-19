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
        |codigoProducto|cantidadUnidades|cantidadSubunidades|condicionPago|
        |17640         |4	            |3                  | contado     |
        |1885          |7	            |3                  | credito     |
    # Cuando quiero ver los totales
    # Entonces el sistema calculará para cada <condicionPago> el <totalUnidades> como la suma de Unidades, <totalSubunidades> como la suma de las subunidades 
    # Y <monto> como unidades * precio con Impuesto de la unidadad + subunidades * precio con impuesto de la subunidad, de los productos de la misma condición de pago 
    # Y mostrará los totales en pantalla
    #Entonces el sistema mostrará para Contado: <totalUnidadesContado> y <totalSubunidadesContado>

Ejemplos:
|totalUnidadesContado|totalSubunidadesContado|totalUnidadesCredito|totalSubunidadesCredito|totalMontoContado|totalMontoCredito|
|4		             |3		                 |7                   |3                      |420              |480              |



# Ejemplos:
# |totalUnidades|totalSubunidades|monto|condicionPago|
# |4		      |2		       |420	 | contado     |
# |7		      |3		       |480	 | credito     |


# Característica: Ingresar unidades
# 	Como prevendedor
# 	Quiero ingresar una cantidad de unidades del producto al pedido 
# 	Para realizar la venta.
 
# Antecedentes:
# 	Dado que estoy en el ingreso del pedido y que se ingresó un código de producto
#    	Y que la cantidad máxima de unidades se estableció en 100 para el cliente

# @Test_dispositivo_1
# Esquema del escenario: N°1 – La cantidad es mayor a la permitida
# 	Cuando se ingresa <cantidad>
# 	Y es mayor a la cantidad máxima de unidades
# 	Entonces el sistema mostrará el mensaje “La cantidad es mayor a 100 ¿Desea continuar?” SiNo

# Ejemplos:
# |cantidad|
# |   101  |
# |   110  |

# Escenario: N°2 – La cantidad es menor o igual a la permitida y las subunidades están habilitadas
# 	Cuando se ingresa una cantidad
# 	Y es menor o igual a la cantidad máxima de unidades
# 	Y las subunidades están habilitadas
# 	Entonces el sistema registrará las unidades y continuará con el ingreso de las subunidades

# Escenario: N°3 – La cantidad es menor o igual a la permitida y las subunidades están deshabilitadas
# 	Cuando se ingresa una cantidad
# 	Y es menor o igual a la cantidad máxima de unidades
# 	Y las subunidades no están habilitadas
# 	Entonces el sistema registrará las unidades y mostrará el producto actualizado en la lista y actualizará los totales e indicadores y permanecerá en la pantalla para el ingreso de un nuevo producto.
 
#Cuando se ingresa un producto nuevo, se asume como condición de pago del producto la condición de pago general del pedido. 
