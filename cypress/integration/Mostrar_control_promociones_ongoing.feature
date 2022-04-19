# language: es

@Pedido @Promociones @Ongoing @Sprint21

Característica: Mostrar control de promociones ongoing
    Como prevendedor
    Quiero visaulizar si podría tener promociones ongoing
    Para gestionar las promociones

Escenario: N°1 - El cliente no tiene promociones habilitadas
    Dado que se ingresó un cliente
    Y no tiene _promocionesHabilitadas
    Cuando se desplega la tarjeta toma de pedido
    Entonces el sistema mostrará el control de promociones ongoing deshabilitado

Escenario: N°2 - El cliente tiene promociones habilitadas y no están vigentes
    Dado que se ingresó un cliente
    Y tiene _promocionesHabilitadas
    Y fecha de entrega > _vigenciaFinBonificacion de todas las _promocionesHabilitadas
    Cuando se desplega la tarjeta toma de pedido
    Entonces el sistema mostrará el control de promociones ongoing deshabilitado

Escenario: N°3 - El cliente tiene promociones habilitadas y no tienen disponible
    Dado que se ingresó un cliente
    Y tiene _promocionesHabilitadas
    Y tienen _promocionesDisponibles = 0 al momento de entrar a la toma del pedido 
    Cuando se desplega la tarjeta toma de pedido
    Entonces el sistema mostrará el control de promociones ongoing deshabilitado

Escenario: N°4 - El cliente tiene al menos una promociones habilitadas vigente y con disponible
    Dado que se ingresó un cliente
    Y tiene al menos una _promocionesHabilitadas
    Y cuya vigenciaInicioBonificacion <= fecha de entrega <= vigenciaFinBonificacion
    Y cuyo _promocionesDisponibles > 0 al momento de entrar a la toma del pedido
    Cuando se desplega la tarjeta toma de pedido
    Entonces el sistema mostrará el control de promociones ongoing habilitado

Escenario: N°5 - Mostrar notificacion de cálculo de promociones
    Dado que se calcularon las promociones del pedido
    Cuando se modifica el pedido
    Entonces el sistema mostrará un control tooltip indicando que las promociones disponibles podrían haber cambiado
    Y reiniciará las promociones correspondientes a la condición de pago afectada
    Y redibujará todas las tarjetas del pedido quitando las promociones ongoing que pudieran tener

#Se considera modificado el pedido:
# Cuando se cambia la condición de pago de un producto que 
# no tiene descuento automático ni tiene descuento escalonado 
# o tiene descuento automático y por configuración no se excluye 
# como requisito a los productos con desc. automático; 
# Se reinician las promociones para las dos condiciones de pago.
# 
# Cuando se agrega/modifica cantidad/borra un producto que 
# no tiene descuento automático ni tiene descuento escalonado 
# o tiene descuento automático y por configuración no se excluye 
# como requisito a los productos con desc. automático; 
# Solo se recalculan las promociones correspondientes a la condición de pago del producto. 
#
# Cuando a un producto con descuento escalonado 
# se le quita el descuento, manualmente o porque se modificó la cantidad 
# de unidades y ya no entra en ningún rango; 
# Este producto comenzaría a jugar como requisito entonces se 
# tienen que reiniciar las promociones de su condición de pago
#
# Cuando a un producto con descuento escalonado cuyas unidades no entraban 
# en ningún rango pero se modifica la cantidad y obtiene un descuento escalonado; 
# Este producto dejaría de jugar como requisito entonces se tienen 
# que reiniciar las promociones de su condición de pago