# language: es

@Pedido @Comprobante @Sprint13

Característica: Mostrar comprobante 
   Como prevendedor 
   quiero ver el comprobante con el resumen de la visita 
   para comunicar al cliente

#El orden en que se muestran las secciones es
Contado
Productos
Promo push
Envases contado
Crédito
Prestamo envases
Canje
Compromiso de cobro

 Esquema del escenario: N°1 - Mostrar productos en comprobante
    Dado que estoy en el paso 4 en finalizar pedido
    y se ingresaron productos que no son promo push en el _tipoPedido con codigo=venta
   con  '<condicionPago>'
    cuando despliego la tarjeta comprobante  
    entonces el sistema mostrará el título "Items de" &<condicionPago>,
    la lista de los productos ingresados visualizando
    el código de producto, indicador presentación unidades, cantidad de unidades, precio unitario por unidad, subtotal de las unidades,
    indicador presentación unidades, cantidad de subunidades vendidas, precio unitario por subunidad, subtotal de las subunidades vendidas,
    ordenados por código de productos
    Y el monto total de los productos. 

     Esquema del escenario: N°1 - Mostrar promo push en comprobante
    Dado que estoy en el paso 4 en finalizar pedido
    y se ingresaron productos que son promo push en el _tipoPedido con codigo=venta
    con '<condicionPago>'
    cuando despliego la tarjeta comprobante  
    entonces el sistema mostrará una lista de los productos no promo push con <condiciónpago> visualizando
    el código de producto, indicador presentación unidades, cantidad de unidades, precio unitario por unidad, subtotal de las unidades,
    indicador presentación unidades, cantidad de subunidades vendidas, precio unitario por subunidad, subtotal de las subunidades vendidas,
    Y el monto total 
     

    Esquema del escenario: N°1 - Mostrar venta de envases en comprovante
    Dado que estoy en el paso 4 en finalizar pedido
    y se ingresaron productos  en el _tipoPedido con codigo="ventaEnvase"
    con '<condicionPago>'
    cuando despliego la tarjeta comprobante  
    entonces el sistema mostrará una lista de los productos no promo push con <condiciónpago> visualizando
    el código de producto, indicador presentación unidades, cantidad de unidades, precio unitario por unidad, subtotal de las unidades,
    indicador presentación unidades, cantidad de subunidades vendidas, precio unitario por subunidad, subtotal de las subunidades vendidas,
    Y el monto total 

condiciónpago
contado
credito

    Esquema del escenario: N°1 - Mostrar canjes en comprovante
    Dado que estoy en el paso 4 en finalizar pedido
    y se ingresaron productos  en el _tipoPedido con codigo="Canje"
    cuando despliego la tarjeta comprobante  
    entonces el sistema mostrará una lista de los productos no promo push con <condiciónpago> visualizando
    el código de producto, indicador presentación unidades, cantidad de unidades, precio unitario por unidad, subtotal de las unidades,
    indicador presentación unidades, cantidad de subunidades vendidas, precio unitario por subunidad, subtotal de las subunidades vendidas,
    Y el monto total 



#Las secciones se ordenan por condición de pago, primero contado /crédito

Esquema del escenario: N°1 - Mostrar comprobante
    Dado que estoy en el paso 4 en finalizar pedido
    Y '<productosNoPromoPushContado>' ingresó productos no promo push de contado
    Y '<productosPromoPushContado>' ingresó productos promo push de contado
    Y '<productosNoPromoPushACredito>' ingresó productos no promo push a credito
    Y '<productosPromoPushACredito>' ingresó productos promo push a credito
    Y '<envasesVentaDeContado>' ingresó envases para la venta de contado
    Y '<envasesVentaACredito>' ingresó envases para la venta a credito
    Cuando despliego la tarjeta del comprobante
    Entonces el sistema '<mostrarItemsDeContado>' mostrará una lista de los productos no promo push de contado visualizando
    el código de producto, indicador presentación unidades, cantidad de unidades, precio unitario por unidad, subtotal de las unidades,
    indicador presentación unidades, cantidad de subunidades vendidas, precio unitario por subunidad, subtotal de las subunidades vendidas,
    Y el monto total de la orden de contado
    Y '<mostarItemsPromoPushDeContado>' mostrará una lista de los productos promo push de contado visualizando
    el código de producto, descripcion, cantidad, precio unitario, subtotal
    Y el monto total de los productos promo push de contado
    Y '<mostarVentaEnvasesDeContado>' mostrará una lista de los envases vendidos de contado visualizando
    el código de producto, indicador presentación unidades, cantidad de unidades, precio unitario por unidad, subtotal de las unidades,
    indicador presentación unidades, cantidad de subunidades vendidas, precio unitario por subunidad, subtotal de las subunidades vendidas,
    Y el monto total de los los envases de contado
    Y '<mostrarItemsACredito>' mostrará una lista de los productos no promo push a credito visualizando
    el código de producto, indicador presentación unidades, cantidad de unidades, precio unitario por unidad, subtotal de las unidades,
    indicador presentación unidades, cantidad de subunidades vendidas, precio unitario por subunidad, subtotal de las subunidades vendidas,
    Y el monto total de la orden a credito
    Y '<mostarItemsPromoPushACredito>' mostrará una lista de los productos promo push a credito visualizando
    el código de producto, descripcion, cantidad, precio unitario, subtotal
    Y el monto total de los productos promo push a credito
    Y '<mostarVentaEnvasesACredito>' mostrará una lista de los envases vendidos a crédito visualizando
    el código de producto, indicador presentación unidades, cantidad de unidades, precio unitario por unidad, subtotal de las unidades,
    indicador presentación unidades, cantidad de subunidades vendidas, precio unitario por subunidad, subtotal de las subunidades vendidas,
    Y el monto total de los los envases a credito
    
#Subtotal de unidades = cantidad de unidades vendidas * precio unitario por unidad
#Subtotal de subunidades = cantidad de subunidades vendidas * precio unitario por subunidad
#Monto total de la orden = sumatoria de los subtotales de unidades y subunidades según la condición de pago.el total de la orden de contado

Ejemplos:
|productosNoPromoPushContado|mostarItemsDeContado|productosPromoPushContado|mostarItemsPromoPushDeContado|productosNoPromoPushACredito|mostarItemsACredito|productosPromoPushACredito|mostarItemsPromoPushACredito|envasesVentaDeContado|mostarVentaEnvasesDeContado|envasesVentaACredito|mostarVentaEnvasesACredito|
|si                         |si                  |si                       |si                           |si                          |si                 |si                        |si                          |si                   |si                         |si                  |si                        |
|si                         |si                  |si                       |si                           |no                          |no                 |no                        |no                          |si                   |si                         |no                  |no                        |
|no                         |no                  |no                       |no                           |si                          |si                 |si                        |si                          |no                   |no                         |si                  |si                        |
|si                         |si                  |no                       |no                           |no                          |no                 |si                        |si                          |si                   |si                         |no                  |no                        |

