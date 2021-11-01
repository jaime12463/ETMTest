# language: es

@Pedido @Iniciativas @Sprint15


Característica: Mostrar iniciativas.
	Como prevendedor
	Quiero visualizar las iniciativas habilitadas para el cliente
	Para conocer el listado de las iniciativas del cliente y el status de cada una de ellas

Esquema del escenario: N°1 – Desplegar tarjeta Iniciativas
    Dado que estoy en paso 1 - Planeación
    Cuando se despliega la tarjeta de iniciativas
    Entonces el sistema mostrará un listado de las _iniciativasHabilitadas del cliente  ordenadas por _secuencia en forma ascendente
    Y cuya _Vencimiento sea >= a la fecha del dispositivo 
    Y el status de la iniciativa es = '<status>' 
    Y '<procesadaEnPedidoActual>' fue procesada para el pedido actual
    Y '<mostrarIniciativa>' mostrará la iniciativa con el _nombreActividad con el detalle plegado
    Y el borde del item en color = '<colorIniciativa>'
   
Ejemplos:
|status   |procesadaEnPedidoActual|mostrarIniciativa|colorIniciativa|
|         |                       |si               |negro          |
|ejecutada|si                     |si               |verde          |
|cancelada|si                     |si               |rojo           |
|ejecutada|no                     |no               |               |
|cancelada|no                     |no               |               |

#El ejemplo de status vacío se refiere a status pendiente de la iniciativa.
