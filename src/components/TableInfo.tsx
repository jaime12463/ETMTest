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
import { TPrecio, TProductoSolicitado } from "models";

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
  onClick:  (producto: TProductoSolicitado) => void;
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
              key={producto.Codigoproducto}
              onClick={() =>
                onClick({
                  codigoProducto: producto.Codigoproducto,
                  unidades: 0,
                  precio: parseInt(producto.PrecioConImpuesto, 10),
                })
              }
            >
              <TableCell className={classes.alignment}>
                {producto.Codigoproducto}
              </TableCell>
              <TableCell className={classes.alignment}>
                $ {producto.PrecioConImpuesto}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
