@Clientes @Validar_cliente @Sprint5

Característica: seleccionar cliente
	Como prevendedor 
	Quiero teclear un código de cliente
	Para iniciar su visita

Esquema del escenario: N°1 – Cliente inexistente
	Dado que se cuenta con una lista de clientes 
	Cuando el usuario ingresa un código de cliente que no está en la lista de clientes 
	Entonces el sistema mostrará el mensaje: “El código ingresado no corresponde a un cliente” 
