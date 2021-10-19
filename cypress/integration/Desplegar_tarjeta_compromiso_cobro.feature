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
#    Dado que _habilitaCompromisoCobro = true
    Cuando selecciono desplegar tarjeta
    Entonces el sistema mostrará el control para ingresar el monto a saldar de compromiso de pago,
    el límite de crédito, el disponible = límite crédito menos la suma de los saldos de los documentos pendientes, la lista de los documentos pendientes ordenados por vencimiento ascendente, la deuda pendiente = suma de los saldos de los documentos pendientes y compromiso de cobro = suma de los compromisos de cobro registrados en visitas anteriores.

#En la lista mostrar número de documento, vencimiento y saldo 

# Escenario: N°2 - La ruta tiene deshabilitado el compromiso de cobro
#     Dado que _habilitaCompromisoCobro = false
#     Cuando selecciono desplegar tarjeta
#     Entonces el sistema mostará el límite de crédito, el disponible = límite crédito menos la suma de los saldos de los documentos pendientes, la lista de los documentos pendientes ordenados por vencimiento ascendente, la deuda pendiente = suma de los saldos de los documentos pendientes y compromiso de cobro = suma de los compromisos de cobro registrados en visitas anteriores
#     Y ocultará el control para ingresar monto de compromiso de cobro.