import {ETiposDePago} from 'models';

export const useObtenerTipoPagoActual = () => {
	const obtenerTipoPagoActual = (): ETiposDePago => {
		let tipoPagoActual: ETiposDePago;
		tipoPagoActual = ETiposDePago.Contado;
		//TODO: Aca se inicializa el valor, hay que calcularlo
		return tipoPagoActual;
	};
	return obtenerTipoPagoActual;
};
