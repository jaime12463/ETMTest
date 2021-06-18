import {TCliente, TConfiguracion, TFechaEntrega} from 'models';

export const transformDate = (date: string): string =>
	`${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}`;

export const darFormatoFecha = (fecha: string): string => {
	const arregloFecha: string[] = fecha.split('-');
	const stringFecha: string = `${arregloFecha[2]}/${arregloFecha[1]}/${arregloFecha[0]}`;
	return stringFecha;
};

export const fechaDispositivo = (): String => {
	let fechaDispositivo = localStorage.getItem('fechaDipostivo');

	const fecha: String = fechaDispositivo
		? new Date(fechaDispositivo).toISOString().split('T')[0]
		: new Date().toISOString().split('T')[0];

	return fecha;
};

// TODO: Verificar este método ya que la fecha del sistema no debe estar hardcodeada
export const establecerFechaEntrega = (fechasEntrega: TFechaEntrega[]) => {
	const fechaEncontrada = fechasEntrega.find(
		({fechaVisita}) =>
			new Date(fechaVisita).toISOString().split('T')[0] === fechaDispositivo()
	);

	return fechaEncontrada && fechaEncontrada.fechaEntrega;
};

// TODO: Verificar metodo para ver zona horaria
export const verificarFrecuencia = (
	clienteEncontrado: TCliente,
	configuracionActual: TConfiguracion
) => {
	if (configuracionActual.esFrecuenciaAbierta) {
		return clienteEncontrado.fechasEntrega.some(
			(fecha) =>
				new Date(fecha.fechaVisita).toISOString().split('T')[0] ===
				fechaDispositivo()
		);
	} else {
		return (
			clienteEncontrado.fechasEntrega.some(
				(fecha) =>
					new Date(fecha.fechaVisita).toISOString().split('T')[0] ===
					fechaDispositivo()
			) &&
			clienteEncontrado.visitasPlanificadas.some(
				(fecha) =>
					new Date(fecha.dia).toISOString().split('T')[0] === fechaDispositivo()
			)
		);
	}
};
