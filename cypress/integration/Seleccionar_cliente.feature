# language: es

@Clientes @Validar_cliente @Sprint7 @Sprint8

# sprint 7 UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA_S4?node-id=86%3A3&scaling=scale-down&page-id=86%3A2

# sprint 8 UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3

Característica: Seleccionar cliente
	Como prevendedor 
	Quiero teclear un código de cliente
	Para registrar un pedido


Escenario: N°1 – Cliente inexistente
	Dado que se cuenta con una lista de clientes 
	Cuando el usuario ingresa un código de cliente que no está en la lista de clientes 
	Entonces el sistema mostrará el mensaje: “El código ingresado no corresponde a un cliente”

Escenario: N°2 – Crear pedido a cliente con visita planificada para la fecha actual
	Cuando el cliente tiene visita para la fecha actual 
	Y el cliente tiene fecha de entrega informada para la fecha de visita igual a la fecha del dispositivo
	Y tiene en su portafolio productos con precio vigente a la fecha de entrega calculada
	Entonces el sistema mostrará la pantalla de ingreso del pedido con la información del cliente

Escenario: N°3 – Crear pedido en ruta con frecuencia abierta
	Cuando _esFrecuenciaAbierta = true 
	Y el cliente tiene alguna visita planificada para una fecha de visita >= a la fecha actual
	Y el cliente tiene fecha de entrega informada para la fecha de visita igual a la fecha del dispositivo
	Y tiene en su portafolio productos con precio vigente a la fecha de entrega calculada
	Entonces el sistema mostrará la pantalla de ingreso del pedido con la información del cliente

Escenario: N°4 – El cliente no tiene visita programada en frecuencia
	Cuando _esFrecuenciaAbierta = false  
	Y el cliente no tiene visita planificada para ninguna fecha 
	Entonces el sistema mostrará el mensaje “El cliente no tiene visita planificada” 
	Y permanecerá en la pantalla

Escenario: N°5 – El cliente está fuera de frecuencia
	Cuando _esFrecuenciaAbierta = false  
	Y el cliente no tiene una visita planificada para la fecha actual 
	Y tiene al menos una visita planificada para fecha mayor a la fecha actual
	Entonces el sistema mostrará el mensaje “El cliente está fuera de frecuencia” 
	Y permanecerá en la pantalla

Escenario: N°6 – El cliente no tiene fecha de entrega para la fecha de visita
	Cuando el cliente no tiene fecha de entrega para la fecha de visita 
	Entonces el sistema mostrará el mensaje “El cliente no tiene fecha de entrega informada para la fecha actual” 
	Y permanecerá en la pantalla

Escenario: N°7 – El cliente no tiene portafolio para la fecha de entrega
	Cuando el cliente no tiene portafolio para la fecha de entrega calculada
	Entonces El sistema mostrará el mensaje “El cliente no tiene portafolio vigente para la fecha de entrega informada” 
	Y permanecerá en la pantalla

