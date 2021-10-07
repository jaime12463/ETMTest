# language: es

@Pedido @Ingresar_Orden_de_compra @Sprint11 @Sprint13

# Cuando tengamos al menos un pedido valorizado en curso se debe poder asociar una orden de compra al pedido
# es opcional el ingreso.
# Cuando se ingrese una OC, la misma debe guardarse en la cabecera de todos los pedidos a guardar
# cuyo _tipoPedido sea _esValorizado = true

# Sprint13 UX: https://www.figma.com/file/a6j0OiJCxmdy9DupAaFiac/Order-taking-SFA---Compartida-con-Hasar?node-id=668%3A72153

Antecedentes:
    Dado estoy en paso 3 - otros

Escenario: N°1 - Mostrar tarjeta orden de compra
    Dado que _habilitaOrdenDeCompra = true
    Y hay productos un _tipoPedido que _esValorizado = true
    Cuando se muestran las tarjetas
    Entonces el sistema mostrará la tarjeta de orden de compra con el control desplegar la tarjeta
    Y el icono de ingreso correcto oculto

Escenario: N°2 - No mostrar tarjeta orden de compra
    Dado que _habilitaOrdenDeCompra = false
    Cuando se muestran las tarjetas
    Entonces el sistema no mostrará la tarjeta de orden de compra

Escenario: N°3 - No hay productos en pedido valorizado
    Dado que _habilitaOrdenDeCompra = true
    Y no hay productos un _tipoPedido que _esValorizado = true
    Cuando se muestran las tarjetas
    Entonces el sistema mostrará la tarjeta de orden de compra sin el control para desplegar
    Y deshabilitada