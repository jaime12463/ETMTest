const en = {
	general: {
		archivosAdjuntos: 'Attached files',
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
		ocultarDetalle: 'Hide detail',
		verGrupo: 'View group',
		ocultarGrupo: 'Hide group',
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
		contado: 'Cash',
		venta: 'Sale',
		compromisoCobro: 'Collection commitment',
		saldo: 'Balance',
		documento: 'Document',
		vencimiento: 'Expiration',
		deudaPendiente: 'pending debt',
		compromisoRegistrado: 'Registered Collection Commitments',
		agregarOrdenDeCompra: 'Add Purchase Order?',
		deseaAgregarOrdenDeCompra: 'Do you want to associate a purchase order?',
		agregarProductoSKU: 'Enter product',
		continuarA: 'Continue to  ',
		numeroOrdenDeCompra: 'Purchase order number',
		limiteDeCredito: 'Credit limit',
		disponible: 'Available',
		agregarCompromisoDeCobro: 'Add collection commitment',
		totalDeudaPendiente: 'Total outstanding debt',
		totalCompromisosRegistrados: 'Total collection commitments recorded',
		estatus: 'Status',
		pendiente: 'Pending',
		ejecutada: 'Executed',
		cancelada: 'Canceled',
		motivo: 'Reason',
		sinMotivo: 'Without reason',
		planDeActividades: 'Activity Plan',
		descripcion: 'Description',
		vigencia: 'Validity',
		avanzar: 'Next',
		editarCantidades: 'Edit quantities',
		continuar: 'Continue',
		editar: 'Edit',
		salir: 'Exit',
		restablecerCero: 'Reset quantities to zero',
		resumenDePedido: 'Order summary',
		totalContado: 'Total cash:',
		totalCredito: 'Total credit:',
		totalDeAhorro: 'Total savings:',
		totalCargosFinancieros: 'Total financial charges:',
		productoGratis: 'Free product',
		precioUnitario: 'U. price: {{precioUnitario}}',
		subTotal: 'Subtotal: {{subTotal}}',
		cadaUno: 'Each',
		paquetes: 'Packages',
		ahorras: 'Saves: {{ahorras}}',
		ahorroTotal: 'Total savings: {{ahorroTotal}}',
		tipo: 'Type',
		bonificacion: 'Bonus',
		fechaDeAlta: 'Date of registration',
		prestamo: 'Loan',
		retorno: 'Return',
		unidadesMaximasAplicar: 'Maximum units that you can apply',
		motivoDelCanje: 'Exchange reason',
		motivoCancelacion: 'Cancellation reason',
		promocionesAplicadas: 'Applied promotions',
		aplicacionMaxima: 'Maximum application',
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
		tarjetaEnvases: 'Check the amount of packaging for your products',
		tarjetaCanjes: 'Indicate the quantity of product for exchange',
		tarjetaCompromisoCobro: 'Generate a codro commitment',
		tarjetaOrdenDeCompra: "Enter the customer's purchase order number",
		iniciativas: 'Initiatives',
		tarjetaIniciativas:
			'Select the initiatives that you have available for your client.',
		tituloProductosSinCargar: 'Unmodified products',
		tituloIniciativasSinMotivo: 'Initiatives canceled without reason',
		coberturas: 'Coverages',
		tarjetaCoberturas: `Indicates the amount of product missing in the customer's refrigerator.`,
		bonificaciones: 'Bonuses',
		tarjetaBonificaciones: `Add the bonuses for this customer.`,
		bonificacionesDeshabilitadas: `There are not bonuses for this customer at this time.`,
		canjesDeshabilitadas:
			'There are not exchange for this customer at this time.',
		tomaDePedido: 'Order taking',
		tarjetaTomaDePedido:
			'Modify your order with the best options for your customer.',
		promociones: 'Promotions',
		tarjetaPromociones:
			'Select the promotions that you have available for your clients.',
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
			'The code {{codigo}} does not correspond to a current producto in the portfolio of the client',
		ProductoNoEstaHabilitado:
			'The product {{codigo}} is not enabled for {{descripcion}}',
		excedeCreditoDsiponible: 'The order exceeds the available credit',
		montoMayorDeuda: 'The amount cannot be greater than the registered debt',
		excedeUnidadesDisponibles:
			'The quantity is greater than available: {{disponible}}',
		excedePresupuesto:
			'The amount entered exceeds the budget allocated for {{descripcion}}',
		borrarPedidosNoMandatorios:
			'The order of {{tipoPedido}} will be deleted. do you wish to continue?',
		ordenDeCompraEnBlanco: 'You must enter a purchase orden',
		cantidadSuperiorEnvases: 'The amount exceeds those available for return',
		mensajeProductosSinCargar:
			'If you advance to the next stage, the cards that do not have amounts entered will be removed from your order taking.',
		mensajeIniciativasSinMotivo:
			'Please enter a reason for each canceled initiative.',
		borrarDescuento: 'Do you want to eliminate the tiered discount?',
		descuentoEscalonadoEliminado: 'Tiered discount removed',
		excedeMayorPermitido: 'The amount entered exceeds the maximum allowed',
		excedeMayorPermitidoSubtitulo:
			'It is necessary to correct the value of the presentation.',
		borrarPedidosTitulo: 'Do you want to remove all products?',
		borrarPedidos: 'All your products will be deleted from your Order taking',
		borrarPedidosGeneral:
			'All products will be deleted from your current order along with the initiatives, covers, packaging, etc., that they contain.',
		productoEliminadoTitulo: 'Products removed successfully',
		productoEliminadoMensaje:
			'All the products of the order taking were eliminated along with the initiatives, coverage, exchanges, packaging, etc.',
	},
	pasos: {
		planeacion: 'Planning',
		tomaDePedido: 'Order taking',
		otros: 'Others',
		finalizar: ' Finalize order',
	},
	mensajes: {
		borrarDescuento:
			'Once the tiered discount has been eliminated, you will not be able to reapply this product.',
	},
};
export default en;
