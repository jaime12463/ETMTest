# language: es

@Pedido @Desplegar_tarjeta_canje @Paso3 @Sprint13

Característica: Mostrar tarjeta de canje
    Como prevendedor
    Quiero desplegar la tarjeta de canje
    Para registrar un canje


Escenario: N°1 - Desplegar tarjeta canje
    Dado que el _tipoPedido cuyo _codigo = "Canje"
    Cuando selecciono desplegar tarjeta
    Entonces el sistema asigna como pedido actual el _tipoPedido.codigo = "Canje"
    Y desplegará la tarjeta
    Y mostrará el panel de ingreso del producto
    Y mostrará las tarjetas de productos en el caso que tenga ingresados productos

#canje de pedidos ya registrados (presupuesto)
Escenario: N°2 - El tipo de pedido es no valorizado y no valida presupuesto
    Dado que la tarjeta es de _tipoPedido.codigo = "Canje"
    Y _validaPresupuesto = false
    Y hay otros productos en pedidos mandatorios
    Cuando se selecciono desplegar la tarjeta
    Entonces el sistema asigna como pedido actual el _tipoPedido.codigo = "Canje"
    Y desplegará la tarjeta 
    Y mostrará el panel de ingreso del producto
    Y mostrará las tarjetas de productos en el caso que tenga ingresados productos

#canje de pedidos ya registrados (presupuesto)
Esquema del escenario: N°3 - El tipo de pedido es no valorizado, valida presupuesto, está en vigencia según fecha del dispositivo, y tiene presupuesto
    Dado que la tarjeta es de _tipoPedido.codigo = "Canje"
    Y _validaPresupuesto = true
    Y el _tipoPedido en _presupuestoTipoPedido tiene _vigenciaInicioPresupuesto <= fecha del dispositivo <= _vigenciaFinPresupuesto 
    Y presupuestoActual > 0 
    Y hay otros productos en pedidos mandatorios
    Cuando se selecciono desplegar la tarjeta
    Entonces el sistema asigna como pedido actual el _tipoPedido.codigo = "Canje"
    Y desplegará la tarjeta 
    Y mostrará el panel de ingreso del producto
    Y mostrará las tarjetas de productos en el caso que tenga ingresados productos
