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
		cerrarPedido: 'Cerrar pedido',
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
		signoMoneda: '$',
		credito: 'Crédito',
		contado: 'Contado',
		venta: 'Venta',
	},
	titulos: {
		bienvenido: 'Bienvenido',
		ingresoPedido: 'Ingreso de Pedido',
		productosPedido: 'Productos del Pedido',
		visitaCliente: 'Visita del Cliente',
		clientes: 'Clientes',
		envases: 'Envases retornables',
		PedidosDelClienteActual: 'Pedidos del cliente',
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
		pedidoMinimo: 'No cumple con el pedido mínimo de ${{monto}}',
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
			'El código no corresponde a un portafolio vigente del cliente',
		excedeCreditoDsiponible: 'El pedido excede el crédito disponible',
	},
};
export default es;
