import {TFechaEntrega} from 'models';

export const transformDate = (date: string): string =>
	`${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}`;

export const darFormatoFecha = (fecha: string): string => {
	const arregloFecha: string[] = fecha.split('-');
	const stringFecha: string = `${arregloFecha[2]}/${arregloFecha[1]}/${arregloFecha[0]}`;
	return stringFecha;
};

// TODO: Verificar este método ya que la fecha del sistema no debe estar hardcodeada
export const establecerFechaEntrega = (fechasEntrega: TFechaEntrega[]) => {
	const fechaEncontrada = fechasEntrega.find(
		({fechaVisita}) =>
			new Date(fechaVisita).toISOString().split('T')[0] ===
			new Date('2017-09-08').toISOString().split('T')[0]
	);

	return fechaEncontrada && fechaEncontrada.fechaEntrega;
};
