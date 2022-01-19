# language: es

@Pedido @Paso2 @Sprint12

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
    Entonces el sistema avanzará al paso 3 
    Y mostrará un warning indicando que no aclanza el pedido mínimo