@Clientes @Ver_actividad @Ver_pedidos @Sprint4

# Al ingresar a un cliente, si ya posee pedidos guardados, 
# se debe mostrar la actividad realizada.

# UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA_S4?node-id=1%3A11&scaling=min-zoom&page-id=0%3A1

Característica: ver actividad realizada del cliente
    Como prevendedor
    Quiero ver la actividad realizada en el cliente 
    Para saber qué actividades ya fueron realizadas.

Escenario: N°1 – El cliente tiene pedidos
    Dado que se registraron pedidos a un cliente
    Cuando ingreso el cliente en el sistema
    Entonces el sistema me mostrará la cantidad de pedidos realizados a ese cliente

Escenario: N°2 -El cliente no tiene actividad registrada
    Dado que se no se registró pedido
    Cuando se ingresa el cliente en el sistema
    Entonces el sistema no mostrará actividad realizada.
