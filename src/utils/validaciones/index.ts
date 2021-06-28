import {
	TPrecio,
	TFechaEntrega,
	TConfiguracionPedido,
	TCliente,
	TPedidoCliente,
} from 'models';
import {fechaDispositivo, obtenerTotalesPedidosClientes} from 'utils/methods';

export const validarFechaVigenciaProducto = (
	preciosProductos: TPrecio[],
	fechaEntrega: string
): boolean => {
	return preciosProductos.some(
		(precio) =>
			new Date(precio['vigenciaInicioPrecio']) <= new Date(fechaEntrega) &&
			new Date(precio['vigenciaFinPrecio']) >= new Date(fechaEntrega)
	);
};

export const validarUnidadesMinimasProducto = (
	unidades: number,
	configuracionPedido: TConfiguracionPedido
): boolean => {
	const {cantidadMaximaUnidades} = configuracionPedido;
	if (cantidadMaximaUnidades) {
		if (unidades > cantidadMaximaUnidades) return false;
	}
	return true;
};

export const validarMontoMinimoPedido = (
	montoTotalPedido: number,
	configuracionPedido: TConfiguracionPedido
): boolean => {
	const {montoVentaMinima} = configuracionPedido;
	if (montoVentaMinima) {
		if (montoTotalPedido < montoVentaMinima) return false;
	}
	return true;
};

export const validarEsMasDelTotalMontoMaximo = (
	fechaEntrega: string,
	totalPedidoActual: number,
	pedidosCliente: any,
	montoVentaMaxima: number
): boolean => {
	const total =
		obtenerTotalesPedidosClientes(pedidosCliente, fechaEntrega) +
		totalPedidoActual;

	if (total > montoVentaMaxima) return true;
	return false;
};

export const validarVentaSubUnidades = (
	esVentaSubunidadesRuta: boolean,
	esVentaSubunidades: boolean
): boolean => {
	if (esVentaSubunidadesRuta && esVentaSubunidades) return true;
	return false;
};

export const validarSubUnidadesConPresentacion = (
	presentacion: number,
	subUnidades: number
): boolean => {
	if (presentacion <= subUnidades) return false;
	return true;
};

export const validarFechaVisita = (
	clienteEncontrado: TCliente,
	esFrecuenciaAbierta: boolean
): boolean => {
	if (esFrecuenciaAbierta) {
		return clienteEncontrado.fechasEntrega.some(
			(fechaEntrega) =>
				new Date(fechaEntrega.fechaVisita).toISOString().split('T')[0] ===
				fechaDispositivo()
		);
	}
	return (
		clienteEncontrado.fechasEntrega.some(
			(fechaEntrega) =>
				new Date(fechaEntrega.fechaVisita).toISOString().split('T')[0] ===
				fechaDispositivo()
		) &&
		clienteEncontrado.visitasPlanificadas.some(
			(visitaPlanificada) =>
				new Date(visitaPlanificada.dia).toISOString().split('T')[0] ===
				fechaDispositivo()
		)
	);
};

export const validarSubUnidadesEsMultiplo = (
	subunidadesVentaMinima: number,
	subUnidadesParseado: number
): boolean => {
	if (subUnidadesParseado % subunidadesVentaMinima === 0) return true;
	return false;
};
