import {TPedidos} from 'models';
import {useCallback} from 'react';
import {inicializarVisitaActual} from 'redux/features/visitaActual/visitaActualSlice';
import {useAppDispatch, useObtenerConfiguracion} from 'redux/hooks';
import {useInicializarPedidos} from '.';

export const useInicializarVisitaActual = () => {
	const dispatch = useAppDispatch();
	const inicializarPedidos = useInicializarPedidos();
	const configuraciones = useObtenerConfiguracion();
	const useInicializarPedidoActual = useCallback(
		(fechaEntrega: string) => {
			const pedidos: TPedidos = inicializarPedidos(fechaEntrega);
			const tipoPedidoActual: number = configuraciones.tipoPedidos[0].codigo;
			const mostrarPromoPush: boolean = false;
			dispatch(
				inicializarVisitaActual({
					visitaActual: {
						fechaEntrega,
						pedidos,
						tipoPedidoActual,
						mostrarPromoPush,
					},
				})
			);
		},
		[dispatch]
	);

	return useInicializarPedidoActual;
};
