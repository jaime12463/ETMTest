const es = {
	general: {
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
		envase: 'Envase',
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
			'El código no corresponde a un producto vigente del portafolio del cliente',
		ProductoNoEstaHabilitado:
			'El producto no está habilitado para {{descripcion}}',
		excedeCreditoDsiponible: 'El pedido excede el crédito disponible',
		montoMayorDeuda: 'El monto no puede ser mayor a la deuda registrada',
		excedeUnidadesDisponibles:
			'La cantidad es mayor al disponible: {{disponible}}',
		excedePresupuesto:
			'La cantidad ingresada excede el presupuesto asignado para {{descripcion}}',
		borrarPedidosNoMandatorios:
			'Se borrará el pedido de {{tipoPedido}}. ¿Desea continuar?',
		ordenDeCompraEnBlanco:
			'Debe ingresar una orden de compra',
		cantidadSuperiorEnvases:
			'La cantidad excede a las disponibles para retorno',
	},
};
export default es;
