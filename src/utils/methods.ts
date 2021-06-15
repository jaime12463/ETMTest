export const transformDate = (date: string): string =>
  `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}`;

export const darFormatoFecha = (fecha: string): string => {
  const arregloFecha: string[] = fecha.split("-");
  const stringFecha: string = `${arregloFecha[2]}/${arregloFecha[1]}/${arregloFecha[0]}`;
  return stringFecha;
}

export const fechaDispositivo = (): Date => {
  //return new Date();
  return new Date(2017,8,6);
}
