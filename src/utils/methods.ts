import {
	TPedidosClientes,
	TPedidoClienteParaEnviar,
	EEstadosDeUnPedido,
	ETiposDePago,
	TCompromisoDeCobro,
	TProductoPedido,
	TPedido
} from 'models/redux';
import {
	TpresupuestoTipoPedido
} from 'models/server';
import {
	useObtenerPedidosClientes,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {TFunction} from 'react-i18next';
import { ImportExport } from '@material-ui/icons';

export const formatearNumero = (
	numero: number,
	t: TFunction<'translation'>
): string => {
	let numeroString;

	if (t('simbolos.conDecimales') == 'true')
		numeroString = numero.toFixed(2).toString();
	else numeroString = Math.trunc(numero).toString();

	const arrayNumero = numeroString.split('.');

	let parteEntera = arrayNumero[0];

	var regx = /(\d+)(\d{3})/;

	while (regx.test(parteEntera)) {
		parteEntera = parteEntera.replace(regx, '$1' + t('simbolos.miles') + '$2');
	}

	let parteDecimal = arrayNumero[1];

	if (parteDecimal) parteDecimal = t('simbolos.decimal') + parteDecimal;

	const numeroFormateado: string = parteEntera + (parteDecimal ?? '');

	return `${t('simbolos.moneda')} ${numeroFormateado}`;
};

export const formatearFecha = (
	fecha: string, //Formato fecha recibida: AAAA-DD-MMM
	t: TFunction<'translation'>
): string => {
	const arregloFecha: string[] = fecha.split('-');
	if (t('simbolos.formatoFechaAmericano') === 'true')
		return `${arregloFecha[2]}-${arregloFecha[1]}-${arregloFecha[0]}`;
	else return `${arregloFecha[1]}-${arregloFecha[2]}-${arregloFecha[0]}`;
};

export const fechaDispositivo = (): string => {
	let fechaDispositivo: string | null = window.localStorage.getItem(
		'fechaDipostivo'
	);

	const fecha: string = fechaDispositivo
		? new Date(fechaDispositivo).toISOString().split('T')[0]
		: new Date().toISOString().split('T')[0];

	return fecha;
};

export const obtenerTotalContadoPedidosCliente = (
	pedidosClienteMismaFechaEntrega: TPedidoClienteParaEnviar[]
): number => {
	let totalPedidosMismaFecha = 0;

	if (pedidosClienteMismaFechaEntrega.length === 0)
		return totalPedidosMismaFecha;

	totalPedidosMismaFecha = pedidosClienteMismaFechaEntrega.reduce(
		(total: number, pedido: TPedidoClienteParaEnviar) => {
			if (pedido.estado !== EEstadosDeUnPedido.Activo) return total;

			for (let producto of pedido.productos) {
				if (producto.tipoPago === ETiposDePago.Contado) total += producto.total;
			}

			return total;
		},
		0
	);

	return totalPedidosMismaFecha;
};

export const obtenerTotalesPedidosCliente = (
	pedidosClienteMismaFechaEntrega: TPedidoClienteParaEnviar[]
): number => {
	let totalPedidosMismaFecha = 0;
	if (pedidosClienteMismaFechaEntrega.length !== 0) {
		totalPedidosMismaFecha = pedidosClienteMismaFechaEntrega.reduce(
			(total: number, pedido: TPedidoClienteParaEnviar) => {
				if (pedido.estado === EEstadosDeUnPedido.Activo) {
					for (let producto of pedido.productos) {
						total += producto.total;
					}
				}
				return total;
			},
			0
		);
	}

	return totalPedidosMismaFecha;
};

export const obtenerTotalesContadoPedidosCliente = (
	pedidosClienteMismaFechaEntrega: TPedidoClienteParaEnviar[]
): number => {
	let totalPedidosMismaFecha = 0;
	if (pedidosClienteMismaFechaEntrega.length !== 0) {
		totalPedidosMismaFecha = pedidosClienteMismaFechaEntrega.reduce(
			(total: number, pedido: TPedidoClienteParaEnviar) => {
				if (pedido.estado === EEstadosDeUnPedido.Activo) {
					for (let producto of pedido.productos) {
						if (producto.tipoPago === ETiposDePago.Contado)
							total += producto.total;
					}
				}
				return total;
			},
			0
		);
	}

	return totalPedidosMismaFecha;
};

export const obtenerTotalesCompromisoDeCobroCliente = (
	compromisosDeCobroMismaFechaEntrega: TCompromisoDeCobro[]
): number => {
	let totalCompromisosDeCobroMismaFecha = 0;
	if (compromisosDeCobroMismaFechaEntrega.length !== 0) {
		totalCompromisosDeCobroMismaFecha = compromisosDeCobroMismaFechaEntrega.reduce(
			(total: number, compromiso: TCompromisoDeCobro) => {
				total += compromiso.monto;
				return total;
			},
			0
		);
	}

	return totalCompromisosDeCobroMismaFecha;
};

export const obtenerUnidadesMismoProducto = (
	pedidosCliente: TPedidoClienteParaEnviar[],
	codigoProducto: number
): number => {
	let totalUnidadesMismoProducto = 0;
	if (pedidosCliente.length !== 0) {
		totalUnidadesMismoProducto = pedidosCliente.reduce(
			(total: any, pedido: TPedidoClienteParaEnviar) => {
				for (let producto of pedido.productos) {
					if (producto.codigoProducto === codigoProducto)
						total += producto.unidades;
				}
				return total;
			},
			0
		);
	}

	return totalUnidadesMismoProducto;
};


export const presupuestoTipoPedido= ( pedidosClientes:TPedidosClientes,presupuestoPorTipoDePedido: TpresupuestoTipoPedido[], fechaDispositivo:string) => {
	let presupuestoTipoPedido:any={};
	const fechaDispositivoDate=new Date(fechaDispositivo);
	const obtenerPresupuestoVigente = (tipoPedido:number):number => {
		let total=presupuestoPorTipoDePedido.find( 
			item => item.tipoPedido===tipoPedido && 
			(fechaDispositivoDate >= new Date(item.vigenciaInicioPresupuesto) && fechaDispositivoDate <= new Date(item.vigenciaFinPresupuesto))
			)?.presupuesto ?? 0;
		return total;
	}
	const calcularPresupuestoInicial= (tipoPedido:number, presentacionProducto:number) => {
		let pedidosTabla=new Array<TProductoPedido>();
		for ( let pedidoCliente in pedidosClientes)
		{
			pedidosClientes[pedidoCliente].pedidos.forEach( pedido => {
				if(pedido.tipoPedido===tipoPedido) {
					pedido.productos.forEach((item) =>pedidosTabla.push(item));
				}
			});
		}
		console.table(pedidosTabla);
		let total=obtenerPresupuestoVigente(tipoPedido);
		presupuestoTipoPedido[tipoPedido] = pedidosTabla.reduce( (total,item)=> {
			 total -= (item.unidades + item.subUnidades/presentacionProducto)
			 return total;
		}, total );
	}
	return {
		calcular: (pedidoActual:TPedido, presentacionProducto:number, unidades:number=0, subUnidades:number=0):number => {
			console.log("calculando presupuesto");
			// Cálculo presupuesto sobre todos los pedidos ingresados del mismo tipo de pedido
			if (!presupuestoTipoPedido[pedidoActual.tipoPedido])	calcularPresupuestoInicial(pedidoActual.tipoPedido,presentacionProducto);
			let consumidoEnPedidoActual=0; 
			// Cálculo presupuesto segun el pedido actual sobre lo ingresado
			pedidoActual.productos.reduce( (consumidoEnPedidoActual, item) => {
				consumidoEnPedidoActual += item.unidades + item.subUnidades/presentacionProducto;
				return consumidoEnPedidoActual;
			}, consumidoEnPedidoActual );
			//Unidades y subunidades que se estan ingresando.
			consumidoEnPedidoActual += unidades + subUnidades/presentacionProducto;
			
			const saldoPresupuesto = (presupuestoTipoPedido[pedidoActual.tipoPedido] - consumidoEnPedidoActual);

			return saldoPresupuesto;
		}
	}
}
