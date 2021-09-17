import {
	TDatosConfiguracion,
	TDatosClientesProductos,
	TCondicicon,
	TPromoPush,
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
	fechaEntrega: string; //TODO: Deberia ir la visita con el pedido actual?
	tipoPedidoActual: number;
	saldoPresupuestoTipoPedido:TPresupuestoTipoPedidoTotal;
	pedidos: TPedidos;
	mostrarPromoPush: boolean;
	bloquearPanelCarga: boolean;
	ordenDeCompra:string;
};

export type TPresupuestoTipoPedidoTotal =
{
	[tipoPedido:number]:number;
}

export type TPedidos = {
	[tipoPedido: number]: TPedido;
};

export type TPedido = {
	tipoPedido: number;
	codigoPedido: string;
	fechaEntrega: string;
	estado: EEstadosDeUnPedido;
	productos: TProductoPedido[];
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
};

export type TPedidoDelProducto = {
	unidades: number;
	subUnidades: number;
	total: number;
	tipoPago: ETiposDePago;
	catalogoMotivo: string;
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
	};
};

export type TPedidoClienteParaEnviar = {
	usuario: string;
	tipoPago?: ETiposDePago;
	enviado: boolean;
} & TPedido;
