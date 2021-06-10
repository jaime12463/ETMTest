@Eliminar línea del pedido @Sprint3
Característica: Eliminar línea del pedido
	Como prevendedor
	Quiero eliminar un producto del pedido
	Para cumplir con las necesidades del cliente

@Test_dispositivo_1
Escenario: N°1 – Eliminar producto del pedido
	Dado que se seleccionó un producto del pedido
	Cuando se ingresa cantidad 0 en unidades 
	Y se ingresa cantidad 0 en subunidades
	Entonces el sistema eliminará el producto seleccionado del pedido.