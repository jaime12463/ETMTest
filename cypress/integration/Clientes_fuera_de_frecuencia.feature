# language: es

Característica: clientes fuera de frecuencia
	Como Prevendedor
	Quiero ingresar un pedido para un cliente fuera de frecuencia
	Para xx

@Test_dispositivo_1
Esquema del escenario: N°1 - Visita a cliente en frecuencia
	Dado que por configuración la frecuencia de venta "<esFrecuenciaAbierta>"
	Cuando ingreso un cliente que tiene una visita planificada para la fecha actual 
	Entonces el sistema habilita el ingreso del pedido
Ejemplos:
|esFrecuenciaAbierta| 
|       true        |
|       false       |

@Test_dispositivo_2		
Esquema del escenario: N°2 - Visita a cliente fuera de frecuencia
	Dado que por configuracion la frecuencia de venta "<esFrecuenciaAbierta>"
	Cuando ingreso un cliente que no tiene una visita planificada para la fecha actual
	Entonces el sistema realiza "<Acción>"
Ejemplos:
| esFrecuenciaAbierta | Acción                                                                     |                                                                                                 
|        true         | Habilita el ingreso del pedido                                             |
|        false        | Muestra mensaje “El cliente está fuera de frecuencia” y no habilita pedido |