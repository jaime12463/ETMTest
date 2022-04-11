# language: es

@Pedido @Validar_unidades @Sprint12

# sprint 12 UX:https://www.figma.com/proto/4sKBs7Q0Ap07bdHIXsuukt/SFA_S12_S13_S14?node-id=871%3A5542&scaling=scale-down&page-id=871%3A5541&starting-point-node-id=871%3A5542
# 
# Sprint 12:
# Validación de subunidades disponibles para retorno
# Cuando se modifica la cantidad de subunidades de un producto envase de un tipo de pedido envase 
# se debe validar que la cantidad ingresada no supere las subunidades disponibles para retorno
#
# Ejemplo 1: 
#       producto envase  17101 
#               Retorno:  8 subunidades
#               Venta:    0 subunidades
#               Prestamo: 0 subunidades
#               Total:    8 subunidades
#        
#       El vendedor ingresa 3 subunidades en la celda de Préstamo
#       El sistema valida que las subunidades ingresadas para Préstamo son menores a la 
#                cantidad actual de subunidades de Retorno + cantidad de subunidades inicial de la celda de Prestamo
#       Cantidad de subunidades ingresadas para Préstamo= 3
#       Cantidad actual de subunidades de Retorno = 8    
#       cantidad de subunidades inicial de la celda de Prestamo = 0
#               3 <= (8 + 0)
#       El sistema actualiza las cantidades de Retorno:
#               Retorno:  5 subunidades
#               Venta:    0 subunidades
#               Prestamo: 3 subunidades
#               Total:    8 subunidades  
# 
#       El vendedor modifica las subunidades en la celda de Préstamo ingresando el valor 4.
#       El sistema valida lo ingresado:
#                 4 <= (5 + 3)
#       El sistema actualiza las cantidades de Retorno:
#               Retorno:  4 subunidades
#               Venta:    0 subunidades
#               Prestamo: 4 subunidades
#               Total:    8 subunidades
# 
# Ejemplo 2: 
#       producto envase  19345 
#               Retorno:  4  subunidades
#               Venta:    0  subunidades
#               Prestamo: 6  subunidades
#               Total:    10 subunidades
#
#       El vendedor ingresa 4 unidades en la celda de Venta.
#       El sistema valida lo ingresado:
#                 4 <= (4 + 0)
#       El sistema actualiza las cantidades de retorno:
#               Retorno:  0  subunidades
#               Venta:    4  subunidades
#               Prestamo: 6  subunidades
#               Total:    10 subunidades
#
#

Característica: Editar subunidades
	Como prevendedor
	Quiero modificar la cantidad de subunidades de un producto envase para un tipo de pedido envase
	Para gestionar los envases del cliente

Antecedentes:
	Dado que estoy en la tarjeta de envases
	Y se seleccionó la tarjeta de un producto envase de la lista de envases
	
Escenario: N°1 - La cantidad es mayor a la disponible para retorno
	Cuando se modifican las subunidades del producto envase para cualquier tipo de pedido de envase
	Y la cantidad ingresada supera a la cantidad de subunidades actual de retorno + las cantidad de subunidades inicial del item que se está modificando 
    Entonces el sistema mostrará el mensaje "La cantidad excede a las disponibles para retorno"
	Y marcará las casillas con error en rojo 
    

Esquema del escenario: N°2 - La cantidad es menor o igual a la disponible para retorno
	Cuando se modifican las subunidades para cualquier tipo de pedido de envase
	Y la cantidad ingresada no supera a la cantidad de subunidades actual de retorno + la cantidad de subunidades inicial del item que se está modificando 
    Y el tipo de pedido de envase es valorizado = '<_esValorizado>'
	Entonces el sistema registrará las subunidades ingresadas para el tipo de pedido de envase 
    Y actualizará las unidades para retorno 
	Y '<actualiza>' los indicadores del pedido
    Y permanecerá en la tarjeta de envases

Ejemplos:
|_esValorizado| actualiza      |
|   true	  | actualizará    |   
|	false	  | no actualizará | 
  
# Cuando se informa una cantidad mayor a cero se agrega/modifica una línea en al tipo de pedido correspondiente.
# Si el tipo de pedido es valorizado, se copia la condición de pago del ítem a retornar.
# Si se informan unidades y subunidades en cero, se quita el producto del tipo de pedido correspondiente (venta, préstamo)