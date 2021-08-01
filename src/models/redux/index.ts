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

export type TProductoPedido = {
	codigoProducto: number;
	nombreProducto: string;
	unidades: number;
	subUnidades: number;
	total: number;
	tipoPago: ETiposDePago;
	codigoImplicito1?: number;
	nombreImplicito1?: string;
	codigoImplicito2?: number;
	nombreImplicito2?: string;
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
