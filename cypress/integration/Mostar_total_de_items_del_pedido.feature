# language: es

@Pedido @Total_items @Sprint13

# totalDeProductos = 1 por cada sku ingresado en el pedido de venta, donde cada promo push se cuenta como un sku
Característica: Mostrar resumen del pedido 
    Como prevenderor 
    quiero ver el total de items del pedido al pie de la pantalla
    para comunicarle al cliente

Escenario: N°1 - Mostrar total de items
    Dado que se ingreso un cliente 
    Cuando estoy en la visita del cliente
    Entonces el sistema mostrará el total de productos ingresados en los _tipoPedido con _esValorizado = true, en formato de tres dígitos con ceros a izquierda    