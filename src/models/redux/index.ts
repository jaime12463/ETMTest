import {
	TDatosClientesProductos,
	TCondicicon,
	TPromoPush,
	TDatosConfiguracion,
	TIniciativas,
	TDescuentoEscalonado,
	TDescuentoPolarizado,
} from 'models/server';

//Cliente Actual
export type TClienteActual = {
	codigoCliente: string;
	razonSocial: string;
	condicion: TCondicicon;
	tipoPagoActual: ETiposDePago;
};

export type TCompromisoDeCobro = {
	id: string;
	fechaCreacion: string;
	fechaEntrega: string;
	monto: number;
	tipoDocumento: string;
};

//Configuracion
export type TDatosConfiguracionesSlice = {
	estado: EEstadosFetch;
	datos: TDatosConfiguracion;
};

//Datos
export type TDatosSlice = {
	estado: EEstadosFetch;
	datos: TDatosClientesProductos;
};

export enum EEstadosFetch {
	Loaded,
	Loading,
	Error,
	Idle,
}

//Visita Actual
export type TVisita = {
	fechaEntrega: string;
	tipoPedidoActual: string;
	saldoPresupuestoTipoPedido: TPresupuestoTipoPedidoTotal;
	pedidos: TPedidos;
	mostrarPromoPush: boolean;
	bloquearPanelCarga: boolean;
	ordenDeCompra: string;
	iniciativas: TIniciativasCliente[];
	iniciativasBloqueadas: boolean;
	fechaVisitaPlanificada: string;
};

export type TIniciativasCliente = {
	estado: 'pendiente' | 'ejecutada' | 'cancelada';
	motivo: string;
	secuencia: number;
	fechaEntrega: string;
	codigoIniciativa: number;
	nombreActividad: string;
	planActividad: string;
	descripcion: string;
	vencimiento: string;
	codigoProducto: number;
	unidades: number;
	subUnidades: number;
	unidadesEjecutadas: number;
	subUnidadesEjecutadas: number;
};

export type TPresupuestoTipoPedidoTotal = {
	[tipoPedido: string]: number;
};

export type TPedidos = {
	[tipoPedido: string]: TPedido;
};

export type TPedido = {
	tipoPedido: string;
	codigoPedido: string;
	fechaEntrega: string;
	estado: EEstadosDeUnPedido;
	productos: TProductoPedido[];
	ordenDeCompra: string;
};

export enum EEstadosDeUnPedido {
	Activo,
	Cancelado,
}

export type TProductoPedido = TPrecioProducto & TPedidoDelProducto;

export type TPrecioProducto = {
	codigoProducto: number;
	nombreProducto: string;
	presentacion: number;
	subunidadesVentaMinima: number;
	esVentaSubunidades: boolean;
	precioConImpuestoUnidad: number;
	precioConImpuestoSubunidad: number;
	codigoImplicito1?: number;
	nombreImplicito1?: string;
	codigoImplicito2?: number;
	nombreImplicito2?: string;
	unidadesDisponibles?: number;
	promoPush?: TPromoPush;
	tipoProducto: number;
	descuentoPolarizado?: TDescuentoPolarizado[];
	descuentoEscalonado?: TDescuentoEscalonado[];
};

export type TPedidoDelProducto = {
	unidades: number;
	subUnidades: number;
	total: number;
	preciosBase: TPreciosProductoUnidadYSubUnidad;
	preciosNeto: TPreciosProductoUnidadYSubUnidad;
	descuento?: TDescuentoProducto;
	tipoPago: ETiposDePago;
	catalogoMotivo: string;
	estado?: 'activo' | 'eliminado' | 'transito';
};

export type TPreciosProductoUnidadYSubUnidad = {
	unidad: number;
	subUnidad: number;
};

export type TDescuentoProducto = {
	tipo: 'escalonado' | 'polarizado' | 'eliminado';
	codigoDescuento?: string;
	inputPolarizado: number;
};

export enum ETiposDePago {
	Contado,
	Credito,
}

export type TImplicitos = {
	codigoImplicito?: number;
	nombreImplicito?: string;
};

//Pedidos Clientes
export type TPedidosClientes = {
	[codigoCliente: string]: {
		pedidos: TPedidoClienteParaEnviar[];
		compromisosDeCobro: TCompromisoDeCobro[];
		iniciativas: TIniciativasCliente[];
	};
};

export type TPedidoClienteParaEnviar = {
	usuario: string;
	tipoPago?: ETiposDePago;
	enviado: boolean;
} & TPedido;
