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
		agregarProductoSKU: 'Ingresar producto',
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
		restablecerPromociones: 'Restablecer promociones',
		resumenDePedido: 'Resumen de pedido',
		totalContado: 'Total contado:',
		totalCredito: 'Total crédito:',
		totalDeAhorro: 'Total de ahorro:',
		totalCargosFinancieros: 'Total de cargos financieros:',
		productoGratis: 'Producto gratis',
		precioUnitario: 'P. Unitario: {{precioUnitario}}',
		subTotal: 'Subtotal: {{subTotal}}',
		cadaUno: 'c/u',
		paquetes: 'Paquetes',
		ahorras: 'Ahorras: {{ahorras}}',
		ahorroTotal: 'Ahorro total: {{ahorroTotal}}',
		tipo: 'Tipo',
		bonificacion: 'Bonificación',
		fechaDeAlta: 'Fecha de alta',
		prestamo: 'Préstamo',
		retorno: 'Retorno',
		unidadesMaximasAplicar: 'Unidades máximas que puedes aplicar',
		motivoDelCanje: 'Motivo del canje',
		motivoCancelacion: 'Motivo de cancelación',
		promocionesAplicadas: 'Promociones aplicadas',
		aplicacionMaxima: 'Aplicación máxima',
		aplicar: 'Aplicar',
		promocionAutomatica: 'Promoción automática',
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
		promociones: 'Promociones',
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
		ProductoNoEstaEnPortafolioCliente: 'SKU incorrecto',
		ProductoNoEstaHabilitado:
			'El producto {{codigo}} no está habilitado para {{descripcion}}',
		excedeCreditoDsiponible: 'El pedido excede el crédito disponible',
		montoMayorDeuda: 'El monto no puede ser mayor a la deuda registrada',
		excedeUnidadesDisponibles: 'Cantidad de promoción superada',
		excedePresupuesto:
			'La cantidad ingresada excede el presupuesto asignado para {{descripcion}}',
		borrarPedidosNoMandatorios:
			'Se borrará el pedido de {{tipoPedido}}. ¿Desea continuar?',
		ordenDeCompraEnBlanco: 'Debe ingresar una orden de compra',

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
		productoAgregado: 'Producto agregado correctamente',

		borrarPedidosTitulo: '¿Quieres eliminar todos los productos?',
		borrarPedidos: 'Todos tus productos se borrarán de tu Toma de pedido',
		borrarPedidosGeneral:
			'Todos los productos se borrarán de tu pedido actual junto con las inicitivas, coberturas, envases, etc., que contengan.',
		productoEliminadoTitulo: 'Productos eliminados correctamente',
		productoEliminadoMensaje:
			'Se eliminarón todos los productos de la toma de pedido junto con las iniciativas, coberturas, canjes, envases,etc.',
		borrarPromocionMensajeCanjeBonificacion:
			'Todas las cantidades de las promociones junto con las bonificaciones que contienen se restablecerán a cero. Los canjes se eliminarán.',
		borrarPromocionMensajeCanje:
			'Todas las cantidades de las promociones se restablecerán a cero y los canjes que contienen se eliminarán.',
		borrarPromocionMensajeBonificacion:
			'Todas las cantidades de las promociones junto con las bonificaciones que contienen se restablecerán a cero.',
		borrarPromocionTitulo: 'Restablecer cantidades a cero',
		borrarPromocionMensaje:
			'Todas las cantidades de las promociones ingresadas se restablecerán a cero.',
		promocionEliminadoTitulo: 'Productos restablecidos a cero correctamente',
		promocionEliminadoMensajeCanjeBonificacion:
			'Las cantidades de las promociones y de las bonificaciones se han restablecido a cero. Los canjes que contenían fueron eliminados.',
		promocionEliminadoMensajeCanje:
			'Las cantidades de las promociones se han restablecido a cero. Los canjes que contenían fueron eliminados.',
		promocionEliminadoMensajeBonificacion:
			'Las cantidades de las promociones y de las bonificaciones se han restablecido a cero.',
		borrarLineaPedidosTitulo: '¿Quieres eliminar este producto?',
		borrarLineaPedidosMensajeBonificacion:
			'Este producto se borrará de tu pedido actual junto con las bonificaciones que contiene.',
		borrarLineaPedidosMensajeCanje:
			'Este producto se borrará de tu pedido actual junto con los canjes que contiene.',
		borrarLineaPedidosMensajeCanjeBonificacion:
			'Este producto se borrará de tu pedido actual junto con los canjes y las bonificaciones que contiene.',
		borrarLineaPedidosMensajeUnico:
			'Este producto se borrará de tu Toma de pedido',
		borrarLineaPedidosMensajeUnicoCanje: 'Este producto se borrará de tu Canje',
		productoUnicoEliminadoTitulo: 'Producto eliminado correctamente',
		lineaBorradaConBonificacion:
			'Se eliminó el producto de la toma de pedido junto con los las bonificaciones que contenía.',
		lineaBorradaConCanje:
			'Se eliminó el producto de la toma de pedido junto con los canjes que contenía.',
		lineaBorradaConCanjeBonificacion:
			'Se eliminó el producto de la toma de pedido junto con los canjes y las bonificaciones que contenía.',
		pdfErrorTitulo: 'Archivo no disponible',
		pdfErrorDescripcion:
			'En este momento no es posible visualizar el archivo adjunto.',
		noEditarPlaneacionTitulo: 'No es posible editar las cantidades',
		noEditarPlaneacionDescripcion:
			'Para volver a editar las cantidades de coberturas e iniciativas , deberás hacerlo  en toma de pedido.',
		reestablecerCoberturasTitulo: 'Restablecer cantidades a cero',
		reestablecerCoberturasDescripcion:
			'Todas las cantidades de las coberturas ingresadas se restablecerán a cero',
		errorSKUIncorrecto:
			'El SKU no corresponde a ningún producto, favor de validar.',
	},
	pasos: {
		planeacion: 'Planeación',
		tomaDePedido: 'Toma de pedido',
		otros: 'Otros',
		finalizar: ' Finalizar pedido',
	},
	mensajes: {
		borrarDescuento:
			'Se eliminará el descuento escalonado del producto {{codigo}}. Para aplicarlo de nuevo, tendrás que volver a agrega el producto.',
		excedeUnidadesDisponibles:
			'Superaste la cantidad máxima de promoción permitida que puedes aplicar por cliente.',
	},
	modal: {
		salirOrderTaking: '¿Quieres salir de Order taking?',
		salirOrderTakingMensaje:
			'Si sales toda la actividad registrada se perderá.',
		restablecerBonificacionesTitulo: 'Restablecer cantidades a cero',
		restablecerBonificacionesMensaje:
			'Todas las cantidades de las bonificaciones se restablecerán a cero.',
		tarjetasVaciasTitulo: 'Existen tarjetas vacias',
		tarjetasVaciasMensaje:
			'Si avanzas, las tarjetas que no tienen cantidades se eliminaran.',
	},
	toast: {
		cambiosGuardados: 'Cambios guardados exitosamente',
		ventaBloqueadaTitulo: 'Cliente bloqueado para venta',
		ventaBloqueadaMensaje:
			'Unicamente puedes generar un compromiso de cobro para este cliente.',
		bonificacionAgregada: 'Bonificacion agregada correctamente',
		errorBonificacionTotalTitulo: 'Error en bonificación total',
		errorBonificacionTotalMensaje:
			'Esta bonificación tiene que ser de aplicación total. Favor de modificar cantidades.',
		excedeMayorPermitidoTitulo: 'Cantidad excede el valor permitido',
		excedeMayorPermitidoMensaje:
			'Es necesario corregir el valor de la presentación.',
		iniciativaSinMotivoTitulo: 'Iniciativa cancelada sin motivo',
		iniciativaSinMotivoMensaje:
			'Debes ingresar un motivo para la iniciativa cancelada.',
		pedidoMinimoNoAlcanzadoTitulo: 'Pedido mínimo no alcanzado',
		pedidoMinimoNoAlcanzadoMensaje:
			'No se ha alcanzado el pedido mínimo, por favor completar el pedido.',
		cantidadSuperiorEnvasesTitulo: 'Cantidad de envases superada',
		cantidadSuperiorEnvasesMensaje:
			'La cantidad de venta y prestamo no puede superar a la cantidad de envases disponibles de retorno.',
		canjeSinMotivoTitulo: 'Canje sin motivo',
		canjeSinMotivoMensaje: 'Es necesario agregar el motivo del canje',
		productoAgregado: 'Producto agregado correctamente',
		limiteDeCreditoExcedidoTitulo: 'Límite de crédito excedido',
		limiteDeCreditoExcedidoMensaje:
			'Este cliente ha excedido su límite de crédito, por lo que no se podra levantar pedidos a crédito',
		productoIngresado: 'Se ha ingresado el producto exitosamente',
	},
};
export default es;
