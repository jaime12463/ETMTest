# language: es

@Pedido @Ver_portafolio @Sprint8

# sprint 8 UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3

# El ingreso del portafolio es por la lupa del producto.
# Del portafolio se muestra código de producto, descripción, precio vigente del producto.

Característica: Ingresar al portafolio del cliente
    Como Prevendedor
    Quiero ver el portafolio vigente del cliente
    Para agregar productos al pedido

Escenario: N°1 - Ver portafolio del cliente
    Dado que el prevendedor ingresó un cliente que tiene habilitado el ingreso de productos al pedido
    Cuando selecciona ver portafolio
    Entonces el sistema mostrará el portafolio vigente asignado al cliente.
