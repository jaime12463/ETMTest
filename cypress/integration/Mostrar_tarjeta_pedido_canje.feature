# language: es

@Pedido @Pedido_canje @Paso3 @Sprint13

Característica: Mostrar tarjeta de canje
    Como prevendedor
    Quiero ver la tarjeta de canje
    Para saber si puedo registrar canje

Escenario: N°1 - Mostrar tarjeta de canje
    Dado que estamos en el paso 3 - otros
    Cuando se muestran las tarjetas 
    Entonces el sistema mostrará la tarjeta del _tipoPedido cuyo _codigo = "Canje" cerrada con
    su título, subtitulo y cantidad de items, como la suma de tarjetas de productos que contenga la tarjeta
    Y mostrará el control para desplegar la tarjeta

    #canje de pedidos ya registrados (presupuesto)
Escenario: N°2 - El tipo de pedido es no valorizado y no valida presupuesto
    Dado que existe la tarjeta del _tipoPedido cuyo _codigo = "Canje"
    Y _validaPresupuesto = false
    Y no hay otros productos en pedidos mandatorios
    Cuando selecciono desplegar la tarjeta
    Entonces el sistema mostrará el mensaje "No puede generar el pedido de " + _tipoPedido.descripcion
    Y no desplegará la tarjeta


#canje de pedidos ya registrados (presupuesto)
Escenario: N°3 - El tipo de pedido es no valorizado, valida presupuesto y no está en vigencia según fecha del dispositivo
    Dado que existe la tarjeta del _tipoPedido cuyo _codigo = "Canje"
    Y _validaPresupuesto = true
    Y la fecha de dispositivo no se encuentra dentro de la vigencia de _vigenciaInicioPresupuesto y _vigenciaFinPresupuesto del _tipoPedido en _presupuestoTipoPedido 
    Cuando selecciono desplegar la tarjeta
    Entonces el sistema mostrará el mensaje "El presupuesto está vencido"
    Y no desplegará la tarjeta

#canje de pedidos ya registrados (presupuesto)
Esquema del escenario: N°3 - El tipo de pedido es no valorizado, valida presupuesto, está en vigencia según fecha del dispositivo, y no tiene presupuesto
    Dado que existe la tarjeta del _tipoPedido cuyo _codigo = "Canje"
    Y _validaPresupuesto = true
    Y el _tipoPedido en _presupuestoTipoPedido tiene _vigenciaInicioPresupuesto <= fecha del dispositivo <= _vigenciaFinPresupuesto 
    Y presupuestoActual, sin contar el pedido de canje en curso, es = 0 
    Cuando selecciono desplegar la tarjeta
    Entonces el sistema mostrará el mensaje "El disponible para el presupuesto de canje es 0"
    Y no desplegará la tarjeta

#canje de pedidos ya registrados (presupuesto)
Esquema del escenario: N°4 - El tipo de pedido es no valorizado, valida presupuesto, está en vigencia según fecha del dispositivo, y tiene presupuesto
    Dado que existe la tarjeta del _tipoPedido cuyo _codigo = "Canje"
    Y _validaPresupuesto = true
    Y el _tipoPedido en _presupuestoTipoPedido tiene _vigenciaInicioPresupuesto <= fecha del dispositivo <= _vigenciaFinPresupuesto 
    Y presupuestoActual, sin contar el pedido de canje en curso, es > 0 
    Y no hay otros productos en pedidos mandatorios
    Cuando selecciono desplegar la tarjeta
    Entonces el sistema mostrará el mensaje "No puede generar el pedido de " + _tipoPedido.descripcion
    Y no desplegará la tarjeta
