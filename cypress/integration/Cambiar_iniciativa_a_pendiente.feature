# language: es

@Iniciativa @Pendiente @Sprint15 @Sprint19

Característica: Poner pendiente la iniciativa
    Como prevendedor
    Quiero volver a pendiente una iniciativa
    Para tratarla en otro momento

Escenario: N°1 - Cambiar a pendiente una iniciativa ejecutada
    Dado que se ingresó al paso 1 - planeación del cliente
    Y se desplegó la tarjeta iniciativas
    Y se desplegó el detalle de una iniciativa
    Y tiene estado ejecutada
    Y hay grupos de coberturas que tienen los mismos productos que la iniciativa
    Cuando cambio el estado de la iniciativa a pendiente
    Entonces el sistema desmarcará la tarjeta de esa iniciativa dejandola en su color default
    Y ocultará el icono de ejecución
    Y establecerá las unidades y subunidades en cero
    Y eliminará los productos del pedido
    Y restablecerá los productos en común de las coberturas a cero

Escenario: N°2 - Cambiar a pendiente una iniciativa cancelada
    Dado que se ingresó al paso 1 - planeación del cliente
    Y se desplegó la tarjeta iniciativas
    Y se desplegó el detalle de una iniciativa
    Y tiene estado cancelada
    Cuando cambio el estado de la iniciativa a pendiente
    Entonces el sistema desmarcará la tarjeta de esa iniciativa dejandola en su color default
    Y ocultará el icono de cancelación
    Y establecerá las unidades y subunidades en cero
    Y ocultará el combo de motivos

# Los indicadores se deberán actualizar ya que se está eliminando el producto del pedido de venta. 

