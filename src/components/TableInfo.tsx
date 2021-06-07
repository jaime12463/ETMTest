import React from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { TPrecio, TProductoPedido } from "models";

const useStyles = makeStyles({
  container: {
    marginTop: 12,
    maxHeight: 150,
  },
  alignment: {
    textAlign: "center",
  },
});

type TableInfoProps = {
  headers: string[];
  precios: TPrecio[];
  onClick: (producto: TProductoPedido) => void;
};

export const TableInfo = ({ headers, precios, onClick }: TableInfoProps) => {
  const classes = useStyles();

  return (
    <TableContainer className={classes.container}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            {headers.map((column) => (
              <TableCell key={column} className={classes.alignment}>
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {precios.map((producto) => (
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
            >
              <TableCell className={classes.alignment}>
                {producto.codigoproducto} {producto.nombre.substring(12, -1)}
              </TableCell>
              <TableCell className={classes.alignment}>
                $ {producto.precioConImpuesto}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
