import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import Input from "components/Input";
import { useTranslation } from "react-i18next";
import useEstilos from "./useEstilos";

export type Props = {
  agregarProductoAlPedidoCliente: React.FormEventHandler<HTMLFormElement>;
  aumentarUnidadesAlProductoActual: React.ChangeEventHandler<HTMLFormElement>;
  buscarPreciosProductos: React.ChangeEventHandler<HTMLInputElement>;
  control: any;
  handleSubmit: any;
};

const FormularioAgregarProducto = ({
  agregarProductoAlPedidoCliente,
  aumentarUnidadesAlProductoActual,
  buscarPreciosProductos,
  handleSubmit,
  control,
}: Props) => {
  const estilos = useEstilos();
  const { t } = useTranslation();

  return (
    <Fragment>
      <Grid item xs={12} sm={12}>
        <form
          onChange={handleSubmit(buscarPreciosProductos)}
          onSubmit={(e: any) => e.preventDefault()}
        >
          <Input
            label={t("general.buscar")}
            control={control}
            name="productoABuscar"
            inputDataCY="codigo-producto"
          />
        </form>
      </Grid>
      <Grid item xs={4} sm={4}>
        <form>
          <Input
            label={t("general.producto")}
            name="codigoProducto"
            control={control}
            disabled
          />
        </form>
      </Grid>
      <Grid item xs={4} sm={4}>
        <form
          onSubmit={handleSubmit(agregarProductoAlPedidoCliente)}
          onChange={handleSubmit(aumentarUnidadesAlProductoActual)}
        >
          <Input
            label={t("general.unidades")}
            name="unidades"
            control={control}
            type="number"
            inputDataCY="cantidad-producto"
          />
        </form>
      </Grid>
      <Grid item xs={4} sm={4}>
        <form
          onSubmit={handleSubmit(agregarProductoAlPedidoCliente)}
          onChange={handleSubmit(aumentarUnidadesAlProductoActual)}
        >
          <Input
            label={t("general.subUnidades")}
            name="subUnidades"
            control={control}
            type="number"
          />
        </form>
      </Grid>
    </Fragment>
  );
};

export default FormularioAgregarProducto;
