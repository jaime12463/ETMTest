# language: es

@Clientes @Validar_cliente @Sprint7

# UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA_S4?node-id=86%3A3&scaling=scale-down&page-id=86%3A2

Característica: seleccionar cliente
	Como prevendedor 
	Quiero teclear un código de cliente
	Para iniciar su visita

Esquema del escenario: N°1 – Cliente inexistente
	Dado que se cuenta con una lista de clientes 
	Cuando el usuario ingresa un código de cliente que no está en la lista de clientes 
	Entonces el sistema mostrará el mensaje: “El código ingresado no corresponde a un cliente” 
