@Descripción_de_productos @Sprint2
Característica: Ver descripción de productos en pedido y detalle
    Como prevendedor
    Quiero ver la descripción de los productos en el ingreso de productos y en el detalle del pedido
    Para xx

@Test_dispositivo_1
Escenario: N°1 - Ver la descripción del producto en la lista
	Dado que se ingresó un cliente
	Cuando el sistema muestra la lista de productos
	Entonces el sistema mostrará la descripción de los productos

@Test_dispositivo_2
Escenario: N°2 - Ver la descripción del producto en el detalle
	Dado que se ingresó un producto al pedido
	Cuando se selecciona ver el detalle del pedido
	Entonces el sistema mostrará la descripción de los productos