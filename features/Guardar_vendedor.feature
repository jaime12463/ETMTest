@Pedido @Guardar_pedido @Codigo_vendedor @Sprint5
Característica: Guardar pedido informando código de vendedor
	Como supervisor
	Quiero que se guarde el código de vendedor que registró el pedido
	Para poder calcular el cumplimiento de sus objetivos de venta

#Registrar en la cabecera del pedido el dato hardcode “sfa01” como código de usuario

Escenario: N°1 - Guardar código de vendedor
	Dado que el vendedor realizó el login en la aplicación
	Cuando guarda el pedido
	Entonces el sistema guardará el login del vendedor junto con el pedido