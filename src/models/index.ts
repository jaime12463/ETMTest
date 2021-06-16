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
	[codigoCliente: string]: TProductosPedidos;
};

export type TPedidoCliente = {
	codigoCliente: string;
	productosPedido: TProductosPedidos;
	fechaEntrega: string;
};

export type TProductoPedido = {
	codigoProductoConNombre: string;
	unidades: number;
	subUnidades: number;
	total: number;
};

export type TProductosPedidos = TProductoPedido[];

export type TProductoPedidoConPrecios = {
	codigoProductoConNombre: string;
	unidades: number;
	subUnidades: number;
	precioConImpuestoUnidad: number;
	precioConImpuestoSubunidad: number;
};

export type TPreciosProductos = TPrecioProducto[];

export type TPrecioProducto = {
	codigoProducto: number;
	nombre: string;
	presentacion: number;
	precios: TPrecios;
};

export type TDatosConfiguracion = {
	configuraciones: TConfiguraciones;
};

export type TConfiguraciones = TConfiguracion[];

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
