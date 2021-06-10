@Modificar_línea_del_pedido @Sprint3
Característica: Modificar línea del pedido
	Como prevendedor
	Quiero modificar las unidades/subunidades de un producto del pedido
	Para cumplir con la cantidad requerida del cliente

@Test_dispositivo_1
Escenario: N°1 - Modificar cantidades en unidades
	Dado un producto que se seleccionó del pedido
	Cuando se cambia la cantidad en las unidades
	Entonces el sistema modifica el pedido
	Y actualiza los detalles del pedido
	Y totales del pedido

@Test_dispositivo_2
Escenario: N°2 - Modificar cantidades en subunidades
	Dado un producto que se seleccionó del pedido
	Cuando se cambia las cantidad en las subunidades
	Entonces el sistema modifica el pedido
	Y actualiza los detalles del pedido
	Y totales del pedido