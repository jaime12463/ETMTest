# language: es
@Compromiso_Cobro @Sprint9

Característica: Ver deuda pendiente
    Como prevendedor 
    quiero ver la deuda pendiente del cliente
    para informarle al cliente cuanto adeuda

#UX sprint9: https://www.figma.com/proto/uBjkg7VM1HtzllsNIvkLKn/SFA_S9_S10_S11?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3

Escenario: N°1 – El cliente no tiene deuda informada
    Dado que el cliente no tiene documentos informados
    Cuando quiero ver la deuda pendiente
    Entonces el sistema mostrará la solapa de compromiso de cobro deshabilitada

Escenario: N°2 – El cliente tiene deuda informada
    Dado que el cliente tiene documentos informados
    Cuando quiero ver la deuda pendiente
    Entonces el sistema habilitará la solapa de compromiso de cobro donde mostrará el límite de crédito, el disponible = límite crédito menos la suma de los saldos de los documentos pendientes, la lista de los documentos pendientes ordenados por vencimiento ascendente, la deuda pendiente = suma de los saldos de los documentos pendientes y compromiso de cobro = suma de los compromisos de cobro registrados en visitas anteriores.

#En la lista mostrar número de documento, vencimiento y saldo 
