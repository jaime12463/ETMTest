# language: es

@Pedido @Cobertura @Editar_cantidades @Sprint16 @Sprint18 @Sprint19

# Total de productos cobertura = cantidad de productos que conforman un grupo de una cobertura 
# Si el grupo está conformado por 5 productos, cuando se agregue 1 un producto al pedido
# Se muestra en la tarjeta  "1 de 5 coberturas" 

Característica: Editar cobertura
    Como prevendedor 
    Quiero modificar las unidades y subunidades de los productos de la cobertura
    Para agregar productos al Pedido

Antecedentes:
    Dado que se desplegó un grupo de cobertura
    Y existe en el grupo un producto que también está en iniciativas

Escenario: N°1 - Agregar producto al pedido
    Cuando modifico las cantidades de un producto a un valor > 0
    Entonces el sistema agregará el producto al pedido cuyo _tipoPedido = "Venta"
    Y establecerá al pedido la condición de pago definida para el cliente
    Y establecerá el borde en color verde
    Y aumentará en 1 el total de productos de cobertura
    Y mostrará el control para reestablecer cantidades a cero
    Y mostrará el icono verde de ingreso
    Y cambiará la iniciativa a ejecutada
    Y agregará la misma cantidad al producto de la iniciativa
    Y actualizará el disponible de la iniciativa según la unidad de media si corresponde

Escenario: N°2 - Quitar producto del pedido
    Cuando modifico ambas cantidades a un valor = 0
    Entonces el sistema eliminará el producto al pedido cuyo _tipoPedido = "Venta"
    Y disminuirá en 1 el total de productos de cobertura
    Y no mostrará el icono verde de ingreso
    Y si es el único producto de coberturas que estaba ingresado, ocultará el control de reestablecer cantidades a cero
    Y restablecerá a cero las cantidades del producto en la iniciativa
    Y actializará el disponible de la iniciativa según la unidad de medida si corresponde
    Y si es el único producto con cantidad ingresada de la iniciativa, le cambiará el estado a pendiente

Escenario: N°3 - Aumentar unidades de producto de cobertura
    Dado que el producto que se seleccionó tiene _cantidadMáximaUnidades
    Cuando aumento las unidades
    Entonces el sistema aumentará las unidades en 1
    Y no podrá superar _cantidadMáximaUnidades
    Y cambiará las unidades del producto en el pedido
    Y cambiará las unidades del producto en la iniciativa
    Y actializará el disponible de la iniciativa según la unidad de medida si corresponde

Escenario: N°4 - Disminuir unidades de producto de cobertura
    Dado que el producto que se seleccionó tiene _cantidadMáximaUnidades
    Cuando disminuyo las unidades
    Entonces el sistema disminuirá las unidades en 1
    Y no podrá ser menor a 0
    Y cambiará las unidades del producto en el pedido
    Y cambiará las unidades del producto en la iniciativa
    Y actializará el disponible de la iniciativa según la unidad de medida si corresponde

Escenario: N°5 - Aumentar subunidades de producto de cobertura
    Dado que el _tipoPedido = "Venta" _validaSubunidadesMinimas = true
    Y el producto que se seleccionó tiene _subunidadesVentaMinima
    Cuando aumento las subunidades
    Entonces el sistema aumentará las unidades en _subunidadesVentaMinima
    Y no podrá superar _presentacion
    Y cambiará las subunidades del producto en el pedido
    Y cambiará las subunidades del producto en la iniciatvia
    Y actializará el disponible de la iniciativa según la unidad de medida si corresponde

Escenario: N°6 - Disminuir subunidades de producto de cobertura
    Dado que el _tipoPedido = "Venta" _validaSubunidadesMinimas = true
    Y el producto que se seleccionó tiene _subunidadesVentaMinima
    Cuando disminuyo las subunidades
    Entonces el sistema disminuirá las unidades en _subunidadesVentaMinima
    Y no podrá ser menor a 0
    Y cambiará las subunidades del producto en el pedido
    Y cambiará las subunidades del producto en la iniciativa
    Y actializará el disponible de la iniciativa según la unidad de medida si corresponde

# Como es un tipo de pedido de venta, se mantienen todas las mismas 
# validaciones del pedido y mensajes 
# no aplican descuentos escalonados / polarizados

# Los indicadores se deberán actualizarse ya que se está agregando o quitando un producto a un tipo de pedido de venta. 

