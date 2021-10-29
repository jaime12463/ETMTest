# language: es

@Iniciativa @Pendiente @Sprint15

Característica: Poner pendiente la iniciativa
    Como prevendedor
    Quiero volver a pendiente una iniciativa
    Para tratarla en otro momento

Escenario: N°1 - Cambiar a pendiente una iniciativa ejecutada
    Dado que se ingresó al paso 1 - planeación del cliente
    Y se desplegó la tarjeta iniciativas
    Y se desplegó el detalle de una iniciativa
    Y tiene estado ejecutada
    Cuando cambio el estado de la iniciativa a pendiente
    Entonces el sistema desmarcará la tarjeta de esa iniciativa dejandola en su color default
    Y ocultará el icono de ejecución
    Y establecerá las unidades y subunidades en sus valores iniciales
    Y eliminará el producto del pedido.

Escenario: N°2 - Cambiar a pendiente una iniciativa cancelada
    Dado que se ingresó al paso 1 - planeación del cliente
    Y se desplegó la tarjeta iniciativas
    Y se desplegó el detalle de una iniciativa
    Y tiene estado cancelada
    Cuando cambio el estado de la iniciativa a pendiente
    Entonces el sistema desmarcará la tarjeta de esa iniciativa dejandola en su color default
    Y ocultará el icono de cancelación
    Y establecerá las unidades y subunidades en sus valores iniciales
    Y ocultará el combo de motivos

# Los indicadores se deberán actualizar ya que se está eliminando el producto del pedido de venta. 

