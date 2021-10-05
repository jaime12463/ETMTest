# language: es

@Pedido @Ingresar_Orden_de_compra @Sprint11 @Sprint13

# Cuando tengamos al menos un pedido valorizado en curso se debe poder asociar una orden de compra al pedido
# es opcional el ingreso.
# Cuando se ingrese una OC, la misma debe guardarse en la cabecera de todos los pedidos a guardar
# cuyo _tipoPedido sea _esValorizado = true

# Sprint11 UX: https://www.figma.com/proto/uBjkg7VM1HtzllsNIvkLKn/SFA_S9_S10_S11?node-id=1256%3A2&scaling=scale-down&page-id=1075%3A2&starting-point-node-id=1256%3A2

Escenario: N°1 - Mostrar tarjeta orden de compra
    Dado estoy en paso 3 - otros
    Y _habilitaOrdenDeCompra = true
    Y hay productos un _tipoPedido que _esValorizado = true
    Cuando se muestran las tarjetas
    Entonces el sistema mostrará la tarjeta de orden de compra con el control para ingresar el código de orden de compra
    Y el icono de ingreso correcto oculto

Escenario: N°2 - Ingresar orden de compra
    Dado que se ingresó un código de orden de compra
    Cuando se acepta el ingreso del código
    Entonces el sistema guardará en memoria el código de orden de compra ingresado
    Y mostrará en la tarjeta el icono de ingreso correcto