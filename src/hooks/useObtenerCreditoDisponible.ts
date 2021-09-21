import {
	useObtenerDatosCliente,
	useObtenerPedidosClienteMismaFechaEntrega,
} from 'hooks';
import {ETiposDePago, TClienteActual, TPedidosClientes} from 'models';
import {useCallback} from 'react';
import {
	useObtenerClienteActual,
	useObtenerConfiguracion,
	useObtenerPedidosClientes,
} from 'redux/hooks';
import {calcularTotalPedidosClienteValorizadosPorTipoPago} from 'utils/methods';

/*
	creditoDisponible = 
	    informacionCrediticia.disponible – pedidos a crédito ya registrados – productos a crédito del pedido actual
*/
export const useObtenerCreditoDisponible = (codigoCliente?: string) => {
	const pedidosClientes: TPedidosClientes = useObtenerPedidosClientes();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const {
		obtenerPedidosClienteMismaFechaEntrega,
	} = useObtenerPedidosClienteMismaFechaEntrega();
	const {tipoPedidos} = useObtenerConfiguracion();
	const obtenerCreditoDisponible = useCallback(
		(codigoClienteEntrante: string) => {
			const pedidosClienteMismaFechaEntrega = obtenerPedidosClienteMismaFechaEntrega(
				clienteActual.codigoCliente
			);

			const totalCreditoPedidosClienteMismaFechaEntrega = calcularTotalPedidosClienteValorizadosPorTipoPago(
				{
					pedidosClienteMismaFechaEntrega,
					tipoPedidos,
					tipoPago: ETiposDePago.Credito,
				}
			);

			const datosCliente = obtenerDatosCliente(codigoClienteEntrante);

			const creditoDisponibleUsuario: number =
				datosCliente?.informacionCrediticia?.disponible ?? 0;

			const creditoDisponible =
				creditoDisponibleUsuario - totalCreditoPedidosClienteMismaFechaEntrega; //TODO: Esto podria ser negativo?

			return creditoDisponible;
		},
		[pedidosClientes, obtenerDatosCliente]
	);

	const creditoDisponible = obtenerCreditoDisponible(
		codigoCliente ?? clienteActual.codigoCliente
	);

	return {obtenerCreditoDisponible, creditoDisponible};
};
