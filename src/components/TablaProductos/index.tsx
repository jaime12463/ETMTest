import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { TPrecio, TProductoPedido } from "models";
import usarEstilos from "./usarEstilos";

export type Props = {
  titulos: string[];
  productos: TPrecio[];
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
              key={producto.codigoproducto}
              onClick={() =>
                onClick({
                  codigoProducto: `${producto.codigoproducto} ${producto.nombre}`,
                  unidades: 0,
                  precio: parseInt(producto.precioConImpuesto, 10),
                })
              }
              data-cy={producto.codigoproducto}
            >
              <TableCell className={estilos.alignment}>
                {producto.codigoproducto} {producto.nombre.substring(12, -1)}
              </TableCell>
              <TableCell className={estilos.alignment}>
                $ {producto.precioConImpuesto}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaProductos;
