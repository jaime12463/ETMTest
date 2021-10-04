# language: es

# Calculo del presupuesto disponible del producto
# presupuestoActual = _presupuesto - (unidades + subunidades) 
#    unidades = sumatoria de las unidades de todos los pedidos registrados del tipo de pedido en curso cuyo _validaPresupuesto = true, que no fueron transmitidos, de todos los clientes de la ruta 
#    subunidades = (sumatoria de las subunidades / presentación, de cada producto de los pedidos registrados del tipo de pedido en curso cuyo _validaPresupuesto = true, que no fueron transmitidos, de todos los clientes de la ruta )
# 
# Ejemplo:
#    _presupuesto = 2 (unidades) para el _tipoPedido = 2, cuyo _validaPresupuesto = true

#    producto 350 con _presentacion = 12 
#    producto 360 con _presentacion = 24 
#    Pedido registrado de Canje N1 para el cliente 2345: 
#           350 X unidades = 1, subunidades = 3 -> 1 unidad + 3/12 unidades = 1.25 unidades
#    Pedido registrado de Canje N2 para el cliente 5403: 
#           360 X unidades = 0, subunidades = 12  -> 0 unidades + 12/24 unidades = 0.50 unidades
#
#    presupuestoActual = _presupuesto - ( unidades consumidas) = 2 - (1.25+0.50) = 0.75

@Pedido @Pedido_canje @Paso3 @Sprint13

Característica: Mostrar tarjeta de canje
    Como prevendedor
    Quiero ver la tarjeta de canje
    Para saber si puedo registrar canje

Escenario: N°1 - Mostrar tarjeta de canje
    Dado que estamos en el paso 3 - otros
    Cuando se muestran las tarjetas 
    Entonces el sistema mostrará la tarjeta de canej asociada al _tipoPedido cuyo _codigo = "Canje" cerrada con
    su título, subtitulo y cantidad de items, como la suma de tarjetas de productos que contenga la tarjeta
    Y mostrará el control para desplegar la tarjeta

    #canje de pedidos ya registrados (presupuesto)
Escenario: N°2 - El tipo de pedido es no valorizado y no valida presupuesto
    Dado que estamos en el paso 3 - otros
    Y no hay productos en el _tipoPedido cuyo _codigo = "Venta"
    Cuando se muestra la tarjeta de canje
    Entonces el sistema mostrará la tarjeta cerrada con
    su título, subtitulo y cantidad de items, como la suma de tarjetas de productos que contenga la tarjeta
    Y mostrará el mensaje "No puede generar el pedido de " + _tipoPedido.descripcion
    Y no mostará el control de desplegar tarjeta


#canje de pedidos ya registrados (presupuesto)
Escenario: N°3 - El tipo de pedido es no valorizado, valida presupuesto y no está en vigencia según fecha del dispositivo
    Dado que estamos en el paso 3 - otros
    Y _validaPresupuesto = true
    Y la fecha de dispositivo no se encuentra dentro de la vigencia de _vigenciaInicioPresupuesto y _vigenciaFinPresupuesto del _tipoPedido en _presupuestoTipoPedido 
    Cuando se muestra la tarjeta de canje
    Entonces el sistema mostrará la tarjeta de canje cerrada con el mensaje "El presupuesto está vencido"
    Y no mostará el control de desplegar tarjeta

#canje de pedidos ya registrados (presupuesto)
Esquema del escenario: N°3 - El tipo de pedido es no valorizado, valida presupuesto, está en vigencia según fecha del dispositivo, y no tiene presupuesto
    Dado que estamos en el paso 3 - otros
    Y _validaPresupuesto = true
    Y el _tipoPedido en _presupuestoTipoPedido tiene _vigenciaInicioPresupuesto <= fecha del dispositivo <= _vigenciaFinPresupuesto 
    Y presupuestoActual, sin contar el pedido de canje en curso, es = 0 
    Cuando se muestra la tarjeta de canje
    Entonces el sistema mostrará la tarjeta de canje cerrada con el mensaje "El disponible para el presupuesto de canje es 0"
    Y no mostará el control de desplegar tarjeta

#canje de pedidos ya registrados (presupuesto)
Esquema del escenario: N°4 - El tipo de pedido es no valorizado, valida presupuesto, está en vigencia según fecha del dispositivo, y tiene presupuesto
    Dado que estamos en el paso 3 - otros
    Y _validaPresupuesto = true
    Y el _tipoPedido en _presupuestoTipoPedido tiene _vigenciaInicioPresupuesto <= fecha del dispositivo <= _vigenciaFinPresupuesto 
    Y presupuestoActual, sin contar el pedido de canje en curso, es > 0 
    Y no hay productos en el _tipoPedido cuyo _codigo = "Venta"
    Cuando se muestra la tarjeta de canje
    Entonces el sistema mostrará la tarjeta de canje cerrada con el mensaje "No puede generar el pedido de " + _tipoPedido.descripcion
    Y no mostará el control de desplegar tarjeta
