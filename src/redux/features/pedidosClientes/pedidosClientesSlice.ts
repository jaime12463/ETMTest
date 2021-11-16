import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
	TPedido,
	TClienteActual,
	TPedidoClienteParaEnviar,
	TPedidosClientes,
	EEstadosDeUnPedido,
	ETiposDePago,
	TCompromisoDeCobro,
	TIniciativasCliente,
	TIniciativas,
} from 'models';
import {RootState} from 'redux/store';

const estadoInicial: TPedidosClientes = {};

export const pedidosClientesSlice = createSlice({
	name: 'pedidosClientes',
	initialState: estadoInicial,
	reducers: {
		cancelarPedidoDelCliente: (
			state,
			action: PayloadAction<{
				codigoPedido: string;
				codigoCliente: string;
			}>
		) => {
			const {codigoCliente, codigoPedido} = action.payload;

			const pedidoACancelar = state[codigoCliente].pedidos.map((pedido) => {
				if (pedido.codigoPedido === codigoPedido) {
					pedido.estado = EEstadosDeUnPedido.Cancelado;
				}
			});
		},
		guardarCompromisoDecobroCliente: (
			state,
			action: PayloadAction<{
				compromisoDeCobroActual: TCompromisoDeCobro;
				clienteActual: TClienteActual;
			}>
		) => {
			const {
				id,
				fechaCreacion,
				fechaEntrega,
				monto,
				tipoDocumento,
			}: TCompromisoDeCobro = action.payload.compromisoDeCobroActual;
			const {codigoCliente}: TClienteActual = action.payload.clienteActual;
			const CompromisoDeCobro: TCompromisoDeCobro = {
				id,
				fechaCreacion,
				fechaEntrega,
				monto,
				tipoDocumento,
			};
			if (!state[codigoCliente])
				state[codigoCliente] = {
					pedidos: [],
					compromisosDeCobro: [],
					iniciativas: [],
				};

			state[codigoCliente].compromisosDeCobro.push(CompromisoDeCobro);
		},

		agregarIniciativasAlCliente: (
			state,
			action: PayloadAction<{
				iniciativas: TIniciativasCliente[] | undefined;
				clienteActual: TClienteActual;
				fechaEntrega: string;
			}>
		) => {
			if (action.payload.iniciativas) {
				const {codigoCliente}: TClienteActual = action.payload.clienteActual;
				if (!state[codigoCliente])
					state[codigoCliente] = {
						pedidos: [],
						compromisosDeCobro: [],
						iniciativas: [],
					};

				const iniciativasFiltadoPendientes = action.payload.iniciativas.filter(
					(iniciativa) => iniciativa.estado !== 'pendiente'
				);

				state[codigoCliente].iniciativas = state[
					codigoCliente
				].iniciativas.concat(iniciativasFiltadoPendientes);
			}
		},

		agregarPedidoCliente: (
			state,
			action: PayloadAction<{
				pedidoActual: TPedido;
				clienteActual: TClienteActual;
				tipoPago: ETiposDePago;
			}>
		) => {
			const {codigoCliente}: TClienteActual = action.payload.clienteActual;

			const tipoPago = action.payload.tipoPago;

			if (!state[codigoCliente])
				state[codigoCliente] = {
					pedidos: [],
					compromisosDeCobro: [],
					iniciativas: [],
				};

			const pedidoCliente: TPedidoClienteParaEnviar = {
				...action.payload.pedidoActual,
				tipoPago,
				usuario: 'SFA01',
				enviado: false,
			};

			state[codigoCliente].pedidos.push(pedidoCliente);
		},
		modificarPedidoCliente: (
			state,
			action: PayloadAction<{
				pedidoActual: TPedido;
				clienteActual: TClienteActual;
				tipoPago: ETiposDePago;
			}>
		) => {
			const {codigoCliente}: TClienteActual = action.payload.clienteActual;
			const {pedidoActual} = action.payload;

			const tipoPago = action.payload.tipoPago;

			const pedidosClienteActual = state[codigoCliente];

			const pedidosClienteFiltrandoElModificado =
				pedidosClienteActual.pedidos.filter(
					(pedidoCliente: TPedidoClienteParaEnviar) =>
						pedidoCliente.codigoPedido !== pedidoActual.codigoPedido
				);

			const pedidoClienteModificado: TPedidoClienteParaEnviar = {
				...pedidoActual,
				tipoPago,
				usuario: 'SFA01',
				enviado: false,
			};

			pedidosClienteFiltrandoElModificado.push(pedidoClienteModificado);

			state[codigoCliente].pedidos = pedidosClienteFiltrandoElModificado;
		},

		agregarPedidosCliente: (
			state,
			action: PayloadAction<{
				pedidos: TPedidoClienteParaEnviar[];
				clienteActual: TClienteActual;
			}>
		) => {
			const {codigoCliente}: TClienteActual = action.payload.clienteActual;
			const pedidos: TPedidoClienteParaEnviar[] = action.payload.pedidos;
			if (!state[codigoCliente])
				state[codigoCliente] = {
					pedidos: [],
					compromisosDeCobro: [],
					iniciativas: [],
				};
			state[codigoCliente].pedidos = [
				...state[codigoCliente].pedidos,
				...pedidos,
			];
		},
	},
});

export const selectPedidosClientes = (state: RootState) =>
	state.pedidosClientes;
export const {
	agregarPedidoCliente,
	modificarPedidoCliente,
	cancelarPedidoDelCliente,
	guardarCompromisoDecobroCliente,
	agregarPedidosCliente,
	agregarIniciativasAlCliente,
} = pedidosClientesSlice.actions;
export default pedidosClientesSlice.reducer;
