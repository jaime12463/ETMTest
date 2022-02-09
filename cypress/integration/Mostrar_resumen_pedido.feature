# language: es

@Pedido @Resumen_pedido @Sprint15 @Sprint17 @Sprint19 @Sprint21 @Sprint22

Característica: Mostrar resumen del pedido 
    Como prevendedor 
    Quiero ver el resumen del pedido 
    Para informarle al cliente

Escenario: N°1 - Sección de condiciones de pago
    Dado que estoy en un cliente 
    Cuando selecciono ver resumen del pedido
    Entonces el sistema mostrará dentro de la sección de condición de pago correspondiente un listado de los productos ingresados 
    Y separados por _tipoPedido que esValorizado = true
    Y por condición de pago, indicando código de producto, nombre
    Y precio unidades, precio subunidad, subtotal del producto ordenados por código de producto
    Y mostrará al final del listado de productos, los obsequios obtenidos de promociones ongoing en la condición de pago que corresponda, según sección obsequios promo ongoing
    
Escenario: N°2 - Promo push dentro de condiciones de pago
    Dado que estoy en un cliente 
    Y se ingresaron promo push al pedido
    Cuando selecciono ver resumen del pedido
    Entonces el sistema mostrará dentro de la sección de condición de pago a la promo push según su condición de pago, indicando el código de promoción,
    Y nombre, precio unitario, descuento, subtotal de la promoción como la cantidad de promoción multiplicado por precio unitario y la cantidad pedida de la promoción ordenados por código de promoción
    Y los componentes de la promoción, indicando el código de prodcuto del componente,
    Y nombre del componente, precio unidad, descuento, subtotal del componente ordenados por código de componente

Escenario: N°3 - Sección envases con productos para retorno y envases
    Dado que estoy en un cliente 
    Y se ingresaron productos para retorno 
    Y prestamo de envases
    Cuando selecciono ver resumen del pedido
    Entonces el sistema mostrará dentro de la sección envases un listado de productos para retorno si tiene
    Y consolidados por código de producto indicando el código de producto, nombre, cantidad a retornar y tipo de operación ordenados por código de producto
    Y un listado de productos de _tipoPedido = "PrestamoEnvase"
    Y consolidados por código de producto indicando el código de producto, nombre, cantidad a prestamo y tipo de operación ordenados por código de producto

Escenario: N°4 - Sección canje
    Dado que estoy en un cliente 
    Y se realizaron canjes
    Cuando selecciono ver resumen del pedido
    Entonces el sistema mostrará dentro de la sección canjes un listado de productos del _tipoPedido = "Canje" 
    Y mostrará el código de producto, nombre, motivo de canje, cantidad unidades y cantidad subunidades ordenados por código de producto

Escenario: N°5 - Sección compromiso de cobro
    Dado que estoy en un cliente 
    Y se realizó un compromiso de cobro
    Cuando selecciono ver resumen del pedido
    Entonces el sistema mostrará dentro de la sección compromiso de cobro el límite de crédito 
    Y disponible informado para el cliente 
    Y el monto del compromiso de cobro registrado en la visita
    Y mostrará la fecha de alta como la fecha del dispositivo 

Escenario: N°6 - Sección orden de compra
    Dado que estoy en un cliente 
    Y se registró una orden de compra
    Cuando selecciono ver resumen del pedido
    Entonces el sistema mostrará dentro de la sección orden de compra el número de la orden de compra registrada en la visita 

Escenario: N°7 - Mostrar los totales al pié del resumen
    Dado que estoy en un cliente
    Cuando selecciono ver resumen del pedido
    Entonces el sistema mostrará al final del resumen los totales de contado, crédito y descuentos
    Y siendo contado = a la suma del subtotal de cada producto de los tipos de pedidos valorizados con condición de pago contado más el compromiso de cobro,
    Y crédito = a la suma del subtotal de cada producto de los tipos de pedidos valorizados con condición de pago crédito,
    Y descuentos = a la suma de los descuentos de cada producto de los tipos de pedidos valorizados de ambas condiciones de pago.

 # Si el producto en el peddo guardado tiene informado precioConDescuentoUnidad y precioConDescuentoSubunidad, el descuento se calcula = precioConImpuestoUnidad - precioConDescuentoUnidad y precioConImpuestoSubunidad - precioConDescuentoSubunidad   

Escenario: N°8 - Mostrar en el resumen las secciones
    Dado que estoy en un cliente
    Cuando selecciono ver resumen del pedido
    Entonces el sistema mostrará la fecha de entrega del pedido
    Y si tiene _tipoPedido que _esValorizado = true, mostrará las secciónes de cada condicion de pago si las tiene
    Y si tiene productos para retorno, mostrará la sección envases
    Y si tiene _tipoPedido cuyo código = "PrestamoEnvase", mostrará la sección envases
    Y si tiene _tipoPedido cuyo código = "Canje", mostrará la sección canjes
    Y si registró compromiso de cobro, mostrará la sección compromiso de cobro
    Y si registró orden de compra, mostrará la sección orden de compra
    Y si registró bonificaciones, mostrará la sección bonificaciones

#tipos de pedido valorizados ("Venta" y "VentaEnvase")
#si alguna sección no posee productos o datos para mostrar, no se visualiza la sección.

Escenario: N°9 - Sección bonificaciones
    Dado que estoy en un cliente 
    Y se registró bonificaciones
    Cuando selecciono ver resumen del pedido
    Entonces el sistema mostrará dentro de la sección bonificaciones el tag producto gratis
    Y como cabecera de la bonificación el _idBonificiacion, el _nombreBonificacion
    Y como detalle el _codigoProducto, _nombre de los productos, los _atributos, las cantidades ingresadas y las _unidadMedida de cada producto ordenados por código de producto
    Y el tipo bonificación

# los atributos a mostrar son envase y medida


Escenario: N°10 - Recalcular envases
    Dado que se modificaron productos 
    Y que tienen envases para retorno
    Cuando selecciono ver resumen del pedido 
    Entonces el sistema recalculará los envases para retorno según calcular envases retornables.


Escenario: N°11 - Sección obsequios promo ongoing
    Dado que se obtuvieron productos obsequios por promociones ongoing
    Cuando selecciono ver resumen del pedido
    Entonces el sistema mostrará dentro de la condición de pago de la promoción como cabecera el _promocionID
    Y mostrará _descripcion de la promoción ordenados por _promocionID
    Y mostrará el tag producto gratis
    Y mostrará como detalle el _codigoProducto, _nombre, _atributos, _unidadMedida, cantidad obtenida
    Y mostrará el detalle ordenado por _codigoProducto

Escenario: N°12 - Sección obsequios promo ongoing
    Dado que se obtuvieron productos obsequios por promociones ongoing
    Cuando selecciono ver resumen del pedido
    Entonces el sistema mostrará dentro de la condición de pago de la promoción como cabecera el _promocionID
    Y mostrará _descripcion de la promoción ordenados por _promocionID
    Y mostrará el tag producto gratis
    Y mostrará como detalle el _codigoProducto, _nombre, _atributos, icono de promocion, cantidad obtenida
    Y mostrará el detalle ordenado por _codigoProducto

# icono de promocion cambiaría por _unidadMedida 