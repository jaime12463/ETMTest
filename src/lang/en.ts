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
		buscarProducto: 'Search for a product',
		busquedaVacia: 'Type to search for a SKU or filter by category',
		catalogoDeProductos: 'Product Catalog',
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
		restablecerPromociones: 'Reset promotions',
		resumenDePedido: 'Order summary',
		totalContado: 'Total cash',
		totalCredito: 'Total credit',
		totalDeAhorro: 'Total savings',
		totalCargosFinancieros: 'Total financial charges',
		productoGratis: 'Free product',
		precioUnitario: 'U. price',
		subTotal: 'Subtotal',
		cadaUno: 'Each',
		paquetes: 'Packages',
		ahorras: 'Saves',
		ahorroTotal: 'Total savings',
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
		aplicar: 'Apply',
		promocionAutomatica: 'Automatic promotion',
		obsequio: 'Gift',
		finalizarVisita: 'End visit',
		agregar: 'Add',
		borrarTodo: 'Delete all',
		loSentimos: 'Sorry!',
		noHayResultadosBusqueda: 'There are no results for your search',
		intentaOtroProducto: 'Try another product',
		sabores: 'Flavors',
		familias: 'Families',
		medidas: 'Sizes',
		marcas: 'Brands',
		borrarSeleccion: 'Delete selection',
		caja: 'Box',
		cajas: 'Boxes',
		ahorraste: 'Saved',
		eliminarTodo: 'Delete all',
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
		pedidosEnCursoDeshabilitado: 'There are no orders to display',
		sugeridosDeshabilitado: 'There are no suggestions to show',
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
		ProductoNoEstaEnPortafolioCliente: 'Wrong SKU',
		ProductoNoEstaHabilitado:
			'The product {{codigo}} is not enabled for {{descripcion}}',
		excedeCreditoDsiponible: 'The order exceeds the available credit',
		montoMayorDeuda: 'The amount cannot be greater than the registered debt',
		excedeUnidadesDisponibles: 'Promotion amount exceeded',
		excedePresupuesto:
			'The amount entered exceeds the budget allocated for {{descripcion}}',
		borrarPedidosNoMandatorios:
			'The order of {{tipoPedido}} will be deleted. do you wish to continue?',
		ordenDeCompraEnBlanco: 'You must enter a purchase orden',

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
		borrarPromocionMensajeCanjeBonificacion:
			'All promotion amounts will be reset to zero and any redemptions they contain will be removed.',
		borrarPromocionMensajeBonificacion:
			'All promotion amounts along with the bonuses they contain will be reset to zero.',
		borrarPromocionTitulo: 'Reset quantities to zero',
		borrarPromocionMensaje:
			'All the amounts of the entered promotions will be reset to zero.',
		promocionEliminadoTitulo: 'Products successfully zeroed',
		promocionEliminadoMensajeCanjeBonificacion:
			'The promotion and bonus amounts have been reset to zero. The exchanges they contained were eliminated.',
		promocionEliminadoMensajeCanje:
			'Promotion amounts have been reset to zero. The exchanges they contained were eliminated.',
		promocionEliminadoMensajeBonificacion:
			'The promotion and bonus amounts have been reset to zero.',
		borrarLineaPedidosTitulo: 'Do you want to remove this product?',
		borrarLineaPedidosMensajeCanje:
			'This product will be removed from your current order along with any exchanges it contains.',
		borrarLineaPedidosMensajeCanjeBonificacion:
			'This product will be removed from your current order along with any redemptions and bonuses it contains.',
		borrarLineaPedidosMensajeBonificacion:
			'This product will be removed from your current order along with the bonuses it contains.',
		borrarLineaPedidosMensajeUnico:
			'This product will be deleted from your Order Take',
		borrarLineaPedidosMensajeUnicoCanje:
			'This product will be deleted from your exchange',
		lineaBorradaConBonificacion:
			'The product was removed from the order taking along with the bonuses it contained.',
		lineaBorradaConCanje:
			'The product of the order taking was eliminated along with the exchanges it contained.',
		lineaBorradaConCanjeBonificacion:
			'The product was removed from the order taking along with the exchanges and bonuses it contained.',
		pdfErrorTitulo: 'File not available',
		pdfErrorDescripcion:
			'At this time it is not possible to view the attached file.',
		noEditarPlaneacionTitulo: 'Cannot edit quantities',
		noEditarPlaneacionDescripcion:
			'To re-edit the amounts of coverage and initiatives, you must do it when ordering.',
		reestablecerCoberturasTitulo: 'Reset quantities to zero',
		reestablecerCoberturasDescripcion:
			'All the amounts of the coverages entered will be reset to zero',
		errorSKUIncorrecto:
			'The SKU does not correspond to any product, please validate.',
	},
	pasos: {
		planeacion: 'Planning',
		tomaDePedido: 'Order taking',
		otros: 'Others',
		finalizar: ' Finalize order',
	},
	mensajes: {
		borrarDescuento:
			'The tiered discount of the product {{codigo}} will be eliminated. To apply it again, you will have to add the product again. ',
		excedeUnidadesDisponibles:
			'You have exceeded the maximum amount of promotion allowed that you can apply per customer.',
	},
	modal: {
		salirOrderTaking: 'Do you want to leave the order taking?',
		salirOrderTakingMensaje: 'If you exit all recorded activity will be lost.',
		restablecerBonificacionesTitulo: 'Reset quantities to zero',
		restablecerBonificacionesMensaje:
			'All bonus amounts will be reset to zero.',
		tarjetasVaciasTitulo: 'There are empty cards',
		tarjetasVaciasMensaje:
			'If you advance, the cards that do not have quantities will be eliminated.',
	},
	toast: {
		cambiosGuardados: 'Changes saved successfully',
		ventaBloqueadaTitulo: 'Customer blocked for sale',
		ventaBloqueadaMensaje:
			'You can only generate a collection commitment for this customer.',
		bonificacionAgregada: 'Bonus added successfully',
		errorBonificacionTotalTitulo: 'Error in total bonus',
		errorBonificacionTotalMensaje:
			'This bonus must be applied in full. Please modify quantities.',
		excedeMayorPermitidoTitulo:
			'The amount entered exceeds the maximum allowed',
		excedeMayorPermitidoMensaje:
			'It is necessary to correct the value of the presentation.',
		iniciativaSinMotivoTitulo: 'Initiative canceled without reason',
		iniciativaSinMotivoMensaje:
			'You must enter a reason for the cancelled initiative.',
		pedidoMinimoNoAlcanzadoTitulo: 'Minimum order not reached',
		pedidoMinimoNoAlcanzadoMensaje:
			'The minimum order has not been reached, please complete the order.',
		cantidadSuperiorEnvasesTitulo: 'Quantity of containers exceeded',
		cantidadSuperiorEnvasesMensaje:
			'The amount of sale and loan cannot exceed the number of containers available for return.',
		canjeSinMotivoTitulo: 'Exchange without reason',
		canjeSinMotivoMensaje: 'It is necessary to add the reason for the exchange',
		productoAgregado: 'Product added successfully',
		limiteDeCreditoExcedidoTitulo: 'Credit limit exceeded',
		limiteDeCreditoExcedidoMensaje:
			'This customer has exceeded his credit limit, so no credit orders can be placed.',
		productoIngresado: 'Product has been successfully entered',
		clienteCreditoBloqueadoTitulo: 'Client with blocked credit',
		clienteCreditoBloqueadoMensaje:
			'You can only pick up the cash order for this customer.',
		clienteBloqueadoTitulo: 'blocked client',
		clienteBloqueadoMensaje: 'You cannot generate an order for this customer',
		cambiosGuardadosConPromo:
			'Automatic promotions were calculated and applied',
	},
	tooltip: {
		cambioPromocion: 'Available promotions may have changed.',
	},
	descuentos: {
		automatico: 'automatic',
		escalonado: 'staggered',
		polarizado: 'polarized',
		descuentoMensaje: '{{descuento}}% {{tipo}} discount',
		descuentoSustituido:
			'The {{tipo}} discount has been replaced by an ongoing promotion',
		vieneConPromoOngoing: 'Comes with ongoing promotion',
		descuentoAutomatico: 'Automatic discount',
	},
};
export default en;
