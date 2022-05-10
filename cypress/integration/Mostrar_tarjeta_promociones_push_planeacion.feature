# language: es

@Planeacion @promociones @sprint14 @Sprint27

# La pantalla es la misma que la de ingreso pero tiene el ingreso deshabilitado

#UX Sprint14: https://www.figma.com/file/a6j0OiJCxmdy9DupAaFiac/Order-taking-SFA---Compartida-con-Hasar?node-id=0%3A1

Característica: Mostrar promociones en planeación
	Como prevendedor
	Quiero consultar las promociones vigentes del cliente
	Para poder organizar la venta
		
Antecedentes:
	Dado que se ingresó un cliente
	Y tiene promociones vigentes
	Y con disponibilidad mayor a 0
	
Escenario: N°1 - Mostrar tarjeta promociones push
	Cuando estamos en el paso 1 - planeación 
    Entonces el sistema mostrará la tarjeta de promociones push con su título
    Y el control para desplegar la tarjeta.

Escenario: N°2 - Mostrar aviso en tarjeta promociones push
    Dado que se ingresó un cliente que no promociones push vigentes en el portafolio
    Cuando estamos en el paso 1 - planeación
    Entonces el sistema mostrará la tarjeta de promociones push con su título
    Y no mostrará el control para desplegar la tarjeta
    Y mostrará el aviso "Este cliente no cuenta con promociones push" en rojo

