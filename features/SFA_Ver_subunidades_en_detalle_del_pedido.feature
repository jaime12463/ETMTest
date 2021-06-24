@Pedido @Ver_detalle @Ver_subunidades @AddDelSprint1 @Sprint3

# UX: https://www.figma.com/proto/4sKBs7Q0Ap07bdHIXsuukt/SFA?node-id=436%3A2150&scaling=scale-down&page-id=436%3A1256

Característica: Ver detalle del pedido 
	Como prevendedor
	Quiero poder ver el código de producto
	Y la cantidad de unidades 
	Y cantidad de subunidades de los productos ingresados en el pedido
	Para saber qué compró el cliente hasta ahora.

@Test_dispositivo_1
Escenario: N°1 - Ver detalle del pedido
	Dado se ingresaron productos al pedido
	Cuando se selecciona ver el detalle del pedido
	Entonces el sistema mostrará los productos seleccionados
    Y las unidades ingresadas para cada producto
	Y las subunidades ingresadas para cada producto
