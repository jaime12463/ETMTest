const br = {
	general: {
		producto: 'Produto',
		unidades: 'Unidades',
		subUnidades: 'Sub Unidades',
		totalUnidades: 'Total Unidades',
		totalSubUnidades: 'Total SubUnidades',
		total: 'Total',
		cliente: 'Cliente',
		precio: 'Preço',
		buscar: 'Buscar',
		verDetalle: 'Ver Detalhe',
		fechaEntrega: 'Data de entrega',
		codigo: 'Código',
		nombre: 'Nome',
		razonSocial: 'Razão social',
		denominacion: 'Denominação',
		subunidades: 'Sub Unidades',
		cerrarPedido: 'Fechar visita',
		si: 'Sim',
		no: 'Não',
		aceptar: 'Aceitar',
		cancelar: 'Cancelar',
		pedidosCliente: 'Pedidos efetuados: ',
		estado: 'Estado',
		tipoPedido: 'Tipo de Pedido',
		monto: 'Valor',
		acciones: 'Ações',
		pedidosRealizados: 'Pedidos Realizados',
		verEnvases: 'Ver vasilhames',
		envase: 'Vasilhame',
		pedidoMinimo: 'Pedido mínimo',
		pedidoMaximo: 'Pedido máximo',
		creditoDisponible: 'Crédito disponível',
		ventas: 'Vendas',
		canje: 'Troca',
		devolucion: 'Devolução',
		credito: 'Crédito',
		contado: 'Dinheiro',
		compromisoCobro: 'compromisso de cobrança',
		saldo: 'Equilíbrio',
		documento: 'Documento',
		vencimiento: 'expiração',
		deudaPendiente: 'Dívida pendente',
		compromisoRegistrado: 'Compromissos de cobrança registrados',
		agregarProductoSKU: 'Adicionar produto por SKU...',	
	},
	simbolos: {
		decimal: '.',
		miles: ',',
		moneda: 'R$',
		formatoFechaAmericano: 'false',
		conDecimales: 'true',
	},
	titulos: {
		bienvenido: 'Bem Vindo',
		ingresoPedido: 'Entrada de Pedido',
		productosPedido: 'Ítens do Pedido',
		visitaCliente: 'Visita do Cliente',
		clientes: 'Clientes',
		envases: 'Vasilhames Retornáveis',
	},
	advertencias: {
		clienteNoExiste: 'O código digitado não corresponde a um cliente',
		cantidadEsMayor: 'A quantidade é maior que {{cantidad}} ¿Deseja continuar?',
		fueraDeFrecuencia: 'O cliente está fora de rota',
		noVisitaPlanificada: 'O cliente não tem visita planejada',
		noFechaEntregaInformada:
			'O cliente não tem data de entrega informada para a data atual',
		noPortafolioPrecios:
			'O cliente não tem portifólio vigente para a data de entrega informada',
		limiteSubUnidades:
			'As sub unidades devem ser menores que a apresentação do produto',
		pedidoMinimo: 'O pedido não atinge o valor mínimo de venda ${{monto}}',
		montoMinimo: 'Não cumpre com o valor mínimo de venda do pedido',
		subUnidadesNoPermitidas:
			'As subunidades não estão habilitadas para este produto',
		masDelMontoMaximo:
			'O pedido excede o valor máximo de venda $ {{montoVentaMaxima}}',
		subUnidadesNoMultiplo:
			'As subunidades devem ser múltiplos de {{subunidadesVentaMinima}}',
		cancelarPedido: 'Deseja cancelar o pedido?',
		cancelarTodosLosPedido:
			'Foram cancelados todos os pedidos com data de entrega {{fechaDeEntrega}} ¿Deseja continuar?',
		excedeCreditoDsiponible: 'O pedido excede o crédito disponível',
		montoMayorDeuda: 'O valor não pode ser maior que a dívida registrada',
		excedeUnidadesDisponibles:
			'A quantidade é maior do que a disponível: {{disponible}}',
		borrarPedidosNoMandatorios:
			'O pedido de {{tipoPedido}} será excluído. Você deseja continuar?',
		ProductoNoEstaHabilitado:
			'O produto não está habilitado para {{descripcion}}',
		excedePresupuesto:
			'O valor inserido excede o orçamento alocado para {{descripcion}}',
		ordenDeCompraEnBlanco:
			'Você deve inserir um pedido de compra',
		cantidadSuperiorEnvases:
			'O valor excede os disponíveis para devolução',						
	},
};
export default br;
