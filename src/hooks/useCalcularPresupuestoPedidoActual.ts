import {useCalcularPresupuestoTipoPedido} from 'hooks';
import {TPedido} from 'models/redux';
import {
	cambiarSaldoPresupuestoTipoPedido,
	selectVisitaActual,
} from 'redux/features/visitaActual/visitaActualSlice';
import {useAppSelector, useAppDispatch} from 'redux/hooks';

export const useCalcularPresupuestoPedidoActual = () => {
	const dispatch = useAppDispatch();
	const {saldoPresupuestoTipoPedido} = useAppSelector(selectVisitaActual);
	const calcularPresupuestoTipoPedido = useCalcularPresupuestoTipoPedido();

	const calcularPresupuestoPedidoActual = (
		pedidoActual: TPedido,
		unidades: number = 0,
		subUnidades: number = 0,
		codigoProducto: number = 0,
		presentacionProducto: number = 0
	): number => {
		// Cálculo presupuesto sobre todos los pedidos ingresados del mismo tipo de pedido
		const saldoPresupuestoTipoPedido = calcularPresupuestoTipoPedido(
			pedidoActual.tipoPedido
		);

		let consumidoEnPedidoActual = 0;
		// Cálculo presupuesto segun el pedido actual sobre lo ingresado
		consumidoEnPedidoActual = pedidoActual.productos.reduce(
			(consumidoEnPedidoActual, producto) => {
				if (codigoProducto !== producto.codigoProducto)
					consumidoEnPedidoActual +=
						producto.unidades + producto.subUnidades / producto.presentacion;

				return consumidoEnPedidoActual;
			},
			consumidoEnPedidoActual
		);
		//console.log(consumidoEnPedidoActual);

		//console.log(codigoProducto);

		//Unidades y subunidades que se estan ingresando.
		consumidoEnPedidoActual +=
			unidades +
			(presentacionProducto > 0 ? subUnidades / presentacionProducto : 0);

		const saldoPresupuesto =
			saldoPresupuestoTipoPedido - consumidoEnPedidoActual;

		return saldoPresupuesto;
	};

	return calcularPresupuestoPedidoActual;
};
