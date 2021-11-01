# language: es

@Pedido @Iniciativas @Sprint15

# cantidadIniciativasHabilitadas = cantidad de _iniciativasHabilitadas para el cliente en estado "Pendiente", aquellas que no fueron procesadas en ningun pedido  y cuyo _vencimiento sea >= a la fecha del dispositivo 
#                                  + cantidad de _iniciativasHabilitadas para el cliente en estado "Cancelado" o "Ejecutado" en el pedido actual
# Ejemplo: cantidad de iniciativas "Pendiente" = 20
#          cantidad de iniciativas "Ejecutadas" en el pedido actual = 4
#          cantidad de iniciativas "Canceladas" en el pedido actual = 1
#
#  cantidadIniciativasHabilitadas = 20 + 4 + 1 = 25
#  cantidadIniciativasProcesadas  = 4 + 1 = 5
#
#  Se muestra en la tarjeta  "5 de 25 items" 

Característica: Mostrar iniciativas.
	Como prevendedor
	Quiero saber si existen iniciativas habilitadas para el cliente
	Para poder ofrecer los productos de las iniciativas al cliente

Escenario: N°1 – Mostrar tarjeta Iniciativas
    Dado un cliente seleccionado
    Cuando accedo al paso 1 - Planeacion
    Entonces el sistema mostrará la tarjeta de Iniciativas plegada con la cantidadIniciativasProcesadas para el pedido actual
    Y la cantidadIniciativasHabilitadas para el pedido actual 
    Y si cantidadIniciativasProcesadas > 0 mostrará el borde de la tarjeta en color verde