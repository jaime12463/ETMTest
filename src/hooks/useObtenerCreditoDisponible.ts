import {useObtenerDatosCliente} from 'hooks';
import {ETiposDePago, TClienteActual, TPedidosClientes} from 'models';
import {useCallback} from 'react';
import {useObtenerClienteActual, useObtenerPedidosClientes} from 'redux/hooks';

export const useObtenerCreditoDisponible = () => {
	const pedidosClientes: TPedidosClientes = useObtenerPedidosClientes();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);

	const obtenerCreditoDisponible = useCallback(() => {
		let creditoDisponible: number = 0;

		let totalCreditoEnPedidos: number = 0;

		pedidosClientes[clienteActual.codigoCliente].forEach((pedidos) => {
			pedidos.productosPedido.forEach((producto) => {
				if (producto.tipoPago === ETiposDePago.Credito)
					totalCreditoEnPedidos += producto.total;
			});
		});

		const creditoDisponibleUsuario: number =
			datosCliente?.informacionCrediticia?.disponible ?? 0;

		creditoDisponible = creditoDisponibleUsuario - totalCreditoEnPedidos; //TODO: Esto podria ser negativo?

		return creditoDisponible;
	}, []);
	return obtenerCreditoDisponible;
};
