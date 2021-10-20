# language: es
@Compromiso_Cobro @Sprint14

Característica: Ver deuda del cliente
    Como prevendedor 
    quiero ver la deuda pendiente del cliente
    para informarle al cliente cuanto adeuda

#UX sprint14: https://www.figma.com/file/a6j0OiJCxmdy9DupAaFiac/Order-taking-SFA---Compartida-con-Hasar?node-id=0%3A1

Antecedentes:
    Dado que estoy en paso 3 - otros

Escenario: N°1 – Desplegar tarjeta compromiso de cobro
    Cuando selecciono desplegar tarjeta
    Entonces el sistema mostrará el control para ingresar el monto a saldar de compromiso de pago,
    el límite de crédito, el disponible = límite crédito menos la suma de los saldos de los documentos pendientes, la lista de los documentos pendientes ordenados por vencimiento ascendente, la deuda pendiente = suma de los saldos de los documentos pendientes y compromiso de cobro = suma de los compromisos de cobro registrados en visitas anteriores.

#En la lista mostrar número de documento, vencimiento y saldo 


#Comentario:
#Si no hay un compromiso de cobro registrado durante la visita, el monto aparece inicializado en cero, caso contrario, aparece inicializado con el monto del compromiso de cobro en curso, para realizar la edición del mismo.
#Cuando se registra un compromiso de cobro se debe informar: ID, codigoCliente, fecha y hora de registro, fecha de entrega, monto, tipo de documento 
#Monto del compromiso de cobro <= suma de saldos – compromisos de cobro registrados ya registrados
#Tiene documentos pendientes con saldos
#$5000
#$3000
#Y tiene registrado un compromiso de cobro en una visita anterior por $6000

Escenario: N°2 – Compromiso de cobro válido
    Dado que el cliente tiene una deuda mayor a $2000
    Cuando registro un compromiso de cobro por 2000 
    Entonces el sistema registrará el compromiso de cobro

Escenario: N°3 – Compromiso de cobro no válido
    Dado que el cliente tiene una deuda igual a $2000
    Cuando registro un compromiso de cobro por $2001 
    Entonces el sistema mostrará el mensaje "El monto no puede ser mayor a la deuda registrada"
