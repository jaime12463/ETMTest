@Ver_detalle_del_pedido @Sprint1
Característica: Ver detalle del pedido
    Como prevendedor 
    Quiero poder ver el código de producto y cantidad de unidades de los productos ingresados en el pedido 
    Para saber qué compró el cliente hasta ahora.

@Test_dispositivo_1
Escenario: N°1 - Ver detalle del pedido
	Dado se ingresaron productos al pedido
	Cuando se mira el detalle del pedido
	Entonces el sistema mostrará los productos seleccionados
    Y las unidades ingresadas para cada producto