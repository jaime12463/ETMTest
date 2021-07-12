# language: es

@Pedido @Pedidos_realziados @Ver_acciones @Sprint7

#Dependencias
#Ver detalle de la visita del cliente

# UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA_S4?node-id=86%3A3&scaling=scale-down&page-id=86%3A2


Característica: Ver acciones del pedido
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