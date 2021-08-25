# language: es

@Pedido @PromoPush @Ver_promociones @Sprint10

# sprint 10 UX: https://www.figma.com/proto/uBjkg7VM1HtzllsNIvkLKn/SFA_S9_S10_S11?node-id=702%3A2&scaling=min-zoom&page-id=501%3A2&starting-point-node-id=702%3A2

Característica: Visualizar promo push disponibles.
	Como prevendedor
	Quiero visualizar solo las promociones push con presupuesto disponible a cada cliente
	Para evitar ofrecer promociones que no puedan ser creadas luego en el backend

Escenario: N°1 - Ver tarjetas de promociones
	Dado que se habilitó el ingreso a las promociones
	Cuando se selecciona el ingreso a promociones
	Entonces el sistema mostrará un listado de productos que tengan habilitado _promoPush ordenado por codigo de promoción
	Y que tenga precio vigente para la fecha de entrega calculada
	Y cuyas _unidadesDisponibles menos la cantidad ya registrada en otros pedidos para la misma promoción sea mayor a 0
	Y mostrará el código de la promoción, el disponible total, la descripción de la promoción, el total de los descuentos
	Y el precio total de la promoción.
	