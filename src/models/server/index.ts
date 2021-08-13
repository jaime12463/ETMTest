//db.json
export type TDatosClientesProductos = {
	clientes: TClientes;
	productos: TProductos;
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
	subunidadesVentaMinima: number; //TODO: Preguntar si esta bien la key.
	implicito1?: number;
	implicito2?: number;
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
	disponible: number;
	esCreditoBloqueado: boolean;
	documentos?: TDocumentos[];
};
export type TCondicicon = 'contado' | 'creditoFormal' | 'creditoInformal'; //TODO: Esto debe ser un ENUM

export type TConfiguracionPedido = {
	ventaMinima?: TVentaMinima;
	ventaContadoMaxima?: TVentaContadoMaxima;
	cantidadMaximaUnidades?: number;
};

export type TVentaMinima = {
	montoVentaMinima?: number;
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
	esVentaSubunidades: string;
	unidadesDisponibles?: number;
	precios: TPrecio[];
};

export type TPrecio = {
	precioConImpuestoUnidad: number;
	precioConImpuestoSubunidad: number;
	vigenciaInicioPrecio: string;
	vigenciaFinPrecio: string;
};

export type TDocumentos = {
	numero: number;
	fecha: string;
	vencimiento: string;
	monto: number;
};

//configuraciones.json
export type TDatosConfiguracion = {
	configuraciones: TConfiguracion[];
};

export type TConfiguracion = {
	esFrecuenciaAbierta: boolean;
	esVentaSubunidadesRuta: boolean;
};
