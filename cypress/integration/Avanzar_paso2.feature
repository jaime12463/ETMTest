# language: es

@Pedido @Paso2 @Sprint12 @Sprint21

# sprint 12 UX: https://www.figma.com/proto/4sKBs7Q0Ap07bdHIXsuukt/SFA_S12_S13_S14?node-id=871%3A5542&scaling=scale-down&page-id=871%3A5541&starting-point-node-id=871%3A5542

Característica: Mostrar avance de visita
    Como prevendedor que se encuentra en visita al cliente, al avanzar al paso 3 del pedido
    Quiero que se calculen los envases para retorno
    Para informarle al cliente.

Esquema del escenario: N°1 - Al pedido se agregan o eliminan o modifican productos y genera envases
    Dado que se '<altera>' un producto de un _tipoPedido que tiene _generaEnvases = true
    Cuando avanzo al paso 3 de la visita
    Entonces el sistema eliminará los pedidos de _tiposPedidoEnvasesHabilitados que pudieran existir en la visita
    Y recalculará los envases para retorno según calcular envases retornables.

Ejemplos:
|altera    |
| agrega   |
| modifica |
| elimina  |

#modificar un producto es cambiar su cantidad o condición de pago

Escenario: N°2 - El pedido no sufre cambios en los productos
    Dado que no se modificó ningún producto del pedido cuyo _tipoPedido tiene _generaEnvases = true
    Cuando avanzo al paso 3 de la visita
    Entonces el sistema no recalculará los envases para retorno.

#modificar un producto es cambiar su cantidad o condición de pago

Escenario: N°3 - La ruta tiene tipoPedidoEnvasesHabilitados que contribuyen al pedido mínimo
    Dado que la ruta tiene tipoPedidoEnvasesHabilitados 
    Y que dichos tipoPedido tienen contribuyeAMinimo = true
    Y el pedido en curso no alcanza el mínimo
    Cuando avanzo al paso 3 de la visita
    Entonces el sistema muestra la pantalla del paso 3 
    Y mostrará un warning indicando que no aclanza el pedido mínimo

Esquema del escenario: N°4 - Productos con cantidades en 0
    Dado que estoy en toma de pedido
    Y hay tarjetas de productos con cantidades en 0
    Y '<sonLosUnicosProductos>' 
	Y '<hayPedidoIngresadoMismaFechaEntrega>'
	Y '<hayProductosIngresadosPedidosNoMandatorios>' y no son pedidos de _tipoPedidoEnvasesHabilitados
	Y <_bonificacionesConVenta_>
	Y '<hayBonificacionesIngresadas>'
	Cuando se avanzo al paso 3 de la visita
	Entonces el sistema '<realizaraAccion>'.


Ejemplos:
|sonLosUnicosProductos|hayPedidoIngresadoMismaFechaEntrega|hayProductosIngresadosPedidosNoMandatorios| _bonificacionesConVenta_  | hayBonificacionesIngresadas|realizaraAccion                                                                                                     |
|     true		      |              false                |               true                       |              false        |             -              | Avisa que existen tarjetas vacias y que también se borrará el canje, con opcion a editar o avanzar. Si edita permanece en pantalla y se muestran las tarjetas de productos con cantidades en 0 con borde e inputs en rojo. Si avanza, borrará los productos y tarjetas vacías y el canje ingresado                             |
|     true            |              false                |               true                       |              true         |             true           | Avisa que existen tarjetas vacias y que también se borrará el canje y se restablecerán las bonificaciones a cero, con opcion a editar o avanzar. Si edita permanece en pantalla y se muestran las tarjetas de productos con cantidades en 0 con borde e inputs en rojo. Si avanza, borrará los productos y tarjetas vacías, el canje ingresado y se reestablecerán las bonificaciones  a cero    |
|     true            |              false                |               false				         |              false        |              -             | Avisa que existen tarjetas vacias, con opcion a editar o avanzar. Si edita permanece en pantalla y se muestran las tarjetas de productos con cantidades en 0 con borde e inputs en rojo. Si avanza, borrará los productos y tarjetas vacías y no borrará las bonificaciones                                                                |
|     true            |              false                |               false                      |              true         |             true           | Avisa que existen tarjetas vacias y que también reestablecerán las bonificaciones a cero, con opcion a editar o avanzar. Si edita permanece en pantalla y se muestran las tarjetas de productos con cantidades en 0 con borde e inputs en rojo. Si avanza, borrará los productos y tarjetas vacías y se reestablecerán las bonificaciones a cero |
|     -               |              -                    |                 -				         |                -          |             -              | Avisa que existen tarjetas vacias, con opcion a editar o avanzar. Si edita permanece en pantalla y se muestran las tarjetas de productos con cantidades en 0 con borde e inputs en rojo. Si avanza, borrará los productos y tarjetas vacías                                                                                                   |


Escenario: N°5 - Se hacen cambios en el pedido
    Dado que se modifica el pedido
    Cuando avanzo al paso 3 Otros
    Entonces el sistema mostrará el mensaje "Cambios guardados exitosamente"

#Modificar el pedido implica agregar, cambiar cantidades o borrar productos en toma de pedido

Escenario: N°6 - Calcular y aplicar promociones ongoing
    Dado que se modificaron productos que no son promo push en el pedido
    Y no se calcularon promociones
    Cuando avanzo al paso 3 Otros
    Entonces el sistema reiniciará las promociones de la condición de pago afectada
    Y aplicará las promociones automáticas que correspondan a la condición de pago
    Y al obtener beneficios de alguna de las promociones mostrará el mensaje "Cambios guardados exitosamente. Se calcularon y aplicaron las promociones automáticas"

#Modificar productos implica agregar, cambiar cantidades, borrar productos o cambiar condición de pago en toma de pedido de productos que no son promo push
#No se calculan promociones por no entrar a ver las promociones

Escenario: N°7 - Promociones ya calculadas y aplicadas
    Dado que se modificaron productos que no son promo push en el pedido
    Y se calcularon promociones
    Cuando avanzo al paso 3 Otros
    Entonces el sistema mostrará el mensaje "Cambios guardados exitosamente"

#Se calculan promociones por haber entrado y/o gestionado las promociones

Escenario: N°8 - No hubo cambios en el pedido
    Dado que no se efectuaron cambios en el paso 2 toma de pedido
    Cuando avanzo al paso 3 Otros
    Entonces el sistema muestra la pantalla del paso 3 - Otros