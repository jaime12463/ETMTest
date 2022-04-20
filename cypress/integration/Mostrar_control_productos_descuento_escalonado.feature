# language: es

@Pedido @Productos @Sprint27

Característica: Mostrar control de productos con duescuento escalonado
    Como prevendedor
    Quiero visualizar los productos que tiene el cliente con descuentos escalonado
    Para informarle al cliente

Antecedentes:
    Dado que se ingresó un cliente

Escenario: N°1 - Mostrar control de productos con descuento escalonado
    Dado que tiene productos en el portafolio vigente con descuento escalonado
    Cuando se desplega la tarjeta toma de pedido
    Entonces el sistema mostrará el control de productos con descuentos escalonados

Escenario: N°2 - No mostrar control de productos con descuento escalonado
    Dado que no tiene productos en el portafolio vigente con descuento escalonado
    Cuando se desplega la tarjeta toma de pedido
    Entonces el sistema no mostrará el control de productos con descuentos escalonados