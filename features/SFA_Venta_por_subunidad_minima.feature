@Venta_por_subunidad_minima @sprint4

# La venta por subunidad mínima requiere de un valor por producto 
# el cual indica la cantidad de subunidades mínimas a vender de dicho producto. 
# El usuario solo puede ingresar múltiplos de este valor.
# Si por ejemplo un producto cuya presentación es de 12 y la configuración 
# indica que la venta mínima son 3 subunidades, solamente se podrán 
# vender en múltiplos de 3: 3, 6 o 9 subunidades. 
# (12 subunidades no estaría permitido. Ver historia de usuario “permitir ingreso de subunidades al pedido”, escenario N2, sprint 3).
# Se debe contemplar el ingreso de cantidad 0 (ver sprint 3, “Venta por botellas”, HU Eliminar línea del pedido)
# Esto aplica solo para la operación de venta.

Característica: venta subunidad mínima
    Como prevendedor
    Quiero que el sistema me avise cuando ingreso subunidades que no son múltiplos de la venta mínima
    Para realizar el pedido de forma correcta

Esquema del escenario: N°1 – Ingreso de subunidad correcta
    Dado que el producto tiene presentación <presentación>
    Y la venta mínima de subunidades es <subunidadesVentaMínima>
    Cuando ingreso <subunidades> en subunidades
    Entonces el sistema dará por válidas las subunidades ingresadas

Ejemplos:
|presentación|subunidadesVentaMínima|subunidades|
|    12      |       3              |    3      | 
|    12      |       3              |    6      |  
|    12      |       3              |    9      |
|    12      |       1              |    1      |
|    12      |       1              |    7      |
|    12      |       3              |    0      |

Esquema del escenario: N°2 – Ingreso de subunidades incorrecto
    Dado que el producto tiene presentación <presentación>
    Y la venta mínima de subunidades es <subunidadesVentaMínima>
    Cuando ingreso <subunidades> en subunidades
    Entonces el sistema mostrará el mensaje “Las subunidades debe ser en múltiplos de <subunidadesVentaMínima>”

Ejemplos:
|presentación|subunidadesVentaMínima|subunidades|
|   12       |       3              |    2      |
|   12       |       3              |    4      |
