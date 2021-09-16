import { useCalcularPresupuestoTipoPedido } from "hooks";
import { TPedido } from "models/redux";
import { cambiarSaldoPresupuestoTipoPedido, selectVisitaActual } from "redux/features/visitaActual/visitaActualSlice";
import {useAppSelector, useAppDispatch } from "redux/hooks";

export const useCalcularPresupuestoPedidoActual= () =>
{
    const dispatch = useAppDispatch();
    const {saldoPresupuestoTipoPedido} = useAppSelector(selectVisitaActual);
    const calcularPresupuestoTipoPedido = useCalcularPresupuestoTipoPedido();

    const calcularPresupuestoPedidoActual = (
        pedidoActual:TPedido, presentacionProducto:number, unidades:number=0, subUnidades:number=0):number => {

            console.log("calculando presupuesto");
			// Cálculo presupuesto sobre todos los pedidos ingresados del mismo tipo de pedido
            const saldoPresupuestoTipoPedido = calcularPresupuestoTipoPedido(pedidoActual.tipoPedido);
            
			let consumidoEnPedidoActual=0; 
			// Cálculo presupuesto segun el pedido actual sobre lo ingresado
			pedidoActual.productos.reduce( (consumidoEnPedidoActual, item) => {
				consumidoEnPedidoActual += item.unidades + item.subUnidades/item.presentacion;
				return consumidoEnPedidoActual;
			}, consumidoEnPedidoActual );
            
			//Unidades y subunidades que se estan ingresando.
			consumidoEnPedidoActual += unidades + subUnidades/presentacionProducto;
			
			const saldoPresupuesto = (saldoPresupuestoTipoPedido- consumidoEnPedidoActual);

			return saldoPresupuesto;

    }

    return calcularPresupuestoPedidoActual;
}