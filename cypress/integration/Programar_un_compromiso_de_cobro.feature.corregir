# language: es

@Compromiso_Cobro @Sprint9

Característica: Programar un compromiso de cobro
Como prevendedor 
Quiero programar un compromiso de cobro 
Para que el entregador pueda realizar el cobro

#Comentario:
#Si no hay un compromiso de cobro registrado durante la visita, el monto aparece inicializado en cero, caso contrario, aparece inicializado con el monto del compromiso de cobro en curso, para realizar la edición del mismo.
#Cuando se registra un compromiso de cobro se debe informar: ID, codigoCliente, fecha y hora de registro, fecha de entrega, monto, tipo de documento 
#Monto del compromiso de cobro <= suma de saldos – compromisos de cobro registrados ya registrados
#Tiene documentos pendientes con saldos
#$5000
#$3000
#Y tiene registrado un compromiso de cobro en una visita anterior por $6000

#UX sprint9: https://www.figma.com/proto/uBjkg7VM1HtzllsNIvkLKn/SFA_S9_S10_S11?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3

Escenario N°1 – Compromiso de cobro válido
Cuando registro un compromiso de cobro por 2000 
Entonces el sistema registrará el compromiso de cobro

Escenario N°1 – Compromiso de cobro no válido
Cuando registro un compromiso de cobro por 2001 
Entonces el sistema mostrará el mensaje “El monto no puede ser mayor a la deuda registrada”
