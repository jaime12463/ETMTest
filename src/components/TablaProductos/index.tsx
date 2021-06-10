import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { TPreciosProductos, TProductoPedidoConPrecios} from "models";
import usarEstilos from "./usarEstilos";

export type Props = {
  titulos: string[];
  preciosProductos: TPreciosProductos;
  asignarProductoActual: (producto: TProductoPedidoConPrecios) => void;
};

const TablaProductos = ({ titulos, preciosProductos, asignarProductoActual }: Props) => {
  const estilos = usarEstilos();

  return (
    <TableContainer className={estilos.container}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            {titulos.map((column) => (
              <TableCell key={column} className={estilos.alignment}>
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {preciosProductos.map((producto) => (
            <TableRow
              hover
              key={producto.codigoProducto}
              onClick={() =>
                asignarProductoActual({
                  codigoProducto: `${producto.codigoProducto} ${producto.nombre}`,
                  unidades: 0,
                  subUnidades: 0,
                  precioConImpuestoUnidad: producto.precios[0].precioConImpuestoUnidad,
                  precioConImpuestoSubunidad: producto.precios[0].precioConImpuestoSubunidad,
                })
              }
              data-cy={producto.codigoProducto}
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
      </Table>
    </TableContainer>
  );
};

export default TablaProductos;
