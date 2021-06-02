import React, { useEffect } from "react";
import { useAppContext } from "context/AppContext";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
} from "@material-ui/core";
import { useAppSelector } from "redux/hooks";
import { selectPedidosClientes } from "redux/features/pedidosClientes/pedidosClientesSlice";
import { selectClienteActual } from "redux/features/clienteActual/clienteActualSlice";

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
  const { setTitle } = useAppContext();
  const { t } = useTranslation();
  const productosPedido = useAppSelector(selectPedidosClientes);
  const { codigoCliente } = useAppSelector(selectClienteActual);

  useEffect(() => {
    setTitle(t('titulos.productosPedido'));
  }, [setTitle, t]);

  return (
    <div>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="a dense table" size="small">
          <TableHead>
            <TableRow>
              {[t('general.producto'), t('general.unidades')].map((column) => (
                <TableCell key={column} className={classes.alignment}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {productosPedido[codigoCliente]?.map((product) => (
              <TableRow key={product.codigoProducto}>
                <TableCell className={classes.alignment}>
                  {product.codigoProducto}
                </TableCell>
                <TableCell className={classes.alignment}>
                  {product.unidades}
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
