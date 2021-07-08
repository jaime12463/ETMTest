# language: es

@Pedido @Modificar_producto @Sprint3

# UX: https://www.figma.com/proto/4sKBs7Q0Ap07bdHIXsuukt/SFA?node-id=436%3A2150&scaling=scale-down&page-id=436%3A1256

Característica: Modificar línea del pedido
	Como prevendedor
	Quiero modificar las unidades/subunidades de un producto del pedido
	Para cumplir con la cantidad requerida del cliente

Escenario: N°1 - Modificar cantidades en unidades
	Dado un producto que se seleccionó del pedido
	Cuando se cambia la cantidad en las unidades
	Entonces el sistema modifica el pedido
	Y actualiza los detalles del pedido
	Y totales del pedido

Escenario: N°2 - Modificar cantidades en subunidades
	Dado un producto que se seleccionó del pedido
	Cuando se cambia las cantidad en las subunidades
	Entonces el sistema modifica el pedido
	Y actualiza los detalles del pedido
	Y totales del pedido