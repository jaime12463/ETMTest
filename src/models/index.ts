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
	detalles: TDetalle[];
	configuracionPedido: TConfiguracionPedido;
	portafolio: TPortafolio[];
};

export type TProducto = {
	codigoProducto: number;
	nombre: string;
	presentacion: number;
	subunidadesVentaMinima: number;
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
	montoVentaMaxima: number;
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
	[codigoCliente: string]: TPedidoClienteParaEnviar[];
};

export type TPedidoClienteParaEnviar = {
	codigoPedido: string;
	fechaEntrega: string;
	usuario: string;
	estado: 'A' | 'C';
	productosPedido: TProductoPedido[];
	enviado: boolean;
};

export type TPedidoActual = {
	codigoPedido: string;
	fechaEntrega: string;
	estado: 'A' | 'C';
	productosPedido: TProductoPedido[];
};

export type TClienteActual = {
	codigoCliente: string;
	razonSocial: string;
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

export type TInputsCodigoCliente = {
	codigoCliente: string;
};

export type TInputsFormularioAgregarProducto = {
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

export type TFunctionMostarAvertenciaPorDialogo = (
	mensaje: string,
	dataCy: string,
	manejadorClick?: (oprimioBotonAceptar: boolean) => void,
	textosBotonesDefault?: {
		aceptar: string;
		cancelar: string;
	}
) => void;

export type TValidacionFechaEntrega = {
	esValidaFechaEntrega: boolean;
	fechaEntrega: string;
};

export type TValidacionFechaVisita = {
	esValidaVisitaPlanificada: boolean;
	fechaVisitaPlanificada: string;
};
