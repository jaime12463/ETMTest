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
	condicion: string; //TODO: Esto debe ser un ENUM
	disponible: number;
};

export type TConfiguracionPedido = {
	ventaMinima?: TVentaMinima;
	ventaContadoMaxima: TVentaContadoMaxima;
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
	esVentaSubunidades: boolean;
	precios: TPrecio[];
};

export type TPrecio = {
	precioConImpuestoUnidad: number;
	precioConImpuestoSubunidad: number;
	vigenciaInicioPrecio: string;
	vigenciaFinPrecio: string;
};

//configuraciones.json
export type TDatosConfiguracion = {
	configuraciones: TConfiguracion[];
};

export type TConfiguracion = {
	esFrecuenciaAbierta: boolean;
	esVentaSubunidadesRuta: boolean;
};
