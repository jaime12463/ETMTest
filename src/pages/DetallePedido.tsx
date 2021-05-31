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
  const { t } = useTranslation();

  useEffect(() => {
    setTitle(t('titulos.productosPedido'));
  }, []);

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
