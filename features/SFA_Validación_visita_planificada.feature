@Clientes @Validar_frecuencia @Validar_visita_planificada @Sprint4

# Solo poder seleccionar un cliente fuera de frecuencia si tiene 
# una visita planificada posterior a la fecha actual del dispositivo. 
# No cuentan las fechas anteriores porque el cliente puede estar 
# dado de baja a partir de la fecha actual

# UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA_S4?node-id=1%3A11&scaling=min-zoom&page-id=0%3A1

Característica: Validar visita planificada
    Como prevendedor
    Quiero ingresar un cliente fuera de frecuencia que tenga al menos una visita planificada mayor a la fecha actual
    Para evitar ingresar pedidos a clientes que no serán visitados

Antecedentes:
    Dado que la frecuencia se encuentra abierta

Escenario: N°1 - Cliente con visita planificada posterior a fecha de dispositivo
    Cuando ingreso un cliente que tiene al menos una visita planificada mayor a la fecha actual
    Entonces el sistema permitirá ingresar pedidos al cliente

Escenario: N°2 - Cliente sin visita planificada posterior a fecha del despositivo
    Cuando ingreso un cliente que no tiene una fecha de visita planificada mayor a la fecha actual
    Entonces el sistema no mostrará información del cliente
    Y mostrará el mensaje "Cliente fuera de frecuencia"