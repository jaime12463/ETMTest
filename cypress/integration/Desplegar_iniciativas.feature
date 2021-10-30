# language: es

@Pedido @Iniciaticas @Sprint15


Característica: Mostrar iniciativas.
	Como prevendedor
	Quiero visualizar las iniciativas habilitadas para el cliente
	Para conocer el listado de las iniciativas del cliente y el status de cada una de ellas

Esquema del escenario: N°1 – Desplegar tarjeta Iniciativas
    Dado que estoy en paso 1 - Planeación
    Cuando se despliega la tarjeta de iniciativas
    Entonces el sistema mostrará un listado de las _iniciativas del cliente  ordenadas por _secuencia
    Y cuya _fechaVencimiento sea >= a la fecha del dispositivo 
    Y el status de la iniciatica es = '<_status>' 
    Y '<procesadaEnPedidoActual>'
    Y '<mostraraIniciativa>' mostrará la iniciativa con la _descripcionLarga con el detalle plegado
    Y el borde en color = '<_colorIniciativa>'
    el límite de crédito, el disponible = límite crédito menos la suma de los saldos de los documentos pendientes, la lista de los documentos pendientes ordenados por vencimiento ascendente, la deuda pendiente = suma de los saldos de los documentos pendientes y compromiso de cobro = suma de los compromisos de cobro registrados en visitas anteriores.

Ejemplos:
|_status  |procesadaEnPedidoActual|mostrarIniciativa|colorIniciativa|
|         |                       |si               |negro          |
|ejecutada|si                     |si               |verde          |
|cancelada|si                     |si               |rojo           |
|ejecutada|no                     |no               |               |
|cancelada|no                     |no               |               |

#El ejemplo de status vacío se refiere a status pendiente de la iniciativa.
