import React from "react";
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
import Scaffold from "components/Scaffold";

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
  const { listaProductosPedido } = useAppContext();
  const { t } = useTranslation();

  return (
    <Scaffold>
      <Scaffold.Header title={t('titulos.productosPedido')}>
        <Scaffold.Header.BackAction />
      </Scaffold.Header>
      <Scaffold.Content>
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
      </Scaffold.Content>
    </Scaffold>
  );
};

export default DetallePedido;
