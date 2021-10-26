# language: es

@Planeacion @promociones @sprint14


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
	Y estoy en paso 1 - planeación
	
Escenario: N°1 - Mostrar promociones
	Cuando selecciono el icono de promociones
	Entonces el sistema mostrará en un popup las promopush ordenadas por código virtual ascendente
	Y mostarará el _totalDisponible
	Y mostrará la suma de los descuentos de los componentes
	Y el control para ver detalle de la promoción
	
Escenario: N°2 - Mostrar detalle de promo
	Cuando selecciono ver detalle de la promociones
	Entonces el sistema mostrará los componentes de la promocion indicando el código de producto del componente, la descripcion, la cantidad, la unidad de medida, el precio base, el descuento, el precio total de la línea del componente de la promoción ordenados por código de producto 

#Escenario: N°3 - Buscar promocion
#	Cuando se ingresan 3 o más caracteres en el control de búsqueda
#	Entonces el sistema mostrará de forma predictiva las promociones que coincidan con los caracteres ingresados en la búsqueda.

# _totalDisponible = _unidadesDisponbles - cantidades ya registrada para la misma promo - cantidad ingresada para el pedido en curso
