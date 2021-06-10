import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import InputTexto from "components/InputTexto";
import { useTranslation } from "react-i18next";
import { TProductoPedidoConPrecios } from "models";
import usarEstilos from "./usarEstilos";

export type Props = {
  agregarProductoAlPedidoCliente: React.FormEventHandler<HTMLFormElement>;
  aumentarUnidadesAlProductoActual: React.ChangeEventHandler<HTMLInputElement>;
  aumentarSubUnidadesAlProductoActual: React.ChangeEventHandler<HTMLInputElement>;
  productoActual: TProductoPedidoConPrecios;
};

const FormularioAgregarProducto = ({
  agregarProductoAlPedidoCliente,
  aumentarUnidadesAlProductoActual,
  aumentarSubUnidadesAlProductoActual,
  productoActual,
}: Props) => {
  const estilos = usarEstilos();
  const { t } = useTranslation();

  return (
    <div className={estilos.paper}>
      <form
        className={estilos.form}
        noValidate
        onSubmit={agregarProductoAlPedidoCliente}
      >
        <Grid container spacing={1}>
          <Grid item xs={6} sm={6}>
            <InputTexto
              label={t("general.producto")}
              value={productoActual.codigoProducto}
              disabled
            />
          </Grid>
          <Grid item xs={3} sm={3}>
            <TextField
              name="unidades"
              size="small"
              variant="outlined"
              fullWidth
              label={t("general.unidades")}
              type="number"
              value={
                productoActual.unidades === 0 ? "" : productoActual.unidades
              }
              onChange={aumentarUnidadesAlProductoActual}
              disabled={
                productoActual.unidades === 0 &&
                productoActual.codigoProducto === ""
              }
              // inputRef={(input) => {
              //   if (input != null) input.focus();
              // }}
              inputProps={{ "data-cy": "cantidad-producto" }}
            />
          </Grid>
          <Grid item xs={3} sm={3}>
            <TextField
              name="subUnidades"
              size="small"
              variant="outlined"
              fullWidth
              label={t("general.subUnidades")}
              type="number"
              value={
                productoActual.subUnidades === 0 ? "" : productoActual.subUnidades
              }
              onChange={aumentarSubUnidadesAlProductoActual}
              disabled={
                productoActual.subUnidades === 0 &&
                productoActual.codigoProducto === ""
              }
              // inputRef={(input) => {
              //   if (input != null) input.focus();
              // }}
              // inputProps={{ "data-cy": "cantidad-producto" }}
            />
          </Grid>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ display: "none" }}
          >
            +
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default FormularioAgregarProducto;
