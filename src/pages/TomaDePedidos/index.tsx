import { Fragment, useEffect, useState } from "react";
import { selectPedidoActual } from "redux/features/pedidoActual/pedidoActualSlice";
import { TPreciosProductos, TProductoPedidoConPrecios } from "models";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { Button, Grid, Typography } from "@material-ui/core";
import { obtenerDatosConfiguracionAsync } from "redux/features/configuracion/configuracionSlice";
import { useTranslation } from "react-i18next";
import useEstilos from "./useEstilos";
import { useForm } from "react-hook-form";
import { obtenerDatosClientesProductosAsync } from "redux/features/datos/datosSlice";
import { Alert } from "@material-ui/lab";
import { darFormatoFecha } from "utils/methods";
import {
  TablaProductos,
  FormularioAgregarProducto,
  TarjetaPedido,
  Input,
  Estructura,
} from "components";
import {
  useAgregarPedidoAlListado,
  useAgregarProductoAlPedidoCliente,
  useAsignarPedidoActual,
  useAsignarProductoActual,
  useAumentarUnidadesAlProductoActual,
  useBuscarPreciosProductos,
} from "./hooks";
import { DetallePedido } from "pages";
import path from "path";
import { Route, Switch, useRouteMatch } from "react-router-dom";

export default function TomaDePedidos() {
  const [preciosProductos, setPreciosProductos] = useState<TPreciosProductos>(
    []
  );
  const [existeCliente, setExisteCliente] = useState<boolean | null>(null);
  const [razonSocial, setRazonSocial] = useState<string>("");
  const [fechaEntrega, setFechaEntrega] = useState<string>("2017-09-06"); //Falta implementar esto
  const [
    productoActual,
    setProductoActual,
  ] = useState<TProductoPedidoConPrecios>({
    codigoProducto: "",
    unidades: 0,
    subUnidades: 0,
    precioConImpuestoUnidad: 0,
    precioConImpuestoSubunidad: 0,
  });
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const estilos = useEstilos();
  const { control, handleSubmit, setValue } = useForm();
  const pedidoActual = useAppSelector(selectPedidoActual);
  const { path } = useRouteMatch();

  useEffect(() => {
    dispatch(obtenerDatosClientesProductosAsync());
    dispatch(obtenerDatosConfiguracionAsync());
  }, [dispatch]);

  const asignarProductoActual = useAsignarProductoActual(
    setProductoActual,
    setValue
  );
  const agregarProductoAlPedidoCliente = useAgregarProductoAlPedidoCliente(
    productoActual,
    setProductoActual,
    setValue
  );
  const asignarPedidoActual = useAsignarPedidoActual(
    setExisteCliente,
    setRazonSocial,
    setPreciosProductos
  );
  const aumentarUnidadesAlProductoActual = useAumentarUnidadesAlProductoActual(
    productoActual,
    setProductoActual
  );
  const buscarPreciosProductos = useBuscarPreciosProductos(
    preciosProductos,
    setPreciosProductos
  );
  const agregarPedidoAlListado = useAgregarPedidoAlListado();

  return (
    <>
      <Switch>
        <Route exact path={path}>
          <Estructura
            titulo={"titulos.ingresoPedido"}
            esConFechaHaciaAtras={true}
            esConLogoInferior={false}
          >
            <Fragment>
              <Grid
                container
                direction="row"
                alignItems="center"
                spacing={2}
                className={estilos.contenedor}
              >
                <Grid item xs={6} sm={6}>
                  <form onSubmit={handleSubmit(asignarPedidoActual)}>
                    <Input
                      label={t("general.cliente")}
                      name="codigoCliente"
                      control={control}
                      inputDataCY="codigo-cliente"
                    />
                  </form>
                </Grid>
                {existeCliente && (
                  <Fragment>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body2" component="p">
                        {razonSocial}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Typography variant="body2" component="p">
                        Fecha de entrega:{" "}
                        {darFormatoFecha(
                          new Date(fechaEntrega).toISOString().split("T")[0]
                        )}
                      </Typography>
                    </Grid>
                  </Fragment>
                )}
                {!existeCliente && existeCliente !== null && (
                  <Alert variant="filled" severity="warning">
                    {t("advertencias.clienteNoPortafolio")}
                  </Alert>
                )}
                {existeCliente && (
                  <Fragment>
                    <FormularioAgregarProducto
                      agregarProductoAlPedidoCliente={
                        agregarProductoAlPedidoCliente
                      }
                      buscarPreciosProductos={buscarPreciosProductos}
                      aumentarUnidadesAlProductoActual={
                        aumentarUnidadesAlProductoActual
                      }
                      handleSubmit={handleSubmit}
                      control={control}
                    />
                    <TablaProductos
                      titulos={[t("general.producto"), t("general.precio")]}
                      preciosProductos={preciosProductos}
                      asignarProductoActual={asignarProductoActual}
                    />
                    {pedidoActual.productosPedido.length > 0 && (
                      <Fragment>
                        <TarjetaPedido pedido={pedidoActual.productosPedido} />
                        <Grid
                          container
                          direction="row"
                          justify="flex-end"
                          alignItems="center"
                        >
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={agregarPedidoAlListado}
                            className={estilos.botonCerrarPedido}
                          >
                            {t("general.cerrarPedido").toUpperCase()}
                          </Button>
                        </Grid>
                      </Fragment>
                    )}
                  </Fragment>
                )}
              </Grid>
            </Fragment>
          </Estructura>
        </Route>
        <Route exact path={`${path}/detalle`}>
          <Estructura
            titulo={"titulos.productosPedido"}
            esConFechaHaciaAtras={true}
            esConLogoInferior={false}
          >
            <DetallePedido />
          </Estructura>
        </Route>
      </Switch>
    </>
  );
}
