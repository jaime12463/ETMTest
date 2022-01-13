# language: es

@Pedido @Validar_unidades @Sprint12

# sprint 12 UX:https://www.figma.com/proto/4sKBs7Q0Ap07bdHIXsuukt/SFA_S12_S13_S14?node-id=871%3A5542&scaling=scale-down&page-id=871%3A5541&starting-point-node-id=871%3A5542
# 
# Sprint 12:
# Validación de unidades disponibles para retorno
# Cuando se modifica la cantidad de unidades de un producto envase de un tipo de pedido envase se debe validar de
# que la cantidad ingresada no supere las unidades disponibles para retorno
#
# Ejemplo 1: 
#       producto envase  17101 
#               Retorno:  6 unidades
#               Venta:    0 unidades
#               Prestamo: 0 unidades
#               Total:    6 unidades
#        
#       El vendedor ingresa 2 unidades en la celda de Préstamo
#       El sistema valida que las unidades ingresadas para Préstamo son menores a la 
#                cantidad actual de unidades de Retorno + cantidad de unidades inicial de la celda de Prestamo
#       Cantidad de unidades ingresadas para Préstamo= 2
#       Cantidad actual de unidades de Retorno = 6    
#       cantidad de unidades inicial de la celda de Prestamo = 0
#               2 <= (6 + 0)
#       El sistema actualiza las cantidades de Retorno:
#               Retorno:  4 unidades
#               Venta:    0 unidades
#               Prestamo: 2 unidades
#               Total:    6 unidades  
# 
#       El vendedor modifica las unidades en la celda de Préstamo ingresando el valor 3.
#       El sistema valida lo ingresado:
#                 3 <= (4 + 2)
#       El sistema actualiza las cantidades de Retorno:
#               Retorno:  3 unidades
#               Venta:    0 unidades
#               Prestamo: 3 unidades
#               Total:    6 unidades
# 
# Ejemplo 2: 
#       producto envase  19345 
#               Retorno:  4 unidades
#               Venta:    0 unidades
#               Prestamo: 1 unidades
#               Total:    5 unidades
#
#       El vendedor ingresa 2 unidades en la celda de Venta.
#       El sistema valida lo ingresado:
#                 3 <= (4 + 0)
#       El sistema actualiza las cantidades de retorno:
#               Retorno:  1 unidades
#               Venta:    3 unidades
#               Prestamo: 1 unidades
#               Total:    6 unidades
#
#

Característica: Editar unidades
	Como prevendedor
	Quiero modificar la cantidad de unidades de un producto envase para un tipo de pedido envase
	Para gestionar los envases del cliente

Antecedentes:
	Dado que estoy en la tarjeta de envases
	Y se seleccionó la tarjeta de un producto envase de la lista de envases
	
Escenario: N°1 - La cantidad es mayor a la disponible para retorno
	Cuando se modifican las unidades del producto envase para cualquier tipo de pedido de envase
	Y la cantidad ingresada supera a la cantidad de unidades actual de retorno + las cantidad de unidades inicial del item que se está modificando 
    Entonces el sistema mostrará el mensaje "La cantidad excede a las disponibles para retorno"
	Y marcará las casillas con error en rojo 
    

Esquema del escenario: N°2 - La cantidad es menor o igual a la disponible para retorno
	Cuando se modifican las unidades para cualquier tipo de pedido de envase
	Y la cantidad ingresada no supera a la cantidad de unidades actual de retorno + la cantidad de unidades inicial del item que se está modificando 
    Y el tipo de pedido de envase es valorizado = '<_esValorizado>'
	Entonces el sistema registrará las unidades ingresadas para el tipo de pedido de envase 
    y actualizará las unidades para retorno 
	y '<actualiza>' los indicadores del pedido
    y permanecerá en la tarjeta de envases

Ejemplos:
|_esValorizado| actualiza      |
|   true	  | actualizará    |   
|	false	  | no actualizará | 
  
# Cuando se informa una cantidad mayor a cero se agrega/modifica una línea en al tipo de pedido correspondiente.
# Si el tipo de pedido es valorizado, se copia la condición de pago del ítem a retornar.
# Si se informan unidades y subunidades en cero, se quita el producto del tipo de pedido correspondiente (venta, préstamo)