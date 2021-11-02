import {
	TDatosClientesProductos,
	TPedido,
	TPedidosClientes,
	TPresupuestoTipoPedidoTotal,
	TProductoPedido,
} from 'models';
import {
	useAppSelector,
	useAppDispatch,
	useObtenerDatos,
	useObtenerPedidosClientes,
} from 'redux/hooks';
import {
	fechaDispositivo,
	obtenerPresupuestoConfiguradoSegunVigencia,
} from 'utils/methods';
import {
	selectVisitaActual,
	cambiarSaldoPresupuestoTipoPedido,
} from 'redux/features/visitaActual/visitaActualSlice';

export const useCalcularPresupuestoTipoPedido = () => {
	const dispatch = useAppDispatch();
	const fechaDispositivoDate = new Date(fechaDispositivo());
	const pedidosClientes: TPedidosClientes = useObtenerPedidosClientes();
	const datos: TDatosClientesProductos = useObtenerDatos();
	const {saldoPresupuestoTipoPedido} = useAppSelector(selectVisitaActual);
	const calcularPresupuestoTipoPedido = (tipoPedido: string) => {
		let presupuestoTipoPedido: any = {};
		/*
        const obtenerPresupuestoVigente = (tipoPedido:number):number => {
            let total=datos.presupuestoTipoPedido.find( 
                item => item.tipoPedido===tipoPedido && 
                (fechaDispositivoDate >= new Date(item.vigenciaInicioPresupuesto) && fechaDispositivoDate <= new Date(item.vigenciaFinPresupuesto))
                )?.presupuesto ?? 0;
            return total;
        }
        */

		const calcularPresupuestoInicial = (tipoPedido: string) => {
			let pedidosTabla = new Array<TProductoPedido>();
			for (let pedidoCliente in pedidosClientes) {
				pedidosClientes[pedidoCliente].pedidos.forEach((pedido) => {
					if (pedido.tipoPedido === tipoPedido) {
						pedido.productos.forEach((item) => pedidosTabla.push(item));
					}
				});
			}

			const presupuestoVigenteConfigurado =
				obtenerPresupuestoConfiguradoSegunVigencia(
					tipoPedido,
					datos.presupuestoTipoPedido
				);
			let total = presupuestoVigenteConfigurado?.presupuesto ?? 0; //obtenerPresupuestoVigente(tipoPedido);

			presupuestoTipoPedido[tipoPedido] = pedidosTabla.reduce((total, item) => {
				total -= item.unidades + item.subUnidades / item.presentacion;
				return total;
			}, total);

			return presupuestoTipoPedido[tipoPedido];
		};
		let saldoPresupuesto = saldoPresupuestoTipoPedido[tipoPedido];

		if (saldoPresupuesto === undefined) {
			saldoPresupuesto = calcularPresupuestoInicial(tipoPedido);

			dispatch(
				cambiarSaldoPresupuestoTipoPedido({
					saldoPresupuestoTipoPedido: {
						...saldoPresupuestoTipoPedido,
						[tipoPedido]: saldoPresupuesto,
					},
				})
			);
		}

		return saldoPresupuesto;
	};
	return calcularPresupuestoTipoPedido;
};
