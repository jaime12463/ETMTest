import {useCalcularPresupuestoTipoPedido} from 'hooks';
import {ChangeEvent, useCallback} from 'react';
import {
	cambiarMostrarPromoPush,
	cambiarTipoPedidoActual,
	cambiarTipoPagoPoductoDelPedidoActual,
	cambiarBloquearPanelCarga,
} from 'redux/features/visitaActual/visitaActualSlice';
import {useAppDispatch, useObtenerConfiguracion} from 'redux/hooks';
import {convertCompilerOptionsFromJson} from 'typescript';

export const useCambiarTipoDePedido = (resetLineaActual: () => void) => {
	const dispatch = useAppDispatch();
	const calcularPresupuestoTipoPedido = useCalcularPresupuestoTipoPedido();
	const {tipoPedidos} = useObtenerConfiguracion();

	const cambiarTipoDePedido = useCallback((e: ChangeEvent<any>) => {
		const tipoPedido = e.target.value;
		const tipoPedidoConfiguracion = tipoPedidos.find(
			(tipo) => tipo.codigo === tipoPedido
		);

		if (tipoPedidoConfiguracion?.validaPresupuesto) {
			const presupuestoTipoPedidoSaldo =
				calcularPresupuestoTipoPedido(tipoPedido);
			console.log('Por configuracion debe validar presupuesto saldo', {
				valor: presupuestoTipoPedidoSaldo,
				b: presupuestoTipoPedidoSaldo <= 0,
			});
			dispatch(
				cambiarBloquearPanelCarga({
					bloquearPanelCarga: presupuestoTipoPedidoSaldo <= 0,
				})
			);
		} else {
			console.log('No valida presupuesto');
			dispatch(cambiarBloquearPanelCarga({bloquearPanelCarga: false}));
		}

		resetLineaActual();

		//TODO: Tipar y mejorar esto
		dispatch(cambiarTipoPedidoActual({tipoPedido}));
		dispatch(cambiarMostrarPromoPush({mostrarPromoPush: false}));
	}, []);
	return cambiarTipoDePedido;
};
