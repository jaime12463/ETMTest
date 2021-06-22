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
	visitasPlanificadas: TVisitaPlanificada[];
	fechasEntrega: TFechaEntrega[];
	detalles: TDetalle;
	configuracionPedido: TConfiguracionPedido;
	portafolio: TPortafolio[];
};

export type TProducto = {
	nombre: string;
	presentacion: number;
};

export type TVisitaPlanificada = {
	dia: string;
	secuencia: number;
};

export type TFechaEntrega = {
	fechaVisita: string;
	fechaEntrega: string;
};

export type TConfiguracionPedido = {
	montoVentaMinima?: number;
	cantidadMaximaUnidades?: number;
};

export type TDetalle = {
	nombreComercial: string;
};

export type TPortafolio = {
	codigoProducto: number;
	esVentaSubunidades: boolean;
	precios: TPrecios;
};

export type TPrecios = TPrecio[];

export type TPrecio = {
	precioConImpuestoUnidad: number;
	precioConImpuestoSubunidad: number;
	vigenciaInicioPrecio: string;
	vigenciaFinPrecio: string;
};

export type TPedidosClientes = {
	[codigoCliente: string]: TProductoPedido[];
};

export type TPedidoCliente = {
	codigoCliente: string;
	productosPedido: TProductoPedido[];
	fechaEntrega: string;
};

export type TProductoPedido = {
	codigoProducto: number;
	nombreProducto: string;
	unidades: number;
	subUnidades: number;
	total: number;
};

export type TPrecioSinVigencia = {
	codigoProductoConNombre: string;
	precioConImpuestoUnidad: number;
	precioConImpuestoSubunidad: number;
};

export type TPrecioProducto = {
	codigoProducto: number;
	nombre: string;
	presentacion: number;
	precios: TPrecios;
};

export type TDatosConfiguracion = {
	configuraciones: TConfiguracion[];
};

export type TConfiguracion = {
	esFrecuenciaAbierta: boolean;
	esVentaSubunidadesRuta: boolean;
};

export type TInputsFormularioAgregarProducto = {
	codigoCliente: string;
	unidades: string;
	subUnidades: string;
	codigoProductoConNombre: string;
	productoABuscar: string;
};

export type TTotalPedido = {
	totalUnidades: number;
	totalSubUnidades: number;
	totalPrecio: number;
};
