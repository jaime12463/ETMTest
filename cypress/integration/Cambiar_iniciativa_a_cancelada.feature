# language: es

@Iniciativa @Cancelar @Sprint15

Característica: Cancelar iniciativa
    Como prevendedor
    Quiero cancelar una iniciativa
    Para que no se tenga en cuenta en el pedido

Escenario: N°1 - Cancelar una iniciativa
    Dado que se ingresó al paso 1 - planeación del cliente
    Y se desplegó la tarjeta iniciativas
    Y se desplegó el detalle de una iniciativa
    Cuando cambio el estado de la iniciativa a cancelada
    Entonces el sistema marcará en rojo la tarjeta de esa iniciativa
    Y mostrará la leyenda pendiente en rojo
    Y establecerá como no habilitadas las unidades y subunidades en sus valores iniciales
    Y mostrará el combo de _motivosCancelacionIniciativas ordenados alfabeticamente.

Escenario: N°2 - Selección de motivo
    Dado que el estado de la iniciativa es cancelada
    Cuando selecciono un motivo de cancelación
    Entonces el sistema cambiará la leyenda pendiente por el icono de cancelación
    Y si existe un _tipoPedido cuyo _codigo = "Venta" que tiene el producto, eliminará el producto del pedido
    
# Los indicadores se deberán actualizar ya que se está eliminando el producto del pedido de venta. 

