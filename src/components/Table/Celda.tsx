import { TableCell } from "@material-ui/core";

type PropsCelda = {
  estilos: any; // TODO: Buscar como mejorar esto para recibir los estilos como propiedad
  texto: string;
};

export const Celda = ({ estilos, texto }: PropsCelda) => {
  return <TableCell className={estilos.alignment}>{texto}</TableCell>;
};
