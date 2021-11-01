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
    Y mostrará el _nombreActividad
    Y status sin valor, _planActividad, _descripcion, _vencimiento
    Y _codigoProducto, _nombre, _presentación de la unidades, precio por unidad, precio por subunidad
    Y los valores iniciales de cantidad de _unidades y _subunidades
    Y habilita la selección del status

Esquema del escenario: N°2 – Desplegar detalle de iniciativa ejecutada
    Dado que estoy en la tarjeta de iniciativas
    y quiero ver el detalle de una iniciativa ejecutada 
    Cuando se despliega la iniciativa 
    Entonces el sistema mostrará el detalle de la iniciativa
    Y mostrará el _nombreActividad
    Y status = "Ejecutado", _planActividad, _descripcion, _vencimiento
    Y _codigoProducto, _nombre, _presentación de la unidades, precio por unidad, precio por subunidad
    Y los valores registrados en la ejecución de cantidad de unidades y subunidades
    Y el borde de la iniciativa en color verde y el ícono de ejecutada 
    Y <ingresoTomaDePedido> se ingreso a la toma de pedido <habilitaSeleccion> habilita la selección del status, unidades y subunidades

  Ejemplos:
  |ingresoTomaDePedido|habilitaSeleccion|
  |si                 |no habilita      |
  |no                 |habilita         |

Esquema del escenario: N°3 – Desplegar detalle de iniciativa cancelada
    Dado que estoy en la tarjeta de iniciativas
    y quiero ver el detalle de una iniciativa cancelada 
    Cuando se despliega la iniciativa 
    Entonces el sistema mostrará el detalle de la iniciativa
    Y mostrará la _descripcion
    Y status = "Cancelado", motivo = motivo registrado, _planActividad, _descripcion, _vencimiento
    Y _codigoProducto, _nombre, _presentación de la unidades, precio por unidad, precio por subunidad
    Y los valores iniciales de cantidad de _unidades y _subunidades 
    Y el borde de la iniciativa en color rojo y el ícono de cancelada 
    Y <ingresoTomaDePedido> se ingreso a la toma de pedido <habilitaSeleccion> habilita la selección del status 
    Y la seleccion del motivo cargado con la _descripcion de _motivosCancelacionIniciativas ordenados alfabeticamente en forma ascendente

  Ejemplos:
 |ingresoTomaDePedido|habilitaSeleccion|
 |si                 |no habilita      |
 |no                 |habilita         |


 
#El ejemplo de status vacío se refiere a status pendiente de la iniciativa.

