import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
	ETiposDePago,
	TVisita,
	TProductoPedido,
	TPresupuestoTipoPedidoTotal,
	TDetalleBonificacionesCliente,
	TAvisos,
} from 'models';

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
	bonificaciones: [],
	seQuedaAEditar: {
		seQueda: false,
		bordeError: false,
	},
	envasesConError: 0,
	avisos: {
		limiteCredito: 0,
		cambiosPasoActual: false,
	},
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
			state.pedidos.ventaenvase.productos = [];
			state.pedidos.prestamoenvase.productos = [];
			state.avisos.cambiosPasoActual = true;
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

		limpiarProductosSinCantidad: (state) => {
			if (state.pedidos.venta) {
				state.pedidos.venta.productos = state.pedidos.venta.productos.filter(
					(producto) => producto.unidades > 0 || producto.subUnidades > 0
				);
			}
		},

		agregarEnvaseDelPedidoActual: (
			state,
			action: PayloadAction<{
				productoPedido: TProductoPedido;
				codigoTipoPedidoActual: string;
			}>
		) => {
			let index = state.pedidos[
				action.payload.codigoTipoPedidoActual
			].productos.findIndex(
				(precioProducto: TProductoPedido) =>
					precioProducto.codigoProducto ===
						action.payload.productoPedido.codigoProducto &&
					precioProducto.tipoPago === action.payload.productoPedido.tipoPago
			);

			if (index > -1) {
				state.pedidos[action.payload.codigoTipoPedidoActual].productos.splice(
					index,
					1
				);
			}
			if (
				action.payload.productoPedido.unidades > 0 ||
				action.payload.productoPedido.subUnidades > 0
			) {
				state.pedidos[action.payload.codigoTipoPedidoActual].productos.push(
					action.payload.productoPedido
				);
			}
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
			state.pedidos.ventaenvase.productos = [];
			state.pedidos.prestamoenvase.productos = [];
		},
		borrarEnvases: (state) => {
			state.pedidos.ventaenvase.productos = [];
			state.pedidos.prestamoenvase.productos = [];
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
				bonificaciones,
				envasesConError,
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
			state.bonificaciones = bonificaciones;
			state.seQuedaAEditar = {
				seQueda: false,
				bordeError: false,
			};
			state.fechaVisitaPlanificada = fechaVisitaPlanificada;
			state.envasesConError = envasesConError;
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
			state.seQuedaAEditar = {
				seQueda: false,
				bordeError: false,
			};
			state.bonificaciones = [];
		},

		borrarDescuentoDelProducto: (
			state,
			action: PayloadAction<{codigoProducto: number}>
		) => {
			const indexProductoPedido = state.pedidos[
				state.tipoPedidoActual
			].productos.findIndex(
				(precioProducto: TProductoPedido) =>
					precioProducto.codigoProducto === action.payload.codigoProducto
			);

			const producto =
				state.pedidos[state.tipoPedidoActual].productos[indexProductoPedido];

			producto.descuento = {
				tipo: 'eliminado',
				porcentajeDescuento: 0,
				inputPolarizado: 0,
			};
			producto.preciosNeto = producto.preciosBase;
			producto.total =
				producto.preciosBase.unidad * producto.unidades +
				producto.preciosBase.subUnidad * producto.subUnidades;
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
			state.pedidos.ventaenvase.productos = [];
			state.pedidos.prestamoenvase.productos = [];
			state.pedidos[state.tipoPedidoActual].productos[
				indexProductoPedido
			].tipoPago = action.payload.tipoPago;
		},

		cambiarTipoPagoPoductosDelPedidoActual: (
			state,
			action: PayloadAction<{tipoPago: ETiposDePago}>
		) => {
			state.pedidos.ventaenvase.productos = [];
			state.pedidos.prestamoenvase.productos = [];
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
				if (
					iniciativa.idMaterialIniciativa === action.payload.codigoIniciativa
				) {
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
				if (
					iniciativa.idActividadIniciativa === action.payload.codigoIniciativa
				) {
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
				if (
					iniciativa.idMaterialIniciativa === action.payload.codigoIniciativa
				) {
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
			} else {
				state.coberturasEjecutadas = [
					...state.coberturasEjecutadas,
					{
						codigoProducto: action.payload.codigoProducto,
						unidades: action.payload.unidades,
						subUnidades: action.payload.subUnidades,
					},
				];
			}
		},

		cambiarSeQuedaAEditar: (
			state,
			action: PayloadAction<{seQueda: boolean; bordeError: boolean}>
		) => {
			state.seQuedaAEditar.seQueda = action.payload.seQueda;
			state.seQuedaAEditar.bordeError = action.payload.bordeError;
		},
		cambiarAvisos: (state, action: PayloadAction<Partial<TAvisos>>) => {
			if (action.payload) {
				state.avisos = {...state.avisos, ...action.payload};
			}
		},
		agregarBonificacion(
			state,
			action: PayloadAction<{
				bonificacion: TDetalleBonificacionesCliente;
				idBonificacion: number;
			}>
		) {
			state.bonificaciones = state.bonificaciones.map((bonificacion) => {
				// Se busca el grupo de bonificaciones
				if (bonificacion.idBonificacion === action.payload.idBonificacion) {
					// Se busca si existe la bonificacion
					const bonificacionBuscada = bonificacion.detalle.find(
						(detalle) =>
							detalle.codigoProducto ===
							action.payload.bonificacion.codigoProducto
					);

					if (bonificacionBuscada) {
						//Si existe se actualiza la cantidad
						bonificacionBuscada.cantidad = action.payload.bonificacion.cantidad;
					} else {
						// Si no existe se agrega la bonificacion
						bonificacion.detalle = [
							...bonificacion.detalle,
							action.payload.bonificacion,
						];
					}
				}

				return bonificacion;
			});
		},

		eliminarBonificacion(
			state,
			action: PayloadAction<{codigoProducto: number; idBonificacion: number}>
		) {
			state.bonificaciones = state.bonificaciones.map((bonificacion) => {
				// Se busca el grupo de bonificaciones
				if (bonificacion.idBonificacion === action.payload.idBonificacion) {
					// Se busca si existe la bonificacion
					const index = bonificacion.detalle.findIndex(
						(detalle) =>
							detalle.codigoProducto === action.payload.codigoProducto
					);

					if (index > -1) {
						//Si existe se elimina
						bonificacion.detalle.splice(index, 1);
					}
				}

				return bonificacion;
			});
		},

		eliminarBonificacionesGrupo(
			state,
			action: PayloadAction<{idBonificacion: number}>
		) {
			const indexBonificacion = state.bonificaciones.findIndex(
				(bonificacion) =>
					bonificacion.idBonificacion === action.payload.idBonificacion
			);

			if (indexBonificacion > -1) {
				state.bonificaciones[indexBonificacion].detalle = [];
			}
		},

		restablecerBonificaciones: (state) => {
			state.bonificaciones = state.bonificaciones.map((bonificacion) => ({
				...bonificacion,
				detalle: [],
			}));
		},

		eliminarCanje: (state) => {
			state.pedidos.canje = state.pedidos.canje = {
				...state.pedidos.canje,
				productos: [],
			};
		},
		modificarEnvasesConError: (
			state,
			action: PayloadAction<{operacion: string}>
		) => {
			if (action.payload.operacion === '+')
				state.envasesConError = state.envasesConError + 1;
			else state.envasesConError = state.envasesConError - 1;
		},
		restablecerEnvasesConError: (state) => {
			state.envasesConError = 0;
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
	borrarDescuentoDelProducto,
	cambiarSeQuedaAEditar,
	agregarBonificacion,
	eliminarBonificacion,
	eliminarBonificacionesGrupo,
	restablecerBonificaciones,
	borrarEnvases,
	limpiarProductosSinCantidad,
	eliminarCanje,
	modificarEnvasesConError,
	restablecerEnvasesConError,
	cambiarAvisos,
} = visitaActualSlice.actions;
export default visitaActualSlice.reducer;
