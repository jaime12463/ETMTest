# language: es

@Pedido @Toma_pedido @Paso2 @Paso3 @Sprint13

Característica: Ver items dentro de tarjetas
    Como prevendedor
    Quiero ver los items que componen una tarjeta
    Para interactuar y realizar los pedidos

Escenario: N°1 - Item pedido venta
    Dado que desplegamos una tarjeta de _tipoPedido cuyo _codigo = "Venta"
    Cuando se muestra el item de la tarjeta de toma de pedido
    Entonces el sistema mostrará el icono para borrar
    Y el icono de item correcto
    Y el recuadro del item en color verde

Escenario: N°2 - Item pedido canje
    Dado que desplegamos una tarjeta de _tipoPedido cuyo _codigo = "Canje"
    Cuando se muestra el item de la tarjeta de canje
    Entonces el sistema mostrará el icono para borrar
    Y el icono de item pendiente
    Y el recuadro del item en color rojo