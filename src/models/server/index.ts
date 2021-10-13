//db.json
export type TDatosClientesProductos = {
	clientes: TClientes;
	productos: TProductos;
	presupuestoTipoPedido: TpresupuestoTipoPedido[];
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
	tipoProducto: number; //TODO: Mirar si esto debe ser un enum
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
	precios: TPrecio[];
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
