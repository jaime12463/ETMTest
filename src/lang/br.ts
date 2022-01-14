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
		ocultarDetalle: 'Ocultar Detalhe',
		verGrupo: 'Ver grupo',
		ocultarGrupo: 'Esconder grupo',
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
		agregarProductoSKU: 'Entrar no produto',
		numeroOrdenDeCompra: 'Número da ordem de compra ',
		limiteDeCredito: 'Limite de crédito',
		disponible: 'Disponível',
		agregarCompromisoDeCobro: 'Adicionar compromisso de coleção',
		totalDeudaPendiente: 'Dívida total pendente',
		totalCompromisosRegistrados: 'Compromissos de cobrança totais registrados',
		estatus: 'Status',
		pendiente: 'Pendente',
		ejecutada: 'Executado',
		cancelada: 'Cancelado',
		motivo: 'Motivo',
		sinMotivo: 'Sem motivo',
		planDeActividades: 'Plano de atividades',
		descripcion: 'Descrição',
		vigencia: 'Vigência',
		avanzar: 'Avançar',
		editarCantidades: 'Editar quantidades',
		continuar: 'Prosseguir',
		editar: 'Editar',
		restablecerCero: 'Redefinir as quantidades para zero',
		resumenDePedido: 'Resumo do pedido',
		totalContado: 'Total contado:',
		totalCredito: 'Total crédito:',
		totalDeAhorro: 'Poupança Total:',
		totalCargosFinancieros: 'Total de encargos financeiros:',
		productoGratis: 'Produto grátis',
		precioUnitario: 'P. unitário: {{precioUnitario}}',
		subTotal: 'Subtotal: {{subTotal}}',
		cadaUno: 'Cada um',
		paquetes: 'Pacotes',
		ahorras: 'Poupança: {{ahorras}}',
		ahorroTotal: 'Poupança total: {{ahorroTotal}}',
		tipo: 'Tipo',
		bonificacion: 'Bônus',
		fechaDeAlta: 'Data de alta',
		prestamo: 'Préstamo',
		retorno: 'Retorno',
		unidadesMaximasAplicar: 'Unidades máximas que você pode aplicar',
		motivoDelCanje: 'Motivo do canje',
		motivoCancelacion: 'Motivo de cancelamento',
		promocionesAplicadas: 'Promoções aplicadas',
		aplicacionMaxima: 'Aplicação máxima',
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
		iniciativas: 'Iniciativas',
		tarjetaIniciativas:
			'Selecione as iniciativas que você tem disponíveis para o seu cliente.',
		tituloProductosSinCargar: 'Produtos não modificados',
		tituloIniciativasSinMotivo: 'Iniciativas canceladas sem motivo',
		coberturas: 'Coberturas',
		tarjetaCoberturas:
			'Indica a quantidade de produto faltando na geladeira do cliente.',
		bonificaciones: 'Bonificações',
		tarjetaBonificaciones: 'Adicione os bônus para este cliente.',
		bonificacionesDeshabilitadas: 'Não há bônus para este cliente no momento.',
		canjesDeshabilitadas:
			'Sem feno disponível de canje para este cliente neste momento',
		tomaDePedido: 'Tomada de pedidos',
		tarjetaTomaDePedido:
			'Modifique seu pedido com as melhores opções para seu cliente.',
		promociones: 'Promoções',
		tarjetaPromociones:
			'Selecione as promoções que você tem disponíveis para seus clientes.',
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
		ordenDeCompraEnBlanco: 'Você deve inserir um pedido de compra',
		cantidadSuperiorEnvases: 'O valor excede os disponíveis para devolução',
		mensajeProductosSinCargar:
			'Se você avançar para a próxima fase, os cartões que não possuem valores inseridos serão removidos de seu pedido.',
		mensajeIniciativasSinMotivo:
			'Insira um motivo para cada iniciativa cancelada.',
		borrarDescuento: 'Quer eliminar o desconto escalonado?',
		descuentoEscalonadoEliminado: 'Desconto em camadas removido',
		excedeMayorPermitido: 'O montante introduzido excede o máximo permitido',
		excedeMayorPermitidoSubtitulo:
			'O valor da apresentação precisa de ser corrigido.',
	},
	mensajes: {
		borrarDescuento:
			'Depois que o desconto escalonado for removido, você não poderá aplicá-lo novamente a este produto.',
	},
	modal: {
		salirOrderTaking: 'Deseja sair do Order Taking?',
		salirOrderTakingMensaje:
			'Se sair de toda a actividade registada será perdida.',
	},
	toast: {
		cambiosGuardados: 'Mudanças salvas com sucesso',
		ventaBloqueadaTitulo: 'Cliente bloqueado para venda',
		ventaBloqueadaMensaje:
			'Você só pode gerar um compromisso de cobrança para este cliente.',
	},
};
export default br;
