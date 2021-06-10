@Calculo de fecha de entrega @Sprint3

# Si por configuración no se permite operar 
# fuera de frecuencia (esFrecuenciaAbierta=false) y el cliente 
# ingresado no tiene una visita programada para la fecha del dispositivo, 
# se debe dar aviso que el cliente está fuera de frecuencia 
# y no se debe mostrar la información del cliente.
# Si no tiene fecha de entrega informada para la fecha en que se lo está visitando, 
# el sistema informa, “no tiene fecha de entrega informada” 
# y no se muestra la información del cliente
# Requiere parámetro que indique si la frecuencia está abierta o cerrada. “esFrecuenciaAbierta”
# Requiere las visitas planificadas para el cliente. “visitasPlanificadas”
# Requiere las fechas de entrega calculadas. “fechasEntrega”
# La fecha de entrega es la asociada a la fechasEntrega.fechaVisita = fecha del dispositivo 

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
	Dado que se ingresó un cliente para tomarle un pedido
    Cuando no tiene una fecha de entrega calculada para día de visita igual a la fecha del dispositivo 
    Entonces el sistema mostrará el mensaje “El cliente no tiene fecha de entrega programada” 
    Y no mostrará información del cliente.
