# language: es

@Pedido @Totales @Sprint12

# sprint 12 UX: https://www.figma.com/proto/4sKBs7Q0Ap07bdHIXsuukt/SFA_S12_S13_S14?node-id=871%3A5542&scaling=scale-down&page-id=871%3A5541&starting-point-node-id=871%3A5542

Característica: Calcular total del pedido de la visita
    Como prevendedor con visita al cliente en curso
    Quiero saber el total acumulado en valor monetario de la visita
    Para informarle al cliente

Escenario: N°1 - Calcular total
    Dado que se ingresan productos en pedidos cuyo _tipoPedido es _esValorizado = true
    Y se ingresó un compromiso de cobro
    Cuando se calculan los precios y totales
    Entonces el sistema calculará el total del pedido de la visita como la suma
    de los totales de los pedidos cuyo _tipoPedido es _esValorizado = true
    más el monto del compromiso de cobro ingresado.

# Se contemplan para el calculo los pedidos a credito y a contado