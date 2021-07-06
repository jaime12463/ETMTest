@Pedido @Validar_ingreso_pedido @Frecuencia @Sprint5
Característica: Crear un pedido
	Como prevendedor 
	Quiero crear un nuevo pedido 
	Para satisfacer las necesidades del cliente

Antecedentes:
	Dado que estoy en la visita de un cliente 
	Y le quiero registrar un pedido nuevo

Escenario: N°1 – Crear pedido a cliente con visita planificada para la fecha actual
	Cuando el cliente tiene visita para la fecha actual 
	Y el cliente tiene fecha de entrega informada para la fecha de visita igual a la fecha del dispositivo
	Y tiene en su portafolio productos con precio vigente a la fecha de entrega calculada
	Entonces el sistema mostrará la pantalla de ingreso del pedido con la fecha de entrega calculada 
	Y el portafolio vigente

Esquema del escenario: N°2 – Crear pedido en ruta con frecuencia abierta
	Cuando <esFrecuenciaAbierta> 
	Y el cliente tiene alguna visita planificada para una fecha de visita >= a la fecha actual
	Y el cliente tiene fecha de entrega informada para la fecha de visita igual a la fecha del dispositivo
	Y tiene en su portafolio productos con precio vigente a la fecha de entrega calculada
	Entonces el sistema mostrará la pantalla de ingreso del pedido con la fecha de entrega calculada 
	Y el portafolio vigente

Ejemplos:
|esFrecuenciaAbierta| 
|       true       	|

Esquema del escenario: N°3 – El cliente no tiene visitas programada en frecuencia
	Cuando <esFrecuenciaAbierta>  
	Y el cliente no tiene una visita planificada para la fecha actual
	Entonces e sistema mostrará el mensaje “El cliente no tiene visita planificada” 
	Y permanecerá en la pantalla

Ejemplos:
|esFrecuenciaAbierta| 
|       false       |

Esquema del escenario: N°4 – El cliente está fuera de frecuencia
	Cuando <esFrecuenciaAbierta>  
	Y el cliente no tiene una visita planificada para la fecha actual 
	Entonces e sistema mostrará el mensaje “El cliente está fuera de frecuencia” 
	Y permanecerá en la pantalla

Ejemplos:
|esFrecuenciaAbierta| 
|       false       |


Escenario: N°5 – El cliente no tiene fecha de entrega para la fecha de visita
	Cuando el cliente no tiene fecha de entrega para la fecha de visita 
	Entonces el sistema mostrará el mensaje “El cliente no tiene fecha de entrega informada para la fecha actual” 
	Y permanecerá en la pantalla

Escenario: N°6 – El cliente no tiene portafolio para la fecha de entrega
	Cuando el cliente no tiene portafolio para la fecha de entrega calculada
	Entonces El sistema mostrará el mensaje “El cliente no tiene portafolio vigente para la fecha de entrega informada” 
	Y permanecerá en la pantalla