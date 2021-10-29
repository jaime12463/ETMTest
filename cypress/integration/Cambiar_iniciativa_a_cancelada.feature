# language: es

@Iniciativa @Cancelar @Sprint15

Característica: Cancelar iniciativa
    Como prevendedor
    Quiero cancelar una iniciativa
    Para que no se tenga en cuenta en el pedido

Esquema del escenario: N°1 - Cancelar una iniciativa
    Dado que se ingresó al paso 1 - planeación del cliente
    Y se desplegó la tarjeta iniciativas
    Y se desplegó el detalle de una iniciativa
    Y '<estadoIniciativa>'
    Cuando cambio el estado de la iniciativa a cancelada
    Entonces el sistema marcará en rojo la tarjeta de esa iniciativa
    Y mostrará la leyenda pendiente en rojo
    Y mostrará el combo de motivos ordenados alfabeticamente.

Ejemplos:
|estadoIniciativa        |
| no tiene estado        |
| tiene estado ejecutada |

Escenario: N°2 - Selección de motivo de iniciativa sin estado previo
    Dado que el estado de la iniciativa es cancelada
    Y no tenía estado previo
    Cuando selecciono un motivo de cancelación
    Entonces el sistema cambiará la leyenda pendiente por el icono cancelado
    Y registrará la iniciativa indicando usuario, fecha y hora, código de iniciativa, código de cliente, status y motivo de cancelación

Escenario: N°3 - Selección de motivo de iniciativa con estado previo
    Dado que el estado de la iniciativa es cancelada
    Y su estado anterior era ejecutada
    Cuando selecciono un motivo de cancelación
    Entonces el sistema cambiará la leyenda pendiente por el icono cancelado
    Y cambiará la iniciativa registrada borrando las cantidades de unidades y subunidades
    Y cambiará el status a cancelada 
    Y agregará el motivo de cancelación
    Y eliminará el producto del _tipoPedido cuyo _codigo = "Venta"

    # Los indicadores se deberán actualizar ya que se está eliminando el producto del pedido de venta. 

