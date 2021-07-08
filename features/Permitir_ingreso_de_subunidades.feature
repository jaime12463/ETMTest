# language: es

@Pedido @Validar_subunidades @Validar_minimo_subunidades @Sprint3 @sprint4

# Si parámetro a nivel ruta esVentaSubunidadesRuta = true y para el cliente/ producto 
# esVentaSubunidades = true se habilita el campo de ingreso de subunidades. 
# El usuario puede ingresar subunidades menores a “presentación” del producto. 
# Si ingresa un número mayor se muestra aviso.
# Caso contrario, no se habilita el campo de ingreso de subunidades.  
# Se agrega campo esVentaSubunidades en portafolio de productos del cliente. 
# Se agrega campo presentación en el catálogo de productos. (presentación: 12)
# Parámetro a nivel ruta esVentaSubunidadesRuta que habilita venta en botellas. 
# Si es true, la venta en botellas depende de esVentaSubunidades del cliente/ producto. 
# Si está en false, no se puede vender en botellas.

# UX sprint 3: https://www.figma.com/proto/4sKBs7Q0Ap07bdHIXsuukt/SFA?node-id=436%3A2150&scaling=scale-down&page-id=436%3A1256

# La venta por subunidad mínima requiere de un valor por producto 
# el cual indica la cantidad de subunidades mínimas a vender de dicho producto. 
# El usuario solo puede ingresar múltiplos de este valor.
# Si por ejemplo un producto cuya presentación es de 12 y la configuración 
# indica que la venta mínima son 3 subunidades, solamente se podrán 
# vender en múltiplos de 3: 3, 6 o 9 subunidades. 
# (12 subunidades no estaría permitido. Ver historia de usuario “permitir ingreso de subunidades al pedido”, escenario N2, sprint 3).
# Se debe contemplar el ingreso de cantidad 0 (ver sprint 3, “Venta por botellas”, HU Eliminar línea del pedido)
# Esto aplica solo para la operación de venta.

# UX sprint 4: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA_S4?node-id=1%3A11&scaling=min-zoom&page-id=0%3A1


Característica: Permitir el ingreso de subunidades al pedido
	Como Prevendedor
	Quiero ingresar en el pedido subunidades de SKUs
	Para realizar venta mínima sin tener que vender cajas completas

Esquema del escenario: N°1 - Se admite el ingreso de subunidades por cliente/producto
    Dado un cliente y producto seleccionado 
    Cuando para la ruta está configurado el botelleo igual a <esVentaSubunidadesRuta> 
    Y para el cliente/producto está configurado el botelleo igual a <esVentaSubunidades> 
    Entonces el sistema <habilitaSubunidades> el ingreso de subunidades

Ejemplos:
|esVentaSubunidadesRuta|esVentaSubunidades| habilitaSubunidades |
|      true 		   |      true		  |     Habilitará      |  
|      true            |	  false		  |    No habilitará    |
|      false           |	  true	      |    No habilitará    |
|      false           |	  false		  |    No habilitará    |

Esquema del escenario: N°2 – Validar Subunidades con la presentación
	Dado que el producto ingresado tiene presentación <presentación>
	Cuando se ingresan <subunidades> 
	Entonces el sistema <acción> 

Ejemplos:
|presentación |subunidades| acción                                                                				| 
|    12       |   11      |  permitirá el ingreso del producto en el pedido                       				|
|    12	      |	   5      |  permitirá el ingreso del producto en el pedido                       				|
|    12       |   12      |  mostrará mensaje “Las subunidades deben ser menores a la presentación del producto”|
|    12  	  |   20      |  mostrará mensaje “Las subunidades deben ser menores a la presentación del producto”|    



Esquema del escenario: N°3 – Ingreso de subunidad correcta
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

Esquema del escenario: N°4 – Ingreso de subunidades incorrecto
    Dado que el producto tiene presentación <presentación>
    Y la venta mínima de subunidades es <subunidadesVentaMínima>
    Cuando ingreso <subunidades> en subunidades
    Entonces el sistema mostrará el mensaje “Las subunidades debe ser en múltiplos de <subunidadesVentaMínima>”

Ejemplos:
|presentación|subunidadesVentaMínima|subunidades|
|   12       |       3              |    2      |
|   12       |       3              |    4      |
