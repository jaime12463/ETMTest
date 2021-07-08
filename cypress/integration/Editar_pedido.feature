# language: es

@Pedido @Pedidos_realizados @Editar_pedido @Sprint7

#Comentarios:
#Solo se puede editar un pedido si el estado es activo.
#Al ingresar a la edición, va a la pantalla de pedido.
#Al guardar, vuelve a la visita del cliente
#El usuario puede cancelar la edición y volver a la visita del cliente sin guardar los cambios realizados en el pedido

#Dependencias:
#Ver acciones del pedido

# UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA_S4?node-id=86%3A3&scaling=scale-down&page-id=86%3A2


Característica: editar pedido realizado
	Como prevendedor
	Quiero editar un pedido
	Para cumplir con las necesidades del cliente

Esquema del escenario: N°1 – Editar pedido
	Dado que se ingresó a la visita del cliente 
	Y el cliente tiene pedidos realizados 
	Cuando quiero editar un pedido 
	Y su estado es <estadoDelPedido>
	Entonces el sistema <realizaraAccion>

Ejemplos:
|estadoDelPedido| realizaraAccion                               |
| Activo        | cargará el pedido para ser editado            |
| Cancelado     | mostrará mensaje y permanecerá en la pantalla |
#Mensaje: No se puede editar un pedido cancelado.