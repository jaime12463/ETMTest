import {TInfoDescuentos} from 'models';
import {
	TDatosClientesProductos,
	TCondicicon,
	TPromoPush,
	TDatosConfiguracion,
	TIniciativas,
	TDescuentoEscalonado,
	TDescuentoPolarizado,
	TComponente,
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
	coberturasEjecutadas: TCoberturasEjecutadas[];
	pasoATomaPedido: boolean;
	seQuedaAEditar: SeQuedaAEditar;
	fechaVisitaPlanificada: string;
	bonificaciones: TBonificacionesCliente[];
	envasesConError: number;
};

export type TBonificacionesCliente = {
	numeroPedido: string;
	codigoCliente: string;
	idBonificacion: number | null;
	fechaCreacion: string;
	codigoUsuario: string;
	ruta: string;
	fechaEntrega: string;
	detalle: TDetalleBonificacionesCliente[];
};

export type TCoberturasCliente = {
	idGrupoCobertura: string;
	cumplida: boolean;
};

export type TDetalleBonificacionesCliente = {
	numeroPedido: string;
	idGrupo: number;
	codigoProducto: number;
	cantidad: number;
	unidadMedida: string;
};

export type SeQuedaAEditar = {
	seQueda: boolean;
	bordeError: boolean;
};

export type TCoberturasEjecutadas = Pick<
	TProductoPedido,
	'codigoProducto' | 'unidades' | 'subUnidades'
>;

export type TIniciativasCliente = {
	estado: 'pendiente' | 'ejecutada' | 'cancelada';
	motivo: string;
	secuencia: number;
	fechaEntrega: string;
	idActividadIniciativa: number;
	nombreIniciativa: string;
	nombreActividadPlan: string;
	descripcionIniciativa: string;
	finVigenciaIniciativa: string;
	idMaterialIniciativa: number;
	unidadVentaIniciativa: number;
	subunidadVentaIniciativa: number;

	unidadesEjecutadas: number;
	subUnidadesEjecutadas: number;
	archivoAdjunto?: string;
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
	precioConDescuentoUnidad?: number;
	precioConDescuentoSubunidad?: number;
	codigoImplicito1?: number;
	nombreImplicito1?: string;
	codigoImplicito2?: number;
	nombreImplicito2?: string;
	unidadesDisponibles?: number;
	promoPush?: TPromoPush;
	tipoProducto: number;
	descuentoPolarizado?: TDescuentoPolarizado[];
	descuentoEscalonado?: TDescuentoEscalonado[];
	descuentoPromoPush?: number;
	componentes?: TComponente[];
};

export type TPedidoDelProducto = {
	unidades: number;
	subUnidades: number;
	total: number;
	preciosBase: TPreciosProductoUnidadYSubUnidad;
	preciosNeto: TPreciosProductoUnidadYSubUnidad;
	descuento?: TInfoDescuentos;
	tipoPago: ETiposDePago;
	catalogoMotivo: string;
	estado?: 'activo' | 'eliminado' | 'transito';
};

export type TPreciosProductoUnidadYSubUnidad = {
	unidad: number;
	subUnidad: number;
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
		bonificaciones: TBonificacionesCliente[];
		coberturas: TCoberturasCliente[];
	};
};

export type TPedidoClienteParaEnviar = {
	usuario: string;
	tipoPago?: ETiposDePago;
	enviado: boolean;
} & TPedido;
