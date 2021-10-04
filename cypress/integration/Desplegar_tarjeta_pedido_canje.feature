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

# Pendidos mandatorios pueden ser en curso o ya registrados (inclusive por otras plataformas).

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
