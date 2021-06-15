import { TableBody, TableCell, TableRow } from "@material-ui/core";
import {
  TPrecioProducto,
  TPreciosProductos,
  TProductoPedidoConPrecios,
} from "models";
import { Celda } from "./Celda";

type PropsCuerpo = {
  asignarProductoActual: (producto: TProductoPedidoConPrecios) => void;
  estilos: any; // TODO: Buscar como mejorar esto para recibir los estilos como propiedad
  filas: TPreciosProductos;
};

const obtenerNombreYCodigo = (producto: TPrecioProducto) => {
  return `${producto.codigoProducto} ${producto.nombre.substring(12, -1)}`;
};

const obtenerPrecio = (producto: TPrecioProducto) => {
  return `$ ${producto.precios[0].precioConImpuestoUnidad}`;
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
              codigoProductoConNombre: `${producto.codigoProducto} ${producto.nombre}`,
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
          <Celda estilos={estilos} texto={obtenerNombreYCodigo(producto)} />
          <Celda estilos={estilos} texto={obtenerPrecio(producto)} />
        </TableRow>
      ))}
    </TableBody>
  );
};
