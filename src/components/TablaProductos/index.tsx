import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { TProductoPedido ,TPreciosProductos} from "models";
import usarEstilos from "./usarEstilos";

export type Props = {
  titulos: string[];
  productos: TPreciosProductos;
  onClick: (producto: TProductoPedido) => void;
};

const TablaProductos = ({ titulos, productos, onClick }: Props) => {
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
          {productos.map((producto) => (
            <TableRow
              hover
              key={producto.codigoProducto}
              onClick={() =>
                onClick({
                  codigoProducto: `${producto.codigoProducto} ${producto.nombre}`,
                  unidades: 0,
                  subUnidades: 0,
                  precio: parseInt(producto.precios[0].precioConImpuesto, 10),
                })
              }
              data-cy={producto.codigoProducto}
            >
              <TableCell className={estilos.alignment}>
                {producto.codigoProducto} {producto.nombre.substring(12, -1)}
              </TableCell>
              <TableCell className={estilos.alignment}>
                $ {producto.precios[0].precioConImpuesto}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaProductos;
