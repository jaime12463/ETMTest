//db.json
export type TDatosClientesProductos = {
	clientes: TClientes;
	productos: TProductos;
	presupuestoTipoPedido: TpresupuestoTipoPedido[];
	iniciativas: TIniciativas[];
};

export type TIniciativas = {
	codigoIniciativa: number;
	nombreActividad: string;
	planActividad: string;
	descripcion: string;
	vencimiento: string;
	codigoProducto: number;
	unidades: number;
	subUnidades: number;
};

export type TClientes = {
	[codigoCliente: string]: TCliente;
};

export type TProductos = {
	[codigoProducto: number]: TProducto;
};

export type TCliente = {
	codigoCliente: string;
	visitasPlanificadas: TVisitaPlanificada[];
	fechasEntrega: TFechaEntrega[];
	detalles: TDetalle;
	informacionCrediticia: TInformacionCrediticia;
	iniciativasHabilitadas: TIniciativasHabilitadas[];
	coberturas: TCoberturas[];
	configuracionPedido: TConfiguracionPedido;
	portafolio: TPortafolio[];
};

export type TProducto = {
	codigoProducto: number;
	nombre: string;
	presentacion: number;
	subunidadesVentaMinima: number;
	implicito1?: number;
	implicito2?: number;
	tipoProducto: number;
	promoPush?: TPromoPush;
};

export type TPromoPush = {
	codigoPromocion: number;
	componentes: TPromoPushComponente[];
};

export type TPromoPushComponente = {
	codigoProducto: number;
	cantidad: number;
	unidadMedida: string;
};

export type TVisitaPlanificada = {
	dia: string;
	secuencia: number;
};

export type TFechaEntrega = {
	fechaVisita: string;
	fechaEntrega: string;
};

export type TDetalle = {
	nombreComercial: string;
};

export type TCoberturas = {
	grupoCobertura: string;
	secuenciaGrupoCobertura: number;
	productosGrupoCobertura: number[];
};

export type TIniciativasHabilitadas = {
	codigoIniciativa: number;
	secuencia: number;
};

export type TInformacionCrediticia = {
	condicion: TCondicicon;
	limite?: number;
	disponible?: number;
	esCreditoBloqueado: boolean;
	documentos?: TDocumento[];
};
export type TCondicicon = 'contado' | 'creditoFormal' | 'creditoInformal'; //TODO: Esto debe ser un ENUM

export type TConfiguracionPedido = {
	canjeHabilitado: boolean;
	ventaMinima?: TVentaMinima;
	ventaContadoMaxima?: TVentaContadoMaxima;
	cantidadMaximaUnidades?: number;
};

export type TTipoPedidoHabilitado = string;

export type TVentaMinima = {
	montoVentaMinima: number;
	cumplimientoPorFecha: TCumplimientoPorFecha[];
};

export type TCumplimientoPorFecha = {
	fechaEntrega: string;
	cumplido: boolean;
};

export type TVentaContadoMaxima = {
	montoVentaContadoMaxima: number;
	consumidoPorFecha: TConsumidoPorFecha[];
};

export type TConsumidoPorFecha = {
	fechaEntrega: string;
	consumido: number;
};

export type TPortafolio = {
	codigoProducto: number;
	esVentaSubunidades: boolean;
	unidadesDisponibles?: number;
	descuentoPolarizado?: TDescuentoPolarizado[];
	descuentoEscalonado?: TDescuentoEscalonado[];
	precios: TPrecio[];
};

export type TDescuentoEscalonado = {
	unidadesDesde: number;
	unidadesHasta: number;
	porcentajeDescuentoEscalonado: number;
};

export type TDescuentoPolarizado = {
	precioVentaAlPublicoDesde: number;
	precioVentaAlPublicoHasta: number;
	porcentajeDescuentoPolarizado: number;
	claseCondicionPolarizado: string;
};

export type TPrecio = {
	precioConImpuestoUnidad: number;
	precioConImpuestoSubunidad: number;
	vigenciaInicioPrecio: string;
	vigenciaFinPrecio: string;
	descuento: number;
	componentes: TComponente[];
};

export type TComponente = {
	codigoProducto: number;
	precioBase: number;
	descuento: number;
	precioFinal: number;
};

export type TDocumento = {
	numero: number;
	fecha: string;
	vencimiento: string;
	monto: number;
};

export type TpresupuestoTipoPedido = {
	tipoPedido: string;
	presupuesto: number;
	vigenciaInicioPresupuesto: string;
	vigenciaFinPresupuesto: string;
	tieneProductosHabilitados: boolean;
	productosHabilitados: number[];
};

//configuraciones.json
export type TDatosConfiguracion = {
	configuraciones: TConfiguracion;
};

export type TConfiguracion = {
	esFrecuenciaAbierta: boolean;
	habilitaOrdenDeCompra: boolean;
	tipoPedidoEnvasesHabilitados: string[];
	tipoPedidos: TTipoPedido[];
	motivosCancelacionIniciativas: TMotivosCancelacionIniciativas[];
};

export type TMotivosCancelacionIniciativas = {
	codigo: number;
	descripcion: string;
};

export type TTipoPedido = {
	codigo: string;
	descripcion: string;
	descripcionCorta: string;
	secuencia: number;
	esValorizado: boolean;
	esMandatorio: boolean;
	habilitaPromocion: boolean;
	contribuyeAMinimo: boolean;
	habilitaSubunidades: 'condicional' | 'nunca' | 'siempre'; //TODO: Cambiar esto a un enum
	validaSubunidadesMinimas: boolean;
	tipoProductosHabilitados: number[];
	generaEnvases: boolean;
	requiereMotivo: boolean;
	catalogoMotivos: TCatalogoMotivo[];
	validaPresupuesto: boolean;
};

export type TCatalogoMotivo = {
	codigo: number;
	descripcion: string;
};
