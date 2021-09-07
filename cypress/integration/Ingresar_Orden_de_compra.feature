# language: es

@Pedido @Ingresar_Orden_de_compra @Sprint11

# Cuando tengamos al menos un pedido valorizado en curso se debe poder asociar una orden de compra al pedido
# es opcional el ingreso.
# Cuando se ingrese una OC, la misma debe guardarse en la cabecera de todos los pedidos a guardar
# cuyo _tipoPedido sea _esValorizado = true

# Sprint11 UX: https://www.figma.com/proto/uBjkg7VM1HtzllsNIvkLKn/SFA_S9_S10_S11?node-id=1256%3A2&scaling=scale-down&page-id=1075%3A2&starting-point-node-id=1256%3A2

Escenario: N°1 - Ingresar orden de compra al pedido
    Dado que se ingresó a la asociación de orden de compra al pedido
    Cuando se ingresa un código de orden de compra
    Y se selecciona confirmar
    Entonces el sistema guardará en memoria el código de orden de compra ingresado
    Y permanecerá en el pedido