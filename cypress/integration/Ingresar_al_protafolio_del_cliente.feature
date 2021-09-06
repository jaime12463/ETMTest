# language: es

@Pedido @Ver_portafolio @Sprint8 @Sprint10 @Sprint11

# Sprint11: si el tipo de pedido _validaPresupuesto, se muestran los productos de _presupuestoTipoPedido
# cuyo _tipoPedido corresponda con el tipo de pedido en curso y tengan presupuesto > 0

# sprint 10 UX: https://www.figma.com/proto/uBjkg7VM1HtzllsNIvkLKn/SFA_S9_S10_S11?node-id=702%3A2&scaling=min-zoom&page-id=501%3A2&starting-point-node-id=702%3A2
# Portafolio según tipo de producto habilitado para el tipo de pedido

# sprint 8 UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3

# El ingreso del portafolio es por la lupa del producto.
# Del portafolio se muestra código de producto, descripción, precio vigente del producto.


Característica: Ingresar al portafolio del cliente
    Como Prevendedor
    Quiero ver el portafolio vigente del cliente
    Para agregar productos al pedido

Escenario: N°1 - Ver portafolio del cliente cuando no valida presupuesto
    Dado que el prevendedor ingresó un cliente que tiene habilitado el ingreso de productos al pedido
    Y seleccionó un pedido cuyo _tipoPedido tiene _validaPresupuesto = false
    Cuando selecciona ver portafolio
    Entonces el sistema mostrará los productos del portafolio vigente asignado al cliente cuyo _tipoProducto sea el _tipoProductosHabilitados para el tipo de pedido en curso

Escenario: N°2 - Ver portafolio del cliente cuando valida presupuesto y no está vigente
    Dado que el prevendedor ingresó un cliente que tiene habilitado el ingreso de productos al pedido
    Y seleccionó un pedido cuyo _tipoPedido tiene _validaPresupuesto = true
    Y el _presupuestoTipoPedido para el _tipoPedido en curso tiene presupuesto no vigente
    Y _tieneProductosHabilitados = false
    Cuando selecciona ver portafolio
    Entonces el sistema mostrará los productos del portafolio vigente asignado al cliente cuyo _tipoProducto sea el _tipoProductosHabilitados para el tipo de pedido en curso

Escenario: N°3 - Ver portafolio del cliente cuando valida presupuesto y no tiene lista de productos habilitados
    Dado que el prevendedor ingresó un cliente que tiene habilitado el ingreso de productos al pedido
    Y seleccionó un pedido cuyo _tipoPedido tiene _validaPresupuesto = true
    Y el _presupuestoTipoPedido para el _tipoPedido en curso tiene presupuesto vigente
    Y _tieneProductosHabilitados = false
    Cuando selecciona ver portafolio
    Entonces el sistema mostrará los productos del portafolio vigente asignado al cliente cuyo _tipoProducto sea el _tipoProductosHabilitados para el tipo de pedido en curso
    Y tengan _presupuesto, menos los productos que ya se registraron para ese tipo de pedido para cualquier cliente de la ruta, mayor a 0

Escenario: N°4 - Ver portafolio del cliente cuando valida presupuesto y tiene lista de productos habilitados
    Dado que el prevendedor ingresó un cliente que tiene habilitado el ingreso de productos al pedido
    Y seleccionó un pedido cuyo _tipoPedido tiene _validaPresupuesto = true
    Y el _presupuestoTipoPedido para el _tipoPedido en curso tiene presupuesto vigente
    Y _tieneProductosHabilitados = true
    Cuando selecciona ver portafolio
    Entonces el sistema mostrará los _productosHabilitados del portafolio asignado al cliente 
    Y tengan _presupuesto, menos los productos que ya se registraron para ese tipo de pedido para cualquier cliente de la ruta, mayor a 0
