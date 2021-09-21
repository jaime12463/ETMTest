# language: es

@Pedido @Indicador_avance @Paso3 @Sprint12

# sprint 12 UX: https://www.figma.com/file/a6j0OiJCxmdy9DupAaFiac/Order-taking-SFA?node-id=0%3A1

Característica: Mostrar avance de visita
    Como prevendedor que se encuentra en visita al cliente, al avanzar al paso 3 del pedido
    Quiero que se calculen los envases para retorno
    Para informarle al cliente.

Esquema del escenario: Al pedido se agregan o eliminan productos y genera envases
    Dado que se '<modifica>' producto de un _tipoPedido que tiene _generaEnvases = true
    Cuando avanzo al paso 3 de la visita
    Entonces el sistema calculará los envases para retorno según calcular envases retornables.

Ejemplos:
|modifica |
| agrega  |
| elimina |


Escenario: Se modifican productos en cantidades o condicion de pago en un pedido que genera envases
    Dado que se modificaron productos ingresados al pedido cuyo _tipoPedido tiene _generaEnvases = true
    Cuando avanzo al paso 3 de la visita
    Entonces el sistema eliminará los pedidos de _tiposPedidoEnvasesHabilitados que pudieran existir en la visita
    Y recalculará los envases para retorno según calcular envases retornables.

#modificar un producto es cambiar su cantidad o condición de pago

Escenario: El pedido no sufre cambios en los productos
    Dado que no se modificó ningún producto de del pedido cuyo _tipoPedido tiene _generaEnvases = true
    Cuando avanzo al paso 3 de la visita
    Entonces el sistema no recalculará los envases para retorno.

#modificar un producto es cambiar su cantidad o condición de pago