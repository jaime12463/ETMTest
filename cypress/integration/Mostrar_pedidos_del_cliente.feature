# language: es

@Pedido @Pedidos_realizados @Sprint8 @Sprint10

# sprint 8 UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3

# Sprint 10: se muestra la descripción del tipo de pedido correspondiente.
# sprint 10 UX: https://www.figma.com/proto/uBjkg7VM1HtzllsNIvkLKn/SFA_S9_S10_S11?node-id=702%3A2&scaling=min-zoom&page-id=501%3A2&starting-point-node-id=702%3A2


Característica: Ver pedidos del cliente
	Como prevendedor 
	Quiero ver los pedidos realizados al cliente
	Para saber qué actividades tengo que realizarle

Escenario: N°1 – El cliente tiene pedidos realizados 
    Dado que se registraron pedidos al cliente 
    Cuando ingreso a ver los pedidos realizados
    Entonces el sistema mostrará en la lista, los pedidos realizados al cliente ordenados por fecha y hora de creación 

#El listado debe mostrar: la _descripcion del tipo de pedido (“Venta”, "Canje"), fecha de entrega, monto del pedido

Escenario: N°2 -El cliente no tiene pedidos realizados
    Dado que no se registraron pedidos al cliente
    Cuando ingreso a ver los pedidos realizados
    Entonces el sistema mostrará la lista de pedidos vacía
