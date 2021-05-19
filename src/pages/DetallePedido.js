import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
} from "@material-ui/core";
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const useStyles = makeStyles({
  container: {
    marginTop: 12,
    maxHeight: 150,
  },
  alignment: {
    textAlign: "center",
  },
});

const DetallePedido = (data) => {
  const classes = useStyles();
  const context = useContext(AppContext);

  console.log("DetallePedido", context);

  return (
    <div>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="a dense table" size="small">
          <TableHead>
            <TableRow>
              {["Producto", "Unidades"].map((column) => (
                <TableCell key={column} className={classes.alignment}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {context.listaProductosPedido.map((item) => (
              <TableRow>
                <TableCell className={classes.alignment}>
                  {item.producto}
                </TableCell>
                <TableCell className={classes.alignment}>
                  {item.unidades}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DetallePedido;
