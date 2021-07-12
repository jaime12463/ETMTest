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
	},
	titulos: {
		bienvenido: 'Bienvenido',
		ingresoPedido: 'Ingreso de Pedido',
		productosPedido: 'Productos del Pedido',
		visitaCliente: 'Visita del Cliente',
		clientes: 'Clientes',
	},
	advertencias: {
		clienteNoPortafolio: 'El cliente no tiene portafolio informado',
		cantidadEsMayor: 'La cantidad es mayor a {{cantidad}} ¿Desea continuar?',
		noFechaInformada: 'No tiene fecha de entrega informada',
		fueraDeFrecuencia: 'El cliente está fuera de frecuencia',
		noFechaProgramada: 'El cliente no tiene fecha de entrega programada',
		limiteSubUnidades:
			'Las subunidades deben ser menores a la presentación del producto',
		pedidoMinimo: 'No cumple con el pedido mínimo de ${{monto}}',
		montoMinimo: 'No cumple con el monto mínimo de venta del pedido',
		subUnidadesNoPermitidas:
			'Las subunidades no están habilitadas para este producto',
		masDelMontoMaximo:
			'La suma de los pedidos para la fecha de entrega {{fechaDeEntrega}} excede el monto máximo para el cliente $ {{montoVentaMaxima}}',
		subUnidadesNoMultiplo:
			'Las subunidades debe ser en múltiplos de {{subunidadesVentaMinima}}',
		cancelarPedido: 'Desea cancelar el pedido?',
	},
};
export default es;
