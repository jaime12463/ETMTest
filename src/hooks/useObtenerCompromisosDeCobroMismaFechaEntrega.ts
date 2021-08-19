import {
	useObtenerClienteActual,
	useObtenerPedidosClientes,
	useObtenerCompromisoDeCobroActual,
	useObtenerPedidoActual,
} from 'redux/hooks';
import {TClienteActual, TPedidosClientes, TCompromisoDeCobro} from 'models';
import {useCallback} from 'react';

export const useObtenerCompromisosDeCobroMismaFechaEntrega = (
	codigoCliente?: string
) => {
	const clienteActual: TClienteActual = useObtenerClienteActual();

	const compromisosDeCobroCliente: TPedidosClientes = useObtenerPedidosClientes();
	const pedidoActual = useObtenerPedidoActual();
	const {fechaEntrega} = pedidoActual;
	const compromisoDeCobroActual: TCompromisoDeCobro = useObtenerCompromisoDeCobroActual();

	const obtenerCompromisosDeCobroMismaFechaEntrega = useCallback(
		(codigoClienteEntrante: string) => {
			const compromisoDeCobroCliente: TCompromisoDeCobro[] =
				compromisosDeCobroCliente[codigoClienteEntrante]?.compromisosDeCobro;

			let compromisosDeCobroMismaFechaEntrega: TCompromisoDeCobro[] = [];

			if (compromisoDeCobroCliente) {
				compromisosDeCobroMismaFechaEntrega = compromisoDeCobroCliente.filter(
					(compromisoDeCobroCliente: TCompromisoDeCobro) =>
						compromisoDeCobroCliente.fechaEntrega === fechaEntrega
				);
			}

			return compromisosDeCobroMismaFechaEntrega;
		},
		[compromisosDeCobroCliente, compromisoDeCobroActual, clienteActual]
	);

	return {
		obtenerCompromisosDeCobroMismaFechaEntrega,
	};
};
