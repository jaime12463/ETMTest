import { TableCell, TableHead, TableRow } from "@material-ui/core";

type PropsEncabezado = {
  atributos: string[];
  estilos: any; // TODO: Buscar como mejorar esto para recibir los estilos como propiedad
};

export const Encabezado = ({ atributos, estilos }: PropsEncabezado) => {
  return (
    <TableHead>
      <TableRow>
        {atributos.map((column) => (
          <TableCell key={column} className={estilos.alignment}>
            {column}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
