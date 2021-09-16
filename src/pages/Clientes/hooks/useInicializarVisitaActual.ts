import {TDatosClientesProductos, TPedidos} from 'models';
import {useCallback} from 'react';
import {inicializarVisitaActual} from 'redux/features/visitaActual/visitaActualSlice';
import {useAppDispatch, useObtenerConfiguracion,useObtenerDatos,useObtenerPedidosClientes} from 'redux/hooks';
import {useInicializarPedidos} from '.';


export const useInicializarVisitaActual = () => {
	const dispatch = useAppDispatch();
	const inicializarPedidos = useInicializarPedidos();
	const configuracion = useObtenerConfiguracion();
	

	const useInicializarPedidoActual = useCallback(
		(fechaEntrega: string, codigoCliente: string) => {
			const pedidos: TPedidos = inicializarPedidos(fechaEntrega, codigoCliente);

			const tiposPedidos = configuracion.tipoPedidos
				.map((x) => x)
				.sort((a, b) => a.secuencia - b.secuencia);

			const tipoPedidoActual: number =
				tiposPedidos.find((tipoPedido) => tipoPedido.esValorizado)?.codigo ??
				tiposPedidos[0].codigo;

			const mostrarPromoPush: boolean = false;
		

			
			dispatch(
				inicializarVisitaActual({
					visitaActual: {
						fechaEntrega,
						pedidos,
						tipoPedidoActual,
						mostrarPromoPush,
						saldoPresupuestoTipoPedido:{},
					},
				})
			);
		},
		[dispatch]
	);

	return useInicializarPedidoActual;
};
