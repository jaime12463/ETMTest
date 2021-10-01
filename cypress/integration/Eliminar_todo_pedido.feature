# language: es

@Pedido @Eliminar_todo @Sprint13

Característica: Eliminar todo del pedido
    Como prevendedor 
    Quiero borrar todos los artículos ingresados en el pedido
    Para descartar el pedido


Escenario: N°1 - Borrar todos los productos del pedido
    Dado que estoy en un pedido que posee productos ingresados
    Cuando selecciono borrar todo
    Entonces el sistema pide confirmación para eliminar todo
    Y al aceptar se cambiarán a 0 todas las cantidades de todos los productos del pedido
