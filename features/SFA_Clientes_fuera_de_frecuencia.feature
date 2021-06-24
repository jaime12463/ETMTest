@Clientes @Validar_frecuencia @Clientes_fuera_de_frecuencia @Sprint3

# Si por configuración no se permite operar fuera de frecuencia (esFrecuenciaAbierta=false) 
# y el cliente ingresado no tiene una visita planificada para la fecha del dispositivo, 
# se debe dar aviso que el cliente está fuera de frecuencia y no se debe mostrar la información del cliente.
# Si no tiene fecha de entrega informada para la fecha en que se lo está visitando, 
# el sistema informa, “no tiene fecha de entrega informada” y no se muestra la información del cliente
# Requiere parámetro que indique si la frecuencia está abierta o cerrada. “esFrecuenciaAbierta”
# Requiere las visitas planificadas para el cliente. “visitasPlanificadas”
# Requiere las fechas de entrega calculadas. “fechasEntrega”
# La fecha de entrega es la asociada a la fechasEntrega.fechaVisita = fecha del dispositivo 

Característica: clientes fuera de frecuencia
	Como Prevendedor
	Quiero ingresar un pedido para un cliente fuera de frecuencia
	Para xx

@Test_dispositivo_1
Esquema del escenario: N°1 - Visita a cliente en frecuencia
	Dado que por configuración la frecuencia de venta <esFrecuenciaAbierta>  
	Cuando ingreso un cliente que tiene una visita planificada para la fecha actual 
	Entonces el sistema habilita el ingreso del pedido

Ejemplos:
|esFrecuenciaAbierta| 
|       true        |
|       false       |

@Test_dispositivo_2		
Esquema del escenario: N°2 - Visita a cliente fuera de frecuencia
	Dado que por configuración la frecuencia de venta <esFrecuenciaAbierta>  
	Cuando ingreso un cliente que no tiene una visita planificada para la fecha actual 
	Entonces el sistema realiza <Acción>

Ejemplos:
| esFrecuenciaAbierta | Acción                                                                     |                                                                                                 
|        true         | Habilita el ingreso del pedido                                             |
|        false        | Muestra mensaje “El cliente está fuera de frecuencia” y no habilita pedido |
