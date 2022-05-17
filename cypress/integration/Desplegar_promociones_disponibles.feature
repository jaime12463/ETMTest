# language: es

@Pedido @PromoPush @Ver_promociones @Sprint10 @Sprint11 @Sprint13

# Sprint 11 UX: https://www.figma.com/proto/4sKBs7Q0Ap07bdHIXsuukt/SFA_S12_S13_S14?node-id=802%3A2&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=802%3A2

# sprint 10 UX: https://www.figma.com/proto/uBjkg7VM1HtzllsNIvkLKn/SFA_S9_S10_S11?node-id=702%3A2&scaling=min-zoom&page-id=501%3A2&starting-point-node-id=702%3A2

Característica: Mostrar promociones disponibles.
	Como prevendedor
	Quiero visualizar solo las promociones disponibles para el cliente
	Para evitar ofrecer promociones que no puedan ser creadas luego en el backend del cliente

Escenario: N°1 - Ver tarjetas de promociones
	Dado que tengo productos en portafolio que son productos _promopush
	Cuando se despliega la tarjeta de promociones
	Entonces el sistema mostrará un listado de productos que sean _promoPush ordenado por codigo de producto
	Y que tenga precio vigente para la fecha de entrega calculada
	Y cuyas _unidadesDisponibles menos la cantidad ya registrada en otros pedidos para la misma promoción sea mayor a 0
	Y mostrará el código producto, el disponible total como _unidadesDisponibles menos la cantidad ya registrada en otros pedidos para la misma promocion menos la cantidad ingresada en el pedido en curso, la descripción de la promoción, el total de los descuentos
	Y el precio total de la promoción
	Y si no estamos en planeación, mostrará el control para ingresar las unidades
	Y si no estamos en planeación, mostrará el control para borrar todo.
	
# disponible total = _unidadesDisponbles - cantidades ya registrada para la misma promo - cantidad ingresada para el pedido en curso
