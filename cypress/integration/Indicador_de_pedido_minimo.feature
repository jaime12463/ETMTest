# language: es

@Pedido @Inidicador_minimo @Sprint8

# sprint 8 UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3

Característica: Indicador de pedido mínimo
    Como prevendedor cuando estoy en la pantalla del ingreso del pedido
    Quiero ver el avance del pedido mínimo del cliente
    Para saber si le puedo registrar un pedido

Escenario: N°1: Indicador de pedido mínimo cumplido
    Dado que el cliente tiene monto de venta mínima mayor a cero
    Y para la fecha de entrega del pedido se informa pedido mínimo cumplido
    Cuando estoy en la pantalla del pedido
    Entonces el sistema mostrará el indicador como cumplido

Escenario: N°2 Ver avance del pedido mínimo
    Dado que el cliente tiene <montoVentaMínima> mayor a cero
    Y para la fecha de entrega del pedido se informa pedido mínimo no cumplido
    Cuando estoy en la pantalla de ingreso del pedido
    Entonces el sistema mostrará el total del indicador igual al pedido mínimo 
    Y el avance según suma de los montos de los pedidos para la misma fecha de entrega más el total del pedido en curso

#sumaPedidos montoVentaMínima Avance	Texto
#0		100		0%		0/100		rojo
#99		100		99%		99/100		rojo
#100		100		100%		100/100	verde
#101		100		100%		101/100	verde

Escenario: N°3: Ocultar indicador de pedido mínimo
    Dado que el cliente tiene monto de venta mínima igual a cero
    Cuando estoy en la pantalla de ingreso del pedido
    Entonces el sistema no mostrará el indicador de pedido mínimo 
