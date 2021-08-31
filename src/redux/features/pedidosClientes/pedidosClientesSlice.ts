import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
	TPedidoActual,
	TClienteActual,
	TPedidoClienteParaEnviar,
	TPedidosClientes,
	EEstadosDeUnPedido,
	ETiposDePago,
	TCompromisoDeCobro,
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
				ID,
				fechaCreacion,
				fechaEntrega,
				monto,
				tipoDocumento,
			}: TCompromisoDeCobro = action.payload.compromisoDeCobroActual;
			const {codigoCliente}: TClienteActual = action.payload.clienteActual;
			const CompromisoDeCobro: TCompromisoDeCobro = {
				ID,
				fechaCreacion,
				fechaEntrega,
				monto,
				tipoDocumento,
			};
			if (!state[codigoCliente])
				state[codigoCliente] = {pedidos: [], compromisosDeCobro: []};

			state[codigoCliente].compromisosDeCobro.push(CompromisoDeCobro);
		},

		agregarPedidoCliente: (
			state,
			action: PayloadAction<{
				pedidoActual: TPedidoActual;
				clienteActual: TClienteActual;
				tipoPago: ETiposDePago;
			}>
		) => {
			const {codigoCliente}: TClienteActual = action.payload.clienteActual;

			const tipoPago = action.payload.tipoPago;

			if (!state[codigoCliente])
				state[codigoCliente] = {pedidos: [], compromisosDeCobro: []};

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
				pedidoActual: TPedidoActual;
				clienteActual: TClienteActual;
				tipoPago: ETiposDePago;
			}>
		) => {
			const {codigoCliente}: TClienteActual = action.payload.clienteActual;
			const {pedidoActual} = action.payload;

			const tipoPago = action.payload.tipoPago;

			const pedidosClienteActual = state[codigoCliente];

			const pedidosClienteFiltrandoElModificado = pedidosClienteActual.pedidos.filter(
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
	},
});

export const selectPedidosClientes = (state: RootState) =>
	state.pedidosClientes;
export const {
	agregarPedidoCliente,
	modificarPedidoCliente,
	cancelarPedidoDelCliente,
	guardarCompromisoDecobroCliente,
} = pedidosClientesSlice.actions;
export default pedidosClientesSlice.reducer;
