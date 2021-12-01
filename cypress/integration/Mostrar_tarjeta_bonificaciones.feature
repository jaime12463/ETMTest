# language: es

@Pedido @Bonificacion @Paso3 @Sprint17

Característica: Mostrar tarjeta de bonificiaciones
    Como prevendedor    
    Quiero ver la tarjeta de bonificiaciones
    Para ingresar bonificaciones al cliente

Escenario: N°1 - Mostrar tarjeta de bonificaciones cuando no hay pedido de venta registrado
    Dado que estoy en paso 3 - otros
    Y existe _bonificacionesConVenta_ = true
    Y el cliente no tiene un tipoPedido = "Venta" para la fecha de entrega 
    Cuando se muestra la tarjeta de bonificaciones
    Entonces el sistema mostrará la tarjeta de bonificaciones deshabilitada

Escenario: N°2 - Mostrar tarjeta de bonificaciones cuando el cliente no tiene bonificaccion asignada
    Dado que estoy en paso 3 - otros
    Y el cliente tiene un tipoPedido = "Venta" para la fecha de entrega
    Y el cliente no tiene _bonificacionesHabilitadas
    Cuando se muestra la tarjeta de bonificaciones
    Entonces el sistema mostrará la tarjeta de bonificaciones sin el control para desplegar
    Y mostrará un mensaje indicando que el cliente no posee bonificaciones para aplicar

Escenario: N°3 - Mostrar tarjeta de bonificaciones cuando el cliente tiene bonificaccion pero no tiene disponible
    Dado que estoy en paso 3 - otros
    Y el cliente tiene un tipoPedido = "Venta" para la fecha de entrega
    Y el cliente tiene _bonificacionesHabilitadas
    Y todas las bonificaciónes tienen _bonificacionesDisponibles = 0
    Cuando se muestra la tarjeta de bonificaciones
    Entonces el sistema mostrará la tarjeta de bonificaciones sin el control para desplegar
    Y mostrará un mensaje indicando que el cliente no posee bonificaciones para aplicar

Escenario: N°4 - Mostrar tarjeta de bonificaciones cuando el cliente tiene bonificaccion pero no son vigentes
    Dado que estoy en paso 3 - otros
    Y el cliente tiene un tipoPedido = "Venta" para la fecha de entrega
    Y el cliente tiene _bonificacionesHabilitadas
    Y la bonificación tiene _vigenciaFinBonificacion < fecha de entrega
    Cuando se muestra la tarjeta de bonificaciones
    Entonces el sistema mostrará la tarjeta de bonificaciones sin el control para desplegar
    Y mostrará un mensaje indicando que el cliente no posee bonificaciones para aplicar

Escenario: N°5 - Mostrar tarjeta de bonificaciones cuando el cliente tiene bonificaccion pero no son productos de portafolio
    Dado que estoy en paso 3 - otros
    Y el cliente tiene un tipoPedido = "Venta" para la fecha de entrega
    Y el cliente tiene _bonificacionesHabilitadas
    Y ningún producto de _productosBeneficioGrupo forma parte del portafolio vigente del cliente
    Cuando se muestra la tarjeta de bonificaciones
    Entonces el sistema mostrará la tarjeta de bonificaciones sin el control para desplegar
    Y mostrará un mensaje indicando que el cliente no posee bonificaciones para aplicar

Escenario: N°6 - Mostrar tarjeta de bonificaciones
    Dado que estoy en paso 3 - otros
    Y el cliente tiene al menos un tipoPedido = "Venta" para la fecha de entrega
    Y el cliente tiene _bonificacionesHabilitadas
    Y al menos un producto de _productosBeneficioGrupo forma parte del portafolio vigente del cliente
    Y la bonificiación tiene _vigenciaInicioBonificacion <= fecha de entrega <= _vigenciaFinBonificacion
    Y al menos una bonificación tiene _bonificacionesDisponibles > 0
    Cuando se muestra la tarjeta de bonificaciones
    Entonces el sistema mostrará la tarjeta de bonificaciones con el control para desplegar
