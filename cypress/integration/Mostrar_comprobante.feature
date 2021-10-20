# language: es

@Pedido @Comprobante @Sprint13

Característica: Mostrar comprobante 
   Como prevendedor 
   quiero ver el comprobante con el resumen de la visita 
   para comunicar al cliente

#El orden en que se muestran las secciones es la siguiente:
# Contado
#  Productos
#  Promo push
#  Envases contado
# Crédito
#  Productos
#  Promo push
#  Envases credito
#
#  Prestamo envases -- No entra para el sprint 13
#  Canje -- No entra para el sprint 13
#  Compromiso de cobro -- No entra para el sprint 13

 Esquema del escenario: N°1 - Mostrar productos que no son promo push en comprobante
    Dado que estoy en el paso 4 en finalizar pedido
    y se ingresaron productos que no son promo push en el _tipoPedido con codigo=venta
    con  '<condicionPago>'
    Cuando despliego la tarjeta comprobante  
    Entonces el sistema mostrará el título "Items de" & '<condicionPago>',
    la lista de los productos ingresados visualizando
    el código de producto, indicador presentación unidades, cantidad de unidades, precio unitario por unidad, subtotal de las unidades,
    indicador presentación subnidades, cantidad de subunidades vendidas, precio unitario por subunidad, subtotal de las subunidades vendidas,
    ordenados por código de producto ascendente
    Y el monto total de los productos. 

    Ejemplos:
    |condicionPago|
    |contado|
    |credito| 


# Subtotal de unidades = cantidad de unidades vendidas * precio unitario por unidad
# Subtotal de subunidades = cantidad de subunidades vendidas * precio unitario por subunidad
# Monto total = sumatoria de los subtotales de unidades y subunidades según la condición de pago.el total de la orden de contado

 Esquema del escenario: N°2 - Mostrar promo push en comprobante
    Dado que estoy en el paso 4 en finalizar pedido
    y se ingresaron productos que son promo push en el _tipoPedido con codigo = "Venta"
    con '<condicionPago>'
    Cuando despliego la tarjeta comprobante  
    Entonces el sistema mostrará una lista de los productos no promo push con '<condiciónpago>' visualizando
    el código de producto, indicador presentación unidades, cantidad de unidades, precio unitario por unidad, subtotal de las unidades,
    indicador presentación subunidades, cantidad de subunidades vendidas, precio unitario por subunidad, subtotal de las subunidades vendidas,
    Y el monto total 
     
    Ejemplos:
    |condicionPago|
    |contado|
    |credito|

 Esquema del escenario: N°3 - Mostrar venta de envases en comprobante
    Dado que estoy en el paso 4 en finalizar pedido
    y se ingresaron productos en el _tipoPedido con codigo = "VentaEnvase"
    con '<condicionPago>'
    Cuando despliego la tarjeta comprobante  
    Entonces el sistema mostrará una lista de los productos no promo push con '<condiciónpago>' visualizando
    el código de producto, indicador presentación unidades, cantidad de unidades, precio unitario por unidad, subtotal de las unidades,
    indicador presentación subunidades, cantidad de subunidades vendidas, precio unitario por subunidad, subtotal de las subunidades vendidas,
    Y el monto total 

    Ejemplos:
    |condicionPago|
    |contado|
    |credito|

    Escenario: N°4 - Mostrar canjes en comprobante
    Dado que estoy en el paso 4 en finalizar pedido
    y se ingresaron productos  en el _tipoPedido con codigo = "Canje"
    Cuando despliego la tarjeta comprobante  
    Entonces el sistema mostrará una lista de los productos canjeados visualizando
    el código de producto, indicador presentación unidades, cantidad de unidades
    indicador presentación subunidades, cantidad de subunidades vendidas
    

