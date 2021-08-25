# language: es

@Pedido @PromoPush @Ver_detalle @Sprint10

# sprint 10 UX: https://www.figma.com/proto/uBjkg7VM1HtzllsNIvkLKn/SFA_S9_S10_S11?node-id=702%3A2&scaling=min-zoom&page-id=501%3A2&starting-point-node-id=702%3A2

Característica: Ver detalle de la promo push
	Como prevendedor 
	Quiero visualizar el detalle de cada promoción
	Para saber precio y materiales que contiene cada una

Escenario: N°1 - Expandir detalle de promociones
	Dado que el prevendedor se encuentra en la lista de promociones
	Cuando selecciona expandir el detalle de la tarjeta
	Entonces el sistema mostrará dentro de la tarjeta el código de producto, la descripcion del producto, la cantidad, la unidad de medida, el precio, el descuento, el precio total de la línea de componente de la promoción ordenados por código de producto 
	Y contraerá el resto de las tarjetas de promociones.
	
Escenario: N°2 - Contraer detalle de promociones
	Dado que el prevendedor se encuentra en la lista de promociones
	Cuando selecciona contraer el detalle de la tarjeta
	Entonces el sistema mostrará la tarjeta de promociones seleccionada contraída.