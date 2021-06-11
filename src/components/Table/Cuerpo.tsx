import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { TPreciosProductos, TProductoPedidoConPrecios } from "models";

type PropsCuerpo = {
  asignarProductoActual: (producto: TProductoPedidoConPrecios) => void;
  estilos: any; // TODO: Buscar como mejorar esto para recibir los estilos como propiedad
  filas: TPreciosProductos;
};

export const Cuerpo = ({
  asignarProductoActual,
  estilos,
  filas,
}: PropsCuerpo) => {
  return (
    <TableBody>
      {filas.map((producto, i) => (
        <TableRow
          hover
          key={producto.codigoProducto}
          onClick={() =>
            asignarProductoActual({
              codigoProducto: `${producto.codigoProducto} ${producto.nombre}`,
              unidades: 0,
              subUnidades: 0,
              precioConImpuestoUnidad:
                producto.precios[0].precioConImpuestoUnidad,
              precioConImpuestoSubunidad:
                producto.precios[0].precioConImpuestoSubunidad,
            })
          }
          data-cy={`valor-${i}`}
        >
          <TableCell className={estilos.alignment}>
            {producto.codigoProducto} {producto.nombre.substring(12, -1)}
          </TableCell>
          <TableCell className={estilos.alignment}>
            $ {producto.precios[0].precioConImpuestoUnidad}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
