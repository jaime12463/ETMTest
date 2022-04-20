# language: es

@Pedido @Productos @Sprint27

Característica: Mostrar listado de productos con descuento escalonado
    Como prevendedor
    Quiero visualizar los productos que tiene el cliente con descuentos escalonado
    Para gestionar los productos en el pedido

Antecedentes:
    Dado que se ingresó un cliente
    Y se seleccionó el control de productos con descuento escalonado

Escenario: N°1 - El cliente tiene productos con descuento escalonado y están agregados al pedido
    Dado que todos los productos con descuento escalonado están agregados en el pedido
    Cuando se muestra el popup
    Entonces el sistema mostrará en el popup el mensaje indicando que hay productos con desucentos escalonados para el cliente

Escenario: N°2 - El cliente tiene productos con descuento escalonado
    Dado que el cliente tiene en el portafolio productos con descuento escalonado
    Cuando se muestra el popup
    Entonces el sistema mostrará el título del popup
    Y mostrará un listado de productos con descuento escalonado que no estén en el pedido, ordenado por producto
    Y mostrará el código de producto, descripción, atributos, icono unidades, presentación, precio unitario unidad, icono subunidades y precio unitario subunidades
    Y mostrará el control para agregar el sku al pedido

Escenario: N°3 - Agregar SKU
    Cuando se selecciona el control para agregar el sku al pedido
    Entonces el sistema agregará el producto al pedido con cantidad en 0
    Y quitará del listado el producto agregado