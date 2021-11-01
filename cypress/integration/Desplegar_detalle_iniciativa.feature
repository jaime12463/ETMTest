# language: es

@Pedido @Iniciativas @Sprint15


Característica: Mostrar detalle iniciativa.
	Como prevendedor
	Quiero visualizar el detalle de una iniciativa del cliente
	Para saber precio y materiales que contiene

Escenario: N°1 – Desplegar detalle de iniciativa pendiente
    Dado que estoy en la tarjeta de iniciativas
    y quiero ver el detalle de una iniciativa pendiente 
    Cuando se despliega la iniciativa 
    Entonces el sistema mostrará el detalle de la iniciativa
    Y mostrará la _descripcion
    Y status sin valor, plan de actividades, descripcion corta, fecha de vigencia
    Y _codigoProducto, _nombre, _presentación de la unidades, precio por unidad, precio por subunidad
    Y los valores iniciales de cantidad de unidades y subunidades
    Y habilita la selección del status

Esquema del escenario: N°2 – Desplegar detalle de iniciativa ejecutada
    Dado que estoy en la tarjeta de iniciativas
    y quiero ver el detalle de una iniciativa ejecutada 
    Cuando se despliega la iniciativa 
    Entonces el sistema mostrará el detalle de la iniciativa
    Y mostrará la _descripcion
    Y status = "Ejecutado", plan de actividades, descripcion corta, fecha de vigencia
    Y _codigoProducto, _nombre, _presentación de la unidades, precio por unidad, precio por subunidad
    Y los valores registrados en la ejecución de cantidad de unidades y subunidades
    Y el borde de la iniciativa en color verde y el ícono de ejecutada 
    Y <ingresoTomaDePedido> se ingreso a la toma de pedido <habilitaSeleccionStatus> habilita la selección del status, unidades y subunidades

  Ejemplos:
  |ingresoTomaDePedido|habilitaSeleccionStatus|
  |si                 |no habilita            |
  |no                 |habilita               |

Esquema del escenario: N°3 – Desplegar detalle de iniciativa cancelada
    Dado que estoy en la tarjeta de iniciativas
    y quiero ver el detalle de una iniciativa cancelada 
    Cuando se despliega la iniciativa 
    Entonces el sistema mostrará el detalle de la iniciativa
    Y mostrará la _descripcion
    Y status = "Cancelado", motivo = motivo registrado, plan de actividades, descripcion corta, fecha de vigencia
    Y _codigoProducto, _nombre, _presentación de la unidades, precio por unidad, precio por subunidad
    Y los valores iniciales de cantidad de unidades y subunidades 
    Y el borde de la iniciativa en color rojo y el ícono de cancelada 
    Y <ingresoTomaDePedido> se ingreso a la toma de pedido <habilitaSeleccionStatus> habilita la selección del status y el motivo

  Ejemplos:
 |ingresoTomaDePedido|habilitaSeleccionStatus|
 |si                 |no habilita            |
 |no                 |habilita               |


 
#El ejemplo de status vacío se refiere a status pendiente de la iniciativa.

