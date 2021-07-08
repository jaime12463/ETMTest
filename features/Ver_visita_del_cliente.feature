@Clientes @Visita_del_cliente @Ver_pedidos_realizados @Sprint5

#Comentario: Al ingresar a la visita de un cliente se debe mostrar información del cliente y actividad realizada
#Dependencias:
#Seleccionar cliente

Característica: Ver visita del cliente
	Como prevendedor cuando ingreso a la visita del cliente
	Quiero ver su información y los pedidos realizados 
	Para saber qué actividades tengo que realizarle al cliente

Esquema del escenario: N°1 – Ver información del cliente
    Dado que se ingresó a la visita del cliente con <codigo> 
	Y dicho cliente tiene <razonSocial>
    Cuando ingreso al detalle de la visita
    Entonces el sistema mostrará <codigo> 
	Y <razonSocial>

Ejemplos:
|codigo   |razonSocial		      |
|105613149|PTO COMIDA SARA (PART) |

Escenario: N°2 – El cliente tiene pedidos realizados 
    Dado que se registraron pedidos al cliente 
    Cuando ingreso al detalle de la visita
    Entonces el sistema mostrará los pedidos realizados

#Mostrar listado de pedidos ordenados de forma ascendente por fecha y hora de creación. 
#El listado debe mostrar: inicial del estado del pedido (A: Activo, C: Cancelado), Tipo de pedido (“Venta”), fecha de entrega, monto del pedido

Escenario: N°3 -El cliente no tiene pedidos realizados
    Dado que se no se registraron pedidos al cliente
    Cuando ingreso al detalle de la visita
    Entonces el sistema no mostrará pedidos