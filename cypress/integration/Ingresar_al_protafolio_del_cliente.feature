# language: es

@Pedido @Ver_portafolio @Sprint8 @Sprint10

# sprint 10 UX: https://www.figma.com/proto/uBjkg7VM1HtzllsNIvkLKn/SFA_S9_S10_S11?node-id=702%3A2&scaling=min-zoom&page-id=501%3A2&starting-point-node-id=702%3A2
# Distintos portafolios según tipo de pedido (Venta, Canje)

# sprint 8 UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3

# El ingreso del portafolio es por la lupa del producto.
# Del portafolio se muestra código de producto, descripción, precio vigente del producto.


Característica: Ingresar al portafolio del cliente
    Como Prevendedor
    Quiero ver el portafolio vigente del cliente
    Para agregar productos al pedido

Escenario: N°1 - Ver portafolio del cliente de un tipo de pedido valorizado
    Dado que el prevendedor ingresó un cliente que tiene habilitado el ingreso de productos al pedido cuyo tipo de pedido es _valorizado = true
    Cuando selecciona ver portafolio
    Entonces el sistema mostrará los productos del portafolio vigente asignado al cliente cuyo _tipoPedido se encuentre habilitado y el tipo de pedido es _valorizado = true

Escenario: N°2 - Ver portafolio del cliente de un tipo de pedido no valorizado
    Dado que el prevendedor ingresó un cliente que tiene habilitado el ingreso de productos al pedido cuyo tipo de pedido es _valorizado = false
    Cuando selecciona ver portafolio
    Entonces el sistema mostrará los productos del portafolio vigente asignado al cliente cuyo _tipoPedido se encuentre habilitado y el tipo de pedido es _valorizado = false