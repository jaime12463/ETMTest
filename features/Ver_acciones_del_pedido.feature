@Pedido @Pedidos_realziados @Ver_acciones @Sprint5

#Dependencias
#Ver detalle de la visita del cliente

Característica: ver acciones del pedido
	Como prevendedor
	Quiero ver las acciones que puedo realizar a un pedido activo
	Para satisfacer las necesidades del cliente

Escenario: N°1 – acciones para pedido activo
	Dado que el pedido está activo
	Cuando quiero ver las acciones que puedo realizar al pedido
	Entonces el sistema mostrará las acciones: Editar, Cancelar

Escenario: N°2 – acciones para pedido cancelado
	Dado que el pedido está cancelado
	Cuando quiero ver las acciones que puedo realizar al pedido
	Entonces el sistema no mostrará ninguna