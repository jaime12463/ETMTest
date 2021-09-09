import {
	TPrecio,
	TFechaEntrega,
	TConfiguracionPedido,
	TCliente,
	TPedidoClienteParaEnviar,
	TVisitaPlanificada,
	TValidacionFechaVisita,
	TValidacionFechaEntrega,
	TPrecioProducto,
	TPedido,
} from 'models';
import {
	fechaDispositivo,
	obtenerTotalContadoPedidosCliente,
	obtenerUnidadesMismoProducto,
} from 'utils/methods';
import {useObtenerDeudasDelClienteActual} from 'hooks';

export const validarDeshabilitarTabCompromisoDeCobro = () => {
	let deshabilitarTabCompromisoDeCobro = false;
	const deudas = useObtenerDeudasDelClienteActual();
	if (!deudas || deudas.length === 0) {
		deshabilitarTabCompromisoDeCobro = true;
	}

	return deshabilitarTabCompromisoDeCobro;
};

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
	const montoVentaMinima = configuracionPedido.ventaMinima?.montoVentaMinima;
	if (montoVentaMinima) {
		if (montoTotalPedido < montoVentaMinima) return false;
	}
	return true;
};

export const validarTotalConMontoMaximoContado = (
	totalPedidoActual: number,
	pedidosClienteMismaFechaEntrega: TPedidoClienteParaEnviar[],
	montoVentaMaxima: number
): boolean => {
	const toatlPedidosClienteMismaFechaEntregaYPedidoActual: number =
		obtenerTotalContadoPedidosCliente(pedidosClienteMismaFechaEntrega) +
		totalPedidoActual;

	if (toatlPedidosClienteMismaFechaEntregaYPedidoActual > montoVentaMaxima)
		return false;
	return true;
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

export const validarObtenerVisitaPlanificada = (
	visitasPlanificadas: TVisitaPlanificada[]
): TValidacionFechaVisita => {
	const visitaPlanificada:
		| TVisitaPlanificada
		| undefined = visitasPlanificadas.find(
		(visitaPlanificada: TVisitaPlanificada) =>
			new Date(visitaPlanificada.dia).getTime() ===
			new Date(fechaDispositivo()).getTime()
	);
	return {
		esValidaVisitaPlanificada: visitaPlanificada !== undefined,
		fechaVisitaPlanificada: visitaPlanificada?.dia ?? '',
	};
};

export const validarObtenerVisitaPlanificadaPosterior = (
	visitasPlanificadas: TVisitaPlanificada[]
): TValidacionFechaVisita => {
	const visitaPlanificadaPosterior:
		| TVisitaPlanificada
		| undefined = visitasPlanificadas.find(
		(visitaPlanificada: TVisitaPlanificada) =>
			new Date(visitaPlanificada.dia).getTime() >=
			new Date(fechaDispositivo()).getTime()
	);
	return {
		esValidaVisitaPlanificada: visitaPlanificadaPosterior !== undefined,
		fechaVisitaPlanificada: visitaPlanificadaPosterior?.dia ?? '',
	};
};

export const validarObtenerFechaEntrega = (
	fechasEntrega: TFechaEntrega[]
): TValidacionFechaEntrega => {
	const fechaActual = fechaDispositivo();
	const fechaEntregaEncontrada: TFechaEntrega | undefined = fechasEntrega.find(
		(fechaEntrega) =>
			new Date(fechaEntrega.fechaVisita).getTime() ===
			new Date(fechaActual).getTime()
	);
	return {
		esValidaFechaEntrega: fechaEntregaEncontrada !== undefined,
		fechaEntrega: fechaEntregaEncontrada?.fechaEntrega ?? '',
	};
};

export const validarUnidadesDisponibles = (
	pedidosCliente: TPedidoClienteParaEnviar[],
	unidadesIngresadas: number,
	productoActual: TPrecioProducto
): number => {
	let disponibleHistorico = obtenerUnidadesMismoProducto(
		pedidosCliente,
		productoActual.codigoProducto
	);
	let unidadesDisponibles = productoActual.unidadesDisponibles || 0; //Esto no va a pasar nunca
	let unidadesCalculadas = unidadesDisponibles - disponibleHistorico;

	if (unidadesCalculadas === 0) return unidadesCalculadas;

	if (unidadesCalculadas - unidadesIngresadas < 0) {
		let unidadesRetorno =
			disponibleHistorico != 0
				? disponibleHistorico
				: unidadesDisponibles + disponibleHistorico;
		return unidadesRetorno;
	}

	return -1;
};

export const validarHayMasProductosMandatorios = (pedidos: TPedido[]) => {
	let HayProductosMandatorios = false;

	pedidos.forEach((pedido: TPedido) => {
		if (pedido.productos.length > 1) {
			return (HayProductosMandatorios = true);
		}
	});

	return HayProductosMandatorios;
};
