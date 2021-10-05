# language: es

@Pedido @Eliminar_todo @Sprint13

Característica: Eliminar todo del pedido
    Como prevendedor 
    Quiero borrar todos los artículos ingresados en el pedido
    Para descartar el pedido


Escenario: N°1 - Borrar todos los productos del pedido de venta
    Dado que estoy en un pedido que _esMandatorio = true
    Y que posee productos ingresados
    Cuando selecciono borrar todo
    Entonces el sistema pide confirmación para eliminar todos los productos
    Y al aceptar se eliminarán todos los productos de todos los pedidos
    Y se borrarán las tarjetas de las pantallas

   #Mensaje: Se borrarán todos los productos de todos los pedidos realizados, desea continuar? 
