# language: es

@Pedido @Ingresar_Orden_de_compra @Sprint13

# Cuando tengamos al menos un pedido valorizado en curso se debe poder asociar una orden de compra al pedido
# es opcional el ingreso.
# Cuando se ingrese una OC, la misma debe guardarse en la cabecera de todos los pedidos a guardar
# cuyo _tipoPedido sea _esValorizado = true

# Sprint13 UX: https://www.figma.com/file/a6j0OiJCxmdy9DupAaFiac/Order-taking-SFA---Compartida-con-Hasar?node-id=668%3A72153

Antecedentes:
    Dado estoy en paso 3 - otros
    Y _habilitaOrdenDeCompra = true
    Y que hay otros productos en _tipoPedido que _esValorizado = true

Escenario: N°1 - Desplegar tarjeta
    Cuando despliego la tarjeta de orden de compra
    Entonces el sistema mostrará el control para ingresar el código de orden de compra

Escenario: N°2 - Ingresar orden de compra
    Dado que se ingresó un código de orden de compra
    Cuando se acepta el ingreso del código
    Entonces el sistema guardará en memoria el código de orden de compra ingresado
    Y mostrará en la tarjeta el icono de ingreso correcto