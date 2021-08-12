# language: es

@Pedido @Guardar_pedido @Sprint7 @Sprint8 @Sprint9

Característica: Guardar actividad realizada
    Como prevendedor
    Quiero guardar el pedido y compromiso de cobro realizados
    Para luego informar a central la actividad realizada

Comentario:
# el pedido máximo se evalúa sobre los pedidos de contado y compromiso de coro. 
# Cuando guarda el pedido tiene que generar una o dos cabeceras según la condición de pago de los productos ingresados

# Agregar botón para guardar el pedido y/o Compromiso de cobro. 
# Los pedidos deben registrarse con un id.
# Registrar en cabecera por cada condición de pago que tenga productos registrados: número de pedido, código de cliente, fecha de entrega, fecha y hora de registro, tipo de operación, condición de pago, total unidades, total subunidades, 
# monto total del pedido, código de usuario, estado
# Registrar detalle: código de producto, unidades, subunidades, 
# precio unitario de unidad, precio unitario de subunidad, 
# monto subtotal de la línea de producto, condición de pago
# codigo de usuario: “SFA01”
# estado: Activo (Default), Cancelado
# condición de pago: Crédito, Contado
# tipo de operación: “Venta”
# Cuando se guarda el compromiso de cobro se debe registrar:
# ID, Código de cliente, Fecha y hora, fecha de entrega, monto, tipo de documento (material=” Efectivo”)
# sprint 8 UX: https://www.figma.com/proto/uBjkg7VM1HtzllsNIvkLKn/SFA_S9_S10_S11?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3

Antecedentes:
    Dado un pedido ingresado y/o un compromiso de cobro registrado
Y <montoVentaMaximo>= montoVentaContadoMaxima - consumido para la fecha de entrega - pedidos de contado registrados para la misma fecha de entrega - compromisos de cobro para la misma fecha de entrega
Y creditoDisponible = informacionCrediticia.disponible – pedidos a crédito ya registrados – productos a crédito del pedido actual

Esquema del escenario: N°1 – El cliente de contado o crédito formal no tiene pedidos activos para la fecha de entrega y el pedido cumple el mínimo y no excede el máximo. No se valida crédito disponible.
    Dado que el cliente no tiene pedidos en estado Activo para la misma fecha de entrega del pedido a guardar
    Y la suma de <montoDelPedido> a guardar es mayor o igual <montoVentaMinimo> 
    Y la suma de <montoProductoContado> + compromisoCobro es menor o igual a <montoVentaMaximo>
    Y la condición de crédito del cliente es distinta de crédito informal
    Cuando guardo el pedido
    Entonces el sistema guardará el pedido y lo mostrará en la lista de pedidos del cliente
    
Ejemplos:   
|montoDelPedido|montoVentaMinimo|montoProductoContado| compromisoCobro |montoVentaMaximo|
|    1000      |   900          |     1000           |    0            |2000            |
|    1100      |   900          |       0            |    500          |2000            |

Esquema del escenario: N°2 – El cliente de crédito informal no tiene pedidos activos para la fecha de entrega y no excede el límite de crédito y el pedido cumple el mínimo y no excede el máximo
    Dado que el cliente no tiene pedidos en estado Activo para la misma fecha de entrega del pedido a guardar
    Y la suma de <montoDelPedido> a guardar es mayor o igual <montoVentaMinimo> 
    Y la suma de <montoProductoContado> más <compromisoCobro> es menor o igual a <montoVentaMaximo>
    Y la condición de crédito del cliente es igual crédito informal 
    Y el <creditoDisponible> es mayor o igual a cero
    Cuando guardo el pedido
    Entonces el sistema guardará el pedido y lo mostrará en la lista de pedidos del cliente

Ejemplos:
|montoDelPedido|montoVentaMinimo|montoProductoContado|compromisoCobro|montoVentaMaximo|creditoDisponible|
|         1000 |   900          |    1000            |    0          |2000            |1000             |
|         1100 |   900          |     500            |    1500       |2000            | 0               |
|         1000 |   900          |       0            |    0          |2000            | 1               |

Esquema del escenario: N°3 – El total del pedido no cumple con el pedido mínimo 
    Dado que el cliente no tiene pedidos en estado Activo para la misma fecha de entrega del pedido a guardar
    Y el <montoDelPedido> a guardar es menor al <montoVentaMinimo> 
    Cuando guardo el pedido
    Entonces el sistema Mostrará mensaje “El pedido no alcanza el monto de venta mínima <montoVentaMinimo>” y permanecerá en la pantalla  
    
Ejemplos:
| montoVentaMinimo|montoDelPedido|
|    1000         |   999        | 

Esquema del escenario: N°4 – El pedido de contado excede con el pedido máximo 
    Dado que la suma de <montoProductoContado> más el compromiso de cobro es mayor a <montoVentaMaximo>
    Cuando guardo el pedido
    Entonces el sistema Mostrará mensaje “El pedido excede el monto de venta máxima <montoVentaMaximo>” y permanecerá en la pantalla  
    
Ejemplos:
| montoVentaMaximo|compromisoCobro| montoProductoContado |
|     2000        |    0          | 2001                 |
|     2000        |    2001       | 0                    |
|     2000        |    1200       | 801                  |

Esquema del escenario: N°5 – El pedido a guardar no necesita cumplir el pedido mínimo ya que hay otros pedidos para la fecha entrega, los productos de contado no superan el monto máximo y el cliente no es de crédito informal, por lo que no valida el crédito
    Dado que el cliente tiene otros pedidos activos para la fecha de entrega 
    Y la suma de <montoProductoContado> + <compromisoCobro> es menor o igual a <montoVentaMaximo> 
    Y el cliente no tiene condición de pago igual a crédito informal
    Cuando guardo el pedido
    Entonces el sistema guardará el pedido y volverá a la pantalla de cliente

Ejemplos:
| montoVentaMaximo|compromisoCobro| montoProductoContado |
|     2000        |    0          | 2000                 |
|     2000        |    2000       | 0                    |
|     2000        |    1200       | 800                  |

Esquema del escenario: N°6 – El pedido a guardar no necesita cumplir el pedido mínimo ya que hay otros pedidos activos, los productos de contado no superan el monto máximo y el cliente de crédito informal no supero el crédito disponible
    Dado que el cliente tiene otros pedidos activos para la fecha de entrega 
    Y la suma de <montoProductoContado> + <compromisoCobro> es menor o igual a <montoVentaMaximo> 
    Y el cliente tiene condición de pago crédito informal  
    Y el <creditoDisponible> es mayor o igual a cero
    Cuando guardo el pedido
    Entonces el sistema guardará el pedido y volverá a la pantalla de cliente

Ejemplos:
 compromisoCobro |montoProductoContado|montoVentaMaximo |creditoDisponible|
|         1000   |              1000  |   2000          |900              |
|         0      |               100  |   2000          | 600             |
|         1000   |                 0  |   2000          | 0               |

Escenario: N°7 – El cliente es de crédito informal y el pedido a guardar a crédito excede el crédito disponible
    Dado que el cliente tiene condición de pago crédito informal 
    Y se ingresaron productos con condición de pago crédito
    Y el crédito disponible es menor a cero
    Cuando guardo el pedido
    Entonces el sistema Mostrará mensaje “El pedido excede el crédito disponible” y permanecerá en la pantalla  
