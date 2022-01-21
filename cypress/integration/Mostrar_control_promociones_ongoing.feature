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
    Entonces el sistema mostará el control de promociones ongoing deshabilitado

Escenario: N°2 - El cliente tiene promociones habilitadas y no están vigentes
    Dado que se ingresó un cliente
    Y tiene _promocionesHabilitadas
    Y fecha de entrega > _vigenciaFinBonificacion de todas las _promocionesHabilitadas
    Cuando se desplega la tarjeta toma de pedido
    Entonces el sistema mostará el control de promociones ongoing deshabilitado

Escenario: N°3 - El cliente tiene promociones habilitadas y no tienen disponible
    Dado que se ingresó un cliente
    Y tiene _promocionesHabilitadas
    Y tienen _promocionesDisponibles = 0 al momento de entrar a la toma del pedido 
    Cuando se desplega la tarjeta toma de pedido
    Entonces el sistema mostará el control de promociones ongoing deshabilitado

Escenario: N°4 - El cliente tiene al menos una promociones habilitadas vigente y con disponible
    Dado que se ingresó un cliente
    Y tiene al menos una _promocionesHabilitadas
    Y cuya vigenciaInicioBonificacion <= fecha de entrega <= vigenciaFinBonificacion
    Y cuyo _promocionesDisponibles > 0 al momento de entrar a la toma del pedido
    Cuando se desplega la tarjeta toma de pedido
    Entonces el sistema mostará el control de promociones ongoing habilitado

Escenario: N°5 - Mostrar notificacion de cálculo de promociones
    Dado que se calcularon las promociones del pedido
    Cuando se modifica el pedido
    Entonces el sistema mostrará un control tooltip indicando que las promociones disponibles podrían haber cambiado

#Se considera modificado el pedido cuando:
# se cambia la condición de pago del pedido y al menos un producto no sea promo push
# se cambia la condición de pago de 1 producto que no sea promo push
# se agrega/modifican cantidades/borra un producto en el pedido que no sea promo push
