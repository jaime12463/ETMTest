import i18n from 'i18next'; 
import {
	TCliente,
	TRetornoValidacion,
	

} from 'models';
export const validarDatosCliente = (cliente:TCliente | undefined):TRetornoValidacion => {

	console.log('validarDatosCliente',cliente);
	const retornoValidacion:TRetornoValidacion= {
		 esValido:!(cliente===undefined),
		 propsAdvertencia : {
			dataCy: 'no-datos-cliente',
			mensaje: i18n.t('No se encontro datos del cliente'),
		}
	};
	console.log("retorno", retornoValidacion);
	return retornoValidacion;
}

export const validarSiExcedeElMontoMinimo = (cliente:TCliente | undefined, totalPedidos:number): TRetornoValidacion => {
	const montoVentaMinima = cliente?.configuracionPedido.ventaMinima?.montoVentaMinima;
	return {
		esValido:( (montoVentaMinima) ? (totalPedidos >= montoVentaMinima) : true),
		propsAdvertencia : {
			dataCy: 'pedido-minimo',
			mensaje:  i18n.t('advertencias.pedidoMinimo', {
				monto: montoVentaMinima,
			}),
	   }
   };
};

export const validarSiExcedeAlMaximoContado = ( 
	montoVentaMaxima:number, 
	totalVisita:number,
	totalContadoPedidosClienteMismaFechaEntrega:number): TRetornoValidacion => {
	return {
		esValido:( (totalVisita+totalContadoPedidosClienteMismaFechaEntrega) <= montoVentaMaxima),
		propsAdvertencia : {
			dataCy: 'monto-maximo',
			mensaje: i18n.t('advertencias.masDelMontoMaximo', {
				montoVentaMaxima: montoVentaMaxima,
			}),
	   }
   };
};

export const validarSiExcedeAlMaximoDeCredito = (
	condicionDeCreditoDelCliente:string, creditoDisponible:number, montoTotalACredito:number
): TRetornoValidacion => {
	return {
		esValido:(condicionDeCreditoDelCliente === 'creditoInformal') ? (montoTotalACredito <= creditoDisponible) : true,
		propsAdvertencia : {
			dataCy: 'credito-maximo',
			mensaje: i18n.t('advertencias.excedeCreditoDsiponible'),
	   }
   };
};


