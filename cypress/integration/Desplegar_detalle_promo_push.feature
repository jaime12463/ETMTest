# language: es

@Pedido @PromoPush @Ver_detalle @Sprint10 @Sprint13

# sprint 13 UX: https://www.figma.com/file/a6j0OiJCxmdy9DupAaFiac/Order-taking-SFA---Compartida-con-Hasar?node-id=0%3A1

# sprint 10 UX: https://www.figma.com/proto/uBjkg7VM1HtzllsNIvkLKn/SFA_S9_S10_S11?node-id=702%3A2&scaling=min-zoom&page-id=501%3A2&starting-point-node-id=702%3A2

Característica: Ver detalle de la promo push
	Como prevendedor 
	Quiero visualizar el detalle de cada promoción
	Para saber precio y materiales que contiene cada una

Escenario: N°1 - Expandir detalle de promociones
	Dado que el prevendedor se encuentra en la lista de promociones
	Cuando selecciona expandir el detalle de la tarjeta
	Entonces el sistema mostrará los componentes de la promocion indicando el código de producto del componente, la descripcion, la cantidad, la unidad de medida, el precio base, el descuento, el precio total de la línea del componente de la promoción ordenados por código de producto 
	Y el ícono para borrar
	Y contraerá el resto de las tarjetas de promociones.
	
Escenario: N°2 - Contraer detalle de promociones
	Dado que el prevendedor se encuentra en la lista de promociones
	Cuando selecciona contraer el detalle de la tarjeta
	Entonces el sistema mostrará la tarjeta de promociones seleccionada contraída.