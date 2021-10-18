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
		cerrarPedido: 'Close visit',
		si: 'Yes',
		no: 'No',
		aceptar: 'Accept',
		cancelar: 'Cancel',
		pedidosCliente: 'Orders placed: ',
		estado: 'Status',
		tipoPedido: 'Type of order',
		monto: 'Amount',
		acciones: 'Actions',
		pedidosRealizados: 'Orders placed',
		verEnvases: 'See packaging',
		envase: 'Packaging',
		pedidoMinimo: 'Minimum order',
		pedidoMaximo: 'Maximum order',
		creditoDisponible: 'Available credit',
		ventas: 'Sales',
		canje: 'Exchange',
		devolucion: 'Refund',
		credito: 'Credit',
		contado: 'Counted',
		venta: 'Sale',
		compromisoCobro: 'Collection commitment',
		saldo: 'Balance',
		documento: 'Document',
		vencimiento: 'Expiration',
		deudaPendiente: 'pending debt',
		compromisoRegistrado: 'Registered Collection Commitments',
		agregarOrdenDeCompra: 'Add Purchase Order?',
		deseaAgregarOrdenDeCompra: 'Do you want to associate a purchase order?',
		agregarProductoSKU: 'add product by SKU...',	
		continuarA: 'Continue to  ',
	},
	simbolos: {
		decimal: ',',
		miles: '.',
		moneda: '$',
		formatoFechaAmericano: 'true',
		conDecimales: 'true',
	},
	titulos: {
		bienvenido: 'Welcome',
		ingresoPedido: 'Order Entry',
		productosPedido: 'Products of the Order',
		visitaCliente: 'Customers Visit',
		clientes: 'Customers',
		envases: 'Returnable packaging',
		PedidosDelClienteActual: 'Customer orders',
		ordenDeCompra: 'Purchase Order',
		tarjetaEnvases:'Check the amount of packaging for your products',
		tarjetaCanjes:'Indicate the quantity of product for exchange',
		tarjetaCompromisoCobro:'Generate a codro commitment',
		tarjetaOrdenDeCompra:"Enter the customer's purchase order number"
	},
	advertencias: {
		clienteNoExiste: 'The code entered does not correspond to a customer',
		cantidadEsMayor:
			'The amount is greater than {{cantidad}}. Do you wish to continue?',
		fueraDeFrecuencia: 'The client is off-frequency',
		noVisitaPlanificada: 'He client has no planned visit',
		noFechaEntregaInformada:
			'The customer has no delivery date reported for the current date',
		noPortafolioPrecios:
			'The client does not have a current portfolio for the reported delivery date',
		limiteSubUnidades:
			'The subunits must be smaller than the presentation of product',
		pedidoMinimo: 'The order does not reach the minimum sale amount ${{monto}}',
		montoMinimo: 'Does not fulfil the minimum sale amount of the order',
		subUnidadesNoPermitidas: 'The subUnits is disabled for this product',
		masDelMontoMaximo:
			'The order exceeds the maximum sale amount $ {{montoVentaMaxima}}',
		subUnidadesNoMultiplo:
			'The subunits must be in multiples of {{subunidadesVentaMinima}}',
		cancelarPedido: 'Do you want to cancel the order?',
		cancelarTodosLosPedido:
			'All orders with a delivery date {{fechaDeEntrega}} will be canceled Do you wish to continue?',
		ProductoNoEstaEnPortafolioCliente:
			'The code does not correspond to a current producto in the portfolio of the client',
		ProductoNoEstaHabilitado: 'The product is not enabled for {{descripcion}}',
		excedeCreditoDsiponible: 'The order exceeds the available credit',
		montoMayorDeuda: 'The amount cannot be greater than the registered debt',
		excedeUnidadesDisponibles:
			'The quantity is greater than available: {{disponible}}',
		excedePresupuesto:
			'The amount entered exceeds the budget allocated for {{descripcion}}',
		borrarPedidosNoMandatorios:
			'The order of {{tipoPedido}} will be deleted. do you wish to continue?',
		ordenDeCompraEnBlanco:
			'You must enter a purchase orden',
		cantidadSuperiorEnvases:
			'The amount exceeds those available for return',		
	},
	pasos: {
		planeacion:'Planning',
		tomaDePedido:'Order taking',
		otros:'Others',
		finalizar:' Finalize order'
	}
};
export default en;
