const es = {
	general: {
		archivosAdjuntos: 'Archivos adjuntos',
		producto: 'Producto',
		unidades: 'Unidades',
		subUnidades: 'SubUnidades',
		totalUnidades: 'Total Unidades',
		totalSubUnidades: 'Total SubUnidades',
		total: 'Total',
		cliente: 'Cliente',
		precio: 'Precio',
		buscar: 'Buscar',
		verDetalle: 'Ver Detalle',
		ocultarDetalle: 'Ocultar Detalle',
		verGrupo: 'Ver grupo',
		ocultarGrupo: 'Ocultar grupo',
		fechaEntrega: 'Fecha de entrega',
		codigo: 'Código',
		nombre: 'Nombre',
		razonSocial: 'Razón social',
		denominacion: 'Denominación',
		subunidades: 'Subunidades',
		cerrarPedido: 'Cerrar visita',
		si: 'Si',
		no: 'No',
		aceptar: 'Aceptar',
		cancelar: 'Cancelar',
		pedidosCliente: 'Pedidos efectuados: ',
		estado: 'Estado',
		tipoPedido: 'Tipo de Pedido',
		monto: 'Monto',
		acciones: 'Acciones',
		pedidosRealizados: 'Pedidos Realizados',
		verEnvases: 'Ver envases',
		envases: 'Envases',
		pedidoMinimo: 'Pedido mínimo',
		pedidoMaximo: 'Pedido máximo',
		creditoDisponible: 'Crédito disponible',
		ventas: 'Ventas',
		canje: 'Canje',
		devolucion: 'Devolucion',
		credito: 'Crédito',
		contado: 'Contado',
		venta: 'Venta',
		compromisoCobro: 'Compromiso de Cobro',
		saldo: 'Saldo',
		documento: 'Documento',
		vencimiento: 'Vencimiento',
		deudaPendiente: 'Deuda Pendiente',
		compromisoRegistrado: 'Compromisos de Cobro Registrados',
		agregarOrdenDeCompra: '¿Agregar Orden Compra?',
		deseaAgregarOrdenDeCompra: '¿Desea asociar una orden de compra?',
		agregarProductoSKU: 'Agregar producto por SKU...',
		continuarA: 'Continuar a ',
		numeroOrdenDeCompra: 'Número de orden de compra',
		limiteDeCredito: 'Límite de crédito',
		disponible: 'Disponible',
		agregarCompromisoDeCobro: 'Agregar compromiso de cobro',
		totalDeudaPendiente: 'Total deuda pendiente',
		totalCompromisosRegistrados: 'Total compromisos de cobro registrados',
		estatus: 'Estatus',
		pendiente: 'Pendiente',
		ejecutada: 'Ejecutada',
		cancelada: 'Cancelada',
		motivo: 'Motivo',
		sinMotivo: 'Sin motivo',
		planDeActividades: 'Plan de actividades',
		descripcion: 'Descripción',
		vigencia: 'Vigencia',
		avanzar: 'Avanzar',
		editarCantidades: 'Editar cantidades',
		continuar: 'Continuar',
		editar: 'Editar',
		salir: 'Salir',
		restablecerCero: 'Restablecer cantidades a cero',
		resumenDePedido: 'Resumen de pedido',
		totalContado: 'Total contado',
		totalCredito: 'Total crédito',
		totalDeAhorro: 'Total de ahorro',
		totalCargosFinancieros: 'Total de cargos financieros',
		productoGratis: 'Producto gratis',
		precioUnitario: 'P. Unitario',
		subTotal: 'Subtotal',
		paquetes: 'Paquetes',
		ahorras: 'Ahorras',
		tipo: 'Tipo',
		bonificacion: 'Bonificación',
		fechaDeAlta: 'Fecha de alta',
	},
	simbolos: {
		decimal: '.',
		miles: ',',
		moneda: '$',
		formatoFechaAmericano: 'false',
		conDecimales: 'true',
	},
	titulos: {
		bienvenido: 'Bienvenido',
		ingresoPedido: 'Ingreso de Pedido',
		productosPedido: 'Productos del Pedido',
		visitaCliente: 'Visita del Cliente',
		clientes: 'Clientes',
		envases: 'Envases retornables',
		PedidosDelClienteActual: 'Pedidos del cliente',
		ordenDeCompra: 'Orden de Compra',
		tarjetaEnvases: 'Revisa la cantidad de envases para tus productos',
		tarjetaCanjes: 'Indica la cantidad de producto para cambio',
		tarjetaCompromisoCobro: 'Generar un compromiso de cobro',
		tarjetaOrdenDeCompra: 'Ingresa el número de orden de compra del cliente',
		iniciativas: 'Iniciativas',
		tarjetaIniciativas:
			'Selecciona las iniciativas que tienes disponible para tu cliente.',
		tituloProductosSinCargar: 'Productos sin modificar',
		tituloIniciativasSinMotivo: 'Iniciativas canceladas sin motivos',
		coberturas: 'Coberturas',
		tarjetaCoberturas:
			'Indica la cantidad de producto faltante en el refrigerador del cliente.',
		bonificaciones: 'Bonificaciones',
		tarjetaBonificaciones: 'Agregar las bonificaciones para este cliente.',
		bonificacionesDeshabilitadas:
			'No hay bonificaciones para el cliente en este momento',
		canjesDeshabilitadas:
			'No hay disponibilidad de canje para este cliente en este momento',	
		tomaDePedido: 'Toma de pedido',	
		tarjetaTomaDePedido:
			'Modifica tu pedido con las mejores opciones para tu cliente.',	
		promociones: 'Toma de pedido',	
		tarjetaPromociones:
			'Selecciona las promociones que tienes disponible para tus clientes.',				
	},
	advertencias: {
		clienteNoExiste: 'El código ingresado no corresponde a un cliente',
		cantidadEsMayor: 'La cantidad es mayor a {{cantidad}} ¿Desea continuar?',
		fueraDeFrecuencia: 'El cliente está fuera de frecuencia',
		noVisitaPlanificada: 'El cliente no tiene visita planificada',
		noFechaEntregaInformada:
			'El cliente no tiene fecha de entrega informada para la fecha actual',
		noPortafolioPrecios:
			'El cliente no tiene portafolio vigente para la fecha de entrega informada',
		limiteSubUnidades:
			'Las subunidades deben ser menores a la presentación del producto',
		pedidoMinimo: 'El pedido no alcanza el monto de venta mínima  ${{monto}}',
		montoMinimo: 'No cumple con el monto mínimo de venta del pedido',
		subUnidadesNoPermitidas:
			'Las subunidades no están habilitadas para este producto',
		masDelMontoMaximo:
			'El pedido excede el monto de venta máxima $ {{montoVentaMaxima}}',
		subUnidadesNoMultiplo:
			'Las subunidades debe ser en múltiplos de {{subunidadesVentaMinima}}',
		cancelarPedido: 'Desea cancelar el pedido?',
		cancelarTodosLosPedido:
			'Se cancelarán todos los pedidos con fecha de entrega {{fechaDeEntrega}} ¿Desea continuar?',
		ProductoNoEstaEnPortafolioCliente:
			'El código {{codigo}} no corresponde a un producto vigente del portafolio del cliente',
		ProductoNoEstaHabilitado:
			'El producto {{codigo}} no está habilitado para {{descripcion}}',
		excedeCreditoDsiponible: 'El pedido excede el crédito disponible',
		montoMayorDeuda: 'El monto no puede ser mayor a la deuda registrada',
		excedeUnidadesDisponibles:
			'La cantidad es mayor al disponible: {{disponible}}',
		excedePresupuesto:
			'La cantidad ingresada excede el presupuesto asignado para {{descripcion}}',
		borrarPedidosNoMandatorios:
			'Se borrará el pedido de {{tipoPedido}}. ¿Desea continuar?',
		ordenDeCompraEnBlanco: 'Debe ingresar una orden de compra',
		cantidadSuperiorEnvases:
			'La cantidad excede a las disponibles para retorno',
		borrarTodosTomaPedido:
			'¿Quieres Borrar todos los productos?. Todos los productos seleccionados se borraran de la toma de pedido',
		borrarPromosPush:
			'Todos los productos seleccionados se borraran de Promociones',
		mensajeProductosSinCargar:
			'Si avanzas a la siguiente etapa, las tarjetas que no tienen cantidades ingresadas se eliminirán de tu toma de pedido.',
		mensajeIniciativasSinMotivo:
			'Por favor, ingrese un motivo para cada iniciativa cancelada.',
		borrarDescuento: '¿Deseas eliminar el descuento escalonado? ',
		descuentoEscalonadoEliminado: 'Descuento escalonado eliminado',
	},
	pasos: {
		planeacion: 'Planeación',
		tomaDePedido: 'Toma de pedido',
		otros: 'Otros',
		finalizar: ' Finalizar pedido',
	},
	mensajes: {
		borrarDescuento:
			'Una vez eliminado el descuento escalonado, no podrás volverlo a aplicar en este producto.',
	},
};
export default es;
