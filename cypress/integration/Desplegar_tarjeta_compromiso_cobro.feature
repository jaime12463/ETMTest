# language: es
@Compromiso_Cobro @Sprint14 @Sprint23 @Sprint29

Característica: Ver deuda del cliente
    Como prevendedor 
    quiero ver la deuda pendiente del cliente
    para informarle al cliente cuanto adeuda

#UX sprint14: https://www.figma.com/file/a6j0OiJCxmdy9DupAaFiac/Order-taking-SFA---Compartida-con-Hasar?node-id=0%3A1

Antecedentes:
    Dado que estoy en paso 3 - otros


Esquema del escenario: N°1 - Compromiso de cobro en paso otros
    Dado que el cliente tiene partidas generadas
    Y el cliente habilita el compromiso de cobro
    Cuando se despliega la tarjeta
    Entonces el sistema mostrará en la tarjeta compromiso de cobro el listado de documentos ordenados por vencimiento ascendente
    Y mostrará de título compromiso de cobro
    Y mostrará el control para registrar compromiso de cobro
    Y mostrará el icono que indica la leyenda de colores: verde partidas abiertas, amarrillo partidas a punto de vencer, rojo partidas vencidas
    Y mostrará el límite de crédito
    Y mostrará el disponible = límite crédito menos la suma de los saldos de los documentos pendientes 
    Y mostrará la deuda pendiente = suma de los saldos de los documentos pendientes 
    Y si habilita compromiso de cobro, compromiso de cobro = suma de los compromisos de cobro registrados en visitas anteriores.
    Y mostrará para cada documento el número, fecha de vencimiento, monto
    Y mostrará cada documento en '<color>' según '<condicion>'

Ejemplos:
Ejemplos:
    | color     |  condicion                                                                                                                                                |
    |  Verde    | si diasWarningDesde y diasWarningHasta >= 0 y la fecha del dispositivo < fecha de vencimiento - diasWarningDesde                                          |
    |  Verde    | si diasWarningDesde y diasWarningHasta < 0 y la fecha del dispositivo < fecha de vencimiento + diasWarningDesde                                           |
    |  Amarillo | si diasWarningDesde y diasWarningHasta >= 0 y fecha de vencimiento - diasWarningDesde <= fecha del dispositivo <= fecha de vencimiento + diasWarningHasta |
    |  Amarillo | si diasWarningDesde y diasWarningHasta < 0 y fecha de vencimiento + diasWarningDesde <= fecha del dispositivo <= fecha de vencimiento + diasWarningHasta  |
    |  Rojo     | si la fecha del dispositivo > fecha de vencimiento + diasWarningHasta                                                                                     |
                                                                            

#En la lista mostrar número de documento, vencimiento y saldo 

#Comentario:
#Si no hay un compromiso de cobro registrado durante la visita, el monto aparece inicializado en cero, caso contrario, aparece inicializado con el monto del compromiso de cobro en curso, para realizar la edición del mismo.
#Cuando se registra un compromiso de cobro se debe informar: ID, codigoCliente, fecha y hora de registro, fecha de entrega, monto, tipo de documento 
#Monto del compromiso de cobro <= suma de saldos – compromisos de cobro registrados ya registrados
#Tiene documentos pendientes con saldos
#$5000
#$3000
#Y tiene registrado un compromiso de cobro en una visita anterior por $6000

Escenario: N°2 - Compromiso de cobro válido
    Dado que el cliente tiene una deuda mayor a $2000
    Cuando registro un compromiso de cobro por 2000 
    Entonces el sistema registrará el compromiso de cobro

Escenario: N°3 - Compromiso de cobro no válido
    Dado que el cliente tiene una deuda igual a $2000
    Cuando registro un compromiso de cobro por $2001 
    Entonces el sistema mostrará el mensaje "El monto no puede ser mayor a la deuda registrada"

Escenario: N°4 - Compromiso de cobro deshabilitado
    Dado que la ruta tiene _habilitaCompromisoDeCobro = false
    Cuando se despliega la tarjeta
    Entonces el sistema mostrará la tarjeta según mostrar partidas generadas