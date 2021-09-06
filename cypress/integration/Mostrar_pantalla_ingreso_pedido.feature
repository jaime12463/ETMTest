# language: es
@Pedido @PromoPush @sprint8 @sprint9 @Sprint10

# Sprint10: acceso a promo push según tipo de pedido seleccionado y combo de selección del tipo de pedido
# El combo de tipo de pedido mostrará como valor default la descripón del tipo de pedido que _esValorizado = true.
# Cuando se selecciona otro tipo de pedido distinto al default, al ir hacia otra pantalla, por ejemplo compromiso de cobro, y volver a la del pedido,
# se conserva la seleccion realizada del tipo de pedido 
# Cuando 

# sprint 10 UX: https://www.figma.com/proto/uBjkg7VM1HtzllsNIvkLKn/SFA_S9_S10_S11?node-id=702%3A2&scaling=min-zoom&page-id=501%3A2&starting-point-node-id=702%3A2


Característica: Mostrar pantalla ingreso del pedido
    Como prevendedor
    Quiero ver la pantalla del pedido 
    Para saber qué tipo de pedido puedo registrar al cliente 

# Según su condición de pago:
# {contado}: Solo puede comprar de contado
# {crédito formal} Solo puede comprar a crédito si no tiene el crédito bloqueado. Puede cerrar el pedido con crédito excedido 
# {crédito informal} Puede comprar de contado y puede comprar a crédito si no tiene el crédito bloqueado. 
# No puede cerrar el pedido con crédito excedido. 
# sprint 8 UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3


Escenario: N°1 - El tipo de pedido es valorizado
    Dado que el tipo de pedido _esValorizado = true
    Cuando ingreso a registrar un pedido
    Entonces el sistema habilita el panel de ingreso del producto
    Y mostrara el switch crédito y los totales

Esquema del escenario: N°2 - El tipo de pedido es no valorizado
    Dado que el tipo de pedido _esValorizado = false
    Y '<hayPedidoMandatorioRegistrado>' hay pedido mandatorio registrado
    Cuando ingreso a registrar un pedido
    Y '<hayPedidoMandatorioEnCurso>' hay pedido mandatorio en curso
    Entonces el sistema mostrará '<estadoPanelIngresoProducto>' y los totales
    Y el switch credito no se mostrará

Ejemplos:
|hayPedidoMandatorioEnCurso|hayPedidoMandatorioRegistrado|estadoPanelIngresoProducto|
|              SI          |              SI             |       HABILITADO         |
|              NO          |              NO             |       DESHABILITADO      |
|              SI          |              NO             |       HABILITADO         |
|              NO          |              SI             |       HABILITADO         |

# Pedidos mandatorios pueden ser en curso o ya registrados para la misma fecha de entrega.
# hayPedidoMandatorioRegistrado: pedido con _esMandatorio = true para la misma fecha de entrega.

Esquema del escenario: N°3 - El cliente es de contado
    Dado el tipo de pedido seleccionado es de un tipo de pedido _esValorizado = true
    Cuando ingreso a registrar un pedido con un cliente en condición de pago contado
    Y el consumido para la fecha de entrega, el informado más los pedidos de contado ya registrados, es '<condicion>' al _montoVentaContadoMaxima
    Entonces el sistema mostrará '<estadoPanelIngresoProducto>'
    Y el switch Credito en estado off Disabled
    Y mostrará el combo de seleccion del tipo de pedido cargado con la _descripcion de los _tipoPedidoHabilitados del cliente, ordenados por _secuencia ascendente y mostrara como valor default la _decripcion del tipo de pedido cuyo _esValorizado = true.

Ejemplos:
|condicion    |estadoPanelIngresoProducto     |
|Menor o igual| Si                            |
|Mayor        | No                            |

Esquema del escenario: N°4 - El cliente es de crédito formal
    Dado el tipo de pedido seleccionado es de un tipo de pedido _esValorizado = true y '<esCreditoBloqueado>'
    Cuando ingreso a registrar un pedido con un cliente en condición de pago crédito formal
    Entonces el sistema mostrará '<estadoPanelIngresoProducto>'
    Y el switch en estado On Disabled 
    Y mostrará el combo de seleccion del tipo de pedido cargado con la _descripcion de los _tipoPedidoHabilitados del cliente, ordenados por _secuencia ascendente y mostrara como valor default la _decripcion del tipo de pedido cuyo _esValorizado = true.


Ejemplos:
|esCreditoBloqueado|estadoPanelIngresoProducto |
|     Si           | No                        |
|     No           | Si                        |

Esquema del escenario: N°5 - El cliente es de crédito informal sin crédito bloqueado
    Dado tipo de pedido _esValorizado = true y cliente con _esCreditoBloqueado = false
    Cuando ingreso a registrar un pedido con un cliente en condición de pago crédito informal
    Y '<estadoCredito>' es crédito Disponible mayor a cero
    Y '<estadoPedidoMaximo>' es Pedido máximo cumplido
    Entonces el sistema mostrará '<estadoPanelIngresoProducto>', '<estadoEncendidoSwitch>' y '<estadoHabilitacionSwitch>' 
    Y mostrará el combo de seleccion del tipo de pedido cargado con la _descripcion de los _tipoPedidoHabilitados del cliente, ordenados por _secuencia ascendente y mostrara como valor default la _decripcion del tipo de pedido cuyo _esValorizado = true.


Ejemplos:
|estadoCredito|estadoPedidoMaximo|estadoPanelIngresoProducto|estadoEncendidoSwitch|estadoHabilitacionSwitch|
|     Si      |       No         |HABILITADO                |On                   |enabled                 |
|     No      |       No         |HABILITADO                |Off                  |disabled                | 
|     Si      |       Si         |HABILITADO                |On                   |disabled                | 
|     No      |       Si         |DESHABILITADO             |On                   |disabled                |

Esquema del escenario: N°6 - El cliente es de crédito informal con crédito bloqueado
    Dado que se ingreso con un cliente con _esCreditoBloqueado = true
    Cuando ingreso a registrar un pedido con un cliente en condición de pago crédito informal
    Y '<estadoPedidoMaximo>' es Pedido máximo cumplido 
    Entonces el sistema mostrará '<estadoPanelIngresoProducto>', '<estadoEncendidoSwitch>' y '<estadoHabilitacionSwitch>'


Ejemplos:
|estadoPedidoMaximo|estadoPanelIngresoProducto|estadoEncendidoSwitch|estadoHabilitacionSwitch|
|       No         |Si                        |Off                  |disabled                |
|       Si         |No                        |On                   |disabled                | 

Esquema del escenario: N°7 - Acceso a promo push
    Dado que se ingresó a la pantalla de pedido
	Cuando se selecciona un tipo de pedido que '<habilitaPromocion>' 
	Entonces el sistema '<visualizara>' el acceso a las promo push
    Y al carrito de compras

Ejemplos:
|habilitaPromocion|visualizara  |
|       true      |    mostrará |
|       false     | no mostrará | 

# Cuando estén en canje u otro pedido que no habilita los iconos, no se deben visualizar los iconos.
