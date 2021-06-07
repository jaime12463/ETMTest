import React, { useCallback, useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Alert } from "@material-ui/lab";
import InputField from "components/InputField";
import { TableInfo } from "components/TableInfo";
import { useAppContext } from "context/AppContext";
import { FormAddProduct } from "components/FormAddProduct";
import CardPedido from "components/CardPedido";
import { useTranslation } from "react-i18next";
import { TCliente, TFecha, TPrecio, TProductoPedido } from "models";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import {
  agregarPedidoCliente,
  borrarPedidoCliente,
  selectPedidosClientes,
} from "redux/features/pedidosClientes/pedidosClientesSlice";
import {
  selectClienteActual,
  establecerClienteActual,
} from "redux/features/clienteActual/clienteActualSlice";
import {
  obtenerClientesAsync,
  selectCliente,
} from "redux/features/clientes/clientesSlice";
import { InputLabel } from "@material-ui/core";
import { transformDate, darFormatoFecha } from "utils/methods";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  sectionAlert: {
    marginTop: "1rem",
  },
  sectionRazonSocial: {
    display: "flex",
    alignItems: "center",
  },
  colorTextLabel: {
    color: "black",
  },
}));

export default function TomaDePedidos() {
  const { setTitle } = useAppContext();
  const [fechas, setFechas] = useState<TFecha[]>([]);
  const [razonSocial, setRazonSocial] = useState<string>("");
  const [precios, setPrecios] = useState<TPrecio[]>([]);
  const [existeCliente, setExisteCliente] = useState<boolean | null>(null);
  const [focusProduct, setFocusProduct] = useState<TProductoPedido>({
    codigoProducto: "",
    unidades: 0,
    precio: 0,
  });
  const dispatch = useAppDispatch();
  const productosPedido = useAppSelector(selectPedidosClientes);
  const { codigoCliente } = useAppSelector(selectClienteActual);
  const { clientes } = useAppSelector(selectCliente);

  const { t } = useTranslation();
  const classes = useStyles();

  useEffect(() => {
    setTitle(t("titulos.ingresoPedido"));
    dispatch(obtenerClientesAsync());
  }, [setTitle, t, dispatch]);

  useEffect(() => {
    if (precios.length > 0) setExisteCliente(true);
  }, [precios]);

  const handleChangeCliente = useCallback(
    ({ currentTarget }: React.FormEvent<HTMLInputElement>) => {
      dispatch(establecerClienteActual({ codigoCliente: currentTarget.value }));
      setPrecios([]);
      setExisteCliente(null);
      setFocusProduct({ codigoProducto: "", unidades: 0, precio: 0 });
    },
    [dispatch]
  );

  const handleSearchProducts = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      let nuevosPrecios: [] | TPrecio[] = [];
      let nuevasFechas: [] | TFecha[] = [];
      const clienteEncontrado: TCliente | undefined = clientes.find(
        (clienteDB) => clienteDB.codigoCliente === codigoCliente
      );
      if (clienteEncontrado) {
        nuevasFechas = clienteEncontrado.fechas;
        nuevosPrecios = clienteEncontrado.precios.filter(
          (producto) =>
            new Date(transformDate(producto.iniVig)) <=
              new Date(nuevasFechas[0].fechaDeEntrega) &&
            new Date(transformDate(producto.finVig)) >=
              new Date(nuevasFechas[0].fechaDeEntrega)
        );
        setExisteCliente(true);
        setRazonSocial(clienteEncontrado.detalles[0].nombreComercial) //Que index deberia ser?
      }else {
        setExisteCliente(false);
        setRazonSocial("")
      }
      setPrecios(nuevosPrecios);
      setFechas(nuevasFechas);
    },
    [clientes, codigoCliente]
  );

  const handleFindOneProduct = useCallback(
    ({ currentTarget: { value } }: React.FormEvent<HTMLInputElement>) => {
      let nuevosPrecios: [] | TPrecio[] = [];
      const clienteEncontrado: TCliente | undefined = clientes.find(
        (clienteDB) => clienteDB.codigoCliente === codigoCliente
      );
      if (clienteEncontrado && value === "")
        nuevosPrecios = clienteEncontrado.precios.filter(
          (producto) =>
            new Date(transformDate(producto.iniVig)) <=
              new Date(fechas[0].fechaDeEntrega) &&
            new Date(transformDate(producto.finVig)) >=
              new Date(fechas[0].fechaDeEntrega)
        );
      if (clienteEncontrado && value !== "") {
        nuevosPrecios = clienteEncontrado.precios.filter(
          (producto) =>
            (producto.codigoproducto.includes(value) ||
              producto.nombre.toLowerCase().includes(value.toLowerCase())) &&
            new Date(transformDate(producto.iniVig)) <=
              new Date(fechas[0].fechaDeEntrega) &&
            new Date(transformDate(producto.finVig)) >=
              new Date(fechas[0].fechaDeEntrega)
        );
      }
      setPrecios(nuevosPrecios);
    },
    [clientes, codigoCliente, fechas]
  );

  const handleFocusProduct = useCallback(
    ({ codigoProducto, unidades, precio }: TProductoPedido) => {
      let nuevoFocusProducto: TProductoPedido = {
        codigoProducto,
        unidades: 0,
        precio,
      };
      const FocusProductoEncontrado = productosPedido[codigoCliente]?.find(
        (productoPedido) => productoPedido.codigoProducto === codigoProducto
      );
      if (FocusProductoEncontrado)
        nuevoFocusProducto = { ...FocusProductoEncontrado, precio };
      setFocusProduct(nuevoFocusProducto);
    },
    [productosPedido, codigoCliente]
  );

  const handleIncrementValue = useCallback(
    ({ currentTarget: { value } }: React.FormEvent<HTMLInputElement>) => {
      const nuevasUnidades: number = value === "" ? 0 : parseInt(value, 10);
      let nuevoFocusProducto: TProductoPedido = {
        ...focusProduct,
        unidades: nuevasUnidades,
      };
      setFocusProduct(nuevoFocusProducto);
    },
    [focusProduct]
  );

  const handleAddToPedido = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (focusProduct.unidades > 0) {
        dispatch(
          agregarPedidoCliente({
            productoPedido: {
              codigoProducto: focusProduct.codigoProducto,
              unidades: focusProduct.unidades,
              precio: focusProduct.precio * focusProduct.unidades,
            },
            codigoCliente: codigoCliente,
          })
        );
      } else {
        dispatch(
          borrarPedidoCliente({
            codigoProducto: focusProduct.codigoProducto,
            codigoCliente: codigoCliente,
          })
        );
      }
      setFocusProduct({ codigoProducto: "", unidades: 0, precio: 0 });
    },
    [focusProduct, dispatch, codigoCliente]
  );
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSearchProducts}
        >
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
              <InputField
                label={t("general.cliente")}
                onChange={handleChangeCliente}
                value={codigoCliente}
              />
            </Grid>
            {existeCliente && (
              <Grid item xs={6} sm={6} className={classes.sectionRazonSocial}>
                <InputLabel className={classes.colorTextLabel}>
                  {razonSocial}
                </InputLabel>
              </Grid>
            )}
          </Grid>
        </form>
      </div>
      {!existeCliente && existeCliente !== null && (
        <div className={classes.sectionAlert}>
          <Alert variant="filled" severity="warning">
            {t("advertencias.clienteNoPortafolio")}
          </Alert>
        </div>
      )}
      {existeCliente && (
        <div>
          <div className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <InputLabel className={classes.colorTextLabel}>
                  Fecha de entrega:{" "}
                  {
                    darFormatoFecha(new Date(fechas[0].fechaDeEntrega)
                      .toISOString()
                      .split("T")[0]
                    )
                  }
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField
                  label={t("general.buscar")}
                  onChange={handleFindOneProduct}
                  autoFocus={precios && !focusProduct.codigoProducto}
                />
              </Grid>
            </Grid>
          </div>

          <FormAddProduct
            handleAddToPedido={handleAddToPedido}
            focusProduct={focusProduct}
            handleIncrementValue={handleIncrementValue}
          />

          <TableInfo
            headers={[t("general.producto"), t("general.precio")]}
            precios={precios}
            onClick={handleFocusProduct}
          />

          {productosPedido[codigoCliente]?.length > 0 && (
            <CardPedido pedido={productosPedido[codigoCliente]} />
          )}
        </div>
      )}
    </Container>
  );
}
