import {useObtenerDatosCliente} from 'hooks';
import {ETiposDePago, TClienteActual, TPedidosClientes} from 'models';
import {useCallback} from 'react';
import {useObtenerClienteActual, useObtenerPedidosClientes} from 'redux/hooks';

export const useObtenerCreditoDisponible = (codigoCliente?: string) => {
	const pedidosClientes: TPedidosClientes = useObtenerPedidosClientes();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {obtenerDatosCliente} = useObtenerDatosCliente();

	const obtenerCreditoDisponible = useCallback(
		(codigoClienteEntrante: string) => {
			let creditoDisponible: number = 0;

			let totalCreditoEnPedidos: number = 0;

			pedidosClientes[codigoClienteEntrante]?.pedidos.forEach((pedidos) => {
				pedidos.productos.forEach((producto) => {
					if (producto.tipoPago === ETiposDePago.Credito)
						totalCreditoEnPedidos += producto.total;
				});
			});

			const datosCliente = obtenerDatosCliente(codigoClienteEntrante);

			const creditoDisponibleUsuario: number =
				datosCliente?.informacionCrediticia?.disponible ?? 0;

			creditoDisponible = creditoDisponibleUsuario - totalCreditoEnPedidos; //TODO: Esto podria ser negativo?

			return creditoDisponible;
		},
		[pedidosClientes, obtenerDatosCliente]
	);

	const creditoDisponible = obtenerCreditoDisponible(
		codigoCliente ?? clienteActual.codigoCliente
	);

	return {obtenerCreditoDisponible, creditoDisponible};
};
