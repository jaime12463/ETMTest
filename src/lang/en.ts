const en = {
	general: {
		producto: 'Product',
		unidades: 'Units',
		subUnidades: 'SubUnits',
		totalUnidades: 'Total units',
		totalSubUnidades: 'Total SubUnits',
		total: 'Total',
		cliente: 'Customer',
		precio: 'Price',
		buscar: 'Search',
		verDetalle: 'View detail',
		fechaEntrega: 'Delivery date',
		codigo: 'Code',
		nombre: 'Name',
		razonSocial: 'Social reason',
		denominacion: 'Denomination',
		subunidades: 'Subunits',
		cerrarPedido: 'Close order',
		si: 'Yes',
		no: 'No',
		aceptar: 'Accept',
		cancelar: 'Cancel',
		pedidosCliente: 'Orders placed: '
	},
	titulos: {
		bienvenido: 'Welcome',
		ingresoPedido: 'Order Entry',
		productosPedido: 'Products of the Order',
	},
	advertencias: {
		clienteNoPortafolio: 'The client does not have an informed portfolio',
		cantidadEsMayor:
			'The amount is greater than {{cantidad}}. Do you wish to continue?',
		noFechaInformada: 'it does not have an informed delivery date',
		fueraDeFrecuencia: 'The client is off-frequency',
		noFechaProgramada: 'The client does not have scheduled delivery date',
		limiteSubUnidades:
			'The subunits must be smaller than the presentation of product',
		pedidoMinimo: 'does not fulfil minimum order of ${{monto}}',
		montoMinimo: 'does not fulfil the minimum sale amount of the order',
		subUnidadesNoPermitidas: 'The subUnits is disabled for this product',
		masDelMontoMaximo:
			'The sum of the orders for the delivery date {{fechaDeEntrega}} exceeds the maximum amount for the customer $ {{montoVentaMaxima}}',
		subUnidadesNoMultiplo:
		'The subunits must be in multiples of {{subunidadesVentaMinima}}',
	},
};
export default en;
