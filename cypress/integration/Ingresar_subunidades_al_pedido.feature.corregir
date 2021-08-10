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

# UX sprint 8: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3


Característica: Ingresar subunidades al pedido
	Como prevendedor
	Quiero ingresar una cantidad de subunidades del producto al pedido 
	Para realizar la venta.
 
Antecedentes:
	Dado que estoy en el ingreso del pedido y que se ingresó un código de producto
    Y las subunidades están habilitadas
	
Esquema del escenario: N°1 – Ingreso de subunidad correcta
    Dado que el producto tiene presentación <presentacion>
    Y la venta mínima de subunidades es <subunidadesVentaMinima>
    Cuando ingreso <subunidades> en subunidades
    Entonces el sistema registrará las subunidades y mostrará el producto actualizado en la lista y actualizará los totales e indicadores y permanecerá en la pantalla para el ingreso de un nuevo producto.
 
#Cuando se ingresa un producto nuevo, se asume como condición de pago del producto la condición de pago general del pedido. 

Ejemplos:
|presentacion|subunidadesVentaMinima|subunidades|
|    12      |       3              |    3      | 
|    12      |       3              |    6      |  
|    12      |       3              |    9      | 
|    12      |       1              |    1      | 
|    12      |       1              |    11     | 

Esquema del escenario: N°2 – Ingreso de subunidades mayor o igual que la presentación
    Dado que el producto tiene presentación <presentacion>
    Cuando ingreso <subunidades> en subunidades
    Entonces el sistema mostrará el mensaje “Las subunidades debe ser menores a la presentación <presentacion>” y permanecerá en la pantalla para corregir

Ejemplos:
|presentacion|subunidades|
|   12       |       12  |   
|   12       |       13  |   



Esquema del escenario: N°3 – Ingreso de subunidades no es múltiplo
    Dado que el producto tiene presentación <presentacion>
    Y la venta mínima de subunidades es <subunidadesVentaMinima>
    Cuando ingreso <subunidades> en subunidades
    Entonces el sistema mostrará el mensaje “Las subunidades debe ser en múltiplos de <subunidadesVentaMinima> ” y permanecerá en la pantalla para corregir

|presentacion|subunidadesVentaMinima|subunidades|
|   12       |          3           |   4       |
|   12       |          3           |   2       |
