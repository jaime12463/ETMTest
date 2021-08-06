import {TDatosConfiguracion, TDatosClientesProductos} from 'models/server';

//Cliente Actual
export type TClienteActual = {
	codigoCliente: string;
	razonSocial: string;
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

//Estado App
export type TEstadoApp = {
	estado: EEstadosApp;
};

export enum EEstadosApp {
	PrimerInicio,
	Cargando,
	Advertencia,
	Error,
	Disponible,
}

//Pedido Actual
export type TPedidoActual = {
	codigoPedido: string;
	fechaEntrega: string;
	estado: EEstadosDeUnPedido;
	productosPedido: TProductoPedido[];
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
	esVentaSubunidades: string;
	precioConImpuestoUnidad: number;
	precioConImpuestoSubunidad: number;
	implicito1?: TImplicito;
	implicito2?: TImplicito;
	codigoImplicito1?: number;
	nombreImplicito1?: string;
	codigoImplicito2?: number;
	nombreImplicito2?: string;
};

export type TImplicito = {
	codigoImplicito: number;
	nombreImplicito: string;
	presentación: number;
	subunidadesVentaMinima: number;
};

export type TPedidoDelProducto = {
	unidades: number;
	subUnidades: number;
	total: number;
	tipoPago: ETiposDePago;
};

export enum ETiposDePago {
	Contado,
	Credito,
}

//Pedidos Clientes
export type TPedidosClientes = {
	[codigoCliente: string]: TPedidoClienteParaEnviar[];
};

export type TPedidoClienteParaEnviar = {
	codigoPedido: string;
	fechaEntrega: string;
	usuario: string;
	estado: EEstadosDeUnPedido;
	productosPedido: TProductoPedido[];
	enviado: boolean;
};
