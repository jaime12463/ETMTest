import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const useStyles = makeStyles({
  container: {
    marginTop: 12,
    maxHeight: 300,
  },
  alignment: {
    textAlign: "center",
  },
});

const DetallePedido: React.FC = () => {
  const classes = useStyles();
  const { setTitle, listaProductosPedido } = useAppContext();

  useEffect(() => {
    setTitle("Productos del Pedido");
    // eslint-disable-next-line
  }, []);

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
            {listaProductosPedido.map((item) => (
              <TableRow key={item.producto}>
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
