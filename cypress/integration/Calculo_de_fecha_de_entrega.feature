# language: es

Característica: cálculo de fecha de entrega
	Como prevendedor
	Quiero ver la fecha de entrega del cliente según la fecha del dispositivo 
	Para informar al cliente sobre su pedido

@Test_dispositivo_1
Escenario: N°1 – Cliente con fecha de entrega calculada
	Dado que se ingresó un cliente para tomarle un pedido
	Cuando tiene una fecha de entrega calculada para día de visita igual a la fecha del dispositivo 
    Entonces el sistema habilitará el ingreso del pedido 
    Y mostrará la fecha de entrega

@Test_dispositivo_2
Escenario: N°2 – Cliente sin fecha de entrega calculada
	Dado que se ingresó un cliente para tomarle un pedido con fecha distinta
    Cuando no tiene una fecha de entrega calculada para día de visita igual a la fecha del dispositivo 
    Entonces el sistema mostrará el mensaje “El cliente no tiene fecha de entrega programada” 
    Y no mostrará información del cliente