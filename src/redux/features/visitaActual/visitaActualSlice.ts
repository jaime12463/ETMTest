import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
	ETiposDePago,
	TVisita,
	TProductoPedido,
	TPresupuestoTipoPedidoTotal,
} from 'models';
import {stringify} from 'querystring';
import {RootState} from 'redux/store';

const estadoInicial: TVisita = {
	fechaEntrega: '',
	tipoPedidoActual: '',
	saldoPresupuestoTipoPedido: {},
	pedidos: {},
	mostrarPromoPush: false,
	bloquearPanelCarga: true,
	ordenDeCompra: '',
	iniciativas: [],
	coberturasEjecutadas: [],
	pasoATomaPedido: false,
	fechaVisitaPlanificada: '',
};

export const visitaActualSlice = createSlice({
	name: 'visitaActual',
	initialState: estadoInicial,
	reducers: {
		editarProductoDelPedidoActual: (
			state,
			action: PayloadAction<{productoPedido: TProductoPedido}>
		) => {
			const productoPedidoCliente = state.pedidos[
				state.tipoPedidoActual
			].productos.filter(
				(precioProducto: TProductoPedido) =>
					precioProducto.codigoProducto !==
					action.payload.productoPedido.codigoProducto
			);

			state.pedidos[state.tipoPedidoActual].productos = [
				action.payload.productoPedido,
				...productoPedidoCliente,
			];
		},
		agregarProductoDelPedidoActual: (
			state,
			action: PayloadAction<{productoPedido: TProductoPedido}>
		) => {
			const producto = state.pedidos[state.tipoPedidoActual].productos.find(
				(precioProducto: TProductoPedido) =>
					precioProducto.codigoProducto ===
					action.payload.productoPedido.codigoProducto
			);

			if (producto) {
				producto.unidades = action.payload.productoPedido.unidades;
				producto.subUnidades = action.payload.productoPedido.subUnidades;
				producto.total = action.payload.productoPedido.total;
				producto.tipoPago = action.payload.productoPedido.tipoPago;
				producto.catalogoMotivo = action.payload.productoPedido.catalogoMotivo;
				producto.estado = action.payload.productoPedido.estado;
				producto.preciosBase = action.payload.productoPedido.preciosBase;
				producto.preciosNeto = action.payload.productoPedido.preciosNeto;
				producto.descuento = action.payload.productoPedido.descuento;
			} else {
				state.pedidos[state.tipoPedidoActual].productos = [
					action.payload.productoPedido,
					...state.pedidos[state.tipoPedidoActual].productos,
				];
			}
		},

		agregarEnvaseDelPedidoActual: (
			state,
			action: PayloadAction<{
				productoPedido: TProductoPedido;
				codigoTipoPedidoActual: string;
			}>
		) => {
			const productosPedidoClienteFiltrados = state.pedidos[
				action.payload.codigoTipoPedidoActual
			].productos.filter(
				(precioProducto: TProductoPedido) =>
					precioProducto.codigoProducto !==
					action.payload.productoPedido.codigoProducto
			);
			state.pedidos[action.payload.codigoTipoPedidoActual].productos = [
				...productosPedidoClienteFiltrados,
				action.payload.productoPedido,
			];
		},

		borrarProductoDelPedidoActual: (
			state,
			action: PayloadAction<{
				codigoProducto: number;
				codigoTipoPedidoActual?: string;
			}>
		) => {
			let pedidoActual = '';
			if (action.payload.codigoTipoPedidoActual) {
				pedidoActual = action.payload.codigoTipoPedidoActual;
			} else {
				pedidoActual = state.tipoPedidoActual;
			}
			if (!pedidoActual) return;
			const productosPedidoClienteFiltrados = state.pedidos[
				pedidoActual
			].productos.filter(
				(precioProducto: TProductoPedido) =>
					precioProducto.codigoProducto !== action.payload.codigoProducto
			);

			state.pedidos[pedidoActual].productos = [
				...productosPedidoClienteFiltrados,
			];
		},

		borrarProductosDeVisitaActual: (
			state,
			action: PayloadAction<{tipoPedidoActual: string}>
		) => {
			state.pedidos[action.payload.tipoPedidoActual].productos = [];
		},

		inicializarVisitaActual: (
			state,
			action: PayloadAction<{
				visitaActual: TVisita;
			}>
		) => {
			const {
				pedidos,
				fechaEntrega,
				tipoPedidoActual,
				mostrarPromoPush,
				bloquearPanelCarga,
				ordenDeCompra,
				iniciativas,
				fechaVisitaPlanificada,
			} = action.payload.visitaActual;

			state.pedidos = pedidos;
			state.fechaEntrega = fechaEntrega;
			state.tipoPedidoActual = tipoPedidoActual;
			state.mostrarPromoPush = mostrarPromoPush;
			state.bloquearPanelCarga = bloquearPanelCarga;
			state.ordenDeCompra = ordenDeCompra;
			state.iniciativas = iniciativas;
			state.pasoATomaPedido = false;
			state.coberturasEjecutadas = [];
			state.fechaVisitaPlanificada = fechaVisitaPlanificada;
		},

		resetearVisitaActual: (state) => {
			state.pedidos = {};
			state.fechaEntrega = '';
			state.tipoPedidoActual = '';
			state.mostrarPromoPush = false;
			state.bloquearPanelCarga = true;
			state.ordenDeCompra = '';
			state.saldoPresupuestoTipoPedido = {};
			state.iniciativas = [];
			state.coberturasEjecutadas = [];
			state.pasoATomaPedido = false;
		},

		cambiarTipoPagoPoductoDelPedidoActual: (
			state,
			action: PayloadAction<{codigoProducto: number; tipoPago: ETiposDePago}>
		) => {
			const indexProductoPedido = state.pedidos[
				state.tipoPedidoActual
			].productos.findIndex(
				(precioProducto: TProductoPedido) =>
					precioProducto.codigoProducto === action.payload.codigoProducto
			);
			state.pedidos[state.tipoPedidoActual].productos[
				indexProductoPedido
			].tipoPago = action.payload.tipoPago;
		},

		cambiarTipoPagoPoductosDelPedidoActual: (
			state,
			action: PayloadAction<{tipoPago: ETiposDePago}>
		) => {
			state.pedidos[state.tipoPedidoActual].productos.forEach(
				(producto: TProductoPedido) => {
					producto.tipoPago = action.payload.tipoPago;
				}
			);
		},

		cambiarTipoPedidoActual: (
			state,
			action: PayloadAction<{tipoPedido: string}>
		) => {
			state.tipoPedidoActual = action.payload.tipoPedido;
		},

		cambiarMostrarPromoPush: (
			state,
			action: PayloadAction<{mostrarPromoPush: boolean}>
		) => {
			state.mostrarPromoPush = action.payload.mostrarPromoPush;
		},
		cambiarSaldoPresupuestoTipoPedido: (
			state,
			action: PayloadAction<{
				saldoPresupuestoTipoPedido: TPresupuestoTipoPedidoTotal;
			}>
		) => {
			state.saldoPresupuestoTipoPedido =
				action.payload.saldoPresupuestoTipoPedido;
		},
		cambiarBloquearPanelCarga: (
			state,
			action: PayloadAction<{bloquearPanelCarga: boolean}>
		) => {
			state.bloquearPanelCarga = action.payload.bloquearPanelCarga;
		},
		cambiarOrdenDeCompra: (
			state,
			action: PayloadAction<{ordenDeCompra: string}>
		) => {
			state.ordenDeCompra = action.payload.ordenDeCompra;
		},

		cambiarEstadoIniciativa: (
			state,
			action: PayloadAction<{
				estado: 'pendiente' | 'ejecutada' | 'cancelada';
				codigoIniciativa: number;
			}>
		) => {
			state.iniciativas = state.iniciativas.map((iniciativa) => {
				if (iniciativa.codigoIniciativa === action.payload.codigoIniciativa) {
					iniciativa.estado = action.payload.estado;
				}
				return iniciativa;
			});
		},

		cambiarMotivoCancelacionIniciativa: (
			state,
			action: PayloadAction<{motivo: string; codigoIniciativa: number}>
		) => {
			state.iniciativas = state.iniciativas.map((iniciativa) => {
				if (iniciativa.codigoIniciativa === action.payload.codigoIniciativa) {
					iniciativa.motivo = action.payload.motivo;
				}
				return iniciativa;
			});
		},

		editarUnidadesOSubUnidadesEjecutadas: (
			state,
			action: PayloadAction<{
				codigoIniciativa: number;
				unidadesEjecutadas: number;
				subUnidadesEjecutadas: number;
			}>
		) => {
			state.iniciativas = state.iniciativas.map((iniciativa) => {
				if (iniciativa.codigoIniciativa === action.payload.codigoIniciativa) {
					iniciativa.unidadesEjecutadas = action.payload.unidadesEjecutadas;
					iniciativa.subUnidadesEjecutadas =
						action.payload.subUnidadesEjecutadas;
				}
				return iniciativa;
			});
		},

		pasoATomaPedido: (state) => {
			state.pasoATomaPedido = true;
		},

		agregarCoberturasEjecutadas: (
			state,
			action: PayloadAction<{
				codigoProducto: number;
				unidades: number;
				subUnidades: number;
			}>
		) => {
			const existeCobertura = state.coberturasEjecutadas.find(
				(cobertura) =>
					cobertura.codigoProducto === action.payload.codigoProducto
			);

			if (existeCobertura) {
				state.coberturasEjecutadas = state.coberturasEjecutadas.map(
					(cobertura) => {
						if (cobertura.codigoProducto === action.payload.codigoProducto) {
							cobertura.unidades = action.payload.unidades;
							cobertura.subUnidades = action.payload.subUnidades;
						}
						return cobertura;
					}
				);
			}

			state.coberturasEjecutadas = [
				...state.coberturasEjecutadas,
				{
					codigoProducto: action.payload.codigoProducto,
					unidades: action.payload.unidades,
					subUnidades: action.payload.subUnidades,
				},
			];
		},
	},
});

export const selectVisitaActual = (state: RootState) => state.visitaActual;
export const {
	agregarEnvaseDelPedidoActual,
	agregarProductoDelPedidoActual,
	editarProductoDelPedidoActual,
	borrarProductoDelPedidoActual,
	inicializarVisitaActual,
	resetearVisitaActual,
	borrarProductosDeVisitaActual,
	cambiarTipoPagoPoductoDelPedidoActual,
	cambiarTipoPagoPoductosDelPedidoActual,
	cambiarTipoPedidoActual,
	cambiarMostrarPromoPush,
	cambiarSaldoPresupuestoTipoPedido,
	cambiarBloquearPanelCarga,
	cambiarOrdenDeCompra,
	cambiarEstadoIniciativa,
	cambiarMotivoCancelacionIniciativa,
	editarUnidadesOSubUnidadesEjecutadas,
	pasoATomaPedido,
	agregarCoberturasEjecutadas,
} = visitaActualSlice.actions;
export default visitaActualSlice.reducer;
