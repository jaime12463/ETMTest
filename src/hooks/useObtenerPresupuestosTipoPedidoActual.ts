import {TpresupuestoTipoPedido} from 'models';
import {useObtenerDatos, useObtenerVisitaActual} from 'redux/hooks';

export const useObtenerPresupuestosTipoPedidoActual = () => {
	const {tipoPedidoActual} = useObtenerVisitaActual();
	const datos = useObtenerDatos();
	const obtenerPresupuestosTipoPedidoActual = ():
		| TpresupuestoTipoPedido
		| undefined => {
		return datos.presupuestoTipoPedido.find(
			(presupuesto) => presupuesto.tipoPedido.toLowerCase() === tipoPedidoActual
		);
	};

	return obtenerPresupuestosTipoPedidoActual;
};
